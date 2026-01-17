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
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../translations/translations';

// Country codes data


// Indian states and cities data
const STATES_CITIES = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Rajahmundry', 'Kakinada'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Manali', 'Bilaspur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Navi Mumbai'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bharatpur'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Noida'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Diglipur', 'Car Nicobar'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli': ['Silvassa'],
  'Daman and Diu': ['Daman', 'Diu'],
  'Delhi': ['New Delhi', 'Delhi', 'Dwarka', 'Rohini', 'Saket'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'],
  'Ladakh': ['Leh', 'Kargil'],
  'Lakshadweep': ['Kavaratti', 'Agatti', 'Minicoy'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
};

const ConsultantSignUpScreen = ({onNavigateToLogin, onNavigateToOTP}) => {
  const { language } = useLanguage();
  const { signup, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    designation: '',
    state: '',
    city: '',
    countryCode: '+91',
  });

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCountrySelect = (code) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
    setShowCountryModal(false);
  };

  const handleStateSelect = (state) => {
    setFormData(prev => ({ ...prev, state: state, city: '' }));
    setShowStateModal(false);
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({ ...prev, city: city }));
    setShowCityModal(false);
  };

  const handleSignUp = async () => {
    // Validate required fields
    if (!formData.companyName || !formData.name || !formData.email || !formData.phone || !formData.password) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        getTranslation(language, 'pleaseFillRequiredFields') || 'Please fill all required fields'
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Please enter a valid email address'
      );
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Please enter a valid 10-digit phone number'
      );
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        'Password must be at least 6 characters long'
      );
      return;
    }

    setSignupLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.countryCode + formData.phone,
        state: formData.state,
        city: formData.city,
        role: 'CONSULTANT',
        companyName: formData.companyName,
        designation: formData.designation,
      };

      const result = await signup(userData);
      setSignupLoading(false);

      if (result.success) {
        Alert.alert(
          getTranslation(language, 'success') || 'Success',
          result.message || 'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to OTP verification
                if (onNavigateToOTP) {
                  onNavigateToOTP(formData.email);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert(
          getTranslation(language, 'error') || 'Error',
          result.error || 'Signup failed. Please try again.'
        );
      }
    } catch (error) {
      setSignupLoading(false);
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        error.message || 'Signup failed. Please try again.'
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
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <Text style={styles.signUpTitle}>
              {getTranslation(language, 'signUpAsConsultant')}
            </Text>
            
            {/* Company Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Company Name
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g elowen"
                placeholderTextColor="#737373"
                value={formData.companyName}
                onChangeText={(value) => handleInputChange('companyName', value)}
              />
            </View>

            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {getTranslation(language, 'name')}
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#737373"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>

            {/* Company Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Company Email
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g product@elowen.in"
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
                {getTranslation(language, 'phone')}
                <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.phoneRow}>
                <TouchableOpacity 
                  style={styles.countryCodeContainer}
                  onPress={() => setShowCountryModal(true)}
                >
                  <Text style={styles.countryCode}>{formData.countryCode}</Text>
             
                </TouchableOpacity>
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

            {/* Designation Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Designation
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g ui ux designer"
                placeholderTextColor="#737373"
                value={formData.designation}
                onChangeText={(value) => handleInputChange('designation', value)}
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
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* State and City Row */}
            <View style={styles.rowContainer}>
              {/* State Input */}
              <View style={styles.halfInputGroup}>
                <Text style={styles.inputLabel}>{getTranslation(language, 'state')}</Text>
                <TouchableOpacity 
                  style={styles.stateContainer}
                  onPress={() => setShowStateModal(true)}
                >
                  <Text style={[styles.stateInput, !formData.state && styles.placeholderText]}>
                    {formData.state || getTranslation(language, 'egMaharashtra')}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>

              {/* City Input */}
              <View style={styles.halfInputGroup}>
                <Text style={styles.inputLabel}>{getTranslation(language, 'city')}</Text>
                <TouchableOpacity 
                  style={styles.cityContainer}
                  onPress={() => {
                    if (formData.state) {
                      setShowCityModal(true);
                    } else {
                      Alert.alert('Select State', 'Please select a state first');
                    }
                  }}
                >
                  <Text style={[styles.cityInput, !formData.city && styles.placeholderText]}>
                    {formData.city || getTranslation(language, 'egPune')}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.signUpButton, (signupLoading || loading) && styles.signUpButtonDisabled]} 
              onPress={handleSignUp}
              disabled={signupLoading || loading}
            >
              {signupLoading || loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.signUpButtonText}>
                  {getTranslation(language, 'signUp').toUpperCase()}
                </Text>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>
                {getTranslation(language, 'alreadyHaveAccount')}{' '}
                <Text style={styles.signInLink} onPress={handleSignInPress}>
                  {getTranslation(language, 'signIn')}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>

    
      {/* State Picker Modal */}
      <Modal
        visible={showStateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={Object.keys(STATES_CITIES)}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => handleStateSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* City Picker Modal */}
      <Modal
        visible={showCityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={formData.state ? STATES_CITIES[formData.state] : []}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => handleCitySelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
    marginTop: hp(7),
    marginBottom: hp(2),
  },
  logoImage: {
    width: wp(45),
    height: hp(5),
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(60),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
  },
  signUpTitle: {
    fontSize: rf(18),
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginBottom: hp(2),
    fontFamily: 'System',
  },
  inputGroup: {
    marginBottom: hp(0.8),
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
    paddingVertical: hp(0.8),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(4.8),
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
  phoneRow: {
    flexDirection: 'row',
    gap: wp(2.5),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(4.8),
    width: wp(19),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    gap: wp(2),
  },
  countryCode: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    fontFamily: 'System',
  },
  dropdownArrow: {
    fontSize: rf(12),
    color: '#454545',
    marginLeft: wp(0.5),
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    fontSize: rf(14),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(4.8),
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.8),
    gap: wp(3),
  },
  halfInputGroup: {
    flex: 1,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(4.8),
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
    fontSize: rf(14),
    color: '#000',
    paddingVertical: 0,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    borderWidth: 1.5,
    borderColor: '#CDCDCD',
    height: hp(4.8),
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
    fontSize: rf(14),
    color: '#000',
    paddingVertical: 0,
  },
  signUpButton: {
    backgroundColor: '#084A8C',
    borderRadius: scale(12),
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
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
  signUpButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontWeight: '500',
    fontFamily: 'System',
  },
  signInContainer: {
    alignItems: 'center',
    marginTop: hp(1),
  },
  signInText: {
    fontSize: rf(16),
    fontWeight: '400',
    color: '#454545',
    textAlign: 'center',
    fontFamily: 'System',
  },
  signInLink: {
    color: '#EE5835',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#737373',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: hp(70),
    paddingBottom: hp(3),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: rf(18),
    fontWeight: '600',
    color: '#054F99',
    fontFamily: 'System',
  },
  modalClose: {
    fontSize: rf(24),
    color: '#454545',
    fontWeight: '300',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.8),
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  modalItemFlag: {
    fontSize: rf(24),
    marginRight: wp(3),
  },
  modalItemText: {
    fontSize: rf(16),
    color: '#454545',
    fontWeight: '400',
    flex: 1,
    fontFamily: 'System',
  },
  modalItemCode: {
    fontSize: rf(16),
    color: '#737373',
    fontWeight: '400',
    fontFamily: 'System',
  },
});

export default ConsultantSignUpScreen;
