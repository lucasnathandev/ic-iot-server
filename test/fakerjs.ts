import { Faker, pt_BR } from '@faker-js/faker';
import { CPF } from 'src/shared/application/lib/CPF';

const globalConfig = { locale: [pt_BR] };

export const adminFaker = new Faker(globalConfig);

export function makeFakeAdmin() {
  return {
    name: adminFaker.person.fullName(),
    age: adminFaker.number.int({ min: 18, max: 90 }),
    cpf: new CPF().generateRandomCpf(),
    password: adminFaker.internet.password(),
    email: adminFaker.internet.email(),
  };
}
