import api from "./api";

// 定义接口
export interface MonitorData {
  id?: number;
  name: string;
  status: string;
  timestamp?: string;
  // 添加其他需要的字段
}

export interface API {
  RuleList: MonitorData;
  // 可以添加其他API接口类型
}

// 获取监控详情
// export async function getMonitorDetail(params: object, options?: object) {
//   return api.get<API["RuleList"]>(
//     `http://127.0.0.1:4523/m1/3284777-0-default/monitors/detail/cc`,
//     {
//       params: {
//         ...params,
//       },
//       ...(options || {}),
//     }
//   );
// }
export async function getMonitorDetail(
  params: object,
  options?: { [key: string]: any },
) {
  return api.get<API.RuleList>('http://127.0.0.1:4523/m1/3284777-0-default/monitors/detail/cc', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function monitorPreview(
  params: object,
  options?: { [key: string]: any },
) {
  return api.get<API.RuleList>('/camera/road/preview2', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// export async function monitorPreview(params: object, options?: object) {
//   return api.get<API["RuleList"]>(
//     `/camera/preview2`,
//     {
//       params: {
//         ...params,
//       },
//       ...(options || {}),
//     }
//   );
// }

// 获取所有监控
export async function getAllMonitors(
  params?: object,
  options?: { [key: string]: any }
) {
  return api.get<MonitorData[]>("/monitors", {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 获取单个监控数据
export async function getMonitor(
  params: unknown,
  options?: { [key: string]: any }
) {
  return api.get<MonitorData>(
    `http://127.0.0.1:4523/m1/3284777-0-default/monitors/detail/cc?id=${params}`,
    {
      ...(options || {}),
    }
  );
}

// 创建监控
export async function createMonitor(
  data: MonitorData,
  options?: { [key: string]: any }
) {
  return api.post<MonitorData>("/monitors", {
    data,
    ...(options || {}),
  });
}

// 更新监控
export async function updateMonitor(
  id: number,
  data: Partial<MonitorData>,
  options?: { [key: string]: any }
) {
  return api.put<MonitorData>(`/monitors/${id}`, {
    data,
    ...(options || {}),
  });
}

// 删除监控
export async function deleteMonitor(
  id: number,
  options?: { [key: string]: any }
) {
  return api.delete(`/monitors/${id}`, {
    ...(options || {}),
  });
}

// 获取监控统计数据
export async function getMonitorStats(options?: { [key: string]: any }) {
  return api.get("/monitors/stats", {
    ...(options || {}),
  });
}

// 获取告警数据
export async function getAlerts(options?: { [key: string]: any }) {
  return api.get("/monitors/alerts", {
    ...(options || {}),
  });
}
