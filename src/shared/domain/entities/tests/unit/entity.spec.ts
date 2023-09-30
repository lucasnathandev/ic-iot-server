import { Entity } from '../../entity';

interface StubProps {
  name: string;
  age: number;
}
class StubEntity extends Entity<StubProps> {}

describe('Entity abstract class unit tests', () => {
  it('should have name and age props', () => {
    const props: StubProps = { name: 'Lucas', age: 27 };
    const sut = new StubEntity(props);
    expect(sut.props.name).toBeDefined();
    expect(sut.props.age).toBeDefined();
  });
});
