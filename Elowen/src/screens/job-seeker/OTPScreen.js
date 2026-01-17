import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../translations/translations';

const OTPScreen = ({ onNavigateToLogin, onOTPVerified, phoneNumber }) => {
  const { language } = useLanguage();
  const { verifyOTP, loading } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSignIn = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        getTranslation(language, 'pleaseEnterCompleteOTP') || 'Please enter complete OTP'
      );
      return;
    }

    setVerifying(true);
    // Use phoneNumber prop (which is actually email from login)
    const result = await verifyOTP(otpCode, phoneNumber);
    setVerifying(false);

    console.log('🔍 OTP Verification result:', result);
    console.log('🔍 onOTPVerified callback exists:', !!onOTPVerified);

    if (result.success) {
      // OTP verified successfully, navigate to JobSeekerScreen
      console.log('✅ OTP verification successful! Calling onOTPVerified callback...');
      if (onOTPVerified) {
        onOTPVerified();
        console.log('✅ onOTPVerified callback executed');
      } else {
        console.warn('⚠️ onOTPVerified callback is not defined!');
      }
    } else {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        result.error || getTranslation(language, 'invalidOTP') || 'Invalid OTP. Please try again.'
      );
    }
  };

  const handleSendCodeAgain = () => {
    // TODO: Implement resend OTP API call
    Alert.alert(
      getTranslation(language, 'info') || 'Info',
      getTranslation(language, 'codeResent') || 'Code resent successfully'
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Gradients */}
      <LinearGradient
        colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
        style={styles.ellipse1}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <LinearGradient
        colors={['rgba(238, 88, 53, 0.7)', 'rgba(255, 255, 255, 0)']}
        style={styles.ellipse2}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <LinearGradient
        colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
        style={styles.ellipse3}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <LinearGradient
        colors={['#009990', 'rgba(255, 255, 255, 0)']}
        style={styles.ellipse4}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <LinearGradient
        colors={['#009990', 'rgba(255, 255, 255, 0)']}
        style={styles.ellipse5}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Login with OTP Heading */}
        <Text style={styles.heading}>{getTranslation(language, 'loginWithOTP')}</Text>

        {/* Verification Message */}
        <Text style={styles.verificationMessage}>
          {getTranslation(language, 'verificationCodeSent')}
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpBox}>
              <TextInput
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            </View>
          ))}
        </View>

        {/* SIGN IN Button */}
        <TouchableOpacity 
          style={[styles.signInButton, (verifying || loading) && styles.signInButtonDisabled]} 
          onPress={handleSignIn}
          disabled={verifying || loading}
        >
          {verifying || loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.signInButtonText}>{getTranslation(language, 'signIn').toUpperCase()}</Text>
          )}
        </TouchableOpacity>

        {/* Send Code Again Link */}
        <TouchableOpacity onPress={handleSendCodeAgain}>
          <Text style={styles.sendCodeAgain}>{getTranslation(language, 'sendCodeAgain')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: scale(151.87),
    height: scale(151.87),
    left: scale(287.72),
    top: verticalScale(649.72),
    borderRadius: scale(75.935),
    transform: [{ rotate: '42.47deg' }],
  },
  ellipse3: {
    position: 'absolute',
    width: scale(27.53),
    height: scale(27.53),
    left: scale(81),
    top: verticalScale(730),
    borderRadius: scale(13.765),
    transform: [{ rotate: '42.47deg' }],
  },
  ellipse4: {
    position: 'absolute',
    width: scale(81.57),
    height: scale(81.57),
    left: scale(345),
    top: verticalScale(201),
    borderRadius: scale(40.785),
    transform: [{ rotate: '32.92deg' }],
  },
  ellipse5: {
    position: 'absolute',
    width: scale(369),
    height: scale(369),
    left: scale(-244.42),
    top: verticalScale(368.58),
    borderRadius: scale(184.5),
    transform: [{ rotate: '-53.07deg' }],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(10),
  },
  logoContainer: {
    width: wp(68),
    height: hp(10),
    marginBottom: hp(8),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    fontFamily: 'System',
    marginBottom: hp(3),
    textAlign: 'center',
  },
  verificationMessage: {
    fontSize: rf(14),
    fontWeight: '400',
    color: '#737373',
    fontFamily: 'System',
    textAlign: 'center',
    width: wp(73),
    lineHeight: rf(20),
    marginBottom: hp(6),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(76),
    marginBottom: hp(6),
  },
  otpBox: {
    width: wp(10.5),
    height: hp(5.9),
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInput: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#454545',
    fontFamily: 'System',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  signInButton: {
    width: wp(76),
    height: hp(5.9),
    backgroundColor: '#05386B',
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  signInButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  sendCodeAgain: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#454545',
    fontFamily: 'System',
    textAlign: 'center',
  },
});

export default OTPScreen;
