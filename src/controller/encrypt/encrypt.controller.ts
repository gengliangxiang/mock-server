import { Controller, Post, Get, HttpCode } from '@nestjs/common';
import { AppService } from '../../service/app.service';

@Controller('encrypt')
export class Encrypt {
	constructor(private readonly appService: AppService) {}
	@Get('publicKey')
	@HttpCode(200)
	get(): Object {
		const publicKey = this.appService.getPublicKey();
		return {
			responseCode: '200',
			responseMessage: '操作成功',
			responseData: { publicKey },
		};
	}

	@Post('publicKey')
	@HttpCode(200)
	post(): Object {
		const publicKey = this.appService.getPublicKey();
		return {
			responseCode: '200',
			responseMessage: '操作成功',
			responseData: { publicKey },
		};
	}
}
