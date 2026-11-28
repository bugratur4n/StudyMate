import { Platform } from 'react-native';

export const API_URL = 'http://192.168.1.37:3000/api';

export async function apiRequest(
  endpoint: string,
  token?: string,
  method: 'GET' | 'POST' | 'PATCH' = 'GET',
  body?: object
) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API isteği başarısız.');
  }

  return data;
}
