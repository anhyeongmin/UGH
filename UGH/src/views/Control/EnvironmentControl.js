import kind from '@enact/core/kind';
import Panel from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import React from 'react';
import PropTypes from 'prop-types';
import './EnvironmentControl.css'; // 스타일을 관리하는 CSS 파일 임포트

const EnvironmentControl = kind({
    name: 'EnvironmentControl',

    propTypes: {
        onNavigate: PropTypes.func // 추가: onNavigate prop 정의
    },

    render: ({ onNavigate, ...rest }) => {
        // 더미 데이터 생성
        const dummyDegree = [
            { degree: 28, humidity: 40 }
        ];
    
        return (
            <Panel {...rest} className="environmentControlPanel">
                <div>
                    {/* 사이드바 */}
                    <div className="environmentSidebar">
                        <div className="environmentBack" onClick={() => onNavigate(0)}>돌아가기</div>
                        <div className="environmentMenuItem active">환경제어</div>
                        <div className="environmentMenuItem" onClick={() => onNavigate(1)}>설비제어</div>
                    </div>
    
                    {/* 메인 컨텐츠 */}
                    <div className="environmentMainContent">
                        {dummyDegree.map((dat) => (
                            <React.Fragment key={dat.degree}>
                                <h1 className="environmentDegree">온도 : {dat.degree}°C
                                    <br/>
                                    습도 : {dat.humidity}%
                                </h1>
                                <div className="environmentCardContainer">
                                    {/* 카드 전체를 버튼처럼 동작하게 수정 */}
                                    <button 
                                        className="environmentCard clickable" // 클릭 가능한 스타일 적용
                                        onClick={() => console.log('나는물주기 버튼 클릭됨')}
                                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') console.log('물주기 버튼 클릭됨'); }}
                                    >
                                        <div className="environmentCardHeader">
                                            <span>물주기</span>
                                        </div>
                                    </button>
                                    <button 
                                        className="environmentCard clickable" // 클릭 가능한 스타일 적용
                                        onClick={() => console.log('LED ON/OFF 버튼 클릭됨')}
                                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') console.log('LED ON/OFF 버튼 클릭됨'); }}
                                    >
                                        <div className="environmentCardHeader">
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

export default EnvironmentControl;
