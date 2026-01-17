import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';

const LanguageScreen = ({onNext, selectedRole}) => {
  const { changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    {
      id: 'en',
      symbol: 'A',
      name: 'English',
    },
    {
      id: 'hi',
      symbol: 'अ',
      name: 'हिन्दी',
    },
    {
      id: 'mr',
      symbol: 'अ',
      name: 'मराठी',
    },
    {
      id: 'gu',
      symbol: 'અ',
      name: 'ગુજરાતી',
    },
    {
      id: 'ta',
      symbol: 'அ',
      name: 'தமிழ்',
    },
    {
      id: 'kn',
      symbol: 'ಅ',
      name: 'ಕನ್ನಡ',
    },
    {
      id: 'bn',
      symbol: 'অ',
      name: 'বাংলা',
    },
    {
      id: 'te',
      symbol: 'అ',
      name: 'తెలుగు',
    },
  ];

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      changeLanguage(selectedLanguage);
      onNext();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient Circles - Hide for consultant */}
      {selectedRole !== 'consultant' && (
        <View style={styles.backgroundCircles}>
          <LinearGradient
            colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.ellipse1}
          />
          <LinearGradient
            colors={['#009990', 'rgba(255, 255, 255, 0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.ellipse2}
          />
          <LinearGradient
            colors={['#009990', 'rgba(255, 255, 255, 0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.ellipse3}
          />
          <LinearGradient
            colors={['rgba(238, 88, 53, 0.7)', 'rgba(255, 255, 255, 0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.ellipse4}
          />
          <LinearGradient
            colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.smallCircle}
          />
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Choose your preferred language</Text>
        </View>

        {/* Scrollable Language Options Grid */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.languagesGrid}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageCard,
                  selectedLanguage === language.id && styles.selectedCard,
                ]}
                onPress={() => handleLanguageSelect(language.id)}
              >
                {selectedLanguage === language.id && (
                  <View style={styles.checkmarkContainer}>
                    <Svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <Path 
                        d="M1 5L4.5 8.5L11 1" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                )}
                <Text style={styles.languageSymbol}>{language.symbol}</Text>
                <Text style={styles.languageName}>{language.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Sticky Next Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedLanguage && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedLanguage}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundCircles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  ellipse1: {
    position: 'absolute',
    width: scale(369),
    height: scale(369),
    left: scale(-83.17),
    top: verticalScale(-78.17),
    borderRadius: scale(184.5),
  },
  ellipse2: {
    position: 'absolute',
    width: scale(369),
    height: scale(369),
    left: scale(-244.42),
    top: verticalScale(368.58),
    borderRadius: scale(184.5),
    transform: [{rotate: '-53.07deg'}],
  },
  ellipse3: {
    position: 'absolute',
    width: scale(81.57),
    height: scale(81.57),
    left: scale(345),
    top: verticalScale(201),
    borderRadius: scale(40.785),
    transform: [{rotate: '32.92deg'}],
  },
  ellipse4: {
    position: 'absolute',
    width: scale(151.87),
    height: scale(151.87),
    left: scale(287.72),
    top: verticalScale(649.72),
    borderRadius: scale(75.935),
    transform: [{rotate: '42.47deg'}],
  },
  smallCircle: {
    position: 'absolute',
    width: scale(27.53),
    height: scale(27.53),
    left: scale(81),
    top: verticalScale(730),
    borderRadius: scale(13.765),
    transform: [{rotate: '42.47deg'}],
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(6),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(2),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  logoImage: {
    width: wp(68),
    height: hp(10),
    marginBottom: hp(2),
  },
  title: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  languagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  languageCard: {
    width: wp(44),
    height: hp(16),
    backgroundColor: 'rgba(255, 255, 255, 0.31)',
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: 'rgba(38, 37, 37, 0.31)',
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(3),
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#084A8C',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: hp(1),
    right: wp(2),
    width: wp(6),
    height: wp(6),
    backgroundColor: '#084A8C',
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  languageSymbol: {
    fontSize: rf(40),
    fontWeight: '700',
    color: '#05386B',
    textAlign: 'center',
    marginBottom: hp(1.5),
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  languageName: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  buttonContainer: {
    paddingTop: hp(2),
    paddingBottom: hp(3),
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#05386B',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default LanguageScreen;
