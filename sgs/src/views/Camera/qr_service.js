import React, { useEffect, useRef } from 'react'; 
import css from './qr_service.css';
import { startCameraPreview } from '../../services/camera_service';
import { showToast } from '../../services/toast_service';

const QRService = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        startCameraPreview(
            (response) => {
                console.log('카메라 미리보기 시작 성공:', response);
                showToast("카메라 미리보기가 성공적으로 시작되었습니다.", 
                    (toastResponse) => console.log('Toast 호출 성공:', toastResponse),
                    (toastError) => console.error('Toast 호출 실패:', toastError)
                );
                if (videoRef.current) {
                    try {
                        if (response.videoStream) {
                            videoRef.current.srcObject = response.videoStream;
                        } else if (response.mediaStreamUrl) {
                            videoRef.current.src = response.mediaStreamUrl;
                        } else {
                            throw new Error("올바른 비디오 스트림이 제공되지 않았습니다.");
                        }
                        videoRef.current.play();
                    } catch (error) {
                        console.error('비디오 스트림 설정 중 오류 발생:', error);
                        showToast("비디오 스트림 설정 중 오류가 발생했습니다.",
                            (toastResponse) => console.log('Toast 호출 성공:', toastResponse),
                            (toastError) => console.error('Toast 호출 실패:', toastError)
                        );
                    }
                }
            },
            (error) => {
                console.error('카메라 미리보기 시작 실패:', error);
                showToast("카메라 미리보기 시작 중 오류가 발생했습니다.",
                    (toastResponse) => console.log('Toast 호출 성공:', toastResponse),
                    (toastError) => console.error('Toast 호출 실패:', toastError)
                );
            }
        );
    }, []); // 빈 배열을 주면, 처음 렌더링 될 때만 호출

    return (
        <div className={css.container}>
            <h1 className={css.title}>QR 코드 서비스</h1>
            <div className={css.gridContainer}>
                <div className={css.widget}>
                    <h2>카메라 프리뷰</h2>
                    <video ref={videoRef} className={css.videoPreview} autoPlay muted />
                </div>
            </div>
        </div>
    );
};

export default QRService;
