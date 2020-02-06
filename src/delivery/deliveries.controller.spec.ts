import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeliveryService } from './delivery.service';
import { Delivery } from './delivery.entity';

const MockRepository = jest.fn().mockImplementation(() => { });
const mockRepository = new MockRepository();

describe('DeliveriesController', () => {
  let controller: DeliveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [
        DeliveryService,
        { provide: getRepositoryToken(Delivery), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
