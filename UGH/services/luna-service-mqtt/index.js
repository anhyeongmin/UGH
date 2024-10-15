const { Service } = require('webos-service');
const mqtt = require('async-mqtt');

const service = new Service('com.domain.ugh.mqtt');
let mqttClient = null;

// MQTT 연결 함수
const connectMqtt = async () => {
    try {
        mqttClient = await mqtt.connectAsync('mqtt://192.168.0.21:1883'); // TOPST 보드 IP 주소
        console.log('MQTT 연결 성공');
    } catch (error) {
        console.error('MQTT 연결 오류:', error);
    }
};

// MQTT 연결 요청 메서드 등록
service.register('connect', async (message) => {
    try {
        await connectMqtt();
        message.respond({ returnValue: true, message: 'MQTT 연결 성공' });
    } catch (error) {
        message.respond({ returnValue: false, errorText: 'MQTT 연결 실패', error });
    }
});

// MQTT 연결 해제 메서드 등록
service.register('disconnect', async (message) => {
    if (mqttClient) {
        try {
            await mqttClient.end();
            mqttClient = null;
            message.respond({ returnValue: true, message: 'MQTT 연결 해제 성공' });
        } catch (error) {
            message.respond({ returnValue: false, errorText: 'MQTT 연결 해제 실패', error });
        }
    } else {
        message.respond({ returnValue: false, errorText: '연결된 MQTT 클라이언트가 없습니다.' });
    }
});

// 메시지 발행 메서드 등록
service.register('publish', async (message) => {
    if (mqttClient) {
        const { topic, payload } = message.payload;
        try {
            await mqttClient.publish(topic, payload);
            message.respond({ returnValue: true, message: '메시지 전송 성공' });
        } catch (error) {
            message.respond({ returnValue: false, errorText: '메시지 전송 오류', error });
        }
    } else {
        message.respond({ returnValue: false, errorText: 'MQTT 연결되지 않음' });
    }
});
