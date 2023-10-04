import { CPF } from '../CPF';

describe('CPF library unit tests', () => {
  let sut: CPF;
  it('should return empty string', () => {
    sut = new CPF('12345678910');
    expect(sut.cpf).toBe('');
    expect(sut.validateCpf()).toBeFalsy();
    expect(CPF.maskCpf(sut.cpf)).toBe('');
    expect(CPF.unMaskCpf(sut.cpf)).toBe('');
  });
});
