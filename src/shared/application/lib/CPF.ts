export class CPF {
  cpf: string;

  #invalidCpfNumbers = ['11111111111'];

  #UF: string[][] = [
    ['RS'],
    ['DF', 'GO', 'MS', 'MT', 'TO'],
    ['AC', 'AM', 'AP', 'PA', 'RO', 'RR'],
    ['CE', 'MA', 'PI'],
    ['AL', 'PB', 'PE', 'RN'],
    ['BA', 'SE'],
    ['MG'],
    ['ES', 'RJ'],
    ['SP'],
    ['PR', 'SC'],
  ];
  constructor(cpf?: string) {
    this.cpf = cpf && this.validateCpf(cpf) ? CPF.maskCpf(cpf) : '';
  }

  public generateRandomCpf(UF?: string): string {
    const numbers: string = Array.from({ length: 9 })
      .map(() => Math.floor(Math.random() * 9))
      .join('');
    if (UF) {
      const indexOfUf = this.#UF.findIndex((ufArray) => ufArray.includes(UF));
      if (indexOfUf === -1) return '';
      const newNumbers = [...numbers.substring(0, 8), indexOfUf].join('');
      return this.processCpfDigits(newNumbers);
    }
    return this.processCpfDigits(numbers);
  }

  public validateCpf(cpf?: string) {
    const unMaskedCpf: string = CPF.unMaskCpf(cpf || this.cpf);

    if (!unMaskedCpf.length) return false;
    const isInvalidCpfPattern = this.#invalidCpfNumbers.includes(unMaskedCpf);

    if (isInvalidCpfPattern || unMaskedCpf.length < 11) return false;
    const generatedCpf: string = this.processCpfDigits(
      unMaskedCpf.substring(0, 9),
    );

    return generatedCpf === unMaskedCpf;
  }

  public static maskCpf(cpf: string): string {
    const unMaskedCpf = this.unMaskCpf(cpf);
    if (cpf.length !== unMaskedCpf.length || unMaskedCpf.length !== 11)
      return '';
    return unMaskedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  public static unMaskCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private processCpfDigits(cpf: string): string {
    const unMaskedCpf: string = CPF.unMaskCpf(cpf);

    if (unMaskedCpf.length >= 11) return unMaskedCpf;
    let i = unMaskedCpf.length + 1;
    const base: number = [...unMaskedCpf].reduce(
      (acc, num) => acc + parseInt(num) * i--,
      0,
    );
    const rest: number = base % 11;
    const digit = rest < 2 ? 0 : 11 - rest;
    return this.processCpfDigits([...unMaskedCpf, digit].join(''));
  }
}
