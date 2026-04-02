'use client';

import { useMemo, useState } from 'react';
import { DashboardHeader } from '../_components/DashboardHeader';
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
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">
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
          </div>
        </div>
      </main>
    </div>
  );
}
