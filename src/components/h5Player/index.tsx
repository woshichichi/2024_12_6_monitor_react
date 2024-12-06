/* eslint-disable */
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import './index.css'; // 将样式移到单独的CSS文件中
import imgUrl from '../../assets/Frame.png';

interface HikH5PlayerProps {
  options: {
    url: string;
    index?: number;
    border?: string;
  };
  onEvent?: (event: string) => void;
}

interface Flags {
  isLoading: boolean;
  error: string;
  isPlaying: boolean;
}

const HikH5Player: React.FC<HikH5PlayerProps> = ({ options, onEvent }) => {
  const id = 'hik_' + nanoid(8);
  const [flags, setFlags] = useState<Flags>({
    isLoading: true,
    error: '',
    isPlaying: false,
  });
  const plugin = useRef<any>(null);

  useEffect(() => {
    console.log('options', options);
    createPlugin(options.border ?? 'red');
  }, []);

  useEffect(() => {
    if (options.url && plugin.current) {
      play(options.url, options.index);
    }
  }, [options.url]);

  const createPlugin = (border: string) => {
    plugin.current = new JSPlugin({
      szId: id,
      szBasePath: '/vendor',
      bSupporDoubleClickFull: true,
      openDebug: true,
      oStyle: { borderSelect: border },
    });
    plugin.current.JS_SetWindowControlCallback({
      firstFrameDisplay: (index: number, width: number, height: number) => {
        setFlags((prevFlags) => ({
          ...prevFlags,
          isLoading: false,
          isPlaying: true,
        }));
      },
      pluginErrorHandler: (index: number, errCode: string, error: any) => {
        handleError(errCode);
      },
    });
  };

  const play = (url: string, index?: number) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      error: '',
      isLoading: true,
      isPlaying: true,
    }));
    if (!plugin.current || !url) {
      return;
    }
    plugin.current.JS_Play(url, { playURL: url, mode: 0 }, index ?? 0).then(
      () => onEvent?.('PLAY'),
      (err: string) => handleError(err),
    );
  };

  const stop = (index?: number) => {
    if (!plugin.current) {
      return;
    }
    plugin.current.JS_Stop(index ?? 0).then(
      () => {
        console.info('JS_Stop success');
        setFlags((prevFlags) => ({
          ...prevFlags,
          isPlaying: false,
        }));
      },
      (err: string) => handleError(err),
    );
  };

  const openSound = (index?: number) => {
    if (!plugin.current) {
      return;
    }
    plugin.current.JS_OpenSound(index ?? 0).then(
      () => console.info('JS_OpenSound success'),
      (err: string) => handleError(err),
    );
  };

  const closeSound = (index?: number) => {
    if (!plugin.current) {
      return;
    }
    plugin.current.JS_CloseSound(index ?? 0).then(
      () => console.info('JS_CloseSound success'),
      (err: string) => handleError(err),
    );
  };

  const setVolume = (volume: number, index?: number) => {
    if (!plugin.current) {
      return;
    }
    if (volume < 1 || volume > 100) {
      throw new Error('volume must be between 1 and 100');
    }
    plugin.current.JS_SetVolume(index ?? 0, volume).then(
      () => console.info('JS_SetVolume success'),
      (err: string) => handleError(err),
    );
  };

  const getVolume = (index?: number): Promise<number> => {
    if (!plugin.current) {
      return Promise.resolve(0);
    }
    return plugin.current.JS_GetVolume(index ?? 0).then(
      (volume: number) => volume,
      (err: string) => handleError(err),
    );
  };

  const handleError = (errCode: string) => {
    const errInfo: { [key: string]: string } = {
      '0x12f900001': '参数错误',
      '0x12f900008': '播放链接格式错误',
      '0x12f900009': '取流超时',
      '0x12f910010': '取流失败',
      '0x01b01307': '取流失败，链接已失效',
      '0x12f910011': '播放终端，可能因为电脑卡顿引起',
      '0x12f930010': '内存不足',
      '0x0190003e': '设备已离线',
    };

    let msg: string = '未知的错误';
    if (!errCode && (typeof errCode !== 'string' || errCode.startsWith('0x'))) {
      msg = errInfo[errCode];
    }
    setFlags((prevFlags) => ({
      ...prevFlags,
      error: msg,
      isPlaying: false,
    }));
  };

  return (
    <div className="hik-h5-box">
      <div
        id={id}
        style={{ display: !flags.error ? 'unset' : 'none' }}
        className="hik-h5-player"
      ></div>
      {flags.isLoading && !flags.error && (
        <div className="hik-h5-play-loading"></div>
      )}
      {flags.error && (
        <div className="hik-h5-play-error">
          <img src={imgUrl} className="hik-h5-play-error-img" alt="" />
          <p className="hik-h5-play-error-text">{flags.error}</p>
        </div>
      )}
    </div>
  );
};

export default HikH5Player;
