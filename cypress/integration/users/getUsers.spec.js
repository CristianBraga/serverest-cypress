import '../../requests/usersRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')

let user = {}

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
    user = response.body
  })
})

describe('Testes do endpoint GET /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por um usuário com ID existente', () => {
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
    it('Buscar por um usuário com ID inexistente', () => {
      cy.sendRequestGetOneUser(`${user._id}_123`).should((response) => {
        expect(response.status).to.equal(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
      })
    })
  })
})

describe('Testes do endpoint (Lista) GET /usuarios/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por usuários com o parâmetro ID', () => {
      cy.sendRequestGetListUser(`?_id=${user._id}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0]._id).to.equal(user._id)
      })
    })

    it('Buscar por usuários com o parâmetro Nome', () => {
      cy.sendRequestGetListUser(`?nome=${admTrueSucessRequestBody.nome}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0].nome).to.equal(admTrueSucessRequestBody.nome)
      })
    })

    it('Buscar por usuários com o parâmetro E-mail', () => {
      cy.sendRequestGetListUser(`?email=${admTrueSucessRequestBody.email}`).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('quantidade', 1)
        expect(response.body.usuarios[0].email).to.equal(admTrueSucessRequestBody.email)
      })
    })

    it('Buscar por usuários com o parâmetro Administrador', () => {
      cy.sendRequestGetListUser(`?administrador=${admTrueSucessRequestBody.administrador}`).should((response) => {
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
