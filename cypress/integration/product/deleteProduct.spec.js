import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'
import {
  faker
} from '@faker-js/faker'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')
const admFalseSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admFalseSucessRequestBody')
const productSucessRequestBody = require('../../fixtures/requestBodies/productBodies/productSucessRequestBody')

let authorization = 'string'
let authorizationNotAdm = 'string'
let productId = ''

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
  })
  cy.sendRequestPostLogin(admTrueSucessRequestBody.email, admTrueSucessRequestBody.password).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.authorization).to.not.be.empty
    authorization = response.body.authorization
  })

  cy.sendRequestPostUser(admFalseSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
  })
  cy.sendRequestPostLogin(admFalseSucessRequestBody.email, admFalseSucessRequestBody.password).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.authorization).to.not.be.empty
    authorizationNotAdm = response.body.authorization
  })
})

describe('Testes do endpoint DELETE /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para a exclusão', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
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
        expect(response.status).to.equal(200)
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
