import { IGPS } from '../interfaces/gps.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should initialize correctly', () => {
    sut = new IotBoxEntity({
      id: 'aiosjdioa12',
      battery: 0.5,
      date: new Date(),
      hourTime: '14:02',
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
    });

    expect(sut.props).toHaveProperty('id');
    expect(sut.props).toHaveProperty('battery');
    expect(sut.props).toHaveProperty('date');
    expect(sut.props).toHaveProperty('hourTime');
    expect(sut.props).toHaveProperty('sensors');
  });

  it('should run methods correctly', () => {
    sut = new IotBoxEntity({
      id: 'aiosjdioa12',
      battery: 0.5,
      date: new Date(),
      hourTime: '14:02',
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
    });
    const coordinates: IGPS = {
      latitude: 25.0205,
      longitude: 30.3456,
    };

    sut.updateGPSLocation(coordinates);

    expect(sut.props.sensors.gps).toStrictEqual(coordinates);
  });
});
