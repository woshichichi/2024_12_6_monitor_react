import React, { useState } from 'react';
import HikH5Player from './components/h5Player';

const App: React.FC = () => {
  const videoSrc = 'wss://isecure.yqhj.cn:6014/proxy/172.168.110.192:559/openUrl/8dnHZn2';
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
                  monitorPreview({ uid: descriptions.uid })
                    .then((response) => {
                      if (response.data.manufacturer === 'GuangDa') {
                        setVideoSrc(response.data.url);
                        setCameraInfo(response.data);
                        togglePlay();
                      } else if (response.data.url && response.data.url.trim() !== '') {
                        setVideoSrc(response.data.url);
                        setCameraInfo(response.data);
                        togglePlay();
                      } else {
                        message.error('暂无监控视频');
                      }
                    })
                    .catch((error) => {
                      console.error('获取视频信息失败:', error);
                      // message.error("获取视频信息失败");
                    });
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
                }}>
                {'askdlfjsl'}
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
