import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const levels = ['Başlangıç', 'Orta', 'İleri'];

const resources = [
  'Ders Notları',
  'Çıkmış Sorular',
  'PDF / Kaynak',
  'Video Kaynak',
  'Kendi Hazırladığım Kaynaklar',
];

const wantedResources = [
  'Ders Notları',
  'Çıkmış Sorular',
  'PDF / Kaynak',
  'Video Kaynak',
  'Soru Çözümü',
];

const preferences = [
  'Konu Anlatımı',
  'Soru Çözümü',
  'Birlikte Tekrar',
  'Sessiz Çalışma',
  'Karışık Çalışma',
];

export default function RequestScreen() {
  const { course } = useLocalSearchParams();

  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedWantedResources, setSelectedWantedResources] =
    useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] =
    useState<string[]>([]);

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selected) => selected !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleMatch = () => {
    router.push({
      pathname: '/match',
      params: {
        course: String(course || 'Veri Yapıları'),
      },
    });
  };

  const renderOption = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const isSelected = selectedItems.includes(item);

    return (
      <Pressable
        key={item}
        style={({ pressed }) => [
          styles.optionCard,
          isSelected && styles.selectedOptionCard,
          pressed && styles.optionCardPressed,
        ]}
        onPress={() =>
          toggleSelection(item, selectedItems, setSelectedItems)
        }
      >
        <View
          style={[
            styles.checkbox,
            isSelected && styles.selectedCheckbox,
          ]}
        >
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>

        <Text
          style={[
            styles.optionText,
            isSelected && styles.selectedOptionText,
          ]}
        >
          {item}
        </Text>

        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedIndicatorText}>✓</Text>
          </View>
        )}
      </Pressable>
    );
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
              <Text style={styles.brandSub}>
                STUDY SMARTER. TOGETHER.
              </Text>
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
              <Text style={styles.heroBadgeText}>EŞLEŞME</Text>
            </View>

            <Text style={styles.heroNumber}>04</Text>
          </View>

          <Text style={styles.heroEyebrow}>
            EŞLEŞMENİ KİŞİSELLEŞTİR
          </Text>

          <Text style={styles.heroTitle}>
            Sana uygun{'\n'}
            <Text style={styles.heroTitleLight}>arkadaşı bul.</Text>
          </Text>

          <Text style={styles.heroDescription}>
            Seviyeni, kaynaklarını ve çalışma tercihlerini belirle.
            StudyMate sana uygun öğrencileri bulsun.
          </Text>

          <View style={styles.progressArea}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>ADIM 4 / 4</Text>
              <Text style={styles.progressPercent}>100%</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        {/* SELECTED COURSE */}
        <View style={styles.selectedCourseCard}>
          <View style={styles.courseIcon}>
            <Text style={styles.courseIconText}>D</Text>
          </View>

          <View style={styles.courseInfo}>
            <Text style={styles.courseLabel}>SEÇİLEN DERS</Text>

            <Text style={styles.selectedCourseText}>
              {String(course || 'Veri Yapıları')}
            </Text>
          </View>

          <View style={styles.activeDot} />
        </View>

        {/* LEVEL */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberText}>01</Text>
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>Seviyeni belirle</Text>
            <Text style={styles.sectionDescription}>
              Bu dersteki seviyene en yakın seçeneği seç.
            </Text>
          </View>
        </View>

        <View style={styles.levelList}>
          {levels.map((level) => {
            const isSelected = selectedLevel === level;

            return (
              <Pressable
                key={level}
                style={({ pressed }) => [
                  styles.levelCard,
                  isSelected && styles.selectedLevelCard,
                  pressed && styles.levelCardPressed,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <View
                  style={[
                    styles.levelRadio,
                    isSelected && styles.selectedLevelRadio,
                  ]}
                >
                  {isSelected && (
                    <View style={styles.levelRadioInner} />
                  )}
                </View>

                <Text
                  style={[
                    styles.levelText,
                    isSelected && styles.selectedLevelText,
                  ]}
                >
                  {level}
                </Text>

                {isSelected && (
                  <Text style={styles.levelSelectedText}>
                    Seçildi
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* OWN RESOURCES */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberText}>02</Text>
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Sahip olduğun kaynaklar
            </Text>
            <Text style={styles.sectionDescription}>
              Paylaşabileceğin kaynakları seç.
            </Text>
          </View>
        </View>

        <View style={styles.optionList}>
          {resources.map((resource) =>
            renderOption(
              resource,
              selectedResources,
              setSelectedResources
            )
          )}
        </View>

        {/* WANTED RESOURCES */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberText}>03</Text>
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Aradığın kaynaklar
            </Text>
            <Text style={styles.sectionDescription}>
              Çalışma arkadaşından ihtiyaç duyduğun kaynakları seç.
            </Text>
          </View>
        </View>

        <View style={styles.optionList}>
          {wantedResources.map((resource) =>
            renderOption(
              resource,
              selectedWantedResources,
              setSelectedWantedResources
            )
          )}
        </View>

        {/* PREFERENCES */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberText}>04</Text>
          </View>

          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Çalışma tercihin
            </Text>
            <Text style={styles.sectionDescription}>
              Birlikte nasıl çalışmak istediğini belirt.
            </Text>
          </View>
        </View>

        <View style={styles.optionList}>
          {preferences.map((preference) =>
            renderOption(
              preference,
              selectedPreferences,
              setSelectedPreferences
            )
          )}
        </View>

        {/* MATCH BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.matchButton,
            pressed && styles.matchButtonPressed,
          ]}
          onPress={handleMatch}
        >
          <View style={styles.matchButtonIcon}>
            <Text style={styles.matchButtonIconText}>✦</Text>
          </View>

          <View style={styles.matchButtonContent}>
            <Text style={styles.matchButtonText}>
              Eşleşme Ara
            </Text>

            <Text style={styles.matchButtonSubtext}>
              Sana uygun çalışma arkadaşlarını bul
            </Text>
          </View>

          <Text style={styles.matchArrow}>›</Text>
        </Pressable>

        <View style={styles.bottomInfo}>
          <View style={styles.bottomIcon}>
            <Text style={styles.bottomIconText}>✓</Text>
          </View>

          <Text style={styles.bottomHint}>
            Tercihlerini daha sonra değiştirebilirsin.
          </Text>
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

  /* HEADER */

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

  /* HERO */

  heroCard: {
    backgroundColor: '#102F3B',
    borderRadius: 30,
    padding: 24,
    minHeight: 285,
    overflow: 'hidden',
    marginBottom: 18,
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
    maxWidth: 320,
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
    width: '100%',
    height: '100%',
    backgroundColor: '#62C4CD',
    borderRadius: 5,
  },

  /* SELECTED COURSE */

  selectedCourseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 3,
  },

  courseIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#DDF2EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  courseIconText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#102F3B',
  },

  courseInfo: {
    flex: 1,
  },

  courseLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: '#1D8FA3',
    marginBottom: 4,
  },

  selectedCourseText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#102F3B',
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#55C4CF',
    marginRight: 5,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  sectionNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionNumberText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D6F7C',
  },

  sectionHeaderText: {
    flex: 1,
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
    color: '#102F3B',
    marginBottom: 3,
  },

  sectionDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#718783',
  },

  /* LEVEL */

  levelList: {
    gap: 9,
    marginBottom: 29,
  },

  levelCard: {
    minHeight: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCEBE5',
    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  levelCardPressed: {
    transform: [{ scale: 0.98 }],
  },

  selectedLevelCard: {
    backgroundColor: '#102F3B',
    borderColor: '#102F3B',
  },

  levelRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C4CDD9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  selectedLevelRadio: {
    borderColor: '#62C4CD',
  },

  levelRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#62C4CD',
  },

  levelText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#303A4B',
  },

  selectedLevelText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  levelSelectedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#62C4CD',
  },

  /* OPTIONS */

  optionList: {
    gap: 9,
    marginBottom: 29,
  },

  optionCard: {
    minHeight: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCEBE5',
    shadowColor: '#102F3B',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  optionCardPressed: {
    transform: [{ scale: 0.985 }],
  },

  selectedOptionCard: {
    backgroundColor: '#E3F4F0',
    borderColor: '#9CCFC5',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#C4CDD9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  selectedCheckbox: {
    backgroundColor: '#102F3B',
    borderColor: '#102F3B',
  },

  checkmark: {
    color: '#62C4CD',
    fontSize: 15,
    fontWeight: '800',
  },

  optionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    color: '#303A4B',
  },

  selectedOptionText: {
    color: '#102F3B',
    fontWeight: '700',
  },

  selectedIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#C8E8DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  selectedIndicatorText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D6F7C',
  },

  /* MATCH BUTTON */

  matchButton: {
    minHeight: 72,
    backgroundColor: '#102F3B',
    borderRadius: 22,
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
  },

  matchButtonPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.92,
  },

  matchButtonIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  matchButtonIconText: {
    fontSize: 19,
    color: '#62C4CD',
  },

  matchButtonContent: {
    flex: 1,
  },

  matchButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },

  matchButtonSubtext: {
    fontSize: 11,
    color: '#C5D9D4',
  },

  matchArrow: {
    fontSize: 28,
    color: '#FFFFFF',
    marginLeft: 8,
    marginTop: -3,
  },

  /* BOTTOM */

  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  bottomIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#E3F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },

  bottomIconText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1D6F7C',
  },

  bottomHint: {
    fontSize: 11,
    color: '#718783',
  },

  bottomSpace: {
    height: 10,
  },

  pressed: {
    opacity: 0.75,
  },
});