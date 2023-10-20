import { IGPS } from '../interfaces/gps.interface';
import { ISensorFields } from '../interfaces/sensor-fields.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should run methods correctly', () => {
    sut = new IotBoxEntity({
      name: 'Box2',
      battery: 0.5,
      sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
    });

    expect(sut.customerId).toBeUndefined();

    sut.setBoxOwnerId('fakecustomerid');

    expect(sut.customerId).toBe('fakecustomerid');

    const coordinates: IGPS = {
      latitude: 25.0205,
      longitude: 30.3456,
    };
    const updatedAt = new Date(sut.updatedAt.toString());

    sut.updateGPSLocation(coordinates);

    const sensorUpdatedValues: Partial<ISensorFields> = {
      acceleration: 10,
    };

    expect(sut.sensors).toStrictEqual({
      gps: coordinates,
    });

    sut.updateAllSensors(sensorUpdatedValues);

    expect(sut.sensors.gps).toStrictEqual(coordinates);
    expect(sut.sensors).toStrictEqual({
      gps: coordinates,
      ...sensorUpdatedValues,
    });
    expect(sut.updatedAt.getTime()).toBeGreaterThan(updatedAt.getTime());

    sut.unbindOwnerCustomer();

    expect(sut.customerId).toBeNull();
  });
});
