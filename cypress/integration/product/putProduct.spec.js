import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'
import {
  faker
} from '@faker-js/faker'

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

describe('Testes do endpoint PUT /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para as edições', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('Editar o campo Nome de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
        productBodySucess['nome'] = `${faker.commerce.product()} ${faker.commerce.productAdjective()} ${faker.number.int({ min: 10000, max: 99999 })}`
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
      })
    })

    it('Editar o campo Preço de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('preco', productBodySucess.preco)
        productBodySucess['preco'] = faker.number.int({
          min: 100,
          max: 1000
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('preco', productBodySucess.preco)
      })
    })

    it('Editar o campo Descrição de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('descricao', productBodySucess.descricao)
        productBodySucess['descricao'] = faker.string.uuid()
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('descricao', productBodySucess.descricao)
      })
    })

    it('Editar o campo Quantidade de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', productBodySucess.quantidade)
        productBodySucess['quantidade'] = faker.number.int({
          min: 10,
          max: 100
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', productBodySucess.quantidade)
      })
    })

    it('Editar todos os campos de um produto', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
        expect(response.body).to.have.property('preco', productBodySucess.preco)
        expect(response.body).to.have.property('descricao', productBodySucess.descricao)
        expect(response.body).to.have.property('quantidade', productBodySucess.quantidade)
        productBodySucess['nome'] = `${faker.commerce.product()} ${faker.commerce.productAdjective()} ${faker.number.int({ min: 10000, max: 99999 })}`
        productBodySucess['preco'] = faker.number.int({
          min: 100,
          max: 1000
        })
        productBodySucess['descricao'] = faker.string.uuid()
        productBodySucess['quantidade'] = faker.number.int({
          min: 10,
          max: 100
        })
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
        expect(response.body).to.have.property('preco', productBodySucess.preco)
        expect(response.body).to.have.property('descricao', productBodySucess.descricao)
        expect(response.body).to.have.property('quantidade', productBodySucess.quantidade)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar editar um produto enviando o campo Nome vazio', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
        productBodySucess['nome'] = ''
      })

      cy.sendRequestPutProduct(productId, authorization, productBodySucess).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
      })
    })

    it('Tentar editar um produto com uma autorização inválida', () => {
      cy.sendRequestPutProduct(productId, `${authorization}z`, productBodySucess).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })

    it('Tentar editar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPutProduct(productId, authorizationNotAdm, productBodySucess).should((response) => {
        expect(response.status).to.equal(403)
        expect(response.body).to.have.property('message', 'Rota exclusiva para administradores')
      })
    })
  })
})
