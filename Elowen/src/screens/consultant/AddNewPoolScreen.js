import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal, FlatList, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../../utils/responsive';
import { usePools } from '../../context/PoolsContext';
import ConsultantHeader from '../../components/ConsultantHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  bg: '#FFFFFF',
  primary: '#084A8C',
  primaryDark: '#054F99',
  text: '#1A1A1A',
  textSub: '#454545',
  textMuted: '#737373',
  border: '#CDCDCD',
  error: '#DD0202',
  handle: '#A8A6A6',
};

// Dropdown options
const SKILL_CATEGORIES = [
  'Housekeeping',
  'Security Services',
  'Delivery Services',
  'Transportation',
  'Maintenance',
  'Cleaning Services',
  'Catering',
  'Warehouse Operations',
  'Manufacturing',
  'Construction',
  'Retail',
  'Customer Service',
  'Data Entry',
  'Office Support',
  'Healthcare Support',
];

const WORK_TYPES = [
  'Contract',
  'Full-time',
  'Part-time',
  'Temporary',
  'Freelance',
  'Internship',
  'Daily Wage',
  'Seasonal',
];

const TRAVEL_OPTIONS = [
  'Willing to Relocate',
  'Not Willing to Relocate',
  'Willing to Travel',
  'Local Only',
  'Within State',
  'Pan India',
];

// Indian States and Cities
const INDIAN_STATES_CITIES = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Rajahmundry', 'Kakinada'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Arrah'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak', 'Hisar', 'Sonipat'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi', 'Kullu'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belgaum', 'Gulbarga', 'Davangere', 'Shimoga'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Navi Mumbai'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Bhilwara'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Secunderabad'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut', 'Noida', 'Ghaziabad', 'Bareilly'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Haldwani', 'Roorkee'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Kharagpur'],
};

const INDIAN_STATES = Object.keys(INDIAN_STATES_CITIES).sort();

const AddNewPoolScreen = ({ onNavigateBack, onNavigateToHome }) => {
  // Get addPool function from context
  const { addPool } = usePools();

  const [poolName, setPoolName] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const [workType, setWorkType] = useState('');
  const [wageRange, setWageRange] = useState('');
  const [travel, setTravel] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal states
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showWorkTypeModal, setShowWorkTypeModal] = useState(false);
  const [showTravelModal, setShowTravelModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  // Get cities based on selected state
  const getCitiesForState = () => {
    if (state && INDIAN_STATES_CITIES[state]) {
      return INDIAN_STATES_CITIES[state];
    }
    return [];
  };

  // Validate form
  const validateForm = () => {
    if (!poolName.trim()) {
      Alert.alert('Validation Error', 'Please enter a pool name');
      return false;
    }
    if (!skillCategory) {
      Alert.alert('Validation Error', 'Please select a skill category');
      return false;
    }
    if (!workType) {
      Alert.alert('Validation Error', 'Please select a work type');
      return false;
    }
    return true;
  };

  const handleAddNewPool = async () => {
    // Validate required fields
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare pool data - structured for easy backend integration
      const poolData = {
        poolName: poolName.trim(),
        skillCategory,
        workType,
        wageRange: wageRange.trim(),
        travel,
        state,
        city,
      };

      // Add pool using context (this would be API call in production)
      const result = addPool(poolData);

      if (result.success) {
        // Log the API payload structure for backend reference
        console.log('=== NEW POOL CREATED ===');
        console.log('Pool Data:', result.data);
        console.log('Backend API Payload:', JSON.stringify(result.apiPayload, null, 2));
        
        // Show success message
        Alert.alert(
          'Success',
          `Pool "${poolName}" has been created successfully!`,
          [
            {
              text: 'OK',
              onPress: () => onNavigateBack?.(),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error creating pool:', error);
      Alert.alert('Error', 'Failed to create pool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStateChange = (selectedState) => {
    setState(selectedState);
    setCity(''); // Reset city when state changes
    setShowStateModal(false);
  };

  const DropdownIcon = () => (
    <Svg width="10" height="5" viewBox="0 0 10 5" fill="none">
      <Path d="M0 0L5 5L10 0H0Z" fill={COLORS.textSub} />
    </Svg>
  );

  // Dropdown Modal Component
  const DropdownModal = ({ visible, onClose, title, data, onSelect, selectedValue }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedValue === item && styles.modalItemSelected
                ]}
                onPress={() => onSelect(item)}
              >
                <Text style={[
                  styles.modalItemText,
                  selectedValue === item && styles.modalItemTextSelected
                ]}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <ConsultantHeader title="All Pools" onBackPress={onNavigateBack} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Form Title */}
            <Text style={styles.formTitle}>Add New Pool</Text>

            {/* Pool Name Field */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Pool Name</Text>
                <Text style={styles.requiredStar}>*</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g security guard"
                  placeholderTextColor={COLORS.textMuted}
                  value={poolName}
                  onChangeText={setPoolName}
                />
              </View>
            </View>

            {/* Skill Category Field */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Skill Category</Text>
                <Text style={styles.requiredStar}>*</Text>
              </View>
              <TouchableOpacity style={styles.dropdownContainer} onPress={() => setShowSkillModal(true)}>
                <Text style={[styles.dropdownText, skillCategory && styles.dropdownTextSelected]}>{skillCategory || 'Select Skill Category'}</Text>
                <DropdownIcon />
              </TouchableOpacity>
            </View>

            {/* Work Type Field */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Work Type</Text>
                <Text style={styles.requiredStar}>*</Text>
              </View>
              <TouchableOpacity style={styles.dropdownContainer} onPress={() => setShowWorkTypeModal(true)}>
                <Text style={[styles.dropdownText, workType && styles.dropdownTextSelected]}>{workType || 'Select Work Type'}</Text>
                <DropdownIcon />
              </TouchableOpacity>
            </View>

            {/* Wage Range Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Wage Range</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g 15k-20k"
                  placeholderTextColor={COLORS.textMuted}
                  value={wageRange}
                  onChangeText={setWageRange}
                />
              </View>
            </View>

            {/* Travel Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Travel</Text>
              <TouchableOpacity style={styles.dropdownContainer} onPress={() => setShowTravelModal(true)}>
                <Text style={[styles.dropdownText, travel && styles.dropdownTextSelected]}>{travel || 'Select Travel Preference'}</Text>
                <DropdownIcon />
              </TouchableOpacity>
            </View>

            {/* State and City Row */}
            <View style={styles.rowFields}>
              {/* State Field */}
              <View style={styles.halfFieldGroup}>
                <Text style={styles.fieldLabel}>State</Text>
                <TouchableOpacity style={styles.dropdownContainer} onPress={() => setShowStateModal(true)}>
                  <Text style={[styles.dropdownText, state && styles.dropdownTextSelected]}>{state || 'eg Maharashtra'}</Text>
                  <DropdownIcon />
                </TouchableOpacity>
              </View>

              {/* City Field */}
              <View style={styles.halfFieldGroup}>
                <Text style={styles.fieldLabel}>City</Text>
                <TouchableOpacity 
                  style={[styles.dropdownContainer, !state && styles.dropdownDisabled]} 
                  onPress={() => state && setShowCityModal(true)}
                  disabled={!state}
                >
                  <Text style={[styles.dropdownText, city && styles.dropdownTextSelected]}>{city || 'eg Pune'}</Text>
                  <DropdownIcon />
                </TouchableOpacity>
              </View>
            </View>

            {/* Add New Pool Button */}
            <TouchableOpacity 
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} 
              onPress={handleAddNewPool} 
              activeOpacity={0.8}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'ADDING...' : 'ADD NEW POOL'}
              </Text>
            </TouchableOpacity>

            <View style={{ height: hp(4) }} />
          </ScrollView>
        </View>

        {/* Dropdown Modals */}
        <DropdownModal
          visible={showSkillModal}
          onClose={() => setShowSkillModal(false)}
          title="Select Skill Category"
          data={SKILL_CATEGORIES}
          onSelect={(item) => {
            setSkillCategory(item);
            setShowSkillModal(false);
          }}
          selectedValue={skillCategory}
        />

        <DropdownModal
          visible={showWorkTypeModal}
          onClose={() => setShowWorkTypeModal(false)}
          title="Select Work Type"
          data={WORK_TYPES}
          onSelect={(item) => {
            setWorkType(item);
            setShowWorkTypeModal(false);
          }}
          selectedValue={workType}
        />

        <DropdownModal
          visible={showTravelModal}
          onClose={() => setShowTravelModal(false)}
          title="Select Travel Preference"
          data={TRAVEL_OPTIONS}
          onSelect={(item) => {
            setTravel(item);
            setShowTravelModal(false);
          }}
          selectedValue={travel}
        />

        <DropdownModal
          visible={showStateModal}
          onClose={() => setShowStateModal(false)}
          title="Select State"
          data={INDIAN_STATES}
          onSelect={handleStateChange}
          selectedValue={state}
        />

        <DropdownModal
          visible={showCityModal}
          onClose={() => setShowCityModal(false)}
          title="Select City"
          data={getCitiesForState()}
          onSelect={(item) => {
            setCity(item);
            setShowCityModal(false);
          }}
          selectedValue={city}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: COLORS.primaryDark 
  },
  root: { 
    flex: 1, 
    backgroundColor: COLORS.primaryDark 
  },

  // Header
  header: { 
    width: '100%', 
    height: hp(8), 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  backButton: {
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    fontFamily: 'Murecho', 
    fontWeight: '500', 
    fontSize: rf(16), 
    lineHeight: rf(23), 
    color: '#FFFFFF',
    marginLeft: wp(2),
  },

  // Content Container
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
    overflow: 'hidden',
  },
  handleBar: {
    width: scale(70),
    height: scale(3),
    backgroundColor: COLORS.handle,
    borderRadius: scale(5),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2.5),
  },

  // Form Title
  formTitle: {
    fontFamily: 'Murecho',
    fontWeight: '500',
    fontSize: rf(18),
    lineHeight: rf(26),
    color: COLORS.textSub,
    textAlign: 'center',
    marginBottom: hp(3),
  },

  // Field Group
  fieldGroup: {
    marginBottom: hp(2),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(0.8),
  },
  fieldLabel: {
    fontFamily: 'Murecho',
    fontWeight: '500',
    fontSize: rf(16),
    lineHeight: rf(23),
    color: COLORS.textSub,
  },
  requiredStar: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: rf(15),
    lineHeight: rf(18),
    color: COLORS.error,
    marginLeft: wp(0.5),
  },

  // Input Container
  inputContainer: {
    width: '100%',
    height: scale(50),
    backgroundColor: COLORS.bg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  textInput: {
    fontFamily: 'Murecho',
    fontWeight: '400',
    fontSize: rf(14),
    lineHeight: rf(20),
    color: COLORS.text,
  },

  // Dropdown Container
  dropdownContainer: {
    width: '100%',
    height: scale(50),
    backgroundColor: COLORS.bg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  dropdownText: {
    fontFamily: 'Murecho',
    fontWeight: '400',
    fontSize: rf(14),
    lineHeight: rf(20),
    color: COLORS.textMuted,
  },
  dropdownTextSelected: {
    color: COLORS.text,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },

  // Row Fields (State & City)
  rowFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  halfFieldGroup: {
    width: '48%',
  },

  // Submit Button
  submitButton: {
    width: '100%',
    height: scale(54),
    backgroundColor: COLORS.primary,
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonDisabled: {
    backgroundColor: '#6B9DC7',
  },
  submitButtonText: {
    fontFamily: 'Murecho',
    fontWeight: '500',
    fontSize: rf(20),
    lineHeight: rf(29),
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: hp(60),
    paddingBottom: hp(3),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontFamily: 'Murecho',
    fontWeight: '600',
    fontSize: rf(18),
    lineHeight: rf(26),
    color: COLORS.text,
  },
  modalClose: {
    fontFamily: 'Murecho',
    fontSize: rf(20),
    color: COLORS.textMuted,
    padding: wp(2),
  },
  modalItem: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.8),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemSelected: {
    backgroundColor: '#EDF6FF',
  },
  modalItemText: {
    fontFamily: 'Murecho',
    fontWeight: '400',
    fontSize: rf(15),
    lineHeight: rf(22),
    color: COLORS.textSub,
  },
  modalItemTextSelected: {
    fontWeight: '500',
    color: COLORS.primary,
  },
});

export default AddNewPoolScreen;
