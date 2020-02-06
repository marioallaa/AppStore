import { Test, TestingModule } from '@nestjs/testing';
import { DeliveringsController } from './deliverings.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeliveringService } from './delivering.service';
import { Delivering } from './delivering.entity';

const MockRepository = jest.fn().mockImplementation(() => { });
const mockRepository = new MockRepository();

describe('Deliverings Controller', () => {
  let controller: DeliveringsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveringsController],
      providers: [
        DeliveringService,
        { provide: getRepositoryToken(Delivering), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<DeliveringsController>(DeliveringsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
