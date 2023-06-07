import '../../requests/usersRequest'

const admTrueSucessRequestBody = require('../../fixtures/requestBodies/usersBodies/admTrueSucessRequestBody')

let user = {}

before(() => {
  cy.sendRequestPostUser(admTrueSucessRequestBody).should((response) => {
    expect(response.status).to.equal(201)
    user = response.body
  })
})

describe('Testes do endpoint DELETE /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Excluir um usuário com ID existente', () => {
      cy.sendRequestDeleteUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um usuário já excluído', () => {
      cy.sendRequestDeleteUser(user._id).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Nenhum registro excluído')
      })
    })

    it('Tentar excluir um usuário com ID inexistente', () => {
      cy.sendRequestDeleteUser('01').should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Nenhum registro excluído')
      })
    })
  })
})
