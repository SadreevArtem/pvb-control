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
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};