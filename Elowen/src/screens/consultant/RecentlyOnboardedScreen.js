import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { wp, hp, rf, scale } from '../../utils/responsive';
import ConsultantHeader from '../../components/ConsultantHeader';
import BottomTabBar from '../../components/BottomTabBar';

const COLORS = {
  bg: '#FFFFFF',
  primary: '#084A8C',
  primaryDark: '#054F99',
  text: '#1A1A1A',
  textSub: '#454545',
  textMuted: '#737373',
  border: '#E4E4E4',
  verified: '#084A8C',
  pending: '#BF2020',
  processing: '#737373',
  clearAll: '#BF2020',
};

// Sample data for recently onboarded employees
const ONBOARDED_EMPLOYEES = [
  { id: 1, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified', role: 'Guard', workType: 'Full-time', date: '2025-12-01' },
  { id: 2, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending', role: 'Guard', workType: 'Contract', date: '2025-12-02' },
  { id: 3, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Under Police Verification', statusType: 'processing', role: 'Guard', workType: 'Full-time', date: '2025-12-03' },
  { id: 4, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified', role: 'Guard', workType: 'Part-time', date: '2025-12-04' },
  { id: 5, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending', role: 'Guard', workType: 'Contract', date: '2025-12-05' },
  { id: 6, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Under Police Verification', statusType: 'processing', role: 'Guard', workType: 'Full-time', date: '2025-12-06' },
  { id: 7, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified', role: 'Guard', workType: 'Full-time', date: '2025-12-07' },
  { id: 8, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending', role: 'Guard', workType: 'Contract', date: '2025-12-08' },
  { id: 9, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Under Police Verification', statusType: 'processing', role: 'Guard', workType: 'Part-time', date: '2025-12-09' },
  { id: 10, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified', role: 'Guard', workType: 'Full-time', date: '2025-12-10' },
  { id: 11, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending', role: 'Guard', workType: 'Contract', date: '2025-12-11' },
  { id: 12, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Under Police Verification', statusType: 'processing', role: 'Guard', workType: 'Full-time', date: '2025-12-12' },
  { id: 13, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified', role: 'Guard', workType: 'Part-time', date: '2025-12-13' },
  { id: 14, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending', role: 'Guard', workType: 'Contract', date: '2025-12-14' },
];

// Filter tabs
const FILTER_TABS = [
  { label: 'Status', value: 'status' },
  { label: 'Role', value: 'role' },
  { label: 'Work Type', value: 'workType' },
  { label: 'Date', value: 'date' },
];

// Status filter options
const STATUS_OPTIONS = [
  { label: 'Police Verification Pending', value: 'police_verification_pending' },
  { label: 'Police Verified', value: 'police_verified' },
  { label: 'Health Check-Up Pending', value: 'health_checkup_pending' },
  { label: 'Health Check-Up Done', value: 'health_checkup_done' },
  { label: 'Demo/Test Pending', value: 'demo_test_pending' },
  { label: 'Demo/Test Done', value: 'demo_test_done' },
  { label: 'Documentation Pending', value: 'documentation_pending' },
  { label: 'Documentation Done', value: 'documentation_done' },
];

// Role filter options
const ROLE_OPTIONS = [
  { label: 'Security Guard', value: 'security_guard' },
  { label: 'Driver', value: 'driver' },
  { label: 'Delivery Partner', value: 'delivery_partner' },
  { label: 'Housekeeping', value: 'housekeeping' },
  { label: 'Maintenance', value: 'maintenance' },
];

// Work Type filter options
const WORK_TYPE_OPTIONS = [
  { label: 'Full-time', value: 'full_time' },
  { label: 'Part-time', value: 'part_time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Temporary', value: 'temporary' },
];

// Date filter options
const DATE_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'this_week' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last 3 Months', value: 'last_3_months' },
];

const RecentlyOnboardedScreen = ({ 
  onNavigateBack, 
  onNavigateToHome,
  onNavigateToJobs,
}) => {
  const [employees, setEmployees] = useState(ONBOARDED_EMPLOYEES);
  const [showSortModal, setShowSortModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('status');
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    role: [],
    workType: [],
    date: [],
  });

  // Get current filter options based on active tab
  const getCurrentFilterOptions = () => {
    switch (activeFilterTab) {
      case 'status':
        return STATUS_OPTIONS;
      case 'role':
        return ROLE_OPTIONS;
      case 'workType':
        return WORK_TYPE_OPTIONS;
      case 'date':
        return DATE_OPTIONS;
      default:
        return STATUS_OPTIONS;
    }
  };

  // Handle filter selection (toggle checkbox)
  const handleFilterSelect = (value) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[activeFilterTab] || [];
      const isSelected = currentFilters.includes(value);
      
      return {
        ...prev,
        [activeFilterTab]: isSelected 
          ? currentFilters.filter(v => v !== value)
          : [...currentFilters, value],
      };
    });
  };

  // Apply filters
  const applyFilters = () => {
    let filteredEmployees = [...ONBOARDED_EMPLOYEES];
    
    if (selectedFilters.status.length > 0) {
      const statusMap = {
        'police_verification_pending': 'Under Police Verification',
        'police_verified': 'Police Verified',
        'health_checkup_pending': 'Health check-up required',
        'health_checkup_done': 'Health Check-Up Done',
        'demo_test_pending': 'Demo/Test Pending',
        'demo_test_done': 'Demo/Test Done',
        'documentation_pending': 'Documentation Pending',
        'documentation_done': 'Documentation Done',
      };
      const filterStatuses = selectedFilters.status.map(s => statusMap[s]).filter(Boolean);
      if (filterStatuses.length > 0) {
        filteredEmployees = filteredEmployees.filter(emp => filterStatuses.includes(emp.status));
      }
    }
    
    if (selectedFilters.workType.length > 0) {
      const workTypeMap = {
        'full_time': 'Full-time',
        'part_time': 'Part-time',
        'contract': 'Contract',
        'temporary': 'Temporary',
      };
      const filterWorkTypes = selectedFilters.workType.map(w => workTypeMap[w]).filter(Boolean);
      if (filterWorkTypes.length > 0) {
        filteredEmployees = filteredEmployees.filter(emp => filterWorkTypes.includes(emp.workType));
      }
    }
    
    setEmployees(filteredEmployees);
    setShowSortModal(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      status: [],
      role: [],
      workType: [],
      date: [],
    });
    setEmployees(ONBOARDED_EMPLOYEES);
  };

  // Get status indicator color
  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'verified':
        return COLORS.verified;
      case 'pending':
        return COLORS.pending;
      case 'processing':
        return COLORS.processing;
      default:
        return COLORS.textMuted;
    }
  };

  // Sort icon
  const SortIcon = () => (
    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <Path d="M1 3H10" stroke="#454545" strokeWidth="1.2" strokeLinecap="round"/>
      <Path d="M3 5.5H8" stroke="#454545" strokeWidth="1.2" strokeLinecap="round"/>
      <Path d="M4.5 8H6.5" stroke="#454545" strokeWidth="1.2" strokeLinecap="round"/>
    </Svg>
  );

  // Radio button component
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  // Checkbox component
  const CheckBox = ({ checked }) => (
    <View style={[styles.checkboxOuter, checked && styles.checkboxChecked]}>
      {checked && (
        <Svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <Path 
            d="M1 4L3.5 6.5L9 1" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );

  // Render status indicator
  const renderStatusIndicator = (statusType) => {
    const color = getStatusColor(statusType);
    return (
      <View style={styles.statusIndicator}>
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <Circle cx="4" cy="4" r="4" fill={color} />
        </Svg>
      </View>
    );
  };

  // Render table row
  const renderEmployee = ({ item, index }) => (
    <View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.nameCell]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.tableCell, styles.positionCell]} numberOfLines={1}>
          {item.position}
        </Text>
        <View style={styles.statusCell}>
          <Text style={styles.statusText} numberOfLines={2}>
            {item.status}
          </Text>
          {renderStatusIndicator(item.statusType)}
        </View>
      </View>
      {index < employees.length - 1 && <View style={styles.rowDivider} />}
    </View>
  );

  // Sort/Filter modal
  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSortModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={() => applyFilters()}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.sortModalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <SortIcon />
              <Text style={styles.modalHeaderTitle}>Sort by</Text>
            </View>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalDivider} />
          
          {/* Modal Content */}
          <View style={styles.modalContent}>
            {/* Left Panel - Filter Tabs */}
            <View style={styles.filterTabsPanel}>
              {FILTER_TABS.map((tab) => (
                <TouchableOpacity
                  key={tab.value}
                  style={styles.filterTab}
                  onPress={() => setActiveFilterTab(tab.value)}
                >
                  {activeFilterTab === tab.value && (
                    <View style={styles.activeTabIndicator} />
                  )}
                  <Text style={[
                    styles.filterTabText,
                    activeFilterTab === tab.value && styles.filterTabTextActive
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Right Panel - Filter Options */}
            <ScrollView style={styles.filterOptionsPanel} showsVerticalScrollIndicator={false}>
              {getCurrentFilterOptions().map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.filterOption}
                  onPress={() => handleFilterSelect(option.value)}
                >
                  <Text style={styles.filterOptionText}>{option.label}</Text>
                  <CheckBox checked={(selectedFilters[activeFilterTab] || []).includes(option.value)} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <ConsultantHeader title="Recently Onboarded" onBackPress={onNavigateBack} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Title Row */}
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Recently Onboarded Employees</Text>
            
            {/* Sort Button */}
            <TouchableOpacity 
              style={styles.sortButton} 
              onPress={() => setShowSortModal(true)}
              activeOpacity={0.7}
            >
              <SortIcon />
              <Text style={styles.sortButtonText}>Sort by</Text>
            </TouchableOpacity>
          </View>

          {/* Table Card */}
          <View style={styles.tableCard}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, styles.nameHeader]}>Name</Text>
              <Text style={[styles.headerText, styles.positionHeader]}>Position</Text>
              <Text style={[styles.headerText, styles.statusHeader]}>Status</Text>
            </View>
            <View style={styles.headerDivider} />

            {/* Table Content */}
            <FlatList
              data={employees}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderEmployee}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.tableContent}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No employees found</Text>
                </View>
              }
            />
          </View>
        </View>

        {/* Bottom Tabs */}
        <BottomTabBar 
          activeTab="pool" 
          onNavigate={(tab) => {
            if (tab === 'home') onNavigateToHome?.();
            if (tab === 'jobs') onNavigateToJobs?.();
          }}
        />

        {/* Sort Modal */}
        {renderSortModal()}
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
    paddingTop: hp(3),
    paddingHorizontal: wp(4),
  },

  // Title row
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: rf(14),
    fontWeight: '500',
    color: COLORS.text,
  },

  // Sort button
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(5),
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  sortButtonText: {
    fontSize: rf(10),
    fontWeight: '400',
    color: '#000000',
    marginLeft: wp(1.5),
  },

  // Table card
  tableCard: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: hp(10),
  },

  // Table header
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
  },
  headerText: {
    fontSize: rf(12),
    fontWeight: '500',
    color: COLORS.text,
  },
  nameHeader: {
    flex: 1,
  },
  positionHeader: {
    flex: 1,
    textAlign: 'left',
  },
  statusHeader: {
    flex: 1.2,
    textAlign: 'left',
  },
  headerDivider: {
    height: 0.75,
    backgroundColor: COLORS.border,
  },

  // Table content
  tableContent: {
    paddingBottom: hp(2),
  },

  // Table row
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    minHeight: scale(38),
  },
  tableCell: {
    fontSize: rf(10),
    fontWeight: '400',
    color: COLORS.textSub,
  },
  nameCell: {
    flex: 1,
  },
  positionCell: {
    flex: 1,
  },
  statusCell: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: rf(10),
    fontWeight: '400',
    color: COLORS.textSub,
    flex: 1,
    lineHeight: rf(12),
  },
  statusIndicator: {
    marginLeft: wp(2),
  },
  rowDivider: {
    height: 0.75,
    backgroundColor: COLORS.border,
    marginHorizontal: wp(0),
  },

  // Empty state
  emptyContainer: {
    padding: hp(4),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: rf(14),
    color: COLORS.textMuted,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortModalContainer: {
    backgroundColor: COLORS.bg,
    borderRadius: scale(5),
    width: wp(86),
    maxHeight: hp(50),
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Modal header
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontSize: rf(12),
    fontWeight: '400',
    color: '#000000',
    marginLeft: wp(2),
  },
  clearAllText: {
    fontSize: rf(12),
    fontWeight: '400',
    color: COLORS.clearAll,
  },
  modalDivider: {
    height: 0.75,
    backgroundColor: COLORS.border,
  },

  // Modal content
  modalContent: {
    flexDirection: 'row',
    minHeight: hp(35),
  },

  // Filter tabs panel (left side)
  filterTabsPanel: {
    width: wp(20),
    backgroundColor: COLORS.bg,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingTop: hp(1),
  },
  filterTab: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTabIndicator: {
    position: 'absolute',
    right: 0,
    width: scale(2),
    height: scale(22),
    backgroundColor: COLORS.primary,
    borderRadius: scale(2),
  },
  filterTabText: {
    fontSize: rf(12),
    fontWeight: '400',
    color: '#000000',
  },
  filterTabTextActive: {
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Filter options panel (right side)
  filterOptionsPanel: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.3),
  },
  filterOptionText: {
    fontSize: rf(14),
    fontWeight: '400',
    color: COLORS.textSub,
    flex: 1,
  },

  // Radio button styles
  radioOuter: {
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.primary,
  },

  // Checkbox styles
  checkboxOuter: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(3),
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});

export default RecentlyOnboardedScreen;
