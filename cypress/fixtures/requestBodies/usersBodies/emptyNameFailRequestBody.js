import {
  faker
} from '@faker-js/faker'

const emptyNameFailRequestBody = {
  nome: '',
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: 'false'
}
module.exports = emptyNameFailRequestBody
