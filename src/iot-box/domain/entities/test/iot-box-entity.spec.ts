import { BoxDataEntity } from '../box-data.entity';
import { IGPS } from '../interfaces/gps.interface';
import { ISensorFields } from '../interfaces/sensor-fields.interface';
import { IotBoxEntity } from '../iot-box.entity';

describe('IotBoxEntity unit tests', () => {
  let sut: IotBoxEntity;

  it('should run methods correctly', () => {
    sut = new IotBoxEntity(
      {
        name: 'Box2',
        sensors: { gps: { latitude: 44.02, longitude: 24.04 } },
      },
      'someboxid',
    );

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
    sut.inactivateBox();
    expect(sut.isActive).toBe(false);
    sut.activateBox();
    expect(sut.isActive).toBe(true);
    sut.updateBatteryStatus(0.5);
    expect(sut.getBatteryStatus()).toBe('Medium');

    const stubBoxData = new BoxDataEntity(
      {
        battery: 0.5,
        date: new Date(),
        time: '12:30',
        sensors: {
          gps: {
            latitude: 35.5,
            longitude: -100.321,
          },
        },
        boxId: 'fakeboxid',
      },
      'asd',
    );

    expect(sut.getAllBoxData()).toHaveLength(0);
    sut.registerBoxData(stubBoxData);

    expect(sut.getAllBoxData()[0]).toContain(stubBoxData.getBoxData());
    expect(sut.getBoxData(stubBoxData.id));
    expect(sut.getFilteredBoxData({ startDate: new Date(0) })[0]).toContain(
      stubBoxData.getBoxData(),
    );

    expect(sut.getIotBoxData()).toStrictEqual({
      id: sut.id,
      ...sut['props'],
      batteryStatus: sut.getBatteryStatus(),
      battery: sut['battery'],
      boxData: sut.getAllBoxData(),
      createdAt: sut.createdAt,
      updatedAt: sut.updatedAt,
    });
  });
});
