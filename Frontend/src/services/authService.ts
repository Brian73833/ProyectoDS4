import type { User } from "../models/responses/User";
import { config } from "../config";

interface AuthApiResponse {
  bearerToken: string;
  expiresIn: string;
  user: {
    userResourceId: string;
    name: string;
    email: string;
    roles: string[];
  };
}

function mapAuthResponse(data: AuthApiResponse): User {
  return {
    userResourceId: data.user.userResourceId,
    name: data.user.name,
    email: data.user.email,
    roles: data.user.roles,
    token: data.bearerToken,
  };
}

async function parseErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return typeof data === "string"
        ? data
        : data.message || data.title || JSON.stringify(data);
    } else {
      return await response.text();
    }
  } catch {
    return "Error desconocido del servidor";
  }
}

export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al iniciar sesión");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};

export const registerUser = async (signUpData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await fetch(`${config.api.url}/api/authorization/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpData),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message || "Error al registrarse");
  }

  const data: AuthApiResponse = await response.json();
  return mapAuthResponse(data);
};
