import {
  faker
} from '@faker-js/faker'

const admFalseSucessRequestBody = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: 'false'
}
module.exports = admFalseSucessRequestBody
