import { router, useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const coursesByClass: Record<string, string[]> = {
  '1. Sınıf': [
    'Programlamaya Giriş',
    'Matematik I',
    'Fizik I',
    'Bilgisayar Mühendisliğine Giriş',
  ],
  '2. Sınıf': [
    'Veri Yapıları',
    'Nesneye Yönelik Programlama',
    'Ayrık Matematik',
    'Bilgisayar Organizasyonu',
  ],
  '3. Sınıf': [
    'İşletim Sistemleri',
    'Veritabanı Yönetim Sistemleri',
    'Bilgisayar Ağları',
    'Yazılım Mühendisliği',
  ],
  '4. Sınıf': [
    'Yapay Zeka',
    'Makine Öğrenmesi',
    'Bitirme Projesi',
    'Proje Yönetimi',
  ],
  'Seçmeli Dersler': [
    'Mobil Uygulama Geliştirme',
    'Derin Öğrenme',
    'Web Programlama',
    'Siber Güvenlik',
  ],
};

export default function CoursesScreen() {
  const { className } = useLocalSearchParams();

  const selectedClass = String(className || '1. Sınıf');
  const courses = coursesByClass[selectedClass] || [];

  const handleCourseSelect = (course: string) => {
    router.push({
      pathname: '/request',
      params: {
        course,
        className: selectedClass,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.brandArea}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>S</Text>
            </View>

            <View>
              <Text style={styles.brand}>StudyMate</Text>
              <Text style={styles.brandSub}>STUDY SMARTER. TOGETHER.</Text>
            </View>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />
          <View style={styles.circleThree} />

          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <View style={styles.heroDot} />
              <Text style={styles.heroBadgeText}>DERSLER</Text>
            </View>

            <Text style={styles.heroNumber}>03</Text>
          </View>

          <Text style={styles.heroEyebrow}>DERSLERİ KEŞFET</Text>

          <Text style={styles.heroTitle}>
            Dersini{'\n'}
            <Text style={styles.heroTitleLight}>seç.</Text>
          </Text>

          <Text style={styles.heroDescription}>
            Birlikte çalışmak istediğin dersi seç ve sana uygun
            çalışma arkadaşını bul.
          </Text>

          <View style={styles.progressArea}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>ADIM 3 / 4</Text>
              <Text style={styles.progressPercent}>75%</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        {/* SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleArea}>
            <Text style={styles.sectionEyebrow}>SEÇİLEN SINIF</Text>
            <Text style={styles.sectionTitle}>Dersler</Text>
          </View>

          <View style={styles.classBadge}>
            <Text style={styles.classBadgeText}>{selectedClass}</Text>
          </View>
        </View>

        {/* COURSE INFO */}
        <View style={styles.courseInfoRow}>
          <Text style={styles.courseInfoText}>
            Çalışmak istediğin dersi seç
          </Text>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{courses.length} DERS</Text>
          </View>
        </View>

        {/* COURSES */}
        <View style={styles.courseList}>
          {courses.map((course, index) => (
            <Pressable
              key={course}
              onPress={() => handleCourseSelect(course)}
              style={({ pressed }) => [
                styles.courseCard,
                pressed && styles.courseCardPressed,
              ]}
            >
              <View style={styles.courseNumberBox}>
                <Text style={styles.courseNumber}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>

              <View style={styles.courseContent}>
                <Text style={styles.courseLabel}>
                  DERS {String(index + 1).padStart(2, '0')}
                </Text>

                <Text style={styles.courseName}>{course}</Text>

                <View style={styles.openRow}>
                  <View style={styles.openDot} />
                  <Text style={styles.openText}>Eşleşmeye açık</Text>
                </View>
              </View>

              <View style={styles.arrowButton}>
                <Text style={styles.arrow}>›</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* INFO */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Bir ders seçerek devam et</Text>
            <Text style={styles.infoText}>
              Ders seçiminin ardından çalışma seviyeni ve tercihlerini
              belirleyerek eşleşmeni kişiselleştirebilirsin.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
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
  paddingTop: 50,
  paddingBottom: 30,
},

  header: {
  height: 58,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},

  backButton: {
  width: 42,
  height: 42,
  borderRadius: 15,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
},

  backIcon: {
    fontSize: 31,
    lineHeight: 32,
    color: '#102F3B',
    marginTop: -3,
  },

  brandArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  brand: {
    color: '#102F3B',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.4,
  },

  brandSub: {
    color: '#718783',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginTop: 2,
  },

  heroCard: {
    backgroundColor: '#102F3B',
    borderRadius: 30,
    padding: 24,
    minHeight: 285,
    overflow: 'hidden',
    marginBottom: 28,
  },

  circleOne: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1D8FA3',
    opacity: 0.13,
    right: -70,
    top: -60,
  },

  circleTwo: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#62C4CD',
    opacity: 0.08,
    right: 40,
    bottom: -45,
  },

  circleThree: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    opacity: 0.04,
    left: -25,
    bottom: 45,
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 27,
  },

  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },

  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#62C4CD',
    marginRight: 7,
  },

  heroBadgeText: {
    color: '#DDF2EC',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  heroNumber: {
    color: 'rgba(255,255,255,0.18)',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -2,
  },

  heroEyebrow: {
    color: '#62C4CD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 8,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: -1.2,
  },

  heroTitleLight: {
    color: '#62C4CD',
  },

  heroDescription: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 310,
  },

  progressArea: {
    marginTop: 22,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressText: {
    color: 'rgba(255,255,255,0.48)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },

  progressPercent: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },

  progressTrack: {
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
  },

  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#62C4CD',
    borderRadius: 5,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  sectionTitleArea: {
    flex: 1,
  },

  sectionEyebrow: {
    color: '#718783',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 4,
  },

  sectionTitle: {
    color: '#102F3B',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  classBadge: {
    backgroundColor: '#102F3B',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 14,
    marginBottom: 2,
    maxWidth: 135,
  },

  classBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  courseInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  courseInfoText: {
    color: '#718783',
    fontSize: 12,
  },

  countBadge: {
    backgroundColor: '#DDF2EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  countText: {
    color: '#102F3B',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  courseList: {
    gap: 12,
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    minHeight: 100,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },

  courseCardPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },

  courseNumberBox: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  courseNumber: {
    color: '#1D8FA3',
    fontSize: 15,
    fontWeight: '800',
  },

  courseContent: {
    flex: 1,
    paddingRight: 8,
  },

  courseLabel: {
    color: '#9AA9A5',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 4,
  },

  courseName: {
    color: '#102F3B',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '800',
  },

  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  openDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1D8FA3',
    marginRight: 5,
  },

  openText: {
    color: '#718783',
    fontSize: 9,
    fontWeight: '600',
  },

  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 25,
    marginTop: -2,
  },

  infoCard: {
    backgroundColor: '#DDF2EC',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  infoIconText: {
    color: '#1D8FA3',
    fontSize: 17,
    fontWeight: '800',
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: '#102F3B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },

  infoText: {
    color: '#718783',
    fontSize: 10,
    lineHeight: 15,
  },

  bottomSpace: {
    height: 10,
  },

  pressed: {
    opacity: 0.75,
  },
});