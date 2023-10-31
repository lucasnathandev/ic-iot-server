import { IotBoxRepositoryMemory } from 'src/iot-box/infraestructure/repositories/in-memory-iot-box.repository';

class IotBoxDatabase {
  constructor() {
    this.iotBoxRepository = new IotBoxRepositoryMemory();
  }

  public readonly iotBoxRepository: IotBoxRepositoryMemory;
}

export default new IotBoxDatabase();
