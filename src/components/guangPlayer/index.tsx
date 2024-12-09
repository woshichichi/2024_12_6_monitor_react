import imgUrl from '../../assets/Frame.png';
import guang from 'byskplayer';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import './index.css'; // Assuming you have some CSS for styling

export interface VideoOptions {
  height?: number | string;
  width?: number | string;
  type?: string;
  // url: string;
  isLive?: boolean;
  autoPlay?: boolean;
  onPlay?: (play: () => void) => void;
  onPause?: (pause: () => void) => void;
  userKey: string;
  baseURL: string;
  userId: string;
  // 终端号
  device: string;
  // 通道号
  channel: number;
  // 协议类型
  protocolType: number;
  // 特殊标识(0:不处理, 1:粤标)
  SpecialSign: number;
  // 车牌号
  plate?: string;
  // 车辆Id
  vehicleId?: string;
  // 车辆所属车组ID
  groupId?: string;
}

interface Flags {
  isLoading: boolean;
  error: string;
}

const GuangPlayer: React.FC<VideoOptions> = ({
  height = '100%',
  width = '100%',
  type = 'mse',
  // url,
  isLive = true,
  userKey,
  baseURL,
  userId,
  device,
  channel,
  protocolType,
  SpecialSign,
  plate,
  vehicleId,
  groupId,
  // autoPlay = true,
  onPlay = () => { },
  onPause = () => { },
}) => {
  const [id] = useState(() => nanoid(8));
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [flags, setFlags] = useState<Flags>({ isLoading: true, error: '' });
  // console.log(url, 'url');

  const handleOpen = () => {

    const tidObj = playerRef.current?.allocate(1) //根据通道数申请
    console.log(tidObj, 'tidObj');

    if (tidObj.flag === 1) {
      //申请成功
      const params = {
        device: device, //终端号
        channel: channel, //通道号 （1~8）
        protocolType: protocolType, //协议类型，1：GF-1078，GB-1078; 2：GA系列
        codeTypeCtrlBtnEnabled: protocolType === 1, //是否显示高标清切换按钮(GF才有高清)
        plate,
        vehicleId,
        groupId,
        SpecialSign,
      }

      if (protocolType === 1) { //1078
        const tid = tidObj.ids[0]
        console.log(tid, params, 'tid', 'params222');
        playerRef.current.real.open(tid, params, (res: any) => {
          console.log(res);
        });
      } else {
        const tid = tidObj.ids[0]
        console.log(tid, params, 'tid', 'params222');
        playerRef.current.real.open(tid, params, (res: any) => {
          console.log(res);
        });
      }
    } else {
      //申请失败
      alert(tidObj.msg);
    }

  }
  const initPlayer = () => {
    setFlags({ isLoading: true, error: '' });
    const params = {
      id: id,
      isReal: true,
      isRecord: false,
      userId,
      userLevel: 1,
      userkey: userKey,
      baseURL: baseURL,
    }
    console.log(params, 'params');
    const player = new guang(params);
    if(!player._app){
      return;
    }
    playerRef.current = player;
    console.log(playerRef.current, 'playerRef.current');
    handleOpen();
  };

  const destroyPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  useEffect(() => {
    console.log('initPlayer222');
    initPlayer();
    return () => {
      destroyPlayer();
    };
  }, [type, isLive]);

  useEffect(() => {
    if (playerRef.current && onPlay) {
      onPlay(() => {
        playerRef.current?.play();
      });
    }
    if (playerRef.current && onPause) {
      onPause(() => {
        playerRef.current?.pause();
      });
    }
  }, [onPlay, onPause]);

  return (
    <div
      className="mpegts-video-container"
      style={{ width: '100%', height: '100%' }}
    >
      <video
        style={{
          height: height,
          width: width,
          display: flags.error ? 'none' : 'block',
        }}
        id={id}
        ref={videoRef}
        controls
      ></video>
      {flags.error && (
        <div className="mpegts-video-error">
          <img src={imgUrl} className="hik-h5-play-error-img" alt="" />
          <p className="mpegts-video-error-text">{flags.error}</p>
        </div>
      )}
    </div>
  );
};

export default GuangPlayer;
