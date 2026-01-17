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

// KYC Document Types
const KYC_OPTIONS = [
  { label: 'Pan Card', value: 'pan_card' },
  { label: 'Aadhaar Card', value: 'aadhaar_card' },
  { label: 'Voter ID', value: 'voter_id' },
  { label: 'Driving License', value: 'driving_license' },
  { label: 'Passport', value: 'passport' },
];

// Work Type options
const WORK_TYPE_OPTIONS = [
  { label: 'Contract', value: 'contract' },
  { label: 'Full-time', value: 'full_time' },
  { label: 'Part-time', value: 'part_time' },
  { label: 'Temporary', value: 'temporary' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Internship', value: 'internship' },
  { label: 'Daily Wage', value: 'daily_wage' },
  { label: 'Seasonal', value: 'seasonal' },
];

// Travel options
const TRAVEL_OPTIONS = [
  { label: 'Willing to Relocate', value: 'willing_to_relocate' },
  { label: 'Not Willing to Relocate', value: 'not_willing_to_relocate' },
  { label: 'Willing to Travel', value: 'willing_to_travel' },
  { label: 'Local Only', value: 'local_only' },
  { label: 'Within State', value: 'within_state' },
  { label: 'Pan India', value: 'pan_india' },
];

// Candidate Status options
const STATUS_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Placed', value: 'placed' },
];

const AddCandidateScreen2 = ({ 
  onNavigateBack, 
  onNavigateToHome,
  onSubmit,
  candidateData, // Data from previous screen
  poolId,
  poolName 
}) => {
  // Form state for step 2
  const [formData, setFormData] = useState({
    kycType: '',
    kycNumber: '',
    expectedWageRange: '',
    workType: '',
    travel: '',
    candidateStatus: 'new',
  });

  // Modal states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update form field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get display value for dropdown
  const getDropdownDisplay = (options, value) => {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : '';
  };

  // Get dropdown options based on active dropdown
  const getDropdownOptions = () => {
    switch (activeDropdown) {
      case 'kycType':
        return KYC_OPTIONS;
      case 'workType':
        return WORK_TYPE_OPTIONS;
      case 'travel':
        return TRAVEL_OPTIONS;
      case 'candidateStatus':
        return STATUS_OPTIONS;
      default:
        return [];
    }
  };

  // Get dropdown title
  const getDropdownTitle = () => {
    switch (activeDropdown) {
      case 'kycType':
        return 'Select KYC Document';
      case 'workType':
        return 'Select Work Type';
      case 'travel':
        return 'Select Travel Preference';
      case 'candidateStatus':
        return 'Select Candidate Status';
      default:
        return 'Select Option';
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = [];
    
    if (!formData.kycNumber.trim()) {
      errors.push('Pan Card No. is required');
    }
    if (!formData.workType) {
      errors.push('Work Type is required');
    }
    
    return errors;
  };

  // Handle Add New Candidate button press
  const handleSubmit = () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return;
    }

    setIsLoading(true);

    // Combine data from both screens for backend
    const completeCandidateData = {
      // Data from Step 1
      ...candidateData,
      
      // Data from Step 2
      kyc: {
        document_type: formData.kycType || 'pan_card',
        document_number: formData.kycNumber.trim(),
      },
      expected_wage_range: formData.expectedWageRange.trim(),
      work_type: formData.workType,
      travel_preference: formData.travel,
      status: formData.candidateStatus,
      
      // Update metadata
      created_at: new Date().toISOString(),
      pool_id: poolId,
    };

    // Log API payload structure for backend developer
    console.log('=== COMPLETE CANDIDATE API PAYLOAD ===');
    console.log(JSON.stringify(completeCandidateData, null, 2));
    console.log('======================================');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Candidate added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSubmit) {
                onSubmit(completeCandidateData);
              }
            }
          }
        ]
      );
    }, 500);
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
      visible={activeDropdown !== null}
      transparent
      animationType="fade"
      onRequestClose={() => setActiveDropdown(null)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={() => setActiveDropdown(null)}
      >
        <View style={styles.dropdownModal}>
          <Text style={styles.dropdownTitle}>{getDropdownTitle()}</Text>
          <FlatList
            data={getDropdownOptions()}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  formData[activeDropdown] === item.value && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  updateField(activeDropdown, item.value);
                  setActiveDropdown(null);
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  formData[activeDropdown] === item.value && styles.dropdownItemTextSelected
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

  // Render text field with label
  const renderTextField = (label, placeholder, field, isRequired = false) => (
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
        />
      </View>
    </View>
  );

  // Render dropdown field
  const renderDropdownField = (label, placeholder, field, options, isRequired = false) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isRequired && <Text style={styles.requiredStar}>*</Text>}
      </View>
      <TouchableOpacity 
        style={styles.dropdownContainer} 
        onPress={() => setActiveDropdown(field)}
      >
        <Text style={[styles.dropdownText, !formData[field] && styles.dropdownPlaceholder]}>
          {getDropdownDisplay(options, formData[field]) || placeholder}
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
            {/* KYC Dropdown */}
            {renderDropdownField('KYC', 'Pan Card', 'kycType', KYC_OPTIONS, false)}

            {/* Pan Card No. Field - Required */}
            {renderTextField('Pan Card No.', 'XXXX XXXX XXX', 'kycNumber', true)}

            {/* Expected Wage Range Field */}
            {renderTextField('Expected Wage Range', 'e.g 20k-25k', 'expectedWageRange', false)}

            {/* Work Type Dropdown - Required */}
            {renderDropdownField('Work Type', 'Contract', 'workType', WORK_TYPE_OPTIONS, true)}

            {/* Travel Dropdown */}
            {renderDropdownField('Travel', 'willing to Relocate', 'travel', TRAVEL_OPTIONS, false)}

            {/* Candidate Status Dropdown */}
            {renderDropdownField('Candidate Status', 'New', 'candidateStatus', STATUS_OPTIONS, false)}

            <View style={{ height: hp(15) }} />
          </ScrollView>

          {/* Add New Candidate Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.submitButton, isLoading && styles.buttonDisabled]} 
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'ADDING...' : 'ADD NEW CANDIDATE'}
              </Text>
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
    maxHeight: hp(50),
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
  submitButton: {
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
  submitButtonText: {
    fontSize: rf(20),
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default AddCandidateScreen2;
