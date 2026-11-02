import Constants from 'expo-constants';

// Expo Go'nun bağlandığı bilgisayar IP'sini dinamik olarak alır.
// Böylece WiFi/IP adresin değişse bile elle IP güncellemek zorunda kalmazsın!
const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost ? debuggerHost.split(':').shift() : 'localhost';

export const API_BASE_URL = `http://${localhost}:5000/api`;