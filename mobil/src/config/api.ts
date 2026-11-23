import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Expo Go'nun bağlandığı bilgisayar IP'sini dinamik olarak alır.
// Web'de ise doğrudan localhost kullanır.
const debuggerHost = Constants.expoConfig?.hostUri;
const lanIp = debuggerHost ? debuggerHost.split(':').shift() : 'localhost';

const host = Platform.OS === 'web' ? 'localhost' : lanIp;

export const API_BASE_URL = `http://${host}:3000/api`;