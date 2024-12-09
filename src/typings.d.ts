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
type RuleList = {
  [x: string]: any;
  employeeName(employeeName: any): unknown;
  employeeId(employeeId: any): unknown;
  roles: any;
  pageToken: SetStateAction<string>;
  map(arg0: (node: any) => any): unknown;
  treeDataWithExpanded(treeDataWithExpanded: any): unknown;
  pageIndex: number;
  totalCount: any;
  rows: any;
  data?: any;
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
  code?: number;
  rows?: number;
};
declare namespace API {
  type CurrentUser = {
    name?: string;
    nickName: string;
    avatar?: string;
    userid?: string;
    account?: string;
    email?: string;
    signature?: string;
    title?: string;
    id?: any;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
    roles?: [
      {
        id: number;
      },
    ];
  };

  // type LoginResult = {
  //   status?: string;
  //   type?: string;
  //   currentAuthority?: string;
  // };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem<T = any> = {
    children?: any;
    code(code: any): unknown;
    beginDate?: string;
    expireTime?: string;
    success?: any;
    id?: number;
    data?: any;
    accountFlag?: boolean;
    name?: string;
  };

  type TenantCreate = {
    // name: string;
    // telephone: string;
    // email: string;
    // officialWebsite: string;
    // code: string;
    // beginDate: string;
    // expireTime: string;
    // enabled: string;
  };

  type RuleList = {
    [x: string]: any;
    employeeName(employeeName: any): unknown;
    employeeId(employeeId: any): unknown;
    roles: any;
    pageToken: SetStateAction<string>;
    map(arg0: (node: any) => any): unknown;
    treeDataWithExpanded(treeDataWithExpanded: any): unknown;
    pageIndex: number;
    totalCount: any;
    rows: any;
    data?: any;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    code?: number;
    rows?: number;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

// define typings for env variables
declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const MQTT_CONFIG: any;
declare const API_DOMAIN_CUSTOM: string;
