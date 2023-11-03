import { BoxDataEntity } from '../box-data.entity';
import { BoxDataProps } from '../interfaces/box-data-props.interface';

describe('BoxData unit tests', () => {
  let sut: BoxDataEntity;
  const data: BoxDataProps = {
    battery: 0.5,
    date: new Date(),
    sensors: { gps: { latitude: 22.3, longitude: -45.321 } },
    time: '14:04',
    boxId: 'fakeboxid',
  };

  it('properties should have correct values', () => {
    sut = new BoxDataEntity(data, '123');

    expect(sut.battery).toBe(data.battery);
    expect(sut.date).toBe(data.date);
    expect(sut.time).toBe(data.time);
    expect(sut.sensors).toStrictEqual(data.sensors);
  });

  it('should run methods correctly', () => {
    sut = new BoxDataEntity(data, 'anyid');

    const { createdAt: _, ...allBoxData } = sut.getBoxData();

    expect(allBoxData).toStrictEqual({
      ...data,
      id: 'anyid',
    });
  });
});
