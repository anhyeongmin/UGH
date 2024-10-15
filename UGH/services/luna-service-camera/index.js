const { Service } = require('webos-service');

const service = new Service('com.domain.ugh.camera');

// 카메라 상태 확인
service.register('getCameraStatus', (message) => {
    service.call('luna://com.webos.service.camera2/getCameraCapabilities', { id: 'com.domain.ugh' }, (res) => {
        if (res.payload && res.payload.returnValue && res.payload.cameras && res.payload.cameras.length > 0) {
            message.respond({ returnValue: true, cameras: res.payload.cameras });
        } else {
            message.respond({ returnValue: false, errorText: '카메라가 연결되지 않음' });
        }
    });
});

// 카메라 미리보기 시작
service.register('startPreview', (message) => {
    const { id, source } = message.payload;

    service.call('luna://com.webos.service.camera2/startPreview', {
        id,
        source,
        format: 'jpeg',
        mode: 'video',
        type: 'sharedmemory'
    }, (res) => {
        if (res.payload && res.payload.returnValue && res.payload.uri) {
            message.respond({ returnValue: true, uri: res.payload.uri, handle: res.payload.handle });
        } else {
            message.respond({ returnValue: false, errorText: '카메라 미리보기 시작 실패' });
        }
    });
});

// 카메라 미리보기 중지
service.register('stopPreview', (message) => {
    const { handle } = message.payload;

    service.call('luna://com.webos.service.camera2/stopPreview', { handle }, (res) => {
        if (res.payload && res.payload.returnValue) {
            message.respond({ returnValue: true });
        } else {
            message.respond({ returnValue: false, errorText: '카메라 미리보기 중지 실패' });
        }
    });
});
