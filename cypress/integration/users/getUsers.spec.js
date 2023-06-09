import '../../requests/usersRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')

before(() => {
  cy.createUserLoginDataSet(admTrueBodySucess)
})

describe('Testes do endpoint GET /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por um usuário com ID existente', () => {
      cy.sendRequestGetOneUser(Cypress.env('userId')).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('nome', admTrueBodySucess.nome)
        expect(response.body).to.have.property('email', admTrueBodySucess.email)
        expect(response.body).to.have.property('password', admTrueBodySucess.password)
        expect(response.body).to.have.property('administrador', admTrueBodySucess.administrador)
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um usuário com ID inexistente', () => {
      cy.sendRequestGetOneUser(`${Cypress.env('userId')}_123`).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
      })
    })
  })
})

describe('Testes do endpoint (Lista) GET /usuarios/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por usuários com o parâmetro ID', () => {
      cy.sendRequestGetListUser(`?_id=${Cypress.env('userId')}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0]._id).to.equal(Cypress.env('userId'))
      })
    })

    it('Buscar por usuários com o parâmetro Nome', () => {
      cy.sendRequestGetListUser(`?nome=${admTrueBodySucess.nome}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0].nome).to.equal(admTrueBodySucess.nome)
      })
    })

    it('Buscar por usuários com o parâmetro E-mail', () => {
      cy.sendRequestGetListUser(`?email=${admTrueBodySucess.email}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0].email).to.equal(admTrueBodySucess.email)
      })
    })

    it('Buscar por usuários com o parâmetro Administrador', () => {
      cy.sendRequestGetListUser(`?administrador=${admTrueBodySucess.administrador}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.usuarios).to.be.not.null
      })
    })

    it('Buscar por usuários sem utilizar parâmetros', () => {
      cy.sendRequestGetListUser('').should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.quantidade).to.be.at.least(1)
        expect(response.body.usuarios).to.be.not.null
      })
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por usuários com um parâmetro inexistente', () => {
      cy.sendRequestGetListUser('?parametroInexistente=123').should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('parametroInexistente', 'parametroInexistente não é permitido')
      })
    })
  })
})
