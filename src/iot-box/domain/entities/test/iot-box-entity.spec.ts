import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should initialize correctly', () => {
    sut = new IotBoxEntity({
      id: 'aiosjdioa12',
      battery: 0.5,
      date: new Date(),
      hourTime: '14:02',
      sensors: { GPS: { latitude: 44.02, longitude: 24.04 } },
    });

    expect(sut.props).toHaveProperty('id');
    expect(sut.props).toHaveProperty('battery');
    expect(sut.props).toHaveProperty('date');
    expect(sut.props).toHaveProperty('hourTime');
    expect(sut.props).toHaveProperty('sensors');
  });
});
