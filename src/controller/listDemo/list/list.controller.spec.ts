import { Test, TestingModule } from '@nestjs/testing';
import { ListDemo } from './list.controller';

describe('Detail Controller', () => {
	let controller: ListDemo;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ListDemo],
		}).compile();

		controller = module.get<ListDemo>(ListDemo);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
