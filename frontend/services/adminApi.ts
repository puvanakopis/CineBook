import axiosInstance from './authApi';
import { User } from '@/interfaces/userInterfaces';
import { DashboardStats } from '@/interfaces/adminInterface';

export const adminApi = {
  
    getAllUsers: async (): Promise<User[]> => {
        const response = await axiosInstance.get('/api/admin/users');
        return response.data;
    },

    toggleUserStatus: async (userId: string, isActive: boolean): Promise<User> => {
        const response = await axiosInstance.patch(`/api/admin/users/${userId}/status`, { isActive });
        return response.data.user;
    },

    updateUserRole: async (userId: string, role: 'admin' | 'manager'): Promise<User> => {
        const response = await axiosInstance.patch(`/api/admin/users/${userId}/role`, { role });
        return response.data.user;
    },

    createUser: async (userData: Partial<User> & { password?: string }): Promise<User> => {
        const response = await axiosInstance.post('/api/admin/users', userData);
        return response.data.user;
    },

    deleteUser: async (userId: string): Promise<void> => {
        await axiosInstance.delete(`/api/admin/users/${userId}`);
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await axiosInstance.get('/api/admin/stats');
        return response.data;
    }
};
