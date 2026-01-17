import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../translations/translations';

const LoginScreen = ({selectedRole, onNavigateToSignUp, onNavigateToOTP, onNavigateToHome}) => {
  const { language } = useLanguage();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const getLoginTitle = () => {
    if (selectedRole === 'jobseeker') {
      return getTranslation(language, 'loginAsJobSeeker');
    } else if (selectedRole === 'employer') {
      return getTranslation(language, 'loginAsEmployer');
    } else if (selectedRole === 'consultant') {
      return getTranslation(language, 'loginAsConsultant');
    }
    return getTranslation(language, 'loginToAccount');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        getTranslation(language, 'pleaseFillAllFields') || 'Please fill in all fields'
      );
      return;
    }

    setLoginLoading(true);
    const result = await login(email, password);
    setLoginLoading(false);

    if (result.success) {
      // Login successful with email/password, navigate to OTP verification
      // Pass the user's email (not phone) for OTP verification
      if (onNavigateToOTP) {
        onNavigateToOTP(email);
      }
    } else {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        result.error || getTranslation(language, 'loginFailed') || 'Login failed. Please try again.'
      );
    }
  };

  const handleSignUpPress = () => {
    if (onNavigateToSignUp) {
      onNavigateToSignUp();
    }
  };

  const handleLoginPress = () => {
    handleLogin();
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
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.loginTitle}>{getLoginTitle()}</Text>
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'email')}<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={getTranslation(language, 'enterEmailOrPhone')}
              placeholderTextColor="#737373"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'password')}<Text style={styles.required}>*</Text>
            </Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder={getTranslation(language, 'enterPassword')}
                      placeholderTextColor="#737373"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity 
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <View style={styles.eyeIconInner}>
                        {showPassword ? (
                          // Eye open icon
                          <View style={styles.eyeOpen}>
                            <View style={styles.eyeLid} />
                            <View style={styles.eyeBall} />
                          </View>
                        ) : (
                          // Eye closed icon
                          <View style={styles.eyeClosed}>
                            <View style={styles.eyeLash} />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>{getTranslation(language, 'forgotPassword')}</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.loginButton, (loginLoading || loading) && styles.loginButtonDisabled]} 
            onPress={handleLoginPress}
            disabled={loginLoading || loading}
          >
            {loginLoading || loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>{getTranslation(language, 'signIn').toUpperCase()}</Text>
            )}
          </TouchableOpacity>

          {/* Social Login */}
          <Text style={styles.socialLoginText}>{getTranslation(language, 'orSignInWith')}</Text>
          
                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity style={[styles.socialButton, {width: 130, paddingVertical: 6}]}>
                    <Image 
                      source={require('../../assets/images/google1.png')}
                      style={styles.googleIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.socialButtonText}>{getTranslation(language, 'google')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={require('../../assets/images/facebook.png')}
                      style={styles.facebookIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.socialButtonText}>{getTranslation(language, 'facebook')}</Text>
                  </TouchableOpacity>
                </View>

                 {/* Sign Up Link */}
                 <View style={styles.signUpContainer}>
                   <Text style={styles.signUpText}>
                     {getTranslation(language, 'dontHaveAccount')} <Text style={styles.signUpLink} onPress={handleSignUpPress}>{getTranslation(language, 'signUp')}</Text>
                   </Text>
                 </View>
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
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(10),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: hp(3.5),
  },
  logoImage: {
    width: wp(68),
    height: hp(10),
    marginBottom: 0,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 0,
  },
  loginTitle: {
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginBottom: hp(3),
    fontFamily: 'System',
  },
  inputGroup: {
    marginBottom: hp(2.5),
    paddingHorizontal: wp(2),
  },
  inputLabel: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#454545',
    marginBottom: hp(1),
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
    paddingVertical: hp(2),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    fontSize: rf(14),
    color: '#000',
  },
  eyeIcon: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },
  eyeIconInner: {
    width: wp(5),
    height: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeOpen: {
    width: wp(4),
    height: hp(1),
    backgroundColor: '#4D4D4D',
    borderRadius: scale(4),
    position: 'relative',
  },
  eyeLid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(2),
    backgroundColor: '#4D4D4D',
    borderRadius: scale(1),
  },
  eyeBall: {
    position: 'absolute',
    top: scale(2),
    left: scale(2),
    width: scale(4),
    height: scale(4),
    backgroundColor: '#4D4D4D',
    borderRadius: scale(2),
  },
  eyeClosed: {
    width: wp(4),
    height: hp(1),
    backgroundColor: '#4D4D4D',
    borderRadius: scale(4),
    position: 'relative',
  },
  eyeLash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(2),
    backgroundColor: '#4D4D4D',
    borderRadius: scale(1),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: hp(2.5),
    paddingHorizontal: wp(2),
  },
  forgotPasswordText: {
    fontSize: rf(14),
    fontWeight: '400',
    color: '#454545',
    fontFamily: 'System',
  },
  loginButton: {
    backgroundColor: '#05386B',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    marginBottom: hp(2.5),
    marginHorizontal: wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontWeight: '500',
    fontFamily: 'System',
  },
  socialLoginText: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginBottom: hp(2.5),
    fontFamily: 'System',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(4),
    paddingHorizontal: wp(2),
    gap: wp(3),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#BCBBBB',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.9),
    justifyContent: 'center',
    flex: 1,
  },
  socialIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(2),
  },
  googleIcon: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(1),
  },
  facebookIcon: {
    width: wp(6.5),
    height: wp(6.5),
    marginRight: wp(2),
  },
  socialButtonText: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    fontFamily: 'System',
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  signUpLink: {
    color: '#009990',
    fontWeight: '500',
  },
});

export default LoginScreen;


