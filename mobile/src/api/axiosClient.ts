import axios from 'axios';
import { Platform } from 'react-native';

// Android emulator accesses host machine at 10.0.2.2; iOS uses localhost
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/v1' : 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
