export enum UserRole {
    ADMIN = 'admin',
    TENDER_MANAGER = 'tender_manager',
    PLANNER_MANAGER = 'planner_manager',
    PRODUCTION_MANAGER = 'production_manager',
    CONTROL_MANAGER = 'control_manager',
}

  
export enum OrderStatus {
  IN_PROGRESS = 'in_progress',
  INSPECTION = 'inspection',
  COMPLETED = 'completed',  
  CANCELLED = 'cancelled',
}

export type User = {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TJwtPayload = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

export type Customer = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: number;
  contractNumber: string;
  contractSigningDate: Date;
  contractExecutionDate: Date;
  contractText: string;
  complectID: string;
  complectName: string;
  status: OrderStatus;
  customer: Customer;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};