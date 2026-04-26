const BASE_URL = "http://localhost:8080";



const getToken = () => sessionStorage.getItem("token");

const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};


const safeParse = async (res: Response) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};


const request = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, options);

  const data = await safeParse(res);

  if (!res.ok) {
    // handle auth errors globally
    if (res.status === 401 || res.status === 403) {
      handleAuthError();
    }

    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
};


export const registerUser = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  console.log("REGISTER API CALL:", data);

  const result = await request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("REGISTER RESPONSE:", result);

  if (!result?.token) {
    throw new Error("Registration failed (no token)");
  }

  
  sessionStorage.setItem("token", result.token);
  sessionStorage.setItem("role", result.role);

  return result;
};


export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  console.log("LOGIN API CALL:", data);

  const result = await request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("LOGIN RESPONSE:", result);

  if (!result?.token) {
    throw new Error("Invalid credentials");
  }

  
  sessionStorage.setItem("token", result.token);
  sessionStorage.setItem("role", result.role);

  return result;
};


export const getLoans = async () => {
  return await request("/loans", {
    headers: getAuthHeaders(),
  });
};


export const createLoan = async (loan: any) => {
  return await request("/loans", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(loan),
  });
};


export const logout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};


const handleAuthError = () => {
  console.warn("Auth expired. Logging out...");
  logout();
};