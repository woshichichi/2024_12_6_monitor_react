import React, { useEffect, useState } from 'react';
import HikH5Player from './components/h5Player';
import playerImg from './assets/player.png';
import { getMonitorDetail } from './services/monitorService';

const App: React.FC = () => {
  const videoSrc = 'wss://isecure.yqhj.cn:6014/proxy/172.168.110.192:559/openUrl/lhkyzWo';
  const [videoState, setVideoState] = useState<boolean>(false);
  const togglePlay = () => {
    setVideoState((prevState) => !prevState);
  };
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);

  const requestMonitorDetail = async (id: number) => {
    try {
      const response = await getMonitorDetail({ id });
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
              <HikH5Player
                options={{
                  url: videoSrc,
                  border: '#fff',
                }}
              />
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
                  requestMonitorDetail(1);
                  togglePlay();
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  width: '100%',
                  height: '42px',
                  //
                  lineHeight: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.30)',
                  color: '#fff',
                  textAlign: 'left',
                  padding: '0px 10px',
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
