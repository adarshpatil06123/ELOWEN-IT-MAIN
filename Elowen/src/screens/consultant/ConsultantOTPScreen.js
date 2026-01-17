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
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../translations/translations';

const ConsultantOTPScreen = ({ onNavigateToLogin, onOTPVerified, phoneNumber }) => {
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
    const result = await verifyOTP(otpCode, phoneNumber || '+91 9876543210');
    setVerifying(false);

    if (result.success) {
      // OTP verified successfully
      if (onOTPVerified) {
        onOTPVerified();
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
          {/* Login with OTP Heading */}
          <Text style={styles.heading}>
            {getTranslation(language, 'loginWithOTP')}
          </Text>

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
              <Text style={styles.signInButtonText}>
                {getTranslation(language, 'signIn').toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>

          {/* Send Code Again Link */}
          <TouchableOpacity onPress={handleSendCodeAgain}>
            <Text style={styles.sendCodeAgain}>
              {getTranslation(language, 'sendCodeAgain')}
            </Text>
          </TouchableOpacity>
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
  heading: {
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginBottom: hp(3),
    fontFamily: 'System',
  },
  verificationMessage: {
    fontSize: rf(14),
    fontWeight: '400',
    color: '#737373',
    textAlign: 'center',
    marginBottom: hp(4),
    lineHeight: rf(20),
    paddingHorizontal: wp(5),
    fontFamily: 'System',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    gap: wp(3.5),
  },
  otpBox: {
    width: wp(10.5),
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
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
    width: '100%',
    height: '100%',
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  signInButton: {
    backgroundColor: '#084A8C',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(4),
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
  sendCodeAgain: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default ConsultantOTPScreen;
