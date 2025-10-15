export interface EndpointConfig {
  route: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description?: string;
}

export interface EndpointGroup {
  [key: string]: EndpointConfig;
}

export interface Endpoints {
  auth: EndpointGroup;
  user: EndpointGroup;
  income: EndpointGroup;
}

export const endpoints: Endpoints = {
  auth: {
    login: {
      route: "/api/auth/login",
      method: "POST",
      description: "User login"
    },
    logout: {
      route: "/api/auth/logout", 
      method: "POST",
      description: "User logout"
    },
    validate: {
      route: "/api/auth/validate",
      method: "GET",
      description: "Validate JWT token"
    },
    resetPassword: {
      route: "/api/auth/reset-password",
      method: "POST",
      description: "Reset user password"
    }
  },
  user: {
    create: {
      route: "/api/users",
      method: "POST",
      description: "Create new user"
    },
    getAll: {
      route: "/api/users",
      method: "GET", 
      description: "Get all users"
    },
    getById: {
      route: "/api/users/:id",
      method: "GET",
      description: "Get user by ID"
    },
    delete: {
      route: "/api/users/:id",
      method: "DELETE",
      description: "Delete user by ID"
    }
  },
  income: {
    create: {
      route: "/api/users/:userId/incomeSources",
      method: "POST",
      description: "Create income source for user"
    },
    update: {
      route: "/api/users/:userId/incomeSources/:incomeSourceId",
      method: "PATCH",
      description: "Update income source"
    },
    delete: {
      route: "/api/users/:userId/incomeSources/:incomeSourceId",
      method: "DELETE",
      description: "Delete income source"
    },
    getAll: {
      route: "/api/users/:userId/incomeSources",
      method: "GET",
      description: "Get all income sources for user"
    }
  }
};

// Utility functions for easier access
export const getEndpoint = (group: keyof Endpoints, action: string): EndpointConfig | undefined => {
  return endpoints[group]?.[action];
};

export const getAllEndpoints = (): EndpointConfig[] => {
  return Object.values(endpoints).flatMap(group => Object.values(group));
};

export const getEndpointsByGroup = (group: keyof Endpoints): EndpointConfig[] => {
  return Object.values(endpoints[group] || {});
};

// Helper for route building with parameters
export const buildRoute = (endpoint: EndpointConfig, params: Record<string, string> = {}): string => {
  let route = endpoint.route;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`:${key}`, value);
  });
  return route;
};