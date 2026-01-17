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

const ConsultantLoginScreen = ({onNavigateToSignUp, onNavigateToOTP, onNavigateToHome}) => {
  const { language } = useLanguage();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

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
      // Navigate to OTP verification with email (not phone)
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Blue Gradient Background */}
      <LinearGradient
        colors={['#054F99', '#084A8C']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientBackground}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* White Form Container */}
        <View style={styles.formCard}>
          {/* Title */}
          <Text style={styles.loginTitle}>
            {getTranslation(language, 'loginToAccount')}
          </Text>
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {getTranslation(language, 'email')}
              <Text style={styles.required}>*</Text>
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
              {getTranslation(language, 'password')}
              <Text style={styles.required}>*</Text>
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
                <Text style={styles.eyeIconText}>
                  {showPassword ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>
              {getTranslation(language, 'forgotPassword')}
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={[styles.signInButton, (loginLoading || loading) && styles.signInButtonDisabled]} 
            onPress={handleLogin}
            disabled={loginLoading || loading}
          >
            {loginLoading || loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signInButtonText}>
                {getTranslation(language, 'signIn').toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>

          {/* Social Login */}
          <Text style={styles.socialLoginText}>
            {getTranslation(language, 'orSignInWith')}
          </Text>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/google1.png')}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>
                {getTranslation(language, 'google')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/facebook.png')}
                style={styles.facebookIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialButtonText}>
                {getTranslation(language, 'facebook')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              {getTranslation(language, 'dontHaveAccount')}{' '}
              <Text style={styles.signUpLink} onPress={handleSignUpPress}>
                {getTranslation(language, 'signUp')}
              </Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp(8),
    marginBottom: hp(2),
  },
  logoImage: {
    width: wp(57),
    height: hp(6),
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(80),
    paddingHorizontal: wp(5.5),
    paddingTop: hp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 3,
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
    marginBottom: hp(2),
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
    paddingVertical: hp(1.8),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(6),
    color: '#000',
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
    fontSize: rf(14),
    color: '#000',
  },
  eyeIcon: {
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: rf(14),
    fontWeight: '500',
    color: '#054F99',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: hp(2.5),
    marginTop: hp(0.5),
  },
  forgotPasswordText: {
    fontSize: rf(14),
    fontWeight: '400',
    color: '#454545',
    fontFamily: 'System',
  },
  signInButton: {
    backgroundColor: '#084A8C',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    height: hp(6.5),
  },
  signInButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: rf(20),
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
    justifyContent: 'center',
    marginBottom: hp(4),
    gap: wp(4),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#BCBBBB',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.3),
    justifyContent: 'center',
    minWidth: wp(40),
   

  },
  googleIcon: {
    width: wp(6.5),
    height: wp(6.5),
    marginRight: wp(2),
  },
  facebookIcon: {
    width: wp(3),
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
    marginTop: hp(2),
  },
  signUpText: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  signUpLink: {
    color: '#EE5835',
    fontWeight: '500',
  },
});

export default ConsultantLoginScreen;
