import { BoxDataEntity } from '../box-data.entity';
import { BoxDataProps } from '../interfaces/box-data.interface';

describe('BoxData unit tests', () => {
  let sut: BoxDataEntity;
  const data: BoxDataProps = {
    battery: 0.5,
    date: new Date(),
    sensors: { gps: { latitude: 22.3, longitude: -45.321 } },
    time: '14:04',
    boxId: 'fakeboxid',
  };
  it('should have properties defined', () => {
    sut = new BoxDataEntity(data, 'asdas');

    expect(sut.battery).toBeDefined();
    expect(sut.date).toBeDefined();
    expect(sut.time).toBeDefined();
    expect(sut.sensors).toBeDefined();
  });

  it('properties should have correct values', () => {
    sut = new BoxDataEntity(data, '123');

    expect(sut.battery).toBe(data.battery);
    expect(sut.date).toBe(data.date);
    expect(sut.time).toBe(data.time);
    expect(sut.sensors).toStrictEqual(data.sensors);
  });
});
