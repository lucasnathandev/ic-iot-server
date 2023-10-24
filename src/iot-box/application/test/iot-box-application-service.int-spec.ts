import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';
import { IotBoxRepositoryMemory } from 'src/iot-box/infraestructure/repositories/in-memory-iot-box.repository';
import { IotBoxApplicationService } from '../service/iot-box.application-service';
import { BatteryStatus } from 'src/iot-box/domain/entities/interfaces/enum.battery-status';

describe('IotBoxApplicationService integration tests', () => {
  let sut: IotBoxApplicationService;
  let iotBoxRepository: IotBoxRepository;

  beforeEach(() => {
    iotBoxRepository = new IotBoxRepositoryMemory();
    sut = new IotBoxApplicationService(iotBoxRepository);
  });

  it('should run methods correctly', async () => {
    const box = new IotBoxEntity(
      {
        name: 'Box',
        sensors: {
          gps: {
            latitude: 1,
            longitude: 1,
          },
        },
      },
      'boxid',
    );

    await sut.createBox(box);

    const foundBox = await sut.getBox('boxid');
    const foundByNameBox = await sut.getBoxByName('Box');
    await expect(sut.getBox('anyboxid')).rejects.toThrow();
    await expect(sut.getBoxByName('anyboxname')).rejects.toThrow();
    await expect(sut.createBox({} as any)).rejects.toThrow();
    await expect(sut.updateBoxSensors('anyboxid', {} as any)).rejects.toThrow();
    await expect(sut.updateBatteryStatus('anyboxid', 0.5)).rejects.toThrow();
    expect(foundBox).toEqual(box);
    expect(foundByNameBox).toEqual(box);
    await sut.updateBatteryStatus(box.id, 0.15);
    expect(box.getBatteryStatus()).toBe(BatteryStatus.Low);
    await sut.updateBatteryStatus(box.id, 0.6);
    expect(box.getBatteryStatus()).toBe(BatteryStatus.Medium);
    await sut.updateBoxSensors(box.id, {
      gps: { latitude: 2, longitude: -10 },
    });
    expect(box.sensors.gps.latitude).toBe(2);
    expect(box.sensors.gps.longitude).toBe(-10);
  });
});
