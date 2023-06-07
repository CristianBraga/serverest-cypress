import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')
const admFalseSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admFalseSucessRequestBody')
const productSucessRequestBody = require('../../fixtures/requestBodies/productBodies/productSucessRequestBody')

let authorization = 'string'
let authorizationNotAdm = 'string'

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

describe('Testes do endpoint POST /produtos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um novo produto', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar cadastrar um produto já existente', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Já existe produto com esse nome')
      })
    })

    it('Tentar cadastrar um produto com o preço 0 (zero)', () => {
      let backupPreco = productSucessRequestBody.preco
      productSucessRequestBody['preco'] = 0
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('preco', 'preco deve ser um número positivo')
        productSucessRequestBody['preco'] = backupPreco
      })
    })

    it('Tentar cadastrar um produto com o campo nome vazio', () => {
      let backupNome = productSucessRequestBody.nome
      productSucessRequestBody['nome'] = ''
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
        productSucessRequestBody['nome'] = backupNome
      })
    })

    it('Tentar cadastrar um produto com uma autorização inválida', () => {
      cy.sendRequestPostProduct(`${authorization}z`, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })

    it('Tentar cadastrar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPostProduct(authorizationNotAdm, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(403)
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
      })
    })
  })
})
