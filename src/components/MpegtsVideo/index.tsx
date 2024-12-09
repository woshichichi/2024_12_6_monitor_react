import imgUrl from '../../assets/Frame.png';
import mpegts from 'mpegts.js';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import './index.css'; // Assuming you have some CSS for styling

export interface VideoOptions {
  height?: number | string;
  width?: number | string;
  type?: string;
  url: string;
  isLive?: boolean;
  autoPlay?: boolean;
  onPlay?: (play: () => void) => void;
  onPause?: (pause: () => void) => void;
}

interface Flags {
  isLoading: boolean;
  error: string;
}

const MpegtsVideo: React.FC<VideoOptions> = ({
  height = '100%',
  width = '100%',
  type = 'mse',
  url,
  isLive = true,
  // autoPlay = true,
  onPlay = () => { },
  onPause = () => { },
}) => {
  const [id] = useState(() => nanoid(8));
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<mpegts.Player | null>(null);
  const [flags, setFlags] = useState<Flags>({ isLoading: true, error: '' });
  console.log(url, 'url');

  const handlePlayError = (error: any) => {
    let errorMsg = '未知的错误';
    if (error.name === 'NotSupportedError') {
      errorMsg = '不支持的视频格式或源';
    } else if (error.name === 'AbortError') {
      // Don't show error for abort errors (caused by pause)
      return;
    } else {
      switch (error) {
        case mpegts.ErrorTypes.NETWORK_ERROR:
          errorMsg = '网络错误';
          break;
        case mpegts.ErrorTypes.MEDIA_ERROR:
          errorMsg = '媒体错误';
          break;
        case mpegts.ErrorTypes.OTHER_ERROR:
          errorMsg = '其他错误';
          break;
        default:
          errorMsg = '未知的错误';
      }
    }
    setFlags({ isLoading: false, error: errorMsg });
    console.error('Player Error:', error);
  };

  const handleLoadingComplete = () => {
    setFlags((prevFlags) => ({ ...prevFlags, isLoading: false }));
    console.log('Loading Complete');
  };

  const initPlayer = () => {
    setFlags({ isLoading: true, error: '' });
    if (mpegts.getFeatureList().mseLivePlayback && videoRef.current) {
      console.log(url, 'url111');
      const mediaDataSource = {
        type: 'flv',
        isLive: isLive,
        url: url,
        hasAudio: true,
        hasVideo: true,
        cors: true,
      };
      console.log('Supported features:', mpegts.getFeatureList());
      console.log('MediaDataSource:', mediaDataSource);
      const player = mpegts.createPlayer(mediaDataSource, {
        enableWorker: true,
        enableStashBuffer: true,
        stashInitialSize: 1024 * 64,
        lazyLoad: false,
        lazyLoadMaxDuration: 0,
        seekType: 'range',
      });

      player.attachMediaElement(videoRef.current);
      player.load();

      // Add event listeners
      player.on(mpegts.Events.ERROR, handlePlayError);
      player.on(mpegts.Events.LOADING_COMPLETE, handleLoadingComplete);

      playerRef.current = player;

      // Fix the play() promise handling
      try {
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('播放成功');
            })
            .catch((error: Error) => {
              // Only handle errors that aren't related to pause interruption
              if (error.name !== 'AbortError') {
                handlePlayError(error);
              }
            });
        }
      } catch (error) {
        handlePlayError(error);
      }
    } else {
      console.error(
        'MSE Live Playback is not supported or video element is not available',
      );
      setFlags({
        isLoading: false,
        error:
          'MSE Live Playback is not supported or video element is not available',
      });
    }
  };

  const destroyPlayer = () => {
    if (playerRef.current) {
      playerRef.current.off(mpegts.Events.ERROR, handlePlayError);
      playerRef.current.off(
        mpegts.Events.LOADING_COMPLETE,
        handleLoadingComplete,
      );
      playerRef.current.pause();
      playerRef.current.unload();
      playerRef.current.detachMediaElement();
      playerRef.current.destroy();
      playerRef.current = null;
    }
  };

  useEffect(() => {
    initPlayer();
    return () => {
      destroyPlayer();
    };
  }, [url, type, isLive]);

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

export default MpegtsVideo;
