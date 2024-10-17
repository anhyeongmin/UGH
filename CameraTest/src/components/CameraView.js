import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import {Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {closeCamera, getCameraIds, startCamera} from '../store';

const CameraView = () => {
	const videoRef = useRef(null);
	const dispatch = useDispatch();
	const cameraIds = useSelector((store) => store.cameraIds);
	const cameraStatus = useSelector((store) => store.cameraStatus);

	let cameraOption;

	useEffect(() => {
		// 웹OS 시스템 확인 및 카메라 ID 리스트 가져오기
		if (typeof window === 'object' && typeof (window.webOSSystem ?? window.PalmSystem) === 'object') {
			dispatch(getCameraIds({}));
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		// camera1을 고정으로 선택하고 자동으로 카메라 시작
		dispatch(startCamera('camera1'));
	}, []); // 컴포넌트 마운트 시 한번만 실행

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
		}
	}, [cameraStatus]);

	const checkSystem = () => {
		if (typeof window !== 'object' || typeof (window.webOSSystem ?? window.PalmSystem) !== 'object') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}
	};

	if (typeof window !== 'object' || typeof (window.webOSSystem ?? window.PalmSystem) !== 'object') {
		return <div>This test will only function correctly on webOS systems!</div>;
	}

	cameraOption = encodeURIComponent(JSON.stringify({
		mediaTransportType: 'CAMERA',
		option: cameraStatus
	}));

	return (
		<div>
			{checkSystem()}
			<Heading showLine>Camera List</Heading>
			<VirtualList
				dataSize={cameraIds.length}
				itemRenderer={({index}) => (
					<Item
						onClick={() => {
							dispatch(startCamera(cameraIds[index].id));
						}}
					>
						{cameraIds[index].id}
					</Item>
				)}
				itemSize={ri.scale(144)}
			/>
			<Column>
				<video ref={videoRef} height="480" width="720">
					<source src="camera://com.webos.service.camera2/" type={'service/webos-camera;cameraOption=' + cameraOption} />
				</video>
			</Column>
			<Column align="center">
				<Button
					size="small"
					onClick={() => {
						dispatch(closeCamera(cameraStatus.handle));
					}}
				>
					Close Camera
				</Button>
			</Column>
		</div>
	);
};

export default CameraView;
