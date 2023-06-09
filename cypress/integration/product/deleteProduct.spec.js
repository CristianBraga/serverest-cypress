import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const admFalseBodySucess = userPostRequestBody('false')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let authorizationNotAdm = 'string'
let productId = ''

before(() => {
  cy.createUserLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
  cy.createUserLoginDataSet(admFalseBodySucess).then((response) => {
    authorizationNotAdm = response.body.authorization
  })
})

describe('Testes do endpoint DELETE /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para a exclusão', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('Excluir um produto com ID existente', () => {
      cy.sendRequestDeleteProduct(productId, authorization).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um produto com ID inexistente', () => {
      cy.sendRequestDeleteProduct('01', authorization).should((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('message', 'Nenhum registro excluído')
      })
    })

    it('Tentar excluir um produto com uma autorização inválida', () => {
      cy.sendRequestDeleteProduct(productId, `${authorization}z`).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })

    it('Tentar excluir um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestDeleteProduct(productId, authorizationNotAdm).should((response) => {
        expect(response.status).to.equal(403)
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
      })
    })
  })
})
