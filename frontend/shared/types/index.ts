export enum UserRole {
    ADMIN = 'admin',
    TENDER_MANAGER = 'tender_manager',
    PLANNER_MANAGER = 'planner_manager',
    PRODUCTION_MANAGER = 'production_manager',
    CONTROL_MANAGER = 'control_manager',
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