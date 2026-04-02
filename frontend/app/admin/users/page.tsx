'use client';

import { useMemo, useState } from 'react';
import { UserHeader } from './_components/UserHeader';
import { UserStatsGrid } from './_components/UserStatsGrid';
import { UserFilters } from './_components/UserFilters';
import { UserTable } from './_components/UserTable';
import { users } from '@/data/user';

const roles = ['Admin', 'Manager', 'Customer'];
const statuses = ['Active', 'Suspended'];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        !searchQuery ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const roleMatch =
        selectedRole === 'All Roles' || user.role === selectedRole;

      const statusMatch =
        selectedStatus === 'All Statuses' || user.status === selectedStatus;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [searchQuery, selectedRole, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'Active' && u.role === 'Customer').length,
      managers: users.filter(u => u.role === 'Manager' || u.role === 'Admin').length,
      suspended: users.filter(u => u.status === 'Suspended').length,
    };
  }, []);

  return (
    <>
      <UserHeader />
      
      <UserStatsGrid
        total={stats.total}
        active={stats.active}
        managers={stats.managers}
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
        />
      </div>
    </>
  );
}

