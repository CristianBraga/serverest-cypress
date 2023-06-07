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
let cartBodyProductDuplicate = {
  produtos: []
}
let cartBodyNonExistentProduct = {
  produtos: []
}
let cartBodyInsufficientAmountProduct = {
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

describe('Testes do endpoint POST /carrinhos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.sendRequestPostProduct(authorization, productSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        productId = response.body._id
        let product = {
          idProduto: productId,
          quantidade: 1
        }
        let nonExistentProduct = {
          idProduto: '0',
          quantidade: 1
        }
        let insufficientAmountProduct = {
          idProduto: productId,
          quantidade: 101
        }
        cartBody.produtos.push(product)
        cartBodyProductDuplicate.produtos.push(product)
        cartBodyProductDuplicate.produtos.push(product)
        cartBodyNonExistentProduct.produtos.push(nonExistentProduct)
        cartBodyInsufficientAmountProduct.produtos.push(insufficientAmountProduct)
      })
    })

    it('cadastrar um novo carrinho', () => {
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar cadastrar mais de um carrinho para o usuário', () => {
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Não é permitido ter mais de 1 carrinho')
      })
    })

    it('Excluir o carrinho do usuário para as próximas validações', () => {
      cy.sendRequestDeleteCancelCart(authorization).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
      })
    })

    it('Tentar cadastrar um carrinho com produto duplicado', () => {
      cy.sendRequestPostCart(authorization, cartBodyProductDuplicate).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Não é permitido possuir produto duplicado')
      })
    })

    it('Tentar cadastrar um carrinho com produto inexistente', () => {
      cy.sendRequestPostCart(authorization, cartBodyNonExistentProduct).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Produto não encontrado')
      })
    })
    it('Tentar cadastrar um carrinho com produto que não possui quantidade suficiente', () => {
      cy.sendRequestPostCart(authorization, cartBodyInsufficientAmountProduct).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Produto não possui quantidade suficiente')
      })
    })

    it('Tentar cadastrar um novo carrinho com uma autorização inválida', () => {
      cy.sendRequestPostCart(`${authorization}z`, cartBody).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
    })
  })
})
