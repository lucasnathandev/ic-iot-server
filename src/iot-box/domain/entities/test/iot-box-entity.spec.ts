import { IGPS } from '../interfaces/gps.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

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
    expect(sut.sensors.acceleration).toBe(10);
    expect(sut.updatedAt.getTime()).toBeGreaterThan(updatedAt.getTime());
  });
});
