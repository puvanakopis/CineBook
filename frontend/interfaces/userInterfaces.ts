export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  isActive: boolean;
  createdAt: string;
  totalBookings?: number;
  lastActive?: string;
  phone?: string;
  profilePicture?: string;
}