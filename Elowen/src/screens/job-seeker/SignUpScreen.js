import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../translations/translations';
import { authAPI } from '../../services/api';

const SignUpScreen = ({selectedRole, onNavigateToLogin, onNavigateToOTP}) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  
  const getSignUpTitle = () => {
    if (selectedRole === 'jobseeker') {
      return getTranslation(language, 'signUpAsJobSeeker');
    } else if (selectedRole === 'employer') {
      return getTranslation(language, 'signUpAsEmployer');
    } else if (selectedRole === 'consultant') {
      return getTranslation(language, 'signUpAsConsultant');
    }
    return getTranslation(language, 'signUpAsJobSeeker'); // default
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    state: '',
    city: '',
    password: '', // Added password field
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Please fill in all required fields (Name, Email, Phone, Password)'
      );
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Please enter a valid email address'
      );
      return;
    }

    // Password length check
    if (formData.password.length < 6) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Password must be at least 6 characters long'
      );
      return;
    }

    setLoading(true);
    try {
      const roleValue = selectedRole === 'jobseeker' ? 'JOB_SEEKER' : 
                       selectedRole === 'employer' ? 'EMPLOYER' : 
                       selectedRole === 'consultant' ? 'CONSULTANT' : 'JOB_SEEKER';

      const response = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dob: formData.dob || null,
        state: formData.state || null,
        city: formData.city || null,
        role: roleValue,
      });

      setLoading(false);

      if (response.success) {
        Alert.alert(
          'Success',
          'Registration successful! You are now logged in.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to OTP with phone number
                if (onNavigateToOTP) {
                  onNavigateToOTP(formData.phone);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert(
          getTranslation(language, 'error') || 'Error',
          response.error || 'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        error.message || 'An unexpected error occurred. Please try again.'
      );
    }
  };

  const handleSignInPress = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient Circles */}
      <View style={styles.backgroundCircles}>
        {/* Ellipse 1 - Top Left - Orange Gradient */}
        <LinearGradient
          colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.ellipse1}
        />
        
        {/* Ellipse 2 - Bottom Left - Teal Gradient */}
        <LinearGradient
          colors={['#009990', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.ellipse2}
        />
        
        {/* Ellipse 3 - Middle Right - Teal Gradient */}
        <LinearGradient
          colors={['#009990', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.ellipse3}
        />
        
        {/* Ellipse 4 - Bottom Right - Orange Gradient */}
        <LinearGradient
          colors={['rgba(238, 88, 53, 0.7)', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.ellipse4}
        />
        
        {/* Small Circle Bottom Left - Orange Gradient */}
        <LinearGradient
          colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.smallCircle}
        />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{getSignUpTitle()}</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'name')}<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={getTranslation(language, 'enterFullName')}
              placeholderTextColor="#737373"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'email')}<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={getTranslation(language, 'enterEmail')}
              placeholderTextColor="#737373"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'phone')}<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneContainer}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <View style={styles.dropdownIcon} />
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder={getTranslation(language, 'enterMobile')}
                placeholderTextColor="#737373"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'password')}<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#737373"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* DOB Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{getTranslation(language, 'dob')}</Text>
            <View style={styles.dobContainer}>
              <TextInput
                style={styles.dobInput}
                placeholder={getTranslation(language, 'enterDOB')}
                placeholderTextColor="#737373"
                value={formData.dob}
                onChangeText={(value) => handleInputChange('dob', value)}
              />
              <View style={styles.calendarIcon} />
            </View>
          </View>

          {/* State and City Row */}
          <View style={styles.rowContainer}>
            {/* State Input */}
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>{getTranslation(language, 'state')}</Text>
              <View style={styles.stateContainer}>
                <TextInput
                  style={styles.stateInput}
                  placeholder={getTranslation(language, 'egMaharashtra')}
                  placeholderTextColor="#737373"
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                />
                <View style={styles.dropdownIcon} />
              </View>
            </View>

            {/* City Input */}
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>{getTranslation(language, 'city')}</Text>
              <View style={styles.cityContainer}>
                <TextInput
                  style={styles.cityInput}
                  placeholder={getTranslation(language, 'egPune')}
                  placeholderTextColor="#737373"
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                />
                <View style={styles.dropdownIcon} />
              </View>
            </View>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, loading && styles.signUpButtonDisabled]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signUpButtonText}>{getTranslation(language, 'signUp').toUpperCase()}</Text>
          )}
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            {getTranslation(language, 'alreadyHaveAccount')} <Text style={styles.signInLink} onPress={handleSignInPress}>{getTranslation(language, 'signIn')}</Text>
          </Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(6),
    paddingBottom: hp(4),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  logoImage: {
    width: wp(68),
    height: hp(10),
    marginTop: hp(2.5),
  },
  title: {
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginBottom: hp(2.5),
    fontFamily: 'System',
  },
  formContainer: {
    paddingHorizontal: wp(4),
  },
  inputGroup: {
    marginBottom: hp(1.2),
  },
  inputLabel: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#454545',
    marginBottom: hp(0.6),
    fontFamily: 'System',
  },
  required: {
    color: '#DD0202',
    fontSize: rf(15),
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(5.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: wp(2),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    height: hp(5.6),
    width: wp(19),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  countryCode: {
    fontSize: rf(16),
    color: '#454545',
    fontFamily: 'System',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(5.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(5.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  dobInput: {
    flex: 1,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    color: '#000',
  },
  calendarIcon: {
    width: wp(4.5),
    height: hp(1.8),
    marginRight: wp(4),
    backgroundColor: '#454545',
    borderRadius: scale(2),
  },
  rowContainer: {
    flexDirection: 'row',
    gap: wp(3),
    marginBottom: hp(1),
  },
  halfInputGroup: {
    flex: 1,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(5.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  stateInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    color: '#000',
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(5.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  cityInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    color: '#000',
  },
  dropdownIcon: {
    width: wp(2.5),
    height: hp(0.6),
    marginRight: wp(4),
    backgroundColor: '#454545',
    borderRadius: scale(1),
  },
  signUpButton: {
    backgroundColor: '#05386B',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: hp(1),
    marginBottom: hp(1.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: rf(15),
    fontWeight: '500',
    fontFamily: 'System',
  },
  signInContainer: {
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(3),
  },
  signInText: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  signInLink: {
    color: '#009990',
    fontWeight: '500',
  },
});

export default SignUpScreen;
