import React, { useEffect, useState } from 'react';
import Panel from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import PropTypes from 'prop-types';
import './FacilityControl.css';

import mqtt from 'async-mqtt';

const FacilityControl = ({ onNavigate, ...rest }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let reconnectInterval;

    const connectMqtt = async () => {
      try {
        // 브로커 주소를 TOPST 보드의 실제 IP로 설정하세요.
        const mqttClient = await mqtt.connectAsync('mqtt://192.168.0.21:1883'); // 모스키토 브로커 주소 입력 (예시로 192.168.0.21)
        console.log('MQTT 연결 성공');
        setClient(mqttClient);
        setIsConnected(true);
        clearInterval(reconnectInterval);
      } catch (error) {
        console.error('MQTT 연결 오류:', error);
        setIsConnected(false);
        // 연결 실패 시 일정 시간 후 재연결 시도
        if (!reconnectInterval) {
          reconnectInterval = setInterval(connectMqtt, 5000); // 5초마다 재연결 시도
        }
      }
    };

    connectMqtt();

    return () => {
      if (client) {
        client.end();
        console.log('MQTT 연결 종료');
      }
      clearInterval(reconnectInterval);
    };
  }, []);

  const sendMqttMessage = async (topic, message) => {
    if (isConnected && client) {
      try {
        // QOS 옵션을 추가해 안정성을 높입니다.
        await client.publish(topic, message, { qos: 1 });
        console.log(`메시지 전송됨 - 토픽: ${topic}, 메시지: ${message}`);
      } catch (error) {
        console.error('MQTT 메시지 전송 오류:', error);
      }
    } else {
      console.error('MQTT 연결되지 않음');
    }
  };

  const dummyData = [
    { id: 1, status: 'red' },
    { id: 2, status: 'red' },
    { id: 3, status: 'green' },
    { id: 4, status: 'green' }
  ];

  const dummyDegree = [
    { degree: 28, humidity: 40 }
  ];

  return (
    <Panel {...rest} className="controlPanel">
      <div>
        {/* 사이드바 */}
        <div className="sidebar">
          <div className="back" onClick={() => onNavigate(0)}>돌아가기</div>
          <div className="menuItem" onClick={() => onNavigate(2)}>환경제어</div>
          <div className="menuItem active">설비제어</div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="mainContent">
          {dummyDegree.map((dat) => (
            <React.Fragment key={dat.degree}>
              <h1 className="degree">온도 : {dat.degree}°C
                <br />
                습도 : {dat.humidity}%
              </h1>
              <div className="cardContainer">
                {dummyData.map((data) => (
                  <div className="card" key={data.id}>
                    <div className="cardHeader">
                      <span>No.{data.id}</span>
                      <div className={`statusIndicator ${data.status}`}></div>
                    </div>
                    <div className="cardBody">
                      <Button
                        className="actionButton"
                        disabled={data.status !== 'red'}
                        onClick={() => sendMqttMessage('JIG', `${data.id}`)}
                      >
                        PUT
                      </Button>
                      <Button
                        className="actionButton"
                        disabled={data.status !== 'green'}
                        onClick={() => sendMqttMessage('JIG', `${data.id + 4}`)}
                      >
                        GET
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Panel>
  );
};

FacilityControl.propTypes = {
  onNavigate: PropTypes.func
};

export default FacilityControl;
