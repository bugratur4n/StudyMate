import { router, useLocalSearchParams, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const departments = [
  {
    name: 'Bilgisayar Mühendisliği',
    description: 'Derslerini keşfet ve çalışma arkadaşını bul.',
    icon: '💻',
    courses: '32 ders',
  },
];

const howItWorks = [
  {
    number: '01',
    title: 'Dersini seç',
    description: 'Çalışmak istediğin dersi belirle.',
    icon: '📚',
  },
  {
    number: '02',
    title: 'Tercihlerini belirle',
    description: 'Seviyeni ve çalışma tarzını seç.',
    icon: '⚙️',
  },
  {
    number: '03',
    title: 'Eşleşmeni bul',
    description: 'Sana uygun öğrencilerle eşleş.',
    icon: '✦',
  },
  {
    number: '04',
    title: 'Birlikte çalış',
    description: '20 dakikalık oturumla başla.',
    icon: '🤝',
  },
];

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  // Oturum açılmadıysa Welcome ekranına yönlendir
  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }
  
  const [showSubscription, setShowSubscription] = React.useState(false);

  const handleDepartmentSelect = () => {
    router.push('/classes');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandArea}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>S</Text>
            </View>

            <View>
              <Text style={styles.logo}>StudyMate</Text>
              
              <Text style={styles.logoSub}>
                Study smarter. Together.
              </Text>
            </View>
          </View>
          
          {/* MEVCUT HEADER'IN SAĞINA EKLENEN PROFİL BUTONU */}
          <TouchableOpacity 
            style={styles.profileIconButton}
            onPress={() => router.push('/profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.profileIconText}>👤 Profil</Text>
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <View style={styles.heroTop}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                STUDYMATE
              </Text>
            </View>

            {/* BURASI 01 */}
            <Text style={styles.heroNumber}>
              01
            </Text>
          </View>

          <View style={styles.heroVisual}>
            <View style={styles.heroPersonLeft}>
              <View style={styles.personAvatar}>
                <Text style={styles.personEmoji}>
                  👩🏻‍💻
                </Text>
              </View>

              <View style={styles.personLine} />
            </View>

            <View style={styles.matchCenter}>
              <View style={styles.matchIcon}>
                <Text style={styles.matchIconText}>
                  ✦
                </Text>
              </View>

              <Text style={styles.matchScore}>
                %87
              </Text>

              <Text style={styles.matchLabel}>
                UYUM
              </Text>
            </View>

            <View style={styles.heroPersonRight}>
              <View style={styles.personLine} />

              <View style={styles.personAvatar}>
                <Text style={styles.personEmoji}>
                  👨🏻‍💻
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.heroEyebrow}>
            STUDY TOGETHER
          </Text>

          <Text style={styles.heroTitle}>
            Sana uygun
            {'\n'}
            <Text style={styles.heroTitleLight}>
              çalışma arkadaşını bul.
            </Text>
          </Text>

          <Text style={styles.heroDescription}>
            Dersini seç, tercihlerini belirle ve
            doğru öğrencilerle eşleş.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.heroButton,
              pressed && styles.heroButtonPressed,
            ]}
            onPress={handleDepartmentSelect}
          >
            <Text style={styles.heroButtonText}>
              Eşleşmeye Başla
            </Text>

            <Text style={styles.heroButtonArrow}>
              →
            </Text>
          </Pressable>
        </View>

        {/* PLAN CARD */}
        <View style={styles.planCard}>
          <View style={styles.planIcon}>
            <Text style={styles.planIconText}>
              ✦
            </Text>
          </View>

          <View style={styles.planContent}>
            <View style={styles.planTitleRow}>
              <Text style={styles.planLabel}>
                ÜCRETSİZ PLAN
              </Text>

              <View style={styles.planStatus}>
                <View style={styles.statusDot} />

                <Text style={styles.statusText}>
                  Aktif
                </Text>
              </View>
            </View>

            <Text style={styles.planTitle}>
              Günlük 3 ücretsiz oturum hakkın var
            </Text>

            <Text style={styles.planDescription}>
              Her oturumda 20 dakika ücretsiz çalışma.
            </Text>
          </View>

          {/* YÖNET BUTONU */}
          <Pressable
            style={({ pressed }) => [
              styles.planButton,
              pressed && styles.planButtonPressed,
            ]}
            onPress={() =>
              setShowSubscription((prev) => !prev)
            }
          >
            <Text style={styles.planButtonText}>
              Yönet
            </Text>

            <Text style={styles.planButtonArrow}>
              {showSubscription ? '↑' : '→'}
            </Text>
          </Pressable>
        </View>

        {/* SUBSCRIPTION MANAGEMENT */}
        {showSubscription && (
          <View style={styles.subscriptionManagement}>
            <View style={styles.subscriptionHeader}>
              <View>
                <Text style={styles.subscriptionEyebrow}>
                  ABONELİK YÖNETİMİ
                </Text>

                <Text style={styles.subscriptionTitle}>
                  Ücretsiz planın
                </Text>
              </View>

              <View style={styles.subscriptionActiveBadge}>
                <View style={styles.subscriptionActiveDot} />

                <Text style={styles.subscriptionActiveText}>
                  Aktif
                </Text>
              </View>
            </View>

            <View style={styles.subscriptionStats}>
              <View style={styles.subscriptionStat}>
                <Text style={styles.subscriptionStatValue}>
                  1 / 3
                </Text>

                <Text style={styles.subscriptionStatLabel}>
                  Bugün kullanılan
                </Text>
              </View>

              <View style={styles.subscriptionStatDivider} />

              <View style={styles.subscriptionStat}>
                <Text style={styles.subscriptionStatValue}>
                  2
                </Text>

                <Text style={styles.subscriptionStatLabel}>
                  Kalan oturum
                </Text>
              </View>

              <View style={styles.subscriptionStatDivider} />

              <View style={styles.subscriptionStat}>
                <Text style={styles.subscriptionStatValue}>
                  20 dk
                </Text>

                <Text style={styles.subscriptionStatLabel}>
                  Oturum süresi
                </Text>
              </View>
            </View>

            <View style={styles.premiumBox}>
              <View style={styles.premiumTop}>
                <View style={styles.premiumTopText}>
                  <Text style={styles.premiumLabel}>
                    PREMIUM
                  </Text>

                  <Text style={styles.premiumTitle}>
                    Daha uzun ve sınırsız çalış.
                  </Text>
                </View>

                <View style={styles.premiumIcon}>
                  <Text style={styles.premiumIconText}>
                    ✦
                  </Text>
                </View>
              </View>

              <View style={styles.premiumFeatureRow}>
                <Text style={styles.premiumCheck}>
                  ✓
                </Text>

                <Text style={styles.premiumFeature}>
                  Sınırsız eşleşme
                </Text>
              </View>

              <View style={styles.premiumFeatureRow}>
                <Text style={styles.premiumCheck}>
                  ✓
                </Text>

                <Text style={styles.premiumFeature}>
                  Daha uzun çalışma oturumları
                </Text>
              </View>

              <View style={styles.premiumFeatureRow}>
                <Text style={styles.premiumCheck}>
                  ✓
                </Text>

                <Text style={styles.premiumFeature}>
                  Grup çalışması
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.premiumButton,
                  pressed && styles.premiumButtonPressed,
                ]}
              >
                <Text style={styles.premiumButtonText}>
                  Premium'a Geç
                </Text>

                <Text style={styles.premiumButtonArrow}>
                  →
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* HOW IT WORKS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>
              NASIL ÇALIŞIR?
            </Text>

            <Text style={styles.sectionTitle}>
              4 adımda StudyMate
            </Text>
          </View>

          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>
              01 / 04
            </Text>
          </View>
        </View>

        <Text style={styles.sectionDescription}>
          Doğru çalışma arkadaşını bulmak için
          sadece birkaç adım yeterli.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stepsScroll}
          decelerationRate="fast"
        >
          {howItWorks.map((item) => (
            <View
              key={item.number}
              style={styles.stepCard}
            >
              <View style={styles.stepTop}>
                <Text style={styles.stepNumber}>
                  {item.number}
                </Text>

                <View style={styles.stepIcon}>
                  <Text style={styles.stepIconText}>
                    {item.icon}
                  </Text>
                </View>
              </View>

              <Text style={styles.stepTitle}>
                {item.title}
              </Text>

              <Text style={styles.stepDescription}>
                {item.description}
              </Text>

              <View style={styles.stepLine}>
                <View style={styles.stepLineFill} />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* MATCH PREVIEW */}
        <View style={styles.previewHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>
              ÖRNEK EŞLEŞME
            </Text>

            <Text style={styles.previewTitle}>
              Sana uygun biri bulundu.
            </Text>
          </View>

          <View style={styles.previewPercent}>
            <Text style={styles.previewPercentText}>
              %87
            </Text>
          </View>
        </View>

        <View style={styles.matchPreviewCard}>
          <View style={styles.matchPreviewTop}>
            <View style={styles.previewAvatar}>
              <Text style={styles.previewAvatarText}>
                S
              </Text>
            </View>

            <View style={styles.previewUser}>
              <Text style={styles.previewUserName}>
                StudyMate Kullanıcısı
              </Text>

              <Text style={styles.previewUserInfo}>
                Bilgisayar Mühendisliği · Orta
              </Text>
            </View>

            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />

              <Text style={styles.availableText}>
                Uygun
              </Text>
            </View>
          </View>

          <View style={styles.previewDivider} />

          <View style={styles.compatibilityRow}>
            <View style={styles.compatibilityItem}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkText}>
                  ✓
                </Text>
              </View>

              <Text style={styles.compatibilityText}>
                Aynı ders
              </Text>
            </View>

            <View style={styles.compatibilityItem}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkText}>
                  ✓
                </Text>
              </View>

              <Text style={styles.compatibilityText}>
                Uyumlu seviye
              </Text>
            </View>

            <View style={styles.compatibilityItem}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkText}>
                  ✓
                </Text>
              </View>

              <Text style={styles.compatibilityText}>
                Ortak tercih
              </Text>
            </View>
          </View>
        </View>

        {/* START SECTION */}
        <View style={styles.startSection}>
          <View>
            <Text style={styles.sectionEyebrow}>
              BAŞLANGIÇ
            </Text>

            <Text style={styles.sectionTitle}>
              Bölümünü seç
            </Text>
          </View>

          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>
              1
            </Text>
          </View>
        </View>

        <Text style={styles.sectionDescription}>
          Sana uygun dersleri ve çalışma arkadaşlarını
          keşfetmek için bölümünü seç.
        </Text>

        {/* DEPARTMENT CARD */}
        {departments.map((department) => (
          <Pressable
            key={department.name}
            onPress={handleDepartmentSelect}
            style={({ pressed }) => [
              styles.departmentCard,
              pressed && styles.departmentPressed,
            ]}
          >
            <View style={styles.departmentHeader}>
              <View style={styles.departmentIcon}>
                <Text style={styles.departmentEmoji}>
                  {department.icon}
                </Text>
              </View>

              <View style={styles.arrowButton}>
                <Text style={styles.arrow}>
                  ↗
                </Text>
              </View>
            </View>

            <View style={styles.departmentContent}>
              <View style={styles.departmentTag}>
                <Text style={styles.departmentTagText}>
                  AKTİF BÖLÜM
                </Text>
              </View>

              <Text style={styles.departmentName}>
                {department.name}
              </Text>

              <Text style={styles.departmentDescription}>
                {department.description}
              </Text>
            </View>

            <View style={styles.departmentFooter}>
              <View>
                <Text style={styles.courseCount}>
                  {department.courses}
                </Text>

                <Text style={styles.courseLabel}>
                  erişilebilir
                </Text>
              </View>

              <Text style={styles.startText}>
                Başla →
              </Text>
            </View>
          </Pressable>
        ))}

        {/* BOTTOM INFO */}
        <View style={styles.bottomInfo}>
          <View style={styles.bottomIcon}>
            <Text style={styles.bottomIconText}>
              ✦
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.bottomTitle}>
              Kişiselleştirilmiş eşleşmeler
            </Text>

            <Text style={styles.bottomText}>
              Ders, seviye ve çalışma tercihlerin dikkate alınır.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E1D5',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  brandArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBadge: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  logoBadgeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  logo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.5,
  },

  logoSub: {
    fontSize: 9,
    color: '#7C9090',
    marginTop: 2,
    letterSpacing: 0.3,
  },

  profileIconButton: {
  backgroundColor: '#F3F4F6',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 20,
},
profileIconText: {
  fontSize: 13,
  fontWeight: '600',
  color: '#374151',
},

  /* HERO */

  heroCard: {
    minHeight: 470,
    borderRadius: 30,
    backgroundColor: '#102F3B',
    padding: 22,
    overflow: 'hidden',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },

  heroCircleOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#1D8FA3',
    opacity: 0.16,
    right: -100,
    top: -90,
  },

  heroCircleTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#55C4CF',
    opacity: 0.08,
    left: -90,
    bottom: -80,
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#55D3D1',
    marginRight: 6,
  },

  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#BFE5E8',
    letterSpacing: 1,
  },

  heroNumber: {
    fontSize: 42,
    lineHeight: 45,
    fontWeight: '800',
    color: '#6D8C96',
    opacity: 0.28,
    letterSpacing: -1,
  },

  heroVisual: {
    marginTop: 25,
    height: 135,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroPersonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  heroPersonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },

  personAvatar: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.16)',
  },

  personEmoji: {
    fontSize: 31,
  },

  personLine: {
    height: 2,
    width: 30,
    backgroundColor: '#62C4CD',
    opacity: 0.65,
  },

  matchCenter: {
    width: 82,
    height: 82,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 5,
  },

  matchIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  matchIconText: {
    fontSize: 11,
    color: '#1D8FA3',
  },

  matchScore: {
    fontSize: 24,
    fontWeight: '800',
    color: '#102F3B',
    letterSpacing: -1,
  },

  matchLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#7B918D',
    letterSpacing: 1,
    marginTop: -2,
  },

  heroEyebrow: {
    marginTop: 18,
    fontSize: 10,
    fontWeight: '800',
    color: '#62C4CD',
    letterSpacing: 1.7,
  },

  heroTitle: {
    marginTop: 8,
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },

  heroTitleLight: {
    color: '#BFE2E5',
  },

  heroDescription: {
    marginTop: 11,
    maxWidth: 310,
    fontSize: 12,
    lineHeight: 18,
    color: '#A6BEC3',
  },

  heroButton: {
    marginTop: 17,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },

  heroButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#102F3B',
  },

  heroButtonArrow: {
    fontSize: 17,
    color: '#1D8FA3',
    marginLeft: 8,
  },

  /* PLAN */

  planCard: {
    marginTop: 13,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFEBE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },

  planIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  planIconText: {
    fontSize: 17,
    color: '#1D8FA3',
  },

  planContent: {
    flex: 1,
    paddingRight: 8,
  },

  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  planLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#1D8FA3',
  },

  planStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#55B98D',
    marginRight: 4,
  },

  statusText: {
    fontSize: 8,
    color: '#789087',
  },

  planTitle: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
    color: '#102A43',
  },

  planDescription: {
    fontSize: 9,
    color: '#899A96',
    marginTop: 2,
  },

  planButton: {
    height: 38,
    paddingHorizontal: 11,
    borderRadius: 13,
    backgroundColor: '#102F3B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  planButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  planButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  planButtonArrow: {
    fontSize: 13,
    color: '#8DD6D5',
    marginLeft: 4,
  },

  /* SUBSCRIPTION */

  subscriptionManagement: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 17,
    borderWidth: 1,
    borderColor: '#DFEBE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subscriptionEyebrow: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 1.2,
  },

  subscriptionTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: '#102A43',
  },

  subscriptionActiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F4F0',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
  },

  subscriptionActiveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#55B98D',
    marginRight: 5,
  },

  subscriptionActiveText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#3E7667',
  },

  subscriptionStats: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 17,
    backgroundColor: '#F5FAF8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  subscriptionStat: {
    flex: 1,
    alignItems: 'center',
  },

  subscriptionStatValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#102F3B',
  },

  subscriptionStatLabel: {
    marginTop: 4,
    fontSize: 8,
    color: '#81928E',
    textAlign: 'center',
  },

  subscriptionStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#DCE9E4',
  },

  premiumBox: {
    marginTop: 12,
    padding: 15,
    borderRadius: 19,
    backgroundColor: '#102F3B',
  },

  premiumTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  premiumTopText: {
    flex: 1,
    paddingRight: 10,
  },

  premiumLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#62C4CD',
    letterSpacing: 1.2,
  },

  premiumTitle: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  premiumIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  premiumIconText: {
    fontSize: 18,
    color: '#8DD6D5',
  },

  premiumFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },

  premiumCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(98,196,205,0.15)',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 10,
    fontWeight: '800',
    color: '#8DD6D5',
    marginRight: 8,
  },

  premiumFeature: {
    fontSize: 10,
    color: '#C0D3D5',
    fontWeight: '600',
  },

  premiumButton: {
    marginTop: 15,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  premiumButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },

  premiumButtonText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#102F3B',
  },

  premiumButtonArrow: {
    marginLeft: 7,
    fontSize: 14,
    color: '#1D8FA3',
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.8,
  },

  sectionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#DDF2EC',
  },

  sectionBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#7D8D9C',
    marginTop: 8,
  },

  /* STEPS */

  stepsScroll: {
    paddingTop: 16,
    paddingBottom: 3,
    paddingRight: 20,
  },

  stepCard: {
    width: 190,
    minHeight: 185,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 17,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DFEBE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },

  stepTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  stepNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9AAEA8',
  },

  stepIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepIconText: {
    fontSize: 21,
  },

  stepTitle: {
    marginTop: 24,
    fontSize: 17,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.3,
  },

  stepDescription: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 17,
    color: '#7D8D9C',
  },

  stepLine: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5F0EC',
    marginTop: 18,
    overflow: 'hidden',
  },

  stepLineFill: {
    width: '45%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1D8FA3',
  },

  /* MATCH PREVIEW */

  previewHeader: {
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  previewTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.5,
  },

  previewPercent: {
    width: 53,
    height: 53,
    borderRadius: 18,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewPercentText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  matchPreviewCard: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 17,
    borderWidth: 1,
    borderColor: '#DFEBE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  matchPreviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  previewAvatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  previewUser: {
    flex: 1,
    marginLeft: 11,
  },

  previewUserName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#102A43',
  },

  previewUserInfo: {
    fontSize: 9,
    color: '#899A96',
    marginTop: 4,
  },

  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: '#E3F4F0',
  },

  availableDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#55B98D',
    marginRight: 4,
  },

  availableText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#3E7667',
  },

  previewDivider: {
    height: 1,
    backgroundColor: '#EDF2EF',
    marginVertical: 15,
  },

  compatibilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  compatibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },

  checkText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  compatibilityText: {
    fontSize: 9,
    color: '#6F827D',
    fontWeight: '600',
  },

  /* START */

  startSection: {
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  stepCircle: {
    width: 37,
    height: 37,
    borderRadius: 14,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepCircleText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  /* DEPARTMENT */

  departmentCard: {
    marginTop: 17,
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    padding: 19,
    borderWidth: 1,
    borderColor: '#E0EAE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 5,
  },

  departmentPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.94,
  },

  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  departmentIcon: {
    width: 61,
    height: 61,
    borderRadius: 19,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  departmentEmoji: {
    fontSize: 29,
  },

  arrowButton: {
    width: 39,
    height: 39,
    borderRadius: 14,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  departmentContent: {
    marginTop: 18,
  },

  departmentTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#F0F7F5',
    marginBottom: 8,
  },

  departmentTagText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#1D8FA3',
  },

  departmentName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.3,
  },

  departmentDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7F8D9A',
    marginTop: 6,
  },

  departmentFooter: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF1F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  courseCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#102A43',
  },

  courseLabel: {
    fontSize: 9,
    color: '#96A1AC',
    marginTop: 2,
  },

  startText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  /* BOTTOM */

  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 4,
  },

  bottomIcon: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  bottomIconText: {
    color: '#1D8FA3',
    fontSize: 14,
  },

  bottomContent: {
    flex: 1,
  },

  bottomTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#536577',
  },

  bottomText: {
    fontSize: 9,
    color: '#97A3AF',
    marginTop: 2,
  },
});