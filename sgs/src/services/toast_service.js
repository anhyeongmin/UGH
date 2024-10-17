import LS2Request from '@enact/webos/LS2Request';

const webOSBridge = new LS2Request();

export const showToast = (message, onSuccess, onFailure) => {
    var params = {
        "message": message  
    };

    var lsRequest = {
        "service": "luna://com.farm.app.service",
        "method": "showToast",
        "parameters": params,
        "onSuccess": onSuccess,
        "onFailure": onFailure
    };

    webOSBridge.send(lsRequest);
};
