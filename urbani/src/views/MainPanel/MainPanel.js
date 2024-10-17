import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import Panel from '@enact/sandstone/Panels';
import React from 'react';
import './MainPanel.css';

const MainPanel = kind({
    name: 'MainPanel',

    handlers: {
        handleQRCodeClick: (ev, {onNavigate}) => {
            if (onNavigate) {
                onNavigate(3); // Panel 인덱스 2로 이동 (QRCodeScanner)
            }
        }
    },

    render: ({handleQRCodeClick, ...props}) => (
        <Panel {...props}>
          <div>
            <div className="qrButtonContainer">
                <Button onClick={handleQRCodeClick}>
                    QR 코드 인식하기
                </Button>
            </div>
            <div className="controlButtonContainer">
                <Button onClick={() => props.onNavigate(1)}>
                    제어 화면으로 이동
                </Button>
            </div>
          </div>
        </Panel>
    )
});

export default MainPanel;
