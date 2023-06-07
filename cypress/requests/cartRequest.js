Cypress.Commands.add('sendRequestPostCart', (authorization, body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/carrinhos`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body
  })
})

Cypress.Commands.add('sendRequestDeleteCancelCart', (authorization) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/carrinhos/cancelar-compra`,
    headers: {
      'authorization': authorization,
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestDeleteFinishCart', (authorization) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/carrinhos/concluir-compra`,
    headers: {
      'authorization': authorization,
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestGetOneCart', (cartId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/${cartId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestGetListCart', (parameter) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})
