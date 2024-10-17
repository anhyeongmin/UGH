import kind from '@enact/core/kind';
import Panel from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import React from 'react';
import PropTypes from 'prop-types';
import './env_service.css'; // 스타일을 관리하는 CSS 파일 임포트

const EnvService = kind({
    name: 'EnvService',

    propTypes: {
        onNavigate: PropTypes.func // 추가: onNavigate prop 정의
    },

    render: ({ onNavigate, ...rest }) => {
        // 더미 데이터 생성
        const dummyDegree = [
            { degree: 28, humidity: 40 }
        ];

        return (
            <Panel {...rest} className="env_control_panel">
                <div>
                    {/* 사이드바 */}
                    <div className="env_sidebar">
                        <div className="env_back" onClick={() => onNavigate(0)}>돌아가기</div>
                        <div className="env_menu_item active">환경제어</div>
                        <div className="env_menu_item" onClick={() => onNavigate(1)}>설비제어</div>
                    </div>

                    {/* 메인 컨텐츠 */}
                    <div className="env_main_content">
                        {dummyDegree.map((dat) => (
                            <React.Fragment key={dat.degree}>
                                <h1 className="env_degree">온도 : {dat.degree}°C
                                    <br/>
                                    습도 : {dat.humidity}%
                                </h1>
                                <div className="env_card_container">
                                    {/* 카드 전체를 버튼처럼 동작하게 수정 */}
                                    <button 
                                        className="feed" // 물주기 버튼
                                        onClick={() => console.log('나는물주기 버튼 클릭됨')}
                                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') console.log('물주기 버튼 클릭됨'); }}
                                    >
                                        <div className="env_card_header">
                                            <span>물주기</span>
                                        </div>
                                    </button>
                                    <button 
                                        className="led" // LED 버튼
                                        onClick={() => console.log('LED ON/OFF 버튼 클릭됨')}
                                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') console.log('LED ON/OFF 버튼 클릭됨'); }}
                                    >
                                        <div className="env_card_header">
                                            <span>LED ON/OFF</span>
                                        </div>
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </Panel>
        );
    }
});

export default EnvService;
