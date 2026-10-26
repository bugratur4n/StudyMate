import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const classes = [
  {
    name: '1. Sınıf',
    number: '01',
    description: 'Temel mühendislik ve programlama dersleri',
  },
  {
    name: '2. Sınıf',
    number: '02',
    description: 'Algoritma, veri yapıları ve sistem dersleri',
  },
  {
    name: '3. Sınıf',
    number: '03',
    description: 'Uzmanlık ve ileri seviye bilgisayar dersleri',
  },
  {
    name: '4. Sınıf',
    number: '04',
    description: 'Uzmanlaşma, proje ve kariyer odaklı dersler',
  },
];

export default function ClassesScreen() {
  const handleClassSelect = (className: string) => {
    router.push({
      pathname: '/courses',
      params: { className },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
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
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <View style={styles.heroDot} />
              <Text style={styles.heroBadgeText}>
                BİLGİSAYAR MÜHENDİSLİĞİ
              </Text>
            </View>

            <Text style={styles.heroNumber}>02</Text>
          </View>

          <Text style={styles.heroEyebrow}>
            AKADEMİK SEVİYE
          </Text>

          <Text style={styles.heroTitle}>
            Sınıfını seç.
          </Text>

          <Text style={styles.heroDescription}>
            Bulunduğun sınıfı seç, derslerini keşfet ve
            sana uygun çalışma arkadaşlarını bul.
          </Text>

          <View style={styles.heroBottom}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.progressText}>
                Adım 2 / 4
              </Text>

              <Text style={styles.progressPercent}>
                %50
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>
              BAŞLANGIÇ
            </Text>

            <Text style={styles.sectionTitle}>
              Hangi sınıftasın?
            </Text>
          </View>

          <View style={styles.stepCircle}>
            <Text style={styles.stepText}>02</Text>
          </View>
        </View>

        <Text style={styles.sectionDescription}>
          Sınıfını seç ve sana ait dersleri görüntülemeye başla.
        </Text>

        {/* CLASS CARDS */}
        <View style={styles.classList}>
          {classes.map((item, index) => (
            <Pressable
              key={item.name}
              style={({ pressed }) => [
                styles.classCard,
                pressed && styles.classCardPressed,
              ]}
              onPress={() => handleClassSelect(item.name)}
            >
              <View style={styles.cardTop}>
                <View style={styles.numberContainer}>
                <Text style={styles.numberText}>
                  {item.number}
                </Text>
              </View>

                <View style={styles.arrowButton}>
                  <Text style={styles.arrow}>↗</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
              <Text style={styles.className}>
                {item.name}
              </Text>

              <Text style={styles.cardDescription}>
                {item.description}
              </Text>
            </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardFooterText}>
                  Dersleri görüntüle
                </Text>

                <Text style={styles.cardFooterArrow}>
                  →
                </Text>
              </View>
            </Pressable>
          ))}

          {/* ELECTIVE */}
          <Pressable
            style={({ pressed }) => [
              styles.electiveCard,
              pressed && styles.classCardPressed,
            ]}
            onPress={() => handleClassSelect('Seçmeli Dersler')}
          >
            <View style={styles.electiveLeft}>
              <View style={styles.electiveIcon}>
                <Text style={styles.electiveIconText}>✦</Text>
              </View>

              <View style={styles.electiveContent}>
                <View style={styles.electiveTag}>
                  <Text style={styles.electiveTagText}>
                    SEÇMELİ
                  </Text>
                </View>

                <Text style={styles.electiveTitle}>
                  Seçmeli Dersler
                </Text>

                <Text style={styles.electiveDescription}>
                  İlgi alanına göre derslerini keşfet.
                </Text>
              </View>
            </View>

            <View style={styles.electiveArrow}>
              <Text style={styles.electiveArrowText}>→</Text>
            </View>
          </Pressable>
        </View>

        {/* BOTTOM INFO */}
        <View style={styles.bottomInfo}>
          <View style={styles.bottomIcon}>
            <Text style={styles.bottomIconText}>✓</Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.bottomTitle}>
              Derslerini kişiselleştir
            </Text>

            <Text style={styles.bottomText}>
              Sonraki adımda ilgilendiğin dersi seçebilirsin.
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

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 42,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.65,
  },

  backIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 9,
    elevation: 2,
  },

  backArrow: {
    fontSize: 28,
    color: '#102F3B',
    marginTop: -2,
  },

  backText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#102F3B',
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
    marginRight: 8,
  },

  logoBadgeText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  logo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.4,
  },

  logoSub: {
    fontSize: 7,
    color: '#6E8580',
    marginTop: 1,
  },

  /* HERO */

  heroCard: {
    minHeight: 265,
    borderRadius: 30,
    backgroundColor: '#102F3B',
    padding: 21,
    overflow: 'hidden',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.17,
    shadowRadius: 22,
    elevation: 8,
  },

  heroCircleOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#1D8FA3',
    opacity: 0.17,
    right: -95,
    top: -80,
  },

  heroCircleTwo: {
    position: 'absolute',
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: '#55C4CF',
    opacity: 0.08,
    left: -58,
    bottom: -52,
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },

  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#55D3D1',
    marginRight: 6,
  },

  heroBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#BFE5E8',
  },

  heroNumber: {
  fontSize: 42,
  lineHeight: 45,
  fontWeight: '800',
  color: '#6D8C96',
  opacity: 0.28,
  letterSpacing: -1,
},

  heroEyebrow: {
    marginTop: 31,
    fontSize: 9,
    fontWeight: '800',
    color: '#62C4CD',
    letterSpacing: 1.7,
  },

  heroTitle: {
    marginTop: 7,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  heroDescription: {
    marginTop: 11,
    maxWidth: 305,
    fontSize: 12,
    lineHeight: 18,
    color: '#A9C0C5',
  },

  heroBottom: {
    position: 'absolute',
    left: 21,
    right: 21,
    bottom: 20,
  },

  progressTrack: {
    height: 4,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    width: '50%',
    backgroundColor: '#55C4CF',
    borderRadius: 10,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },

  progressText: {
    fontSize: 9,
    color: '#8FAEB3',
  },

  progressPercent: {
    fontSize: 9,
    fontWeight: '700',
    color: '#62C4CD',
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 31,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  sectionEyebrow: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.8,
  },

  stepCircle: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  sectionDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#718783',
    marginTop: 8,
    marginBottom: 17,
  },

  /* CLASS LIST */

  classList: {
    gap: 12,
  },

  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E0EAE6',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 17,
    elevation: 4,
  },

  classCardPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.93,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  numberContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 0.5,
  },

  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  cardContent: {
    marginTop: 16,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  className: {
    fontSize: 19,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.3,
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7C8D89',
    marginTop: 5,
    paddingRight: 15,
  },

  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#DDF2EC',
  },

  currentDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1D8FA3',
    marginRight: 5,
  },

  currentBadgeText: {
    fontSize: 6,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 0.7,
  },

  cardFooter: {
    marginTop: 16,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EDF2EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardFooterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#718783',
  },

  cardFooterArrow: {
    fontSize: 15,
    color: '#1D8FA3',
    fontWeight: '700',
  },

  /* ELECTIVE */

  electiveCard: {
    backgroundColor: '#102F3B',
    borderRadius: 25,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.13,
    shadowRadius: 17,
    elevation: 5,
  },

  electiveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  electiveIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  electiveIconText: {
    fontSize: 20,
    color: '#62C4CD',
  },

  electiveContent: {
    flex: 1,
  },

  electiveTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: 'rgba(98,196,205,0.13)',
    marginBottom: 5,
  },

  electiveTagText: {
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#62C4CD',
  },

  electiveTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  electiveDescription: {
    fontSize: 10,
    color: '#9FB8BC',
    marginTop: 3,
  },

  electiveArrow: {
    width: 37,
    height: 37,
    borderRadius: 14,
    backgroundColor: '#1D8FA3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  electiveArrowText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  /* BOTTOM INFO */

  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
    paddingHorizontal: 3,
  },

  bottomIcon: {
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  bottomIconText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  bottomContent: {
    flex: 1,
  },

  bottomTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#536A65',
  },

  bottomText: {
    fontSize: 9,
    color: '#7F938E',
    marginTop: 2,
  },

  /* NEXT STEP */

  nextCard: {
    marginTop: 24,
    padding: 19,
    borderRadius: 25,
    backgroundColor: '#DDF2EC',
    borderWidth: 1,
    borderColor: '#CDE6DE',
  },

  nextTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nextEyebrow: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1D8FA3',
    letterSpacing: 1.5,
  },

  nextStepBadge: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextStepText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D8FA3',
  },

  nextTitle: {
    marginTop: 11,
    fontSize: 22,
    fontWeight: '800',
    color: '#102A43',
    letterSpacing: -0.5,
  },

  nextDescription: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 17,
    color: '#718783',
  },

  nextVisual: {
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },

  nextMiniCard: {
    flex: 1,
    height: 57,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  miniIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  miniIconText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#62C4CD',
  },

  miniLines: {
    flex: 1,
    marginLeft: 9,
  },

  miniLineLong: {
    width: '70%',
    height: 5,
    borderRadius: 4,
    backgroundColor: '#DDF2EC',
  },

  miniLineShort: {
    width: '45%',
    height: 4,
    borderRadius: 4,
    backgroundColor: '#E8F1EE',
    marginTop: 6,
  },

  miniArrow: {
    fontSize: 15,
    color: '#1D8FA3',
    fontWeight: '700',
  },

  connectionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1D8FA3',
    marginHorizontal: 8,
  },

  nextMiniCardSmall: {
    height: 57,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: '#102F3B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallCardText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#62C4CD',
    letterSpacing: 0.8,
  },
});