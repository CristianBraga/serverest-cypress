import '../../requests/usersRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

before(() => {
  const admTrueBodySucess = userPostRequestBody('true')
  cy.createUserLoginDataSet(admTrueBodySucess)
})

describe('Testes do endpoint DELETE /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Excluir um usuário com ID existente', () => {
      cy.sendRequestDeleteUser(Cypress.env('userId')).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um usuário já excluído', () => {
      cy.sendRequestDeleteUser(Cypress.env('userId')).should((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('message', 'Nenhum registro excluído')
      })
    })

    it('Tentar excluir um usuário com ID inexistente', () => {
      cy.sendRequestDeleteUser('01').should((response) => {
        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('message', 'Nenhum registro excluído')
      })
    })
  })
})
