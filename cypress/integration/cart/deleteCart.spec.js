import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'
import '../../requests/cartRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')
const productSucessRequestBody = require('../../fixtures/requestBodies/productBodies/productSucessRequestBody')

let authorization = 'string'
let productId = ''

let cartBody = {
  produtos: []
}

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
  })
  cy.sendRequestPostLogin(admTrueSucessRequestBody.email, admTrueSucessRequestBody.password).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.authorization).to.not.be.empty
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint DELETE /carrinhos/cancelar-compra', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        productId = response.body._id
        let product = {
          idProduto: productId,
          quantidade: 1
        }
        cartBody.produtos.push(product)
      })
    })

    it('cadastrar um novo carrinho para a exclusão', () => {
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })
    it('Excluir um carrinho existente', () => {
      cy.sendRequestDeleteCancelCart(authorization).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um carrinho com uma autorização inválida', () => {
      cy.sendRequestDeleteCancelCart(`${authorization}z`).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })
})

describe('Testes do endpoint DELETE /carrinhos/concluir-compra', () => {
  context('Cenários de sucesso', () => {
    it('cadastrar um novo carrinho', () => {
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })

    it('Excluir um carrinho existente', () => {
      let productAmount = 0
      cy.sendRequestGetOneProduct(productId).should((response) => {
        expect(response.status).to.equal(200)
        productAmount = response.body.quantidade
      })
      cy.sendRequestDeleteFinishCart(authorization).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um carrinho com uma autorização inválida', () => {
      cy.sendRequestDeleteFinishCart(`${authorization}z`).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })
})
