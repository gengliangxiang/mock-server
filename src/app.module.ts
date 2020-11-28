import { Module } from '@nestjs/common';
import { Encrypt } from './controller/encrypt/encrypt.controller';
import { ListDemo } from './controller/listDemo/list/list.controller';
import { AppService } from './service/app.service';

@Module({
	imports: [],
	controllers: [Encrypt, ListDemo],
	providers: [AppService],
})
export class AppModule {}
