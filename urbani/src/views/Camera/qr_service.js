/* src/views/Camera/QRCodeScanner.js */
import React, { useEffect, useRef, useState } from 'react';
import LS2Request from '@enact/webos/LS2Request';
import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';

const QRCodeScanner = () => {
  const [cameraUrl, setCameraUrl] = useState(null);
  const [cameraHandle, setCameraHandle] = useState(null);
  const [isCameraConnected, setIsCameraConnected] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    checkCameraStatus();
    return () => {
      stopCameraPreview();
    };
  }, []);

  const checkCameraStatus = () => {
    const request = new LS2Request();
    request.send({
      service: 'luna://com.domain.camera',
      method: 'getCameraStatus',
      onSuccess: (res) => {
        setIsCameraConnected(res.cameras && res.cameras.length > 0);
      },
      onFailure: () => {
        setIsCameraConnected(false);
      }
    });
  };

  const startCameraPreview = () => {
    const request = new LS2Request();
    request.send({
      service: 'luna://com.domain.camera',
      method: 'startPreview',
      parameters: {
        id: 'com.domain.ugh',
        source: '0'
      },
      onSuccess: (res) => {
        if (res.uri) {
          setCameraUrl(res.uri);
          setCameraHandle(res.handle);
        }
      },
      onFailure: () => {
        console.error('Failed to start camera preview');
      }
    });
  };

  const stopCameraPreview = () => {
    if (cameraHandle) {
      const request = new LS2Request();
      request.send({
        service: 'luna://com.domain.camera',
        method: 'stopPreview',
        parameters: {
          handle: cameraHandle
        },
        onSuccess: () => {
          setCameraHandle(null);
          setCameraUrl(null);
        },
        onFailure: () => {
          console.error('Failed to stop camera preview');
        }
      });
    }
  };

  return (
    <Panel>
      <Header title="Camera Preview with Connection Status" />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        {cameraUrl ? (
          <video
            ref={videoRef}
            src={cameraUrl}
            autoPlay
            width="640"
            height="480"
            style={{ border: '1px solid black' }}
          />
        ) : (
          <div style={{ width: '640px', height: '480px', backgroundColor: 'gray' }}>Camera not started</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px', fontSize: '2em' }}>
          {isCameraConnected ? 'T' : 'F'}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={startCameraPreview} disabled={cameraUrl !== null}>
          Start Camera
        </Button>
        <Button onClick={stopCameraPreview} disabled={cameraUrl === null} style={{ marginLeft: '10px' }}>
          Stop Camera
        </Button>
      </div>
    </Panel>
  );
};

export default QRCodeScanner;