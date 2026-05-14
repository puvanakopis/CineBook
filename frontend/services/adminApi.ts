import axiosInstance from './authApi';
import { User } from '@/interfaces/userInterfaces';

export const adminApi = {
    /**
     * Fetch all users and admins
     */
    getAllUsers: async (): Promise<User[]> => {
        const response = await axiosInstance.get('/api/admin/users');
        return response.data;
    },

    /**
     * Toggle user active/suspended status
     */
    toggleUserStatus: async (userId: string, isActive: boolean): Promise<User> => {
        const response = await axiosInstance.patch(`/api/admin/users/${userId}/status`, { isActive });
        return response.data.user;
    },

    /**
     * Update admin/manager role
     */
    updateUserRole: async (userId: string, role: 'admin' | 'manager'): Promise<User> => {
        const response = await axiosInstance.patch(`/api/admin/users/${userId}/role`, { role });
        return response.data.user;
    },

    /**
     * Create a new user
     */
    createUser: async (userData: Partial<User> & { password?: string }): Promise<User> => {
        const response = await axiosInstance.post('/api/admin/users', userData);
        return response.data.user;
    },

    /**
     * Delete a user
     */
    deleteUser: async (userId: string): Promise<void> => {
        await axiosInstance.delete(`/api/admin/users/${userId}`);
    }
};
