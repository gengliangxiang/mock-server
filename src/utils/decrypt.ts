import * as CryptoJS from 'crypto-js';
import * as KJUR from 'jsrsasign';

const privateKey =
	'-----BEGIN RSA PRIVATE KEY----- MIIBOgIBAAJBAIPRjmUNbwc1tdN+dNKwUI7JW8MiqgG2g/0T+ktgsdwYNEVo+ZAw SkR/9qVjJol9YJkQUYVvDy6/UFBcL7Up8/UCAwEAAQJAc6hERgnZZvwLQzvrCIlG xWGLL9WUUNhxSnZi4AxBQhh77dR5/Xd6rg5EIGWTrQ9xAvNpHaQ5UjpY7EBNYHw+ qQIhANg3rZfi7kz8GHp+WJGKHMJa+gpNQFFvCiS5hgYgmj9rAiEAnBKAsiJJMS15 ZipdJhqVS0pvXyhhf7QZKpkjI7WEUh8CIHJlMvEzXYVZs9HLWyzVd9XUsIoWyTrM lv9LMP+47CM1AiEAgCb9P8fBW70gQtCkXeZUEleTbYplzItgYscNwIOKnDcCIBPY EvVrV2k+mrVBhm5O+dCsJ8W2KindfhynBu1EU4aI -----END RSA PRIVATE KEY-----';

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
