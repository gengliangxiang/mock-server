import * as CryptoJS from 'crypto-js';
import * as KJUR from 'jsrsasign';
import AppService from '../service/app.service';

const {privateKey} = AppService;

export const decryptData = (word, key) => {
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
};
