import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
  try {
    const url = `${API_URL}/api/usuarios`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${API_URL}/api/auth/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function GetUserApi(id) {
  const url = ``;
  try {
    const response = await fetch(`${API_URL}/api/usuarios/${id}`);
    
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }

  
}
