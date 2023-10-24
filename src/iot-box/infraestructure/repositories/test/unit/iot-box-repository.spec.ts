import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IotBoxRepositoryMemory } from '../../in-memory-iot-box.repository';

describe('IotBoxRepository unit tests', () => {
  let sut: IotBoxRepositoryMemory;

  beforeEach(() => {
    sut = new IotBoxRepositoryMemory();
  });

  it('shoud run methods correctly', async () => {
    const box = new IotBoxEntity(
      {
        name: 'Box1',
        sensors: {
          gps: {
            latitude: 1,
            longitude: 1,
          },
        },
      },
      'box1id',
    );

    await sut.save(box);
    const foundBox = await sut.get('box1id');
    const foundByNameBox = await sut.findByName(box.name);
    await expect(sut.get('anyboxid')).rejects.toThrow();
    await expect(sut.findByName('anyboxname')).rejects.toThrow();
    await expect(sut.save({} as any)).rejects.toThrow();
    await expect(sut.update('anyboxid', { battery: 0.5 })).rejects.toThrow();
    await expect(sut.delete('anyboxid')).rejects.toThrow();
    expect(foundBox).toEqual(box);
    expect(foundByNameBox).toEqual(box);
    expect(await sut.getAll()).toHaveLength(1);
    expect(await sut.getAllActive()).toHaveLength(1);
    await sut.update(box.id, { battery: 0.5 });
    expect(await sut.get(box.id)).toEqual({
      ...box,
      battery: 0.5,
    });
    await sut.delete(box.id);
    expect(await sut.getAll()).toHaveLength(1);
    expect(await sut.getAllActive()).toHaveLength(0);
  });
});
