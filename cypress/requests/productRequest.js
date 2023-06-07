Cypress.Commands.add('sendRequestPostProduct', (authorization, body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/produtos`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body,
  })
})

Cypress.Commands.add('sendRequestPutProduct', (productId, authorization, body) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body,
  })
})

Cypress.Commands.add('sendRequestGetOneProduct', (productId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestGetListProduct', (parameter) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestDeleteProduct', (productId, authorization) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'authorization': authorization,
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})
