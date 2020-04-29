import base64js from 'base64-js';
import {
    createZlQrCodeForFlapDoor,
    createECardQrcode,
    createWeiGenV2QrCode,
    createZlQrCode,
    createZlQrCodeForFlapDoorNew,
} from './createFns';

enum DoorAccessTypes {
    ZLACLINK_WIFI = 0,
    ZLACLINK_NOWIFI = 1,
    ACLINK_ZL_GROUP = 5,
    ACLINK_LINGLING_GROUP = 6,
    FACEPLUSPLUS = 7,
    DINGXIN = 8,
    DASHI = 9,
    WEIGEN = 10,
    ACLINK_LINGLING = 11,
    ACLINK_HUARUN_GROUP = 12,
    ACLINK_WANGLONG = 13,
    ACLINK_WANGLONG_GROUP = 14,
    ACLINK_WANGLONG_DOOR = 15,
    ACLINK_WANGLONG_DOOR_GROUP = 16,
    ACLINK_BUS = 17,
    ACLINK_UCLBRT_DOOR = 18,
    ZUOLIN_V3 = 19,
    VANZHIHUI = 20,
    WUJING = 21,
    ZLACLINK_UNION = 22,
    HAIKANG_GROUP = 23,
    HUAKE_GROUP = 24,
    FUSHI = 25,
    MOREDIAN = 26,
    DAOER = 27,
    CHENGZHI = 28,
    WEIGEN_UNION = 29,
    YUNTIAN = 30,
}

export interface QRInfo {
    qrCodeKey: string;
    qrDriver: string;
    doorType: number;
    currentTime?: number;
    qrImageTimeout?: number;
    expireTimeMs?: number;
}

export interface Params {
    /** 门禁参数 */
    qrInfo: QRInfo;
    /** 类型，场景有小程序一卡通，临时授权二维码 */
    type?: 'ecard';
    /** 域空间，目前就一个yuespace需要特殊处理 */
    namespace?: 'yuespace';
}

/**
 * 根据门禁信息做特定转义处理后返回string
 *
 * @param {Params} { qrInfo, type, namespace } - 门禁信息，type可能是一卡通，namespace可能是越空间
 * @returns {string}
 */
const createQrCode = ({ qrInfo, type, namespace }: Params): string => {
    const { qrCodeKey, qrDriver, currentTime, qrImageTimeout, doorType, expireTimeMs } = qrInfo;

    let qrCodeByteArr = new Uint8Array([]);
    try {
        qrCodeByteArr = base64js.toByteArray(qrCodeKey);
    } catch (error) {
        console.log(error);
    }
    const doorAccessType = DoorAccessTypes[doorType];
    let qrCodeBase64 = '';

    switch (qrDriver) {
        case 'zuolin':
            if (
                doorAccessType === 'ZLACLINK_WIFI' ||
                doorAccessType === 'ZLACLINK_NOWIFI' ||
                doorAccessType === 'ACLINK_ZL_GROUP'
            ) {
                // "ZUOLIN"版本老门禁处理
                qrCodeBase64 = createZlQrCode(qrCodeByteArr);
            } else if (
                doorAccessType === 'ZUOLIN_V3' ||
                doorAccessType === 'ZLACLINK_UNION' ||
                doorAccessType === 'WEIGEN_UNION' ||
                doorAccessType === 'WEIGEN'
            ) {
                // "ZUOLIN"版本新门禁处理
                qrCodeBase64 = qrCodeKey;
            }
            break;
        case 'zuolin_v2':
            if (
                doorAccessType === 'ZLACLINK_WIFI' ||
                doorAccessType === 'ZLACLINK_NOWIFI' ||
                doorAccessType === 'ACLINK_ZL_GROUP'
            ) {
                // "ZUOLIN_V2"版本老门禁处理
                qrCodeBase64 = createZlQrCodeForFlapDoor(qrCodeByteArr, Date.now(), qrImageTimeout!);
            } else if (doorAccessType === 'ZUOLIN_V3' || doorAccessType === 'ZLACLINK_UNION') {
                // "ZUOLIN_V2"版本新门禁处理
                qrCodeBase64 = createZlQrCodeForFlapDoorNew(qrCodeByteArr, currentTime!, qrImageTimeout!, namespace!);
            } else if (doorAccessType === 'WEIGEN_UNION' || doorAccessType === 'WEIGEN') {
                qrCodeBase64 = createWeiGenV2QrCode(qrCodeByteArr, currentTime!, expireTimeMs!);
            }
            break;
        default:
            // 其他直接返回
            qrCodeBase64 = qrCodeKey;
            break;
    }

    // 如果是一码通的话返回的字节流，单单门禁的话直接转成base64
    return type === 'ecard' ? createECardQrcode(qrCodeBase64) : qrCodeBase64;
};

export default createQrCode;
