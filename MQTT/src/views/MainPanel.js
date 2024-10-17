import kind from '@enact/core/kind';
import { Header, Panel } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import mqtt from 'mqtt';

let client;
const mqttIP = '192.168.0.21:1883'; // MQTT IP 주소 설정
let isConnected = false; // MQTT 연결 상태 플래그
let isNetworkAvailable = false; // 네트워크 연결 상태 플래그

const checkNetworkConnection = () => {
    // Fetch API를 사용하여 네트워크 연결 확인
    fetch('http://www.google.com', { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            isNetworkAvailable = true; // 네트워크 연결됨
            console.log('네트워크 상태: 연결됨');
        })
        .catch(() => {
            isNetworkAvailable = false; // 네트워크 연결 안 됨
            console.log('네트워크 상태: 연결되지 않음');
        })
        .finally(() => {
            // 5초 후 다시 체크
            setTimeout(checkNetworkConnection, 5000);
        });
};

// MQTT 브로커 연결 시도
const connectMQTT = () => {
    console.log(`Connecting to MQTT broker at ${mqttIP}`); // IP 출력
    client = mqtt.connect(`mqtt://${mqttIP}`);

    // MQTT 연결 설정
    client.on('connect', () => {
        isConnected = true;
        console.log('MQTT connected');
    });

    // 연결 실패 시 이벤트 처리
    client.on('error', (error) => {
        isConnected = false;
        console.log('MQTT 연결 실패. 재연결 시도 중...', error);
        tryReconnect(); // 연결 실패 시 재연결 시도
    });

    // 연결이 끊길 때 이벤트 처리
    client.on('offline', () => {
        isConnected = false;
        console.log('MQTT 연결이 끊겼습니다.');
        tryReconnect(); // 연결 끊김 시 재연결 시도
    });
};

// 연결 실패 시 5초마다 재시도
const tryReconnect = () => {
    console.log('MQTT 연결 실패. 5초 후 재시도합니다.');
    setTimeout(() => {
        connectMQTT(); // 재연결 시도
    }, 5000);
};

// 최초 연결 시도
connectMQTT();
checkNetworkConnection(); // 네트워크 연결 확인

const MainPanel = kind({
    name: 'MainPanel',

    handlers: {
        handleClick: () => {
            // 버튼 클릭 시 MQTT 메시지 전송
            if (client && client.connected) {
                client.publish('JIG', 'Hello from webOS');
                console.log('Message sent to MQTT broker');
            } else {
                console.log('MQTT 연결이 되지 않았습니다.');
            }
        }
    },

    render: ({ handleClick, ...rest }) => (
        <Panel {...rest}>
            <Header subtitle="MQTT 테스트용" title="MQTT Sample" type="compact" />
            <Button onClick={handleClick}>
                Send MQTT Message
            </Button>
            <div>
                {isNetworkAvailable ? '네트워크 상태: 연결됨' : '네트워크 상태: 연결되지 않음'}
            </div>
            <div>
                {isConnected ? 'MQTT 연결 상태: 연결됨' : 'MQTT 연결 상태: 연결되지 않음'}
            </div>
        </Panel>
    )
});

export default MainPanel;
