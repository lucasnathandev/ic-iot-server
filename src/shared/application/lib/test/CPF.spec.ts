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

  it('should return correct CPF values and formats', () => {
    const stubCpf = '12345678909';

    sut = new CPF(stubCpf);
    expect(sut.validateCpf()).toBeTruthy();
    expect(sut.cpf).toBe('123.456.789-09');
    expect(CPF.unMaskCpf(sut.cpf)).toBe('12345678909');
    expect(CPF.maskCpf(stubCpf)).toBe('123.456.789-09');
    expect(sut.validateCpf(sut.generateRandomCpf('SP'))).toBeTruthy();
    expect(sut.generateRandomCpf('SP')[8]).toBe('8');
    expect(CPF.maskCpf(sut.generateRandomCpf())).toMatch(
      /\d{3}.\d{3}.\d{3}-\d{2}/,
    );
  });
});
