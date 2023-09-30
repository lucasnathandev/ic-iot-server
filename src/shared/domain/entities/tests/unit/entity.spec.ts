import { Entity } from '../../entity';

interface StubProps {
  name: string;
  age: number;
}
class StubEntity extends Entity<StubProps> {}

describe('Entity abstract class unit tests', () => {
  const props: StubProps = { name: 'Lucas', age: 27 };
  const sut = new StubEntity(props);

  it('should have name and age props', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.age).toBeDefined();
  });

  it('should NOT have these prop values', () => {
    expect(sut.props.name).not.toBe('John');
    expect(sut.props.age).not.toBe(20);
  });

  it('should have correct prop values', () => {
    expect(sut.props.name).toBe(props.name);
    expect(sut.props.age).toBe(props.age);
  });
});
