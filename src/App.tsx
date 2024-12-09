import React, { useEffect, useState } from 'react';
import HikH5Player from './components/h5Player';
import playerImg from './assets/player.png';
import { getMonitorDetail, monitorPreview } from './services/monitorService';
import MpegtsVideo from './components/MpegtsVideo';

const App: React.FC = () => {
  // const videoSrc = 'wss://isecure.yqhj.cn:6014/proxy/172.168.110.192:559/openUrl/lhkyzWo';
  // const videoSrc = 'wss://yuyin4.gpskk.com:8084/?sessionKey=5ec92d65b319409d835c78a434070375';
  const videoSrc2 = 'wss://isecure.yqhj.cn:6014/proxy/172.168.110.192:559/openUrl/sZu1Hj2';
  const [videoState, setVideoState] = useState<boolean>(false);
  const togglePlay = () => {
    setVideoState((prevState) => !prevState);
  };
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const requestMonitorDetail = async () => {
    try {
      const response = await getMonitorDetail({ uid: vehicleInfo?.uid });
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
                  (
                    <HikH5Player
                      options={{
                        url: videoSrc2,
                        border: '#fff',
                      }}
                    />
                    // <MpegtsVideo
                    //   url={videoSrc}
                    // />
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
