import base64js from 'base64-js';
import {
    intToByteArray,
    shortToByteArray,
    xorResult,
    intToByteArrayLittleEndian,
    getAESEncryptCurTime,
    getCheckSum,
} from './utils';

// ZUOLIN_V2"版本老门禁处理
function createZlQrCodeForFlapDoor(qrArr: Uint8Array, curTime: number, qrImagePeriod: number): string {
    const type = [0, 1];
    const cmdArr = [9, 0];
    const currTimeArr = intToByteArray(parseInt(String(curTime / 1000)));
    const imageTimeout = parseInt(String((curTime + qrImagePeriod) / 1000));
    const imageTimeArr = intToByteArray(imageTimeout);
    const checkSum = getCheckSum(currTimeArr, imageTimeArr);
    const checkSumArr = shortToByteArray(checkSum);
    const randomArr = new Array(8).fill(0);
    if (null != checkSumArr && checkSumArr.length == 2) {
        randomArr[0] = checkSumArr[0];
        randomArr[1] = checkSumArr[1];
    }

    let encryptArr = new Uint8Array([...currTimeArr, ...imageTimeArr, ...randomArr]);
    encryptArr = xorResult(encryptArr);
    const lengthArr = shortToByteArray(cmdArr.length + qrArr.length + encryptArr.length);
    const resultArr = new Uint8Array([
        ...type,
        ...lengthArr,
        ...cmdArr,
        ...qrArr,
        ...encryptArr,
        ...intToByteArray(parseInt(String(Date.now() / 1000))),
    ]);

    const resultCode = base64js.fromByteArray(resultArr);
    return resultCode;
}

// "ZUOLIN"版本老门禁处理
function createZlQrCode(qrCodeByteArr: Uint8Array): string {
    const type = [0, 1];
    const cmdArr = [8, 0];
    const lengthArr = shortToByteArray(qrCodeByteArr.length + cmdArr.length);
    const timeArr = intToByteArray(parseInt(String(Date.now() / 1000)));

    return base64js.fromByteArray(new Uint8Array([...type, ...lengthArr, ...cmdArr, ...qrCodeByteArr, ...timeArr]));
}

// "ZUOLIN_V2"版本新门禁处理
function createZlQrCodeForFlapDoorNew(
    qrCodeByteArr: Uint8Array,
    currentTime: number,
    qrImageTimeout: number,
    namespace: string,
): string {
    const cmd = parseInt('03', 16);
    const len = shortToByteArray(qrCodeByteArr.length + 5);
    const data = qrCodeByteArr.slice(3);
    const currentTimeByteArr = intToByteArray(parseInt(String(currentTime / 1000)));
    const expiredTimeByteArr = intToByteArray(parseInt(String((qrImageTimeout + currentTime) / 1000)));

    const encryptArr = new Uint8Array([...currentTimeByteArr, ...expiredTimeByteArr]);
    const encryptArrXor = xorResult(encryptArr);
    const result =
        namespace === 'yuespace'
            ? new Uint8Array([cmd, ...len, ...data, ...encryptArrXor])
            : new Uint8Array([cmd, ...len, ...data, ...encryptArr]);

    return base64js.fromByteArray(result);
}

// 微耕门禁处理
function createWeiGenV2QrCode(qrCodeByteArr: Uint8Array, currentTime: number, expireTimeMs: number): string {
    const currentTimeByteArr = intToByteArrayLittleEndian(parseInt(String(currentTime / 1000)));
    const expiredTimeByteArr = intToByteArrayLittleEndian(parseInt(String(expireTimeMs / 1000)));
    const timeByteArr = intToByteArrayLittleEndian(parseInt(String(Date.now() / 1000)));

    const aesEncryCurTime = base64js.toByteArray(
        getAESEncryptCurTime(currentTimeByteArr, expiredTimeByteArr, timeByteArr),
    );

    return base64js.fromByteArray(new Uint8Array([...qrCodeByteArr, ...aesEncryCurTime]));
}

// 一卡通版本门禁处理
function createECardQrcode(qrCodeKey: string): string {
    const qrCodeByteArr = base64js.toByteArray(qrCodeKey);
    const cmd = parseInt('02', 16);
    const len = parseInt(String(qrCodeByteArr.length), 10);

    return base64js.fromByteArray(new Uint8Array([cmd, len, ...qrCodeByteArr]));
}

export {
    createZlQrCodeForFlapDoor,
    createECardQrcode,
    createWeiGenV2QrCode,
    createZlQrCode,
    createZlQrCodeForFlapDoorNew,
};
