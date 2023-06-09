import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'

Cypress.Commands.add('createUserDataSet', (admTrueBodySucess) => {
  cy.sendRequestPostUser(admTrueBodySucess).then((response) => {
    expect(response.status).to.equal(201)
    expect(response.body).to.not.be.empty
    Cypress.env('userId', response.body._id)
  })
})

Cypress.Commands.add('createUserLoginDataSet', (admTrueBodySucess) => {
  cy.sendRequestPostUser(admTrueBodySucess).then((response) => {
    expect(response.status).to.equal(201)
    expect(response.body).to.not.be.empty
    Cypress.env('userId', response.body._id)
  })

  cy.sendRequestPostLogin(admTrueBodySucess.email, admTrueBodySucess.password).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.authorization).to.not.be.empty
  })
})

Cypress.Commands.add('createProductDataSet', (authorization, productBodySucess) => {
  cy.sendRequestPostProduct(authorization, productBodySucess).then((response) => {
    expect(response.status).to.equal(201)
    expect(response.body).to.not.be.empty
  })
})

Cypress.Commands.add('helperPutUserConsultOneField', (userId, field, requestFieldValue) => {
  cy.sendRequestGetOneUser(userId).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(field, requestFieldValue)
  })
})

Cypress.Commands.add('helperPutUserConsultAllFields', (userId, body) => {
  cy.sendRequestGetOneUser(userId).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('nome', body.nome)
    expect(response.body).to.have.property('email', body.email)
    expect(response.body).to.have.property('password', body.password)
    expect(response.body).to.have.property('administrador', body.administrador)
  })
})
