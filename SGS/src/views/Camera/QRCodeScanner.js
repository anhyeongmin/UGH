import React, { useEffect, useRef } from 'react';
import Panel from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import webOS from '@enact/webos';

const QRCodeScanner = ({ onBack, ...rest }) => {
    const videoRef = useRef(null);
    let deviceId;

    useEffect(() => {
        console.log('Starting camera open request...');

        // 카메라 세션 열기
        webOS.service.request('luna://com.webos.service.camera2', {
            method: 'open',
            parameters: {
                type: 'camera',
                id: 'rear', // 후면 카메라
                params: {
                    width: 1280,
                    height: 720,
                    format: 'raw'
                }
            },
            onSuccess: (response) => {
                console.log('Camera open success:', response);
                if (response.returnValue) {
                    deviceId = response.deviceId;
                    startPreview(deviceId);
                } else {
                    console.error('Camera open failed: No deviceId returned');
                }
            },
            onFailure: (err) => {
                console.error('Camera open failed:', err);
            }
        });

        // 카메라 프리뷰 시작
        const startPreview = (id) => {
            webOS.service.request('luna://com.webos.service.camera2', {
                method: 'startPreview',
                parameters: {
                    id,
                    subscribe: true,
                    sourceType: 'camera',
                    type: 'media'
                },
                onSuccess: (response) => {
                    console.log('Camera preview started:', response);
                    if (videoRef.current && response.source) {
                        videoRef.current.srcObject = response.source;
                        videoRef.current.play();
                    }
                },
                onFailure: (err) => {
                    console.error('Camera preview failed:', err);
                }
            });
        };

        // 컴포넌트 언마운트 시 카메라 세션 종료
        return () => {
            console.log('Stopping camera...');
            if (deviceId) {
                webOS.service.request('luna://com.webos.service.camera2', {
                    method: 'close',
                    parameters: { id: deviceId },
                    onSuccess: (response) => {
                        console.log('Camera closed:', response);
                    },
                    onFailure: (err) => {
                        console.error('Camera close failed:', err);
                    }
                });
            }
        };
    }, []);

    return (
        <Panel {...rest} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                <h1 style={{ color: '#000000' }}>QR 코드 스캔</h1>
                <video
                    ref={videoRef}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '300px',
                        margin: 'auto',
                        border: '1px solid #000000',
                        backgroundColor: '#cccccc'
                    }}
                    autoPlay
                    playsInline
                />
                <Button onClick={onBack} style={{ marginTop: '20px' }}>
                    메인 화면으로 돌아가기
                </Button>
            </div>
        </Panel>
    );
};

export default QRCodeScanner;
