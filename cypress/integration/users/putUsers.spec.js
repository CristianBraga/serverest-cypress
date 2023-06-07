import '../../requests/usersRequest'
import {
  faker
} from '@faker-js/faker'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')

let user = {}

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
    user = response.body
  })
})

describe('Testes do endpoint PUT /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Editar o campo Nome de um usuário', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', admTrueSucessRequestBody.nome)
        admTrueSucessRequestBody['nome'] = faker.person.fullName()
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', admTrueSucessRequestBody.nome)
      })
    })

    it('Editar o campo E-mail de um usuário', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('email', admTrueSucessRequestBody.email)
        admTrueSucessRequestBody['email'] = faker.internet.email()
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('email', admTrueSucessRequestBody.email)
      })
    })

    it('Editar o campo Password de um usuário', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('password', admTrueSucessRequestBody.password)
        admTrueSucessRequestBody['password'] = faker.internet.password()
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('password', admTrueSucessRequestBody.password)
      })
    })

    it('Editar o campo Administrador de um usuário', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('administrador', admTrueSucessRequestBody.administrador)
        admTrueSucessRequestBody['administrador'] = 'false'
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('administrador', admTrueSucessRequestBody.administrador)
      })
    })

    it('Editar todos os campos de um usuário', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', admTrueSucessRequestBody.nome)
        expect(response.body).to.have.property('email', admTrueSucessRequestBody.email)
        expect(response.body).to.have.property('password', admTrueSucessRequestBody.password)
        expect(response.body).to.have.property('administrador', admTrueSucessRequestBody.administrador)
        admTrueSucessRequestBody['nome'] = faker.person.fullName()
        admTrueSucessRequestBody['email'] = faker.internet.email()
        admTrueSucessRequestBody['password'] = faker.internet.password()
        admTrueSucessRequestBody['administrador'] = 'true'
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })

      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', admTrueSucessRequestBody.nome)
        expect(response.body).to.have.property('email', admTrueSucessRequestBody.email)
        expect(response.body).to.have.property('password', admTrueSucessRequestBody.password)
        expect(response.body).to.have.property('administrador', admTrueSucessRequestBody.administrador)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar enviar com o campo Nome vazio', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        admTrueSucessRequestBody['nome'] = ''
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('nome', 'nome não pode ficar em branco')
      })
    })
    it('Tentar enviar com o campo E-mail vazio', () => {
      cy.sendRequestGetOneUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        admTrueSucessRequestBody['email'] = ''
      })

      cy.sendRequestPutUser(user._id, admTrueSucessRequestBody).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('email', 'email não pode ficar em branco')
      })
    })
  })
})
