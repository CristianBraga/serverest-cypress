Cypress.Commands.add('sendRequestPostUser', (body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/usuarios`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body,
  })
})

Cypress.Commands.add('sendRequestGetOneUser', (userId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestGetListUser', (parameter) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestPutUser', (userId, body) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body,
  })
})

Cypress.Commands.add('sendRequestDeleteUser', (userId) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})
