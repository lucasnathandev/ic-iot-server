import { IGPS } from '../interfaces/gps.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should initialize correctly', () => {
    sut = new IotBoxEntity({
      battery: 0.5,
      name: 'Box test',
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
      customerId: 'fakecustomerid',
    });

    expect(sut).toHaveProperty('id');
    expect(sut).toHaveProperty('battery');
    expect(sut).toHaveProperty('name');
    expect(sut).toHaveProperty('sensors');
    expect(sut).toHaveProperty('customerId');
  });

  it('should run getters and setters correctly', () => {
    sut = new IotBoxEntity(
      {
        name: 'Box test',
        battery: 0.7,
        sensors: { gps: { latitude: 20.03, longitude: 34.045 } },
        customerId: 'fakecustomerid',
      },
      'fakeuuid',
    );

    sut.battery = 1;
    sut.name = 'Box1';
    sut.sensors = { gps: { latitude: 10.02, longitude: 20.34 } };

    expect(sut.id).toBe('fakeuuid');
    expect(sut.battery).toBe(1);
    expect(sut.name).toBe('Box1');

    expect(sut.sensors).toStrictEqual({
      gps: { latitude: 10.02, longitude: 20.34 },
    });
    expect(sut.customerId).toBe('fakecustomerid');
    expect(sut.updatedAt).toBeDefined();
  });

  it('should run methods correctly', () => {
    sut = new IotBoxEntity({
      name: 'Box2',
      battery: 0.5,
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
      customerId: 'fakecustomerid',
    });
    const coordinates: IGPS = {
      latitude: 25.0205,
      longitude: 30.3456,
    };
    const updatedAt = new Date(sut.updatedAt.toString());

    sut.updateGPSLocation(coordinates);

    sut.updateAllSensors({ acceleration: 10 });

    expect(sut.sensors.gps).toStrictEqual(coordinates);
    expect(sut.updatedAt.getTime()).toBeGreaterThan(updatedAt.getTime());
  });
});
