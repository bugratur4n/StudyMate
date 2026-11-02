import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop',
        }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.18 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Üst Logo ve Slogan */}
            <View style={styles.logoSection}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>S</Text>
              </View>
              <Text style={styles.brandTitle}>
                Study<Text style={styles.brandTitleHighlight}>Mate</Text>
              </Text>
              <Text style={styles.sloganText}>Birlikte öğren, birlikte başar!</Text>
              <View style={styles.sloganUnderline} />
            </View>

            {/* Geliştirilmiş Kahve Kupası ve Kitap İllüstrasyonu */}
            <View style={styles.illustrationSection}>
              {/* Sol Kep İkonu */}
              <Ionicons
                name="school-outline"
                size={34}
                color="rgba(255,255,255,0.35)"
                style={styles.sideIconLeft}
              />

              {/* Merkez İllüstrasyon */}
              <View style={styles.centerGraphic}>
                {/* Kahve Buharı / Kıvılcımlar */}
                <View style={styles.steamContainer}>
                  <View style={[styles.steamLine, { transform: [{ rotate: '-15deg' }] }]} />
                  <View style={styles.steamLine} />
                  <View style={[styles.steamLine, { transform: [{ rotate: '15deg' }] }]} />
                </View>

                {/* Geliştirilmiş Kahve Kupası */}
                <View style={styles.mugWrapper}>
                  <View style={styles.mugContainer}>
                    {/* Fincanın Ağız Kısmı (Derinlik için) */}
                    <View style={styles.mugRim} />
                    <Text style={styles.mugLogoText}>S</Text>
                  </View>
                  {/* Fincanın Kulpu (Mug Handle) */}
                  <View style={styles.mugHandle} />
                </View>

                {/* Katmanlı ve Renkli Kitap Yığını */}
                {/* 1. Kitap (Mavi/Yeşil) */}
                <View style={[styles.book, styles.topBook]}>
                  <View style={styles.bookSpine} />
                  <View style={styles.bookPages} />
                </View>
                {/* 2. Kitap (Turuncu/Kiremit) */}
                <View style={[styles.book, styles.middleBook]}>
                  <View style={styles.bookSpine} />
                  <View style={styles.bookPages} />
                </View>
                {/* 3. Kitap (Koyu Mavi/Teal) */}
                <View style={[styles.book, styles.bottomBook]}>
                  <View style={styles.bookSpine} />
                  <View style={styles.bookPages} />
                </View>
              </View>

              {/* Sağ Pano İkonu */}
              <Ionicons
                name="clipboard-outline"
                size={34}
                color="rgba(255,255,255,0.35)"
                style={styles.sideIconRight}
              />
            </View>

            {/* Açıklama */}
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionText}>
                Üniversite hayatında{'\n'}
                verimli bir ders çalışma deneyimi için{'\n'}
                <Text style={styles.highlightText}>StudyMate</Text> seninle!
              </Text>
            </View>

            {/* Butonlar */}
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
                <Ionicons name="arrow-forward" size={20} color="#0B202B" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => router.push('/register')}
              >
                <Text style={styles.registerButtonText}>Kayıt Ol</Text>
              </TouchableOpacity>
            </View>

            {/* Alt Süsleme */}
            <View style={styles.footerDecoration}>
              <View style={styles.footerLine} />
              <Ionicons
                name="school-outline"
                size={16}
                color="rgba(255,255,255,0.3)"
                style={{ marginHorizontal: 12 }}
              />
              <View style={styles.footerLine} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A24',
  },
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  // Üst Kısım
  logoSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  logoIcon: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#0E2E3D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1F4D63',
    marginBottom: 16,
    elevation: 4,
  },
  logoIconText: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  brandTitleHighlight: {
    color: '#73E2D0',
  },
  sloganText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 8,
    fontWeight: '500',
  },
  sloganUnderline: {
    width: 100,
    height: 3,
    backgroundColor: '#73E2D0',
    borderRadius: 2,
    marginTop: 6,
  },

  // Geliştirilmiş Kahve Kupası & Kitap İllüstrasyonu
  illustrationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  sideIconLeft: {
    marginRight: 14,
    marginTop: -20,
  },
  sideIconRight: {
    marginLeft: 14,
    marginTop: -20,
  },
  centerGraphic: {
    alignItems: 'center',
  },
  steamContainer: {
    flexDirection: 'row',
    height: 12,
    alignItems: 'flex-end',
    marginBottom: 4,
    gap: 4,
  },
  steamLine: {
    width: 2.5,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1,
  },
  mugWrapper: {
    position: 'relative',
    alignItems: 'center',
    zIndex: 3,
    marginBottom: -4,
  },
  mugContainer: {
    width: 38,
    height: 34,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  mugRim: {
    position: 'absolute',
    top: 0,
    width: 38,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mugLogoText: {
    color: '#091A24',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 3,
  },
  mugHandle: {
    position: 'absolute',
    right: -10,
    top: 6,
    width: 13,
    height: 20,
    borderWidth: 3.5,
    borderColor: '#FFF',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'transparent',
    borderLeftWidth: 0,
  },

  // Kitap Yığını
  book: {
    height: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1.5,
    paddingHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  bookSpine: {
    width: 8,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  bookPages: {
    width: '85%',
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 2,
    opacity: 0.9,
  },
  topBook: {
    width: 124,
    backgroundColor: '#1E7C83', // Mavi/Yeşil
    zIndex: 2,
  },
  middleBook: {
    width: 144,
    backgroundColor: '#D97706', // Turuncu/Kiremit
    zIndex: 1,
  },
  bottomBook: {
    width: 160,
    backgroundColor: '#114B5F', // Koyu Teal
    height: 24,
    zIndex: 0,
  },

  // Açıklama
  descriptionSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  descriptionText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  highlightText: {
    color: '#73E2D0',
    fontWeight: 'bold',
  },

  // Butonlar
  buttonSection: {
    gap: 14,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#73E2D0',
    borderRadius: 28,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  loginButtonText: {
    color: '#0B202B',
    fontSize: 17,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#73E2D0',
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // Alt Kısım Süsleme
  footerDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  footerLine: {
    flex: 0.25,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});