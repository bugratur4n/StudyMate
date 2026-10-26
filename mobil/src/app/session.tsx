import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SessionScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>S</Text>
            </View>

            <View>
              <Text style={styles.logo}>StudyMate</Text>

              <Text style={styles.headerSubtitle}>
                Çalışma Oturumu
              </Text>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              Aktif
            </Text>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.sessionHero}>
          <Text style={styles.sessionLabel}>
            ÇALIŞMA OTURUMU
          </Text>

          <Text style={styles.sessionTitle}>
            Birlikte çalışmaya hazırsın.
          </Text>

          <Text style={styles.sessionSubtitle}>
            Odaklan, paylaş ve birlikte daha verimli çalış.
          </Text>
        </View>

        {/* TIMER */}
        <View style={styles.timerCard}>
          <View style={styles.timerTop}>
            <View style={styles.timerIcon}>
              <Text style={styles.timerIconText}>◷</Text>
            </View>

            <View>
              <Text style={styles.timerLabel}>
                KALAN SÜRE
              </Text>

              <Text style={styles.timerSubLabel}>
                Ücretsiz oturum
              </Text>
            </View>
          </View>

          <Text style={styles.timer}>
            20:00
          </Text>

          <View style={styles.timerProgressBackground}>
            <View style={styles.timerProgress} />
          </View>

          <Text style={styles.timerInfo}>
            Çalışma oturumun başladı
          </Text>
        </View>

        {/* PARTNER */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            ÇALIŞMA ARKADAŞIN
          </Text>

          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                S
              </Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                StudyMate Kullanıcısı
              </Text>

              <Text style={styles.userDepartment}>
                Bilgisayar Mühendisliği
              </Text>
            </View>

            <View style={styles.rating}>
              <Text style={styles.star}>
                ★
              </Text>

              <Text style={styles.ratingText}>
                4.8
              </Text>
            </View>
          </View>

          <View style={styles.partnerStatus}>
            <View style={styles.partnerStatusDot} />

            <Text style={styles.partnerStatusText}>
              Şu anda birlikte çalışıyorsunuz
            </Text>
          </View>
        </View>

        {/* COURSE */}
        <View style={styles.courseCard}>
          <View style={styles.courseIcon}>
            <Text style={styles.courseIconText}>
              📚
            </Text>
          </View>

          <View style={styles.courseContent}>
            <Text style={styles.cardLabel}>
              ÇALIŞILAN DERS
            </Text>

            <Text style={styles.courseName}>
              Veri Yapıları
            </Text>

            <Text style={styles.courseInfo}>
              Bu oturum boyunca birlikte çalışabilir,
              kaynak paylaşabilir ve konu tekrarı yapabilirsiniz.
            </Text>
          </View>
        </View>

        {/* SESSION FEATURES */}
        <View style={styles.featuresCard}>
          <Text style={styles.cardLabel}>
            OTURUMDA YAPABİLECEKLERİN
          </Text>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>

            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>
                Kaynak paylaş
              </Text>

              <Text style={styles.featureText}>
                Ders notlarını ve çalışma kaynaklarını paylaş.
              </Text>
            </View>
          </View>

          <View style={styles.featureDivider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>

            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>
                Birlikte çalış
              </Text>

              <Text style={styles.featureText}>
                Konu tekrarı yap ve soruları birlikte çöz.
              </Text>
            </View>
          </View>

          <View style={styles.featureDivider} />

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>✓</Text>
            </View>

            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>
                Odaklan
              </Text>

              <Text style={styles.featureText}>
                20 dakikalık oturumunu verimli değerlendir.
              </Text>
            </View>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>
              ✦
            </Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Odaklanma zamanı
            </Text>

            <Text style={styles.infoText}>
              Oturumunu verimli geçirmek için çalışma
              süresince bildirimlerini kapatabilirsin.
            </Text>
          </View>
        </View>

        {/* END BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.endButton,
            pressed && styles.endButtonPressed,
          ]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.endButtonText}>
            Oturumu Bitir
          </Text>

          <Text style={styles.endButtonArrow}>
            →
          </Text>
        </Pressable>

        <Text style={styles.bottomInfo}>
          Oturumu bitirdiğinde ana sayfaya yönlendirileceksin.
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBadge: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 4,
  },

  logoBadgeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#102F3B',
    letterSpacing: -0.6,
  },

  headerSubtitle: {
    fontSize: 12.5,
    color: '#718783',
    marginTop: 2,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 8,

    borderWidth: 1,
    borderColor: '#D7E7E1',
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1D8FA3',
    marginRight: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#102F3B',
  },

  /* HERO */

  sessionHero: {
    marginBottom: 18,
  },


  sessionLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#1D8FA3',
  },

  sessionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#102F3B',
    letterSpacing: -0.8,
    marginBottom: 6,
  },

  sessionSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#718783',
  },

  /* TIMER */

  timerCard: {
    backgroundColor: '#102F3B',
    borderRadius: 27,
    padding: 22,
    marginBottom: 14,

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 20,

    elevation: 7,
  },

  timerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  timerIconText: {
    fontSize: 19,
    color: '#FFFFFF',
  },

  timerLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#B9D6D0',
  },

  timerSubLabel: {
    fontSize: 10,
    color: '#7FA7A4',
    marginTop: 2,
  },

  timer: {
    fontSize: 60,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 13,
  },

  timerProgressBackground: {
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },

  timerProgress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#62C4CD',
    borderRadius: 4,
  },

  timerInfo: {
    fontSize: 11,
    color: '#B9D6D0',
    textAlign: 'center',
    marginTop: 9,
  },

  /* GENERAL CARD */

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 18,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: '#DDEAE5',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,

    elevation: 3,
  },

  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: '#80938E',
    marginBottom: 12,
  },

  /* USER */

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#102F3B',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 4,
  },

  userDepartment: {
    fontSize: 12.5,
    color: '#718783',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6F2',
    borderRadius: 11,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  star: {
    fontSize: 13,
    color: '#1D8FA3',
    marginRight: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#102F3B',
  },

  partnerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#E6EFEB',
  },

  partnerStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1D8FA3',
    marginRight: 7,
  },

  partnerStatusText: {
    fontSize: 11,
    color: '#718783',
  },

  /* COURSE */

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 18,
    marginBottom: 14,

    flexDirection: 'row',
    alignItems: 'flex-start',

    borderWidth: 1,
    borderColor: '#DDEAE5',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,

    elevation: 3,
  },

  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  courseIconText: {
    fontSize: 22,
  },

  courseContent: {
    flex: 1,
  },

  courseName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 6,
  },

  courseInfo: {
    fontSize: 12.5,
    lineHeight: 19,
    color: '#718783',
  },

  /* FEATURES */

  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 18,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: '#DDEAE5',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.07,
    shadowRadius: 14,

    elevation: 3,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  featureIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 2,
  },

  featureText: {
    fontSize: 11,
    lineHeight: 17,
    color: '#718783',
  },

  featureDivider: {
    height: 1,
    backgroundColor: '#E6EFEB',
    marginVertical: 12,
    marginLeft: 45,
  },

  /* INFO */

  infoCard: {
    backgroundColor: '#DDF2EC',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  infoIconText: {
    fontSize: 17,
    color: '#1D8FA3',
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 3,
  },

  infoText: {
    fontSize: 11.5,
    lineHeight: 17,
    color: '#718783',
  },

  /* BUTTON */

  endButton: {
    minHeight: 58,
    backgroundColor: '#102F3B',
    borderRadius: 20,
    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.20,
    shadowRadius: 16,

    elevation: 6,

    marginBottom: 12,
  },

  endButtonPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.92,
  },

  endButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  endButtonArrow: {
    color: '#62C4CD',
    fontSize: 22,
    marginLeft: 10,
    marginTop: -2,
  },

  bottomInfo: {
    fontSize: 10.5,
    lineHeight: 17,
    color: '#718783',
    textAlign: 'center',
  },
});