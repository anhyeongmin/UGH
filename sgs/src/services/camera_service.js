import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

export const startCameraPreview = (onSuccess, onFailure) => {
    const params = {
        "id": "camera1",  // 정확한 카메라 ID로 변경 필요
        "type": "video",
        "width": 640,
        "height": 480
    };

    const lsRequest = {
        "service": "luna://com.webos.service.camera2",
        "method": "startPreview",
        "parameters": params,
        "onSuccess": onSuccess,
        "onFailure": onFailure
    };

    webOSBridge.send(lsRequest);
};
