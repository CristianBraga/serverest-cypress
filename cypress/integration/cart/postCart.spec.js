import '../../requests/productRequest'
import '../../requests/cartRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'
import cartBodyFunction from '../../support/dataSet/cartBody'

const admTrueBodySucess = userPostRequestBody('true')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let productId = ''
let cartBody = {}

before(() => {
  cy.createUserLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint POST /carrinhos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('cadastrar um novo carrinho', () => {
      cartBody = cartBodyFunction('sucess', productId)
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
      cartBody = cartBodyFunction('productDuplicate', productId)
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Não é permitido possuir produto duplicado')
      })
    })

    it('Tentar cadastrar um carrinho com produto inexistente', () => {
      cartBody = cartBodyFunction('nonExistentProduct', '01')
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Produto não encontrado')
      })
    })

    it('Tentar cadastrar um carrinho com produto que não possui quantidade suficiente', () => {
      cartBody = cartBodyFunction('insufficientAmountProduct', productId)
      cy.sendRequestPostCart(authorization, cartBody).should((response) => {
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
