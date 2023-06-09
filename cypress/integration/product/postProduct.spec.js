import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const admFalseBodySucess = userPostRequestBody('false')
const productBodySucess = productPostRequestBody()

let authorization = 'string'
let authorizationNotAdm = 'string'

before(() => {
  cy.createUserLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
  cy.createUserLoginDataSet(admFalseBodySucess).then((response) => {
    authorizationNotAdm = response.body.authorization
  })
})

describe('Testes do endpoint POST /produtos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um novo produto', () => {
      cy.sendRequestPostProduct(authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar cadastrar um produto já existente', () => {
      cy.sendRequestPostProduct(authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Já existe produto com esse nome')
      })
    })

    it('Tentar cadastrar um produto com o preço 0 (zero)', () => {
      let backupPreco = productBodySucess.preco
      productBodySucess['preco'] = 0
      cy.sendRequestPostProduct(authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('preco', 'preco deve ser um número positivo')
        productBodySucess['preco'] = backupPreco
      })
    })

    it('Tentar cadastrar um produto com o campo nome vazio', () => {
      let backupNome = productBodySucess.nome
      productBodySucess['nome'] = ''
      cy.sendRequestPostProduct(authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
        productBodySucess['nome'] = backupNome
      })
    })

    it('Tentar cadastrar um produto com uma autorização inválida', () => {
      cy.sendRequestPostProduct(`${authorization}z`, productBodySucess).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })

    it('Tentar cadastrar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPostProduct(authorizationNotAdm, productBodySucess).should((response) => {
        expect(response.status).to.equal(403)
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
      })
    })
  })
})
