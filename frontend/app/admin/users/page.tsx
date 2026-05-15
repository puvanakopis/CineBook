'use client';

import { useMemo, useState, useEffect } from 'react';
import { UserHeader } from './_components/UserHeader';
import { UserStatsGrid } from './_components/UserStatsGrid';
import { UserFilters } from './_components/UserFilters';
import { UserTable } from './_components/UserTable';
import { AddUserModal } from './_components/AddUserModal';
import { adminApi } from '@/services/adminApi';
import { User } from '@/interfaces/userInterfaces';
import { toast } from 'react-hot-toast';
import Loading from '@/components/Loading';

const roles = ['Admin', 'Customer'];
const statuses = ['Active', 'Suspended'];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const updatedUser = await adminApi.toggleUserStatus(userId, !currentStatus);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: updatedUser.isActive } : u));
      toast.success(`User ${updatedUser.isActive ? 'activated' : 'suspended'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await adminApi.deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchMatch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const mappedRole = user.role === 'admin' ? 'Admin' : user.role === 'manager' ? 'Manager' : 'Customer';
      const roleMatch =
        selectedRole === 'All Roles' || mappedRole === selectedRole;

      const mappedStatus = user.isActive ? 'Active' : 'Suspended';
      const statusMatch =
        selectedStatus === 'All Statuses' || mappedStatus === selectedStatus;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.isActive && u.role === 'user').length,
      suspended: users.filter(u => !u.isActive).length,
    };
  }, [users]);

  if (loading) {
    return <Loading message="Loading Users..." />;
  }

  return (
    <>
      <UserHeader onAddUser={() => setIsAddModalOpen(true)} />

      <UserStatsGrid
        total={stats.total}
        active={stats.active}
        suspended={stats.suspended}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <UserFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          roles={roles}
          statuses={statuses}
        />

        <UserTable
          users={filteredUsers}
          onToggleStatus={handleToggleStatus}
          onDeleteUser={handleDeleteUser}
        />
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={fetchUsers}
      />
    </>
  );
}

