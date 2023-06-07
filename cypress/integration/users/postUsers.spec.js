import '../../requests/usersRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')
const admFalseSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admFalseSucessRequestBody')
const emptyNameFailRequestBody = require('../../fixtures/requestBodies/usersBodies/emptyNameFailRequestBody')
const fieldWithIncorrectValueRequestBody = require('../../fixtures/requestBodies/usersBodies/fieldWithIncorrectValueRequestBody')

describe('Testes do endpoint POST /usuarios', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um novo usuário com nível administrador', () => {
      cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })

    it('Cadastrar um novo usuário com nível básico', () => {
      cy.sendRequestPostUser(admFalseSucessRequestBody).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.not.be.empty
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar Cadastrar um novo usuário com o campo Nome vazio', () => {
      cy.sendRequestPostUser(emptyNameFailRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
      })
    })

    it('Tentar Cadastrar um novo usuário com o campo Administrador do tipo string com o valor booleano', () => {
      cy.sendRequestPostUser(fieldWithIncorrectValueRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('administrador', "administrador deve ser 'true' ou 'false'")
      })
    })
  })
})
