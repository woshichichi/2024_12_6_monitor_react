import api from './api';

// 定义接口
interface MonitorData {
    id?: number;
    name: string;
    status: string;
    timestamp?: string;
    // 添加其他需要的字段
}

// 监控服务类
class MonitorService {
    // 获取所有监控数据
    async getAllMonitors(): Promise<MonitorData[]> {
        return api.get('/monitors');
    }
    monitorDetail = async (params: { url: string; }) => {
        return api.get(`/monitors/${params.url}`);
    }

    // 获取单个监控数据
    async getMonitor(params: unknown): Promise<MonitorData> {
        return api.get(`http://127.0.0.1:4523/m1/3284777-0-default/monitors/detail/cc?id=${params}`);
    }

    // 创建新的监控
    async createMonitor(data: MonitorData): Promise<MonitorData> {
        return api.post('/monitors', data);
    }

    // 更新监控数据
    async updateMonitor(id: number, data: Partial<MonitorData>): Promise<MonitorData> {
        return api.put(`/monitors/${id}`, data);
    }

    // 删除监控
    async deleteMonitor(id: number): Promise<void> {
        return api.delete(`/monitors/${id}`);
    }

    // 获取监控统计数据
    async getMonitorStats(): Promise<any> {
        return api.get('/monitors/stats');
    }

    // 获取告警数据
    async getAlerts(): Promise<any> {
        return api.get('/monitors/alerts');
    }
}

export const monitorService = new MonitorService();
export type { MonitorData };
