import { Entity } from '../../entity';

interface StubProps {
  name: string;
  age: number;
}
class StubEntity extends Entity<StubProps> {
  protected props: StubProps;
  constructor(props: StubProps, id?: string) {
    super(props, id);
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get age(): number {
    return this.props.age;
  }

  set age(value: number) {
    this.props.age = value;
  }
}

describe('Entity abstract class unit tests', () => {
  const props: StubProps = { name: 'Lucas', age: 27 };
  const sut = new StubEntity(props);

  it('should have name and age props', () => {
    expect(sut.name).toBeDefined();
    expect(sut.age).toBeDefined();
  });

  it('should NOT have these prop values', () => {
    expect(sut.name).not.toBe('John');
    expect(sut.age).not.toBe(20);
  });

  it('should have correct prop values', () => {
    expect(sut.name).toBe(props.name);
    expect(sut.age).toBe(props.age);
  });
});
