import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/welcome');
  };
  
  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <Text style={styles.backButtonText}>← Ana Sayfaya Dön</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Kullanıcı Profili</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Kullanıcı Adı:</Text>
        <Text style={styles.value}>{user?.name || 'Öğrenci'}</Text>

        <Text style={styles.label}>E-posta:</Text>
        <Text style={styles.value}>{user?.email || 'ogrenci@firat.edu.tr'}</Text>

        <Text style={styles.label}>Bölüm:</Text>
        <Text style={styles.value}>{user?.department || 'Bilgisayar Mühendisliği'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#5B67EA',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B67EA',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  label: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});