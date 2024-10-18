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

export type EquipmentType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Complect = {
  id: number;
  name: string;
  equipmentType: EquipmentType;
  manufacturer: string;
  technicalSpecifications: string;
  brand: string;
  model: string;
  diameter: number; 
  workingPressure: number; 
  ballType: string;
  seatType: string;
  execution: string;
  trTs: string;
  startDate?: Date; // Дата старта, может быть не указана
  acceptanceStartDate?: Date; // Дата старта приемки, может быть не указана
  documentReadinessDate?: Date; // Дата готовности документов, может быть не указана
  shipmentDate?: Date; // Дата отгрузки, может быть не указана
  order: Order;
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
  complects: Complect[];
  createdAt: Date;
  updatedAt: Date;
};