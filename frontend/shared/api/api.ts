import { Complect, Customer, Order, User } from "../types";

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
  // запрос на получение справочника заказчиков
  getAllCustomersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
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
      console.error("Get customers request failed:", error);
      throw error;
    }
  };
  // запрос на получение заказчика по id
  getCustomerByIdRequest = async (id: number, token:string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${id}`, {
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
      console.error("Get customers request failed:", error);
      throw error;
    }
  };

  //запрос на создание заказчика 
  createCustomerRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
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
      console.error("Create customer request failed:", error);
      throw error;
    }
  };
  // запрос на обновление заказчика
  updateCustomerRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Customer ID is required for updating");
    }
  
    try {
      const response = await fetch(`${this.baseUrl}/customers/${input.id}`, {
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
      console.error("Update customer request failed:", error);
      throw error;
    }
  };
  // запрос на удаление заказчика
  deleteCustomerRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${id}`, {
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
      console.error("Delete customer request failed:", error);
      throw error;
    }
  }
    getAllOrdersRequest = async (token: string) => {
      try {
        const response = await fetch(`${this.baseUrl}/orders`, {
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
        console.error("Get orders request failed:", error);
        throw error;
      }
    };
  // запрос на получение заказа по id
    getOrderByIdRequest = async (id: number, token:string) => {
      try {
        const response = await fetch(`${this.baseUrl}/orders/${id}`, {
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
        console.error("Get order request failed:", error);
        throw error;
      }
    };
// запрос на обновление заказа
updateOrderRequest = async (input: Order, token: string) => {
  if (!input.id) {
    throw new Error("Order ID is required for updating");
  }

  try {
    const response = await fetch(`${this.baseUrl}/orders/${input.id}`, {
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
    console.error("Update order request failed:", error);
    throw error;
  }
};
//запрос на создание заказчика 
createOrderRequest = async (input: Order, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/orders`, {
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
    console.error("Create order request failed:", error);
    throw error;
  }
};
 // запрос на удаление заказчика
 deleteOrderRequest = async (id: number, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/orders/${id}`, {
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
    console.error("Delete order request failed:", error);
    throw error;
  }
}
 // запрос на получение комплекта по id
 getComplectByIdRequest = async (id: number, token:string) => {
  try {
    const response = await fetch(`${this.baseUrl}/complects/${id}`, {
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
    console.error("Get complect request failed:", error);
    throw error;
  }
};
// запрос на обновление комплекта
updateComplectRequest = async (input: Complect, token: string) => {
  if (!input.id) {
    throw new Error("Order ID is required for updating");
  }

  try {
    const response = await fetch(`${this.baseUrl}/complects/${input.id}`, {
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
    console.error("Update complect request failed:", error);
    throw error;
  }
};
//запрос на создание комплекта
createComplectRequest = async (input: Complect, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/complects`, {
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
    console.error("Create complect request failed:", error);
    throw error;
  }
};
 // запрос на удаление комплекта
 deleteComplectRequest = async (id: number, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/complects/${id}`, {
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
    console.error("Delete order request failed:", error);
    throw error;
  }
}
// запрос на получение справочника вида оборудования
getAllEquipmentTypesRequest = async (token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/equipment-types`, {
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
    console.error("Get equipment-types request failed:", error);
    throw error;
  }
};
// запрос на получение вида оборудования по id
getEquipmentTypeByIdRequest = async (id: number, token:string) => {
  try {
    const response = await fetch(`${this.baseUrl}/equipment-types/${id}`, {
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
    console.error("Get equipment-types request failed:", error);
    throw error;
  }
};

//запрос на создание вида оборудования 
createEquipmentTypeRequest = async (input: Customer, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/equipment-types`, {
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
    console.error("Create equipment-types request failed:", error);
    throw error;
  }
};
// запрос на обновление вида оборудования
updateEquipmentTypeRequest = async (input: Customer, token: string) => {
  if (!input.id) {
    throw new Error("Equipment type ID is required for updating");
  }

  try {
    const response = await fetch(`${this.baseUrl}/equipment-types/${input.id}`, {
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
    console.error("Update equipment-types request failed:", error);
    throw error;
  }
};
// запрос на удаление вида оборудования
deleteEquipmentTypeRequest = async (id: number, token: string) => {
  try {
    const response = await fetch(`${this.baseUrl}/equipment-types/${id}`, {
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
    console.error("Delete customer request failed:", error);
    throw error;
  }
}
}

export const api = new API('http://localhost:4000');

// export const api = new API('https://api.pvb-university.com');
