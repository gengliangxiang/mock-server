import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as KJUR from 'jsrsasign';

import * as NodeRSA from 'node-rsa';

const key = new NodeRSA({ b: 512 });
key.setOptions({ encryptionScheme: 'pkcs1' });
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

@Injectable()
export default class AppService {
	getHello(): string {
		return 'Hello World!';
	}
	decryptData(word, key) {
		const crypto = KJUR.KJUR.crypto as any;
		const aesKey = CryptoJS.enc.Utf8.parse(
			KJUR.b64utos(crypto.Cipher.decrypt(KJUR.b64utohex(key), KJUR.KEYUTIL.getKey(privateKey)))
		);
		const aesParams = {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		};
		const decrypted = CryptoJS.AES.decrypt(word, aesKey, aesParams);
		return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
	}
	static get publicKey(): string {
		return publicKey;
	}
	get publicKey(): string {
		return publicKey;
	}
	static get privateKey(): string {
		return privateKey;
	}
}
