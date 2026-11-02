import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../config/api';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Şifre Uyuşmazlığı', 'Girdiğiniz şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Tebrikler!', 'Kayıt başarılı. Giriş yapabilirsiniz.', [
          { text: 'Tamam', onPress: () => router.replace('/login') },
        ]);
      } else {
        Alert.alert('Kayıt Başarısız', data.message || 'Kayıt olunurken bir hata oluştu.');
      }
    } catch (error) {
      Alert.alert('Bağlantı Hatası', 'Sunucuya ulaşılamadı. Sunucunuzun açık olduğundan emin olun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Üst Bar: Geri Butonu ve Logo */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/welcome')}>
            <Ionicons name="arrow-back" size={20} color="#0F2C3D" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>S</Text>
            </View>
            <Text style={styles.logoTitle}>StudyMate</Text>
          </View>
        </View>

        {/* Başlık ve Alt Başlık */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>
            Hesap <Text style={styles.highlightTitle}>Oluştur</Text>
          </Text>
          <Text style={styles.subtitle}>Daha verimli bir ders çalışma deneyimi için hemen kayıt ol!</Text>
        </View>

        {/* Beyaz Form Kartı */}
        <View style={styles.card}>
          {/* Adınız Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#0F2C3D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Adınız"
              placeholderTextColor="#8A9A9D"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Soyadınız Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#0F2C3D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Soyadınız"
              placeholderTextColor="#8A9A9D"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* E-posta Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#0F2C3D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta adresi"
              placeholderTextColor="#8A9A9D"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Şifre Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#0F2C3D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#8A9A9D"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#8A9A9D"
              />
            </TouchableOpacity>
          </View>

          {/* Şifre Tekrar Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#0F2C3D" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifreyi Tekrar Girin"
              placeholderTextColor="#8A9A9D"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#8A9A9D"
              />
            </TouchableOpacity>
          </View>

          {/* Hesap Oluştur Butonu */}
          <TouchableOpacity style={styles.submitButton} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.buttonTextRow}>
                <Text style={styles.submitButtonText}>Hesap Oluştur</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 6 }} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Ayrım Çizgisi */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>veya</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Sosyal Kayıt Butonları */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={18} color="#DB4437" />
            <Text style={styles.socialButtonText}>Google ile Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Apple ile Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        {/* Giriş Yap Yönlendirmesi */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Zaten hesabın var mı? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.bottomLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4F2EE' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16, flexGrow: 1, justifyContent: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 42 },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0F2C3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoIconText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  logoTitle: { fontSize: 22, fontWeight: 'bold', color: '#0F2C3D' },
  titleContainer: { alignItems: 'center', marginBottom: 20 },
  mainTitle: { fontSize: 30, fontWeight: 'bold', color: '#0F2C3D' },
  highlightTitle: { color: '#1A9893' },
  subtitle: { fontSize: 14, color: '#5C7074', marginTop: 6, textAlign: 'center' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F9F7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E1EFEA',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#0F2C3D' },
  submitButton: {
    backgroundColor: '#0B4754',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonTextRow: { flexDirection: 'row', alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#C8DDD7' },
  dividerText: { marginHorizontal: 12, color: '#5C7074', fontSize: 13 },
  socialContainer: { gap: 10 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F9F7',
    borderRadius: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E1EFEA',
    gap: 8,
  },
  socialButtonText: { fontSize: 14, fontWeight: '600', color: '#0F2C3D' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 10 },
  bottomText: { color: '#5C7074', fontSize: 14 },
  bottomLink: { color: '#1A9893', fontWeight: 'bold', fontSize: 14 },
});