import {
  faker
} from '@faker-js/faker'

const admTrueSucessRequestBody = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: 'true'
}
module.exports = admTrueSucessRequestBody
