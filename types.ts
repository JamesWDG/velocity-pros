
export enum UserRole {
  USER = 'USER',
  APPRAISER = 'APPRAISER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export enum ClaimStatus {
  PENDING = 'Pending',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected'
}

export interface Claim {
  id: string;
  userId: string;
  appraiserId?: string;
  title: string;
  description: string;
  status: ClaimStatus;
  createdAt: string;
  amount?: number;
  documents: string[];
  aiSummary?: string;
  category: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}
