import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from './repository';

describe('Repository', () => {
  let repository: Repository<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Repository],
    }).compile();

    repository = module.get<Repository<any>>(Repository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
