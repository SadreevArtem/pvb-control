import { User } from "../types";

class API {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Асинхронный метод для авторизации
  signInRequest = async (input: { username: string; password: string }) => {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json(); 
    } catch (error) {
      console.error("Sign-in request failed:", error);
      throw error;
    }
  };

  // Асинхронный метод для получения всех пользователей
  getAllUsersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json(); 
    } catch (error) {
      console.error("Get users request failed:", error);
      throw error;
    }
  };
  // запрос на получение данных пользователя по id
  getUserByIdAdminRequest = async (id: number, token:string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json(); 
    } catch (error) {
      console.error("Get users request failed:", error);
      throw error;
    }
  };
  createUserRequest = async (input: User, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create user request failed:", error);
      throw error;
    }
  };
  updateUserRequest = async (input: User, token: string) => {
    if (!input.id) {
      throw new Error("User ID is required for updating");
    }
  
    try {
      const response = await fetch(`${this.baseUrl}/users/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Update user request failed:", error);
      throw error;
    }
  };
  deleteUserRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Delete user request failed:", error);
      throw error;
    }
  };
  
}

export const api = new API('http://localhost:4000');
