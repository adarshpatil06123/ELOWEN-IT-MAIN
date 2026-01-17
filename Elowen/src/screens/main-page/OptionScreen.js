import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations/translations';

const OptionScreen = ({onNext}) => {
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState(null);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Animate logo entrance from top
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, logoTranslateY]);

  const options = [
    {
      id: 'jobseeker',
      title: getTranslation(language, 'jobSeeker'),
      description: getTranslation(language, 'jobSeekerDesc'),
      icon: require('../../assets/images/job_seeker.png'),
      color: '#084A8C',
    },
    {
      id: 'employer',
      title: getTranslation(language, 'employer'),
      description: getTranslation(language, 'employerDesc'),
      icon: require('../../assets/images/employer.png'),
      color: '#084A8C',
    },
    {
      id: 'consultant',
      title: getTranslation(language, 'consultant'),
      description: getTranslation(language, 'consultantDesc'),
      icon: require('../../assets/images/consultant.png'),
      color: '#084A8C',
    },
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient Circles */}
     

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Section - Animated */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{translateY: logoTranslateY}]
            }
          ]}
        >
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>{getTranslation(language, 'stepIntoElowen')}</Text>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.selectedCard,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              {/* Blue left border */}
              <View style={styles.leftBorder} />
              
              <View style={styles.optionContent}>
                <View style={styles.iconContainer}>
                  <Image 
                    source={option.icon}
                    style={styles.optionIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedOption && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={!selectedOption}
        >
          <Text style={styles.nextButtonText}>{getTranslation(language, 'next').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
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
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(15),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(2.2),
  },
  logoImage: {
    width: scale(268),
    height: scale(85),
    marginBottom: hp(2.7),
  },
  title: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'Murecho',
    lineHeight: rf(29),
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: hp(4),
    marginTop: hp(2.5),
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: '#E4E4E4',
    marginBottom: hp(2.5),
    height: scale(117),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  selectedCard: {
    borderColor: '#084A8C',
    borderWidth: 2,
},
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: scale(8),
    height: scale(117),
    backgroundColor: '#084A8C',
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(45),
    paddingRight: scale(20),
    height: '100%',
  },
  iconContainer: {
    width: scale(74),
    height: scale(74),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(20),
  },
  optionIcon: {
    width: scale(74),
    height: scale(74),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: rf(24),
    fontWeight: '500',
    color: '#084A8C',
    marginBottom: hp(0.8),
    fontFamily: 'Murecho',
    lineHeight: rf(35),
  },
  optionDescription: {
    fontSize: rf(8),
    fontWeight: '400',
    color: '#737373ff',
    lineHeight: rf(12),
    fontFamily: 'Murecho',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#084A8C',
    borderRadius: scale(12),
    paddingVertical: scale(12.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(6),
    height: scale(54),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  // disabledButton: {
  //   backgroundColor: '#CCCCCC',
  // },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontWeight: '500',
    fontFamily: 'Murecho',
    lineHeight: rf(29),
  },
});

export default OptionScreen;
