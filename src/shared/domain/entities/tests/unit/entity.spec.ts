import { Entity } from '../../entity';

interface StubProps {
  name: string;
  age: number;
}
class StubEntity extends Entity<StubProps> {}

describe('Entity abstract class unit tests', () => {
  it('should not have these props', () => {
    const props: StubProps = { name: 'Lucas', age: 27 };
    const sut = new StubEntity(props);
    expect(sut.props['weight']).toBeUndefined();
  });
});
