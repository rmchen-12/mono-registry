import base64js from 'base64-js';
import CryptoJSNoPadding from 'crypto-js/pad-nopadding';
import CryptoJSModeCFB from 'crypto-js/mode-cfb';
import AES from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';

function intToByteArray(i: number): Uint8Array {
    const result = new Uint8Array(4).fill(0);
    //由高位到低位
    result[0] = (i >> 24) & 0xff;
    result[1] = (i >> 16) & 0xff;
    result[2] = (i >> 8) & 0xff;
    result[3] = i & 0xff;
    return result;
}

function intToByteArrayLittleEndian(i: number): Uint8Array {
    const result = new Uint8Array(4).fill(0);
    //由低位到高位
    result[3] = (i >> 24) & 0xff;
    result[2] = (i >> 16) & 0xff;
    result[1] = (i >> 8) & 0xff;
    result[0] = i & 0xff;
    return result;
}

function shortToByteArray(i: number): Uint8Array {
    const result = new Uint8Array(2).fill(0);
    //由高位到低位
    result[0] = (i >> 8) & 0xff;
    result[1] = i & 0xff;
    return result;
}

function xorResult(srcData: Uint8Array): Uint8Array {
    const key = 'thisjustfortime!';
    const keyData = getBytes(key);
    if (null == srcData || null == keyData) {
        return srcData;
    }
    const resData = new Uint8Array(srcData.length).fill(0);
    for (let i = 0; i < srcData.length; i++) {
        resData[i] = srcData[i] ^ keyData[i];
    }
    return resData;
}

function getAESEncryptCurTime(
    currentTimeByteArr: Uint8Array,
    expiredTimeByteArr: Uint8Array,
    timeByteArr: Uint8Array,
): string {
    const aesPadding = getBytes('zuolinqr');
    const aesKey = Base64.parse(
        base64js.fromByteArray(new Uint8Array([...currentTimeByteArr, ...expiredTimeByteArr, ...aesPadding])),
    );

    const data = Base64.parse(base64js.fromByteArray(timeByteArr));
    const iv = Base64.parse(
        base64js.fromByteArray(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])),
    );

    const encrypted = AES.encrypt(data, aesKey, {
        iv,
        mode: CryptoJSModeCFB,
        padding: CryptoJSNoPadding,
    });

    return encrypted.toString();
}

function getBytes(string: string): Uint8Array {
    const utf8 = unescape(encodeURIComponent(string));
    const arr = [];
    for (let i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return new Uint8Array(arr);
}

function getCheckSum(data1: Uint8Array, data2: Uint8Array): number {
    let sum = 0;
    for (let i = 0; i < data1.length; i++) {
        sum += data1[i] & 0xff;
    }
    for (let i = 0; i < data2.length; i++) {
        sum += data2[i] & 0xff;
    }
    return sum;
}

export {
    intToByteArray,
    shortToByteArray,
    xorResult,
    getBytes,
    intToByteArrayLittleEndian,
    getAESEncryptCurTime,
    getCheckSum,
};
