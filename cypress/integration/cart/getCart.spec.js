import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'
import '../../requests/cartRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')
const productSucessRequestBody = require('../../fixtures/requestBodies/productBodies/productSucessRequestBody')

let authorization = 'string'
let productId = ''
let cartId = ''
let userId = ''

let cartBody = {
  produtos: []
}

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
    userId = response.body._id
  })
  cy.sendRequestPostLogin(admTrueSucessRequestBody.email, admTrueSucessRequestBody.password).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.authorization).to.not.be.empty
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint GET /carrinhos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        productId = response.body._id
        let product = {
          idProduto: productId,
          quantidade: 1
        }
        cartBody.produtos.push(product)
      })
    })

    it('cadastrar um novo carrinho para as consultas', () => {
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(201)
        cartId = response.body._id
      })
    })

    it('Buscar por um carrinho com ID existente', () => {
      cy.sendRequestGetOneCart(cartId).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.produtos[0]).to.have.property('idProduto', productId)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um carrinho com ID inexistente', () => {
      cy.sendRequestGetOneCart(`${cartId}_123`).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Carrinho não encontrado')
      })
    })
  })
})

describe('Testes do endpoint (Lista) GET /carrinhos/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por carrinhos com o parâmetro ID', () => {
      cy.sendRequestGetListCart(`?_id=${cartId}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.carrinhos[0].produtos[0].idProduto).to.equal(productId)
      })
    })

    it('Buscar por carrinhos com o parâmetro Preço Total', () => {
      cy.sendRequestGetListCart(`?precoTotal=${productSucessRequestBody.preco}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.carrinhos[0].produtos[0].idProduto).to.equal(productId)
      })
    })

    it('Buscar por carrinhos com o parâmetro Quantidade Total', () => {
      //
      cy.sendRequestGetListCart(`?quantidadeTotal=${cartBody.produtos[0].quantidade}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.carrinhos).to.be.not.null
      })
    })

    it('Buscar por carrinhos com o parâmetro Id Usuário', () => {
      //
      cy.sendRequestGetListCart(`?idUsuario=${userId}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.carrinhos).to.be.not.null
      })
    })

    it('Buscar por carrinhos sem utilizar parâmetros', () => {
      cy.sendRequestGetListCart('').should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.carrinhos).to.be.not.null
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um carrinho com um parâmetro inexistente', () => {
      cy.sendRequestGetListCart('?parametroInexistente=123').should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('parametroInexistente', 'parametroInexistente não é permitido')
      })
    })
  })
})
