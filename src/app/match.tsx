import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MatchScreen() {
  const { course } = useLocalSearchParams();

  const selectedCourse = String(course || 'Seçilen ders');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.topArea}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.back()}
          >
            <View style={styles.backIcon}>
              <Text style={styles.backArrow}>‹</Text>
            </View>

            <Text style={styles.backText}>Geri</Text>
          </Pressable>

          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>S</Text>
            </View>

            <View>
              <Text style={styles.logo}>StudyMate</Text>
              <Text style={styles.headerSubtitle}>Eşleşme sonucu</Text>
            </View>
          </View>
        </View>

        {/* SUCCESS HERO */}
        <View style={styles.successHero}>
          <View style={styles.successOuter}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
          </View>

          <View style={styles.successBadge}>
            <View style={styles.successDot} />
            <Text style={styles.successBadgeText}>
              EŞLEŞME TAMAMLANDI
            </Text>
          </View>

          <Text style={styles.title}>Eşleşme bulundu.</Text>

          <Text style={styles.subtitle}>
            {selectedCourse} dersi için sana uygun bir çalışma
            arkadaşı bulduk.
          </Text>
        </View>

        {/* SCORE CARD */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreTop}>
            <View>
              <Text style={styles.scoreLabel}>UYUM PUANI</Text>

              <View style={styles.scoreRow}>
                <Text style={styles.percentage}>%87</Text>

                <View style={styles.highMatchBadge}>
                  <Text style={styles.highMatchText}>
                    Yüksek uyum
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.scoreIcon}>
              <Text style={styles.scoreIconText}>✦</Text>
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Uyumsuz</Text>
            <Text style={styles.progressText}>Mükemmel uyum</Text>
          </View>
        </View>

        {/* USER CARD */}
        <View style={styles.userCard}>
          <Text style={styles.sectionLabel}>ÇALIŞMA ARKADAŞIN</Text>

          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>

            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>
                StudyMate Kullanıcısı
              </Text>

              <Text style={styles.userInfo}>
                Bilgisayar Mühendisliği
              </Text>
            </View>

            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Uygun</Text>
            </View>
          </View>

          {/* DETAILS */}
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>DERS</Text>

              <Text
                style={styles.detailText}
                numberOfLines={2}
              >
                {selectedCourse}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>SEVİYE</Text>

              <Text style={styles.detailText}>Orta</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>PUAN</Text>

              <View style={styles.rating}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          {/* WHY MATCH */}
          <View style={styles.compatibilityBox}>
            <View style={styles.compatibilityIcon}>
              <Text style={styles.compatibilityIconText}>✓</Text>
            </View>

            <View style={styles.compatibilityContent}>
              <Text style={styles.compatibilityTitle}>
                Neden eşleştiniz?
              </Text>

              <Text style={styles.compatibilityText}>
                Aynı dersi çalışıyorsunuz ve çalışma tercihleriniz
                büyük ölçüde uyumlu.
              </Text>
            </View>
          </View>
        </View>

        {/* PRIMARY BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
          onPress={() => router.push('/session')}
        >
          <View style={styles.startButtonIcon}>
            <Text style={styles.startButtonIconText}>→</Text>
          </View>

          <View style={styles.startButtonContent}>
            <Text style={styles.startButtonText}>
              Eşleşmeyi Başlat
            </Text>

            <Text style={styles.startButtonSubtext}>
              Çalışma oturumuna geç
            </Text>
          </View>

          <Text style={styles.startArrow}>›</Text>
        </Pressable>

        {/* SECONDARY BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.newMatchButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.newMatchButtonText}>
            Yeni Eşleşme Ara
          </Text>
        </Pressable>

        <Text style={styles.bottomHint}>
          Eşleşmeyi başlattığında çalışma oturumuna geçersin.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4E1D5',
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 45,
  },

  /* HEADER */

  topArea: {
    marginBottom: 25,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 22,
    paddingVertical: 4,
    paddingRight: 8,
  },

  pressed: {
    opacity: 0.65,
  },

  backIcon: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  backArrow: {
    fontSize: 28,
    lineHeight: 30,
    color: '#102F3B',
    marginTop: -2,
  },

  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102F3B',
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },

  logoBadgeText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  logo: {
    fontSize: 23,
    fontWeight: '800',
    color: '#102F3B',
    letterSpacing: -0.6,
  },

  headerSubtitle: {
    fontSize: 13,
    color: '#718783',
    marginTop: 2,
  },

  /* SUCCESS HERO */

  successHero: {
    alignItems: 'center',
    marginBottom: 27,
  },

  successOuter: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  successCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },

  successIcon: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F4F0',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 8,
  },

  successDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1D8FA3',
    marginRight: 6,
  },

  successBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: '#1D6F7C',
  },

  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#102F3B',
    letterSpacing: -0.7,
    textAlign: 'center',
    marginBottom: 7,
  },

  subtitle: {
    maxWidth: 320,
    fontSize: 13.5,
    lineHeight: 20,
    color: '#718783',
    textAlign: 'center',
  },

  /* SCORE */

  scoreCard: {
    backgroundColor: '#102F3B',
    borderRadius: 25,
    padding: 20,
    marginBottom: 13,

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },

  scoreTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scoreLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#AFCAC3',
    marginBottom: 4,
  },

  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  percentage: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  highMatchBadge: {
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginLeft: 10,
  },

  highMatchText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  scoreIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreIconText: {
    fontSize: 21,
    color: '#62C4CD',
  },

  progressBackground: {
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.14)',
    marginTop: 15,
    overflow: 'hidden',
  },

  progressFill: {
    width: '87%',
    height: '100%',
    backgroundColor: '#62C4CD',
    borderRadius: 4,
  },

  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },

  progressText: {
    fontSize: 9,
    color: '#AFCAC3',
  },

  /* USER CARD */

  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 13,

    borderWidth: 1,
    borderColor: '#DCEBE5',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 4,
  },

  sectionLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: '#1D8FA3',
    marginBottom: 13,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  avatarText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#102F3B',
  },

  userInfoContainer: {
    flex: 1,
  },

  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 4,
  },

  userInfo: {
    fontSize: 12.5,
    color: '#718783',
  },

  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F4F0',
    borderRadius: 11,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1D8FA3',
    marginRight: 5,
  },

  onlineText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D6F7C',
  },

  /* DETAILS */

  details: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  detailItem: {
    flex: 1,
    minHeight: 68,
    backgroundColor: '#F4F9F7',
    borderRadius: 14,
    padding: 11,
    justifyContent: 'center',
  },

  detailTitle: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#8AA09A',
    marginBottom: 5,
  },

  detailText: {
    fontSize: 11.5,
    fontWeight: '700',
    lineHeight: 16,
    color: '#263C42',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  star: {
    fontSize: 14,
    color: '#1D8FA3',
    marginRight: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#263C42',
  },

  /* COMPATIBILITY */

  compatibilityBox: {
    backgroundColor: '#E3F4F0',
    borderRadius: 16,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  compatibilityIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  compatibilityIconText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  compatibilityContent: {
    flex: 1,
  },

  compatibilityTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 3,
  },

  compatibilityText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#718783',
  },

  /* BUTTONS */

  startButton: {
    minHeight: 70,
    backgroundColor: '#102F3B',
    borderRadius: 21,
    paddingHorizontal: 15,

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 7,

    marginBottom: 10,
  },

  startButtonPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.92,
  },

  startButtonIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  startButtonIconText: {
    fontSize: 20,
    color: '#62C4CD',
  },

  startButtonContent: {
    flex: 1,
  },

  startButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },

  startButtonSubtext: {
    fontSize: 11,
    color: '#B8CCC7',
  },

  startArrow: {
    fontSize: 28,
    color: '#FFFFFF',
    marginLeft: 8,
    marginTop: -3,
  },

  newMatchButton: {
    minHeight: 53,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#D5E5DF',
  },

  newMatchButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102F3B',
  },

  bottomHint: {
    fontSize: 10.5,
    color: '#718783',
    textAlign: 'center',
    marginTop: 14,
  },
});