import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

export default function ProfileScreen() {
  const { user, token, logout, updateUser } = useAuth();

  // Modal ve Form durumları
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  // İsim ve soyismin baş harflerini alan yardımcı fonksiyon
  const getInitials = (name?: string) => {
    if (!name) return 'SM';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Modal açıldığında mevcut bilgileri form alanlarına doldur
  const handleOpenEditModal = () => {
    const nameParts = (user?.name || '').split(' ');
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setDepartment(user?.department || 'Bilgisayar Mühendisliği');
    setIsModalVisible(true);
  };

  // Profil güncelleme API isteği
  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Eksik Bilgi', 'Ad ve soyad alanları boş bırakılamaz.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          department: department.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok || response.status === 200) {
        const updatedFullName = `${firstName.trim()} ${lastName.trim()}`;
        await updateUser({
          name: updatedFullName,
          department: department.trim(),
        });

        Alert.alert('Başarılı', 'Profil bilgileriniz başarıyla güncellendi.');
        setIsModalVisible(false);
      } else {
        Alert.alert('Güncelleme Başarısız', data.message || 'Profil güncellenirken bir sorun oluştu.');
      }
    } catch (error) {
      const updatedFullName = `${firstName.trim()} ${lastName.trim()}`;
      await updateUser({
        name: updatedFullName,
        department: department.trim(),
      });

      Alert.alert('Bilgi', 'Profil bilgileriniz yerel olarak güncellendi.');
      setIsModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Üst Bar: Geri Butonu, Logo ve Ayarlar */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.circleButton} onPress={() => router.push('/')}>
            <Ionicons name="arrow-back" size={20} color="#0F2C3D" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoIconText}>S</Text>
            </View>
            <Text style={styles.logoTitle}>StudyMate</Text>
          </View>

          <TouchableOpacity style={styles.circleButton} onPress={() => Alert.alert('Ayarlar', 'Ayarlar yakında eklenecek.')}>
            <Ionicons name="settings-outline" size={20} color="#0F2C3D" />
          </TouchableOpacity>
        </View>

        {/* Sadeleştirilmiş Dinamik Avatar Alanı */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarOuterCircle}>
            <View style={styles.avatarInnerCircle}>
              <Text style={styles.avatarInitialsText}>{getInitials(user?.name)}</Text>
            </View>
          </View>

          {/* İsim, E-posta ve Bölüm Bilgisi */}
          <Text style={styles.userNameText}>{user?.name || 'Kullanıcı'}</Text>
          <Text style={styles.userEmailText}>{user?.email || '@kullanici'}</Text>
          <Text style={styles.userDeptText}>{user?.department || 'Bilgisayar Mühendisliği'}</Text>
        </View>

        {/* Menü Seçenekleri Kartı */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuRow} onPress={handleOpenEditModal}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person" size={18} color="#1A9893" />
            </View>
            <Text style={styles.menuText}>Profil Düzenle</Text>
            <Ionicons name="chevron-forward" size={18} color="#8A9A9D" />
          </TouchableOpacity>
        </View>

        {/* Çıkış Yap Butonu */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Profili Düzenle Modal Formu */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profili Düzenle</Text>

            <Text style={styles.inputLabel}>Ad</Text>
            <TextInput style={styles.modalInput} value={firstName} onChangeText={setFirstName} placeholder="Adınız" />

            <Text style={styles.inputLabel}>Soyad</Text>
            <TextInput style={styles.modalInput} value={lastName} onChangeText={setLastName} placeholder="Soyadınız" />

            <Text style={styles.inputLabel}>Bölüm</Text>
            <TextInput style={styles.modalInput} value={department} onChangeText={setDepartment} placeholder="Bölümünüz" />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsModalVisible(false)}
                disabled={loading}
              >
                <Text style={styles.cancelBtnText}>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={handleSaveProfile} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Kaydet</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E4F2EE' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 16, flexGrow: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  circleButton: {
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
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#0F2C3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoIconText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  logoTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F2C3D' },

  // Avatar Bölümü
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarOuterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#CDE8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarInnerCircle: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#1A9893',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitialsText: { color: '#FFF', fontSize: 38, fontWeight: 'bold', letterSpacing: 1 },
  userNameText: { fontSize: 26, fontWeight: 'bold', color: '#0F2C3D', marginBottom: 4 },
  userEmailText: { fontSize: 14, color: '#5C7074', marginBottom: 2 },
  userDeptText: { fontSize: 13, color: '#1A9893', fontWeight: '600' },

  // Kart Yapısı
  card: {
    backgroundColor: '#F3F9F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E1EFEA',
    marginBottom: 24,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E1EFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#0F2C3D' },

  // Çıkış Butonu
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#0B4754',
    borderRadius: 20,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 12,
  },
  logoutButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#0F2C3D', textAlign: 'center' },
  inputLabel: { fontSize: 12, color: '#5C7074', marginBottom: 4, marginTop: 8 },
  modalInput: { borderWidth: 1, borderColor: '#C8DDD7', borderRadius: 12, padding: 12, fontSize: 15, backgroundColor: '#F3F9F7' },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  modalBtn: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 4 },
  cancelBtn: { backgroundColor: '#E4F2EE' },
  cancelBtnText: { color: '#0F2C3D', fontWeight: '600' },
  saveBtn: { backgroundColor: '#0B4754' },
  saveBtnText: { color: '#FFF', fontWeight: '600' },
});