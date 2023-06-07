Cypress.Commands.add('sendRequestPostLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/login`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: {
      email: email,
      password: password
    },
  })
})
