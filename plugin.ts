import type { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://zjzhstatic.oss-cn-hangzhou.aliyuncs.com/MQTT/mqtt.min.js',
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=' + api.userConfig.define.AK_BAIDU_MAP,
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: '/vendor/h5player.min.js',
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: '/haiguang/byskplayer.js',
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/library/Autocomplete/1.0/src/Autocomplete_min.js',
  }));
  api.addHTMLLinks(() => ({
    rel: 'stylesheet',
    href: 'https://zjzhstatic.oss-cn-hangzhou.aliyuncs.com/BMapGLLib/DrawingManager/DrawingManager.min.css',
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://zjzhstatic.oss-cn-hangzhou.aliyuncs.com/BMapGLLib/DrawingManager/DrawingManager.min.js',
  }));
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: 'https://zjzhstatic.oss-cn-hangzhou.aliyuncs.com/BMapGLLib/GeoUtils/GeoUtils.min.js',
  }));
  api.addHTMLMetas(() => [
    { httpEquiv: 'x-dns-prefetch-control', content: 'on' },
    { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
    { name: 'viewport', content: 'width=1920, maximum-scale=2.0, user-scalable=yes' },
  ]);
};
