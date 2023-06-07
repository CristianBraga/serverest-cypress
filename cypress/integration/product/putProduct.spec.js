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

describe('Testes do endpoint PUT /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para as edições', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        productId = response.body._id
      })
    })

    it('Editar o campo Nome de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productSucessRequestBody.nome)
        productSucessRequestBody['nome'] = `${faker.commerce.product()} ${faker.commerce.productAdjective()} ${faker.number.int({ min: 10000, max: 99999 })}`
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productSucessRequestBody.nome)
      })
    })

    it('Editar o campo Preço de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('preco', productSucessRequestBody.preco)
        productSucessRequestBody['preco'] = faker.number.int({
          min: 100,
          max: 1000
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('preco', productSucessRequestBody.preco)
      })
    })

    it('Editar o campo Descrição de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('descricao', productSucessRequestBody.descricao)
        productSucessRequestBody['descricao'] = faker.string.uuid()
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('descricao', productSucessRequestBody.descricao)
      })
    })

    it('Editar o campo Quantidade de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', productSucessRequestBody.quantidade)
        productSucessRequestBody['quantidade'] = faker.number.int({
          min: 10,
          max: 100
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', productSucessRequestBody.quantidade)
      })
    })

    it('Editar todos os campos de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productSucessRequestBody.nome)
        expect(response.body).to.have.property('preco', productSucessRequestBody.preco)
        expect(response.body).to.have.property('descricao', productSucessRequestBody.descricao)
        expect(response.body).to.have.property('quantidade', productSucessRequestBody.quantidade)
        productSucessRequestBody['nome'] = `${faker.commerce.product()} ${faker.commerce.productAdjective()} ${faker.number.int({ min: 10000, max: 99999 })}`
        productSucessRequestBody['preco'] = faker.number.int({
          min: 100,
          max: 1000
        })
        productSucessRequestBody['descricao'] = faker.string.uuid()
        productSucessRequestBody['quantidade'] = faker.number.int({
          min: 10,
          max: 100
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productSucessRequestBody.nome)
        expect(response.body).to.have.property('preco', productSucessRequestBody.preco)
        expect(response.body).to.have.property('descricao', productSucessRequestBody.descricao)
        expect(response.body).to.have.property('quantidade', productSucessRequestBody.quantidade)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar enviar com o campo Nome vazio', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productSucessRequestBody.nome)
        productSucessRequestBody['nome'] = ''
      })

      cy.sendRequestPutProduct(productId, authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
      })
    })

    it('Tentar editar um produto com uma autorização inválida', () => {
      cy.sendRequestPutProduct(productId, `${authorization}z`, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })

    it('Tentar editar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPutProduct(productId, authorizationNotAdm, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(403)
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
      })
    })
  })
})
