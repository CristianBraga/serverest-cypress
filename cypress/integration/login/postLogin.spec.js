import '../../requests/usersRequest'
import '../../requests/loginRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
  })
})

describe('Testes do endpoint POST /login', () => {
  context('Cenários de sucesso', () => {
    it('Realizar o login com o usuário criado', () => {
      cy.sendRequestPostLogin(admTrueSucessRequestBody.email, admTrueSucessRequestBody.password).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Login realizado com sucesso')
        expect(response.body.authorization).to.not.be.empty
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar realizar o login com um e-mail inválido', () => {
      cy.sendRequestPostLogin(`${admTrueSucessRequestBody.email}z`, admTrueSucessRequestBody.password).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('email', 'email deve ser um email válido')
      })
    })

    it('Tentar realizar o login com o e-mail incorreto', () => {
      cy.sendRequestPostLogin(`z${admTrueSucessRequestBody.email}`, admTrueSucessRequestBody.password).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
      })
    })

    it('Tentar realizar o login com a senha incorreta', () => {
      cy.sendRequestPostLogin(admTrueSucessRequestBody.email, `${admTrueSucessRequestBody.password}123`).should((response) => {
        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
      })
    })
  })
})
