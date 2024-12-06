/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';
declare module '@/assets/mqtt/mqtt.min.js';

declare const JSPlugin: any;
declare global {
  interface Window {
    BMapGL: any;
  }
}
declare const mqtt: any;

// define typings for env variables
declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const MQTT_CONFIG: any;
declare const API_DOMAIN_CUSTOM: string;
