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
        const dummyData = [
            { id: 1, status: 'red' },
            { id: 2, status: 'green' },
            { id: 3, status: 'red' },
            { id: 4, status: 'red' }
        ];
    
        return (
            <Panel {...rest} className="controlPanel">
                <div>
                    {/* 사이드바 */}
                    <div className="sidebar">
                    <div className="back" onClick={() => onNavigate(0)}>돌아가기</div>
                        <div className="menuItem active">환경제어</div>
                        <div className="menuItem" onClick={() => onNavigate(1)}>설비제어</div>
                    </div>
    
                    {/* 메인 컨텐츠 */}
                    <div className="mainContent">
                        <h1 className="pick">Pickup</h1>
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
                    </div>
                </div>
            </Panel>
        );
    }
});

export default EnvironmentControl;
