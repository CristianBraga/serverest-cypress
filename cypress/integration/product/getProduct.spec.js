import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let productId = ''

before(() => {
  cy.createUserLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint GET /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para as consultas', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('Buscar por um produto com ID existente', () => {
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', productBodySucess.nome)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um produto com ID inexistente', () => {
      cy.sendRequestGetOneProduct(`${productId}_123`).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Produto não encontrado')
      })
    })
  })
})

describe('Testes do endpoint (Lista) GET /produtos/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por produtos com o parâmetro ID', () => {
      cy.sendRequestGetListProduct(`?_id=${productId}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.produtos[0]._id).to.equal(productId)
      })
    })

    it('Buscar por produtos com o parâmetro Nome', () => {
      cy.sendRequestGetListProduct(`?nome=${productBodySucess.nome}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.produtos[0].nome).to.equal(productBodySucess.nome)
      })
    })

    it('Buscar por produtos com o parâmetro Preço', () => {
      cy.sendRequestGetListProduct(`?preco=${productBodySucess.preco}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.produtos[0].preco).to.equal(productBodySucess.preco)
      })
    })

    it('Buscar por produtos com o parâmetro Descrição', () => {
      cy.sendRequestGetListProduct(`?descricao=${productBodySucess.descricao}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.produtos[0].descricao).to.equal(productBodySucess.descricao)
      })
    })

    it('Buscar por produtos com o parâmetro Quantidade', () => {
      cy.sendRequestGetListProduct(`?quantidade=${productBodySucess.quantidade}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.produtos[0].quantidade).to.equal(productBodySucess.quantidade)
      })
    })

    it('Buscar por produtos sem utilizar parâmetros', () => {
      cy.sendRequestGetListProduct('').should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.produtos).to.be.not.null
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um produto com um parâmetro inexistente', () => {
      cy.sendRequestGetListProduct('?parametroInexistente=123').should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('parametroInexistente', 'parametroInexistente não é permitido')
      })
    })
  })
})
