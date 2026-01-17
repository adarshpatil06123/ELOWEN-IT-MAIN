import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Modal,
  FlatList,
  Alert,
  Platform
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../../utils/responsive';
import ConsultantHeader from '../../components/ConsultantHeader';

const COLORS = {
  bg: '#FFFFFF',
  primary: '#084A8C',
  primaryDark: '#054F99',
  text: '#454545',
  textDark: '#1A1A1A',
  textMuted: '#737373',
  border: '#CDCDCD',
  divider: '#A8A6A6',
  required: '#DD0202',
  inputBg: '#FFFFFF',
};

// Gender options
const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const AddCandidateScreen = ({ 
  onNavigateBack, 
  onNavigateToHome,
  onNavigateToNext,
  poolId,
  poolName 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    workExperience: '',
  });

  // Modal state for dropdown
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get display value for gender
  const getGenderDisplay = () => {
    const selected = GENDER_OPTIONS.find(g => g.value === formData.gender);
    return selected ? selected.label : '';
  };

  // Validate form
  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) {
      errors.push('Name is required');
    }
    if (!formData.dob.trim()) {
      errors.push('Date of Birth is required');
    }
    if (!formData.gender) {
      errors.push('Gender is required');
    }
    
    return errors;
  };

  // Handle Next button press
  const handleNext = () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return;
    }

    // Prepare candidate data for next screen (backend-friendly structure)
    const candidateData = {
      // Basic Info
      name: formData.name.trim(),
      date_of_birth: formData.dob.trim(),
      gender: formData.gender,
      
      // Address Info
      current_address: formData.currentAddress.trim(),
      permanent_address: formData.permanentAddress.trim(),
      
      // Experience
      work_experience: formData.workExperience.trim(),
      
      // Pool association
      pool_id: poolId,
      
      // Metadata
      created_at: new Date().toISOString(),
      status: 'draft', // Will be 'pending' after all steps complete
    };

    // Log API payload structure for backend developer
    console.log('=== CANDIDATE API PAYLOAD (Step 1) ===');
    console.log(JSON.stringify(candidateData, null, 2));
    console.log('=====================================');

    // Navigate to next page with candidate data
    if (onNavigateToNext) {
      onNavigateToNext(candidateData);
    }
  };

  // Render dropdown arrow icon
  const DropdownArrow = () => (
    <Svg width="10" height="5" viewBox="0 0 10 5" fill="none">
      <Path d="M1 1L5 4L9 1" stroke="#454545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );

  // Render dropdown modal
  const renderDropdownModal = () => (
    <Modal
      visible={showGenderDropdown}
      transparent
      animationType="fade"
      onRequestClose={() => setShowGenderDropdown(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={() => setShowGenderDropdown(false)}
      >
        <View style={styles.dropdownModal}>
          <Text style={styles.dropdownTitle}>Select Gender</Text>
          <FlatList
            data={GENDER_OPTIONS}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  formData.gender === item.value && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  updateField('gender', item.value);
                  setShowGenderDropdown(false);
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  formData.gender === item.value && styles.dropdownItemTextSelected
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  // Render form field with label
  const renderTextField = (label, placeholder, field, isRequired = false, keyboardType = 'default') => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={formData[field]}
          onChangeText={(text) => updateField(field, text)}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  // Render dropdown field
  const renderDropdownField = (label, placeholder, value, onPress, isRequired = false) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </View>
      <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
        <Text style={[styles.dropdownText, !value && styles.dropdownPlaceholder]}>
          {value || placeholder}
        </Text>
        <DropdownArrow />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <ConsultantHeader title="All Pools" onBackPress={onNavigateBack} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Page Title */}
          <Text style={styles.pageTitle}>Add New Candidate</Text>

          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Name Field - Required */}
            {renderTextField('Name', 'e.g preet thakur', 'name', true)}

            {/* DOB Field - Required */}
            {renderTextField('DOB', 'DD/MM/YYYY', 'dob', true)}

            {/* Gender Dropdown - Required */}
            {renderDropdownField(
              'Gender',
              'Select Gender',
              getGenderDisplay(),
              () => setShowGenderDropdown(true),
              true
            )}

            {/* Current Address Field */}
            {renderTextField('Current address', 'e.g enter address', 'currentAddress', false)}

            {/* Permanent Address Field */}
            {renderTextField('Permanent address', 'e.g enter address', 'permanentAddress', false)}

            {/* Work Experience Field */}
            {renderTextField('Work Experience', 'e.g 5 years', 'workExperience', false)}

            <View style={{ height: hp(15) }} />
          </ScrollView>

          {/* Next Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.nextButton, isLoading && styles.buttonDisabled]} 
              onPress={handleNext}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dropdown Modal */}
        {renderDropdownModal()}
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

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp(2) : hp(3),
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  backButton: {
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: rf(16),
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: wp(1),
  },

  // Content container
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
  },

  // Drag handle
  dragHandle: {
    width: scale(70),
    height: scale(3),
    backgroundColor: COLORS.divider,
    borderRadius: scale(5),
    alignSelf: 'center',
    marginTop: hp(3),
  },

  // Page title
  pageTitle: {
    fontSize: rf(18),
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(2),
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(1),
  },

  // Field container
  fieldContainer: {
    marginBottom: hp(2),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  fieldLabel: {
    fontSize: rf(16),
    fontWeight: '500',
    color: COLORS.text,
  },
  requiredStar: {
    fontSize: rf(15),
    fontWeight: '700',
    color: COLORS.required,
    marginLeft: wp(0.5),
  },

  // Text input
  inputContainer: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  textInput: {
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    fontSize: rf(14),
    color: COLORS.textDark,
  },

  // Dropdown field
  dropdownContainer: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    paddingVertical: hp(1.8),
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
    fontSize: rf(14),
    color: COLORS.textDark,
  },
  dropdownPlaceholder: {
    color: COLORS.textMuted,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: COLORS.bg,
    borderRadius: scale(12),
    width: wp(80),
    maxHeight: hp(40),
    paddingVertical: hp(2),
  },
  dropdownTitle: {
    fontSize: rf(16),
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: hp(1.5),
    paddingHorizontal: wp(4),
  },
  dropdownItem: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemSelected: {
    backgroundColor: '#E8F4FD',
  },
  dropdownItemText: {
    fontSize: rf(14),
    color: COLORS.text,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Button container
  buttonContainer: {
    position: 'absolute',
    bottom: hp(2),
    left: 0,
    right: 0,
    paddingHorizontal: wp(4.5),
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(12),
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default AddCandidateScreen;
