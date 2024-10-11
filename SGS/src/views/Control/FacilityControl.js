import kind from '@enact/core/kind';
import Panel from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import React from 'react';
import PropTypes from 'prop-types';
import './FacilityControl.css'; // 스타일을 관리하는 CSS 파일 임포트

const FacilityControl = kind({
    name: 'FaciltyControl',

    propTypes: {
        onNavigate: PropTypes.func // 추가: onNavigate prop 정의
    },

    render: ({ onNavigate, ...rest }) => {
        // 더미 데이터 생성
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
                                    <br/>
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
                                                <Button className="actionButton" disabled={data.status !== 'red'}>PUT</Button>
                                                <Button className="actionButton" disabled={data.status !== 'green'}>GET</Button>
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
    }
    
});

export default FacilityControl;