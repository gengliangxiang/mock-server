import { Controller, Post, Get, HttpCode, Body, Query, Headers } from '@nestjs/common';
import * as Mock from 'mockjs';
import * as dayjs from 'dayjs';
import AppService from '../../../service/app.service';

const { Random } = Mock;
const list = Mock.mock({
	'records|50-70': [
		{
			'id|+1': 1,
			mId: '@id',
			user: '@cname',
			phone: /^1[356789][1-9]\d{8}/,
			company: '@ctitle',
			date: '@date',
			'status|1': ['0', '1', '2'],
			open: '@word',
			channel: '@word',
			pdNm: '@ctitle',
			address: () => Random.province() + Random.city() + Random.county(),
		},
	],
});
@Controller('listDemo')
export class ListDemo {
	constructor(private readonly appService: AppService) {}
	@Get('test')
	@HttpCode(200)
	get(@Body() body): Object {
		return {
			key: '23333444',
		};
	}

	@Get('list')
	@HttpCode(200)
	getList(@Query() body, @Headers() header): Object {
		const params = body;
		console.log(params);
		const size = params.pageSize || 10;
		const pages = params.pageNum || 1;
		const start = size * (pages - 1);
		const end = size * pages;
		const { status } = params;
		let records = [];
		let total = list.records.length;
		if (!params.status && params.status !== 0) {
			records = list.records.slice(start, end);
		} else {
			total = list.records.filter((item) => item.status == status).length;
			records = list.records.filter((item) => item.status == status).slice(start, end);
		}
		const data = {
			responseCode: '200',
			responseMessage: '操作成功',
			timestamp: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			responseData: {
				total,
				size,
				pages,
				current: pages,
				records,
			},
		};

		return data;
	}
	@Post('list')
	@HttpCode(200)
	postList(@Body() body, @Headers() header): Object {
		const params = this.appService.decryptData(body.data, header.aeskey);
		console.log('请求参数:', body);
		console.log('解密后参数:', params);
		const size = params.pageSize || 10;
		const pages = params.pageNum || 1;
		const start = size * (pages - 1);
		const end = size * pages;
		const { status } = params;
		let records = [];
		let total = list.records.length;
		if (!params.status && params.status !== 0) {
			records = list.records.slice(start, end);
		} else {
			total = list.records.filter((item) => item.status == status).length;
			records = list.records.filter((item) => item.status == status).slice(start, end);
		}
		const data = {
			responseCode: '200',
			responseMessage: '操作成功',
			responseData: {
				total,
				size,
				pages,
				current: pages,
				records,
			},
		};

		return data;
	}
}
