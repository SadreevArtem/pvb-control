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