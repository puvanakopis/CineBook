export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Customer';
  status: 'Active' | 'Suspended';
  joinDate: string;
  totalBookings: number;
  lastActive: string;
}
