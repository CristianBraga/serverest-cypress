import {
  faker
} from '@faker-js/faker'

const productSucessRequestBody = {
  nome: `${faker.commerce.product()} ${faker.commerce.productAdjective()} ${faker.number.int({ min: 10000, max: 99999 })}`,
  preco: faker.number.int({
    min: 100,
    max: 1000
  }),
  descricao: faker.string.uuid(),
  quantidade: faker.number.int({
    min: 10,
    max: 100
  })
}
module.exports = productSucessRequestBody
