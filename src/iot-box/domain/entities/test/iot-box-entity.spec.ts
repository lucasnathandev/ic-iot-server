import { IGPS } from '../interfaces/gps.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should initialize correctly', () => {
    sut = new IotBoxEntity({
      battery: 0.5,
      date: new Date(),
      hourTime: '14:02',
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
    });

    expect(sut).toHaveProperty('id');
    expect(sut.props).toHaveProperty('battery');
    expect(sut.props).toHaveProperty('date');
    expect(sut.props).toHaveProperty('hourTime');
    expect(sut.props).toHaveProperty('sensors');
  });

  it('should run getters and setters correctly', () => {
    sut = new IotBoxEntity(
      {
        battery: 0.7,
        date: new Date(),
        hourTime: '15:00',
        sensors: { gps: { latitude: 20.03, longitude: 34.045 } },
        customerId: 'fakecustomerid',
      },
      'fakeuuid',
    );

    sut.battery = 1;
    sut.date = new Date('1990-10-10');
    sut.hourTime = '16:00';
    sut.sensors = { gps: { latitude: 10.02, longitude: 20.34 } };

    expect(sut.id).toBe('fakeuuid');
    expect(sut.battery).toBe(1);
    expect(sut.date).toStrictEqual(new Date('1990-10-10'));
    expect(sut.hourTime).toBe('16:00');
    expect(sut.sensors).toStrictEqual({
      gps: { latitude: 10.02, longitude: 20.34 },
    });
    expect(sut.customerId).toBe('fakecustomerid');
  });

  it('should run methods correctly', () => {
    sut = new IotBoxEntity({
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
