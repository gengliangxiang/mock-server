import { Test, TestingModule } from '@nestjs/testing';
import { Encrypt } from './encrypt.controller';

describe('Detail Controller', () => {
	let controller: Encrypt;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [Encrypt],
		}).compile();

		controller = module.get<Encrypt>(Encrypt);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
