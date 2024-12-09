import React, { useEffect, useState } from 'react';
import HikH5Player from './components/h5Player';
import playerImg from './assets/player.png';
import { monitorPreview } from './services/monitorService';
import MpegtsVideo from './components/MpegtsVideo';
import GuangPlayer from './components/guangPlayer';

const App: React.FC = () => {
  // const videoSrc2 = 'wss://isecure.yqhj.cn:6014/proxy/172.168.110.192:559/openUrl/5qVITJe';
  const [videoState, setVideoState] = useState<boolean>(false);
  const togglePlay = () => {
    setVideoState((prevState) => !prevState);
  };
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [cameraInfo, setCameraInfo] = useState<any>(null);

  const requestMonitorDetail = async () => {
    try {
      const response = await monitorPreview({ uid: vehicleInfo?.uid });
      setCameraInfo(response.data);
      // const response = await monitorPreview({ uid: 'vehicleInfo?.uid' });
      setVideoSrc(response.data.url);
      // 处理返回的数据
      console.log(response);
      // 可以设置到 state 中
    } catch (error) {
      console.error('获取监控详情失败:', error);
    }
  };
  useEffect(() => {
    // 从 URL 中解析参数
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setVehicleInfo(parsedData);
        localStorage.setItem('token_value', parsedData.token);

      } catch (error) {
        console.error('解析数据失败:', error);
      }
    }
  }, []);
  useEffect(() => {
    console.log(vehicleInfo, 'vehicleInfo');
  }, [vehicleInfo]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + TypeScript Demo</h1>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '10px',
          paddingLeft: '15px',
          justifyContent: 'space-between',
        }}>
        <div
          style={{
            width: '50%',
            height: '450px',
            backgroundColor: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          {videoState ? (
            <div style={{ width: '100%', height: '450px' }} onClick={() => { }}>
              {
                vehicleInfo?.manufacturer === 'StarSoft' ? (
                  <MpegtsVideo
                    url={videoSrc}
                  />
                ) :
                  vehicleInfo?.manufacturer === 'GuangDa' ?
                    (
                      <GuangPlayer
                        // url={videoStates[item.uid].url}
                        // userKey={cameraInfo?.userKey || '19ac88da-33bc-4ce9-a3a1-63ec2bc8d2ff'}
                        // 返回"url": "wss://plugvideo.vocsystem.cn:4443_19ac88da-33bc-4ce9-a3a1-63ec2bc8d2ff",取_后面部分
                        userKey={cameraInfo?.url?.split('_')[1]}
                        baseURL={cameraInfo?.url?.split('_')[0]}
                        userId={cameraInfo?.userId || 'apitest'}
                        device={cameraInfo?.uid?.split('_')[0]}
                        channel={cameraInfo?.uid?.split('_')[1]}
                        protocolType={cameraInfo?.protocolType || 1}
                        SpecialSign={cameraInfo?.SpecialSign || 1}
                        plate={cameraInfo?.name}
                        vehicleId={cameraInfo?.vehicleId || '4321'}
                        groupId={cameraInfo?.groupId || '2'}
                      />
                    ) :
                    (
                      <HikH5Player
                        options={{
                          url: videoSrc,
                          border: '#fff',
                        }}
                      />
                    )
              }

            </div>
          ) : (
            <>
              <img
                src={playerImg}
                alt=""
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  requestMonitorDetail();
                  togglePlay();
                  // monitorPreview({ uid: '浙DS1388_1' }).then((response: any) => {
                  //   setVideoSrc(response.data.url);
                  //   togglePlay();
                  // });
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  width: '100%',
                  height: '42px',
                  lineHeight: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.30)',
                  color: '#fff',
                  textAlign: 'left',
                  padding: '0px 10px',
                  fontSize: '12px',
                }}>
                {vehicleInfo?.name}
              </span>
            </>
          )}
          {videoState && (
            <div
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '5px',
                right: '10px',
                fontSize: '24px',
                fontWeight: '600',
                color: 'rgba(88, 212, 175, 1)',
                zIndex: '99',
              }}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}>
              X
            </div>
          )}
        </div>
      </ul>

    </div>
  );
};

export default App;
