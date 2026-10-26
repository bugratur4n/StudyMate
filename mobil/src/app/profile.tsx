import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleLogout = () => {
    // 2. Haftada Token/Session temizleme burada yapılacak
    router.replace('/welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Profili</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ad Soyad:</Text>
        <Text style={styles.value}>Öğrenci Adı</Text>

        <Text style={styles.label}>E-posta:</Text>
        <Text style={styles.value}>ogrenci@firat.edu.tr</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
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
  button: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});