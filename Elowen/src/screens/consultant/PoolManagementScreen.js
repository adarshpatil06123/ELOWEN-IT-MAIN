import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { wp, hp, rf, scale } from '../../utils/responsive';
import BottomTabBar from '../../components/BottomTabBar';
import ConsultantHeader from '../../components/ConsultantHeader';
import { usePools } from '../../context/PoolsContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  bg: '#FFFFFF',
  primary: '#084A8C',
  primaryDark: '#054F99',
  text: '#1A1A1A',
  textSub: '#454545',
  textMuted: '#737373',
  border: '#E4E4E4',
  borderLight: '#F3F3F3',
  success: '#008000',
  error: '#BF2020',
  info: '#1465CF',
};

// Sample data for recently onboarded
const recentlyOnboarded = [
  { id: 1, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Police Verified', statusType: 'verified' },
  { id: 2, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Health check-up required', statusType: 'pending' },
  { id: 3, name: 'Ramesh Kulkarni', position: 'Security Guard', status: 'Under Police Verification', statusType: 'processing' },
];

const PoolManagementScreen = ({ onNavigateToHome, onNavigateToAllPools, onNavigateToAddCandidate, onNavigateToRecentlyOnboarded, onNavigateToJobs }) => {
  // Get pools and summary from context
  const { pools, getPoolsSummary } = usePools();
  const summary = getPoolsSummary();

  // Generate overview stats from real data
  const overviewStats = [
    { id: 1, label: 'Workers in Pool', value: summary.totalCandidates.toLocaleString() },
    { id: 2, label: 'Active Jobs', value: '321' },
    { id: 3, label: 'Success Rate', value: '72%' },
    { id: 4, label: 'Commission Earned', value: '52k' },
  ];

  // Get first 3 pools for the table display
  const displayPools = pools.slice(0, 3).map(pool => ({
    id: pool.id,
    name: pool.name,
    candidates: `${pool.candidates} Candidates`,
    status: pool.status,
  }));

  const renderStatusBadge = (status) => {
    let bgColor, borderColor, textColor, label;
    
    switch (status) {
      case 'inactive':
        bgColor = '#F8D1D1';
        borderColor = '#BF2020';
        textColor = '#BF2020';
        label = 'Inactive';
        break;
      case 'active':
        bgColor = '#CFFACF';
        borderColor = '#008000';
        textColor = '#008000';
        label = 'Active';
        break;
      case 'new':
        bgColor = '#D1E5FF';
        borderColor = '#1465CF';
        textColor = '#1465CF';
        label = 'New';
        break;
      default:
        bgColor = '#E4E4E4';
        borderColor = '#737373';
        textColor = '#737373';
        label = status;
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor, borderColor: borderColor }]}>
        <Text style={[styles.statusBadgeText, { color: textColor }]}>{label}</Text>
      </View>
    );
  };

  const renderStatusIcon = (statusType) => {
    let color;
    switch (statusType) {
      case 'verified':
        color = COLORS.primary;
        break;
      case 'pending':
        color = COLORS.error;
        break;
      case 'processing':
        color = COLORS.textMuted;
        break;
      default:
        color = COLORS.textMuted;
    }
    
    return (
      <View style={styles.statusIconContainer}>
        <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <Circle cx="4" cy="4" r="4" fill={color} />
        </Svg>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <ConsultantHeader title="Pool Management" showBackButton={false} />

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {/* Pools Overview Section */}
            <Text style={styles.sectionTitle}>Pools Overview</Text>
            
            <View style={styles.overviewRow}>
              {overviewStats.map((stat) => (
                <View key={stat.id} style={styles.overviewCard}>
                  <Text style={styles.overviewLabel}>{stat.label}</Text>
                  <Text style={styles.overviewValue}>{stat.value}</Text>
                </View>
              ))}
            </View>

            {/* Existing Pools Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Existing Pools</Text>
              <TouchableOpacity style={styles.viewAllButton} onPress={onNavigateToAllPools}>
                <Text style={styles.viewAllText}>View All →</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tableCard}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Name</Text>
                <Text style={[styles.tableHeaderText, { flex: 1.3 }]}>Candidates</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Availability</Text>
              </View>
              <View style={styles.tableDivider} />
              
              {/* Table Rows - Using pools from context */}
              {displayPools.map((pool, index) => (
                <React.Fragment key={pool.id}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1.2 }]}>{pool.name}</Text>
                    <Text style={[styles.tableCell, { flex: 1.3 }]}>{pool.candidates}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      {renderStatusBadge(pool.status)}
                    </View>
                  </View>
                  {index < displayPools.length - 1 && <View style={styles.tableDivider} />}
                </React.Fragment>
              ))}
            </View>

            {/* Add Candidate Button */}
            <TouchableOpacity style={styles.addCandidateButton} onPress={onNavigateToAddCandidate} activeOpacity={0.7}>
              <Text style={styles.addCandidatePlus}>+</Text>
              <Text style={styles.addCandidateText}>Add Candidate</Text>
            </TouchableOpacity>

            {/* Recently Onboarded Section */}
            <Text style={styles.sectionTitle}>Recently Onboarded</Text>

            <View style={styles.tableCard}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Name</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Position</Text>
                <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Status</Text>
              </View>
              <View style={styles.tableDivider} />
              
              {/* Table Rows */}
              {recentlyOnboarded.map((person, index) => (
                <React.Fragment key={person.id}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1.2 }]}>{person.name}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{person.position}</Text>
                    <View style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.statusText, { flex: 1 }]}>{person.status}</Text>
                      {renderStatusIcon(person.statusType)}
                    </View>
                  </View>
                  {index < recentlyOnboarded.length - 1 && <View style={styles.tableDivider} />}
                </React.Fragment>
              ))}
            </View>

            {/* View All Link */}
            <TouchableOpacity style={styles.viewAllCenterButton} onPress={onNavigateToRecentlyOnboarded} activeOpacity={0.7}>
              <Text style={styles.viewAllCenterText}>View All</Text>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 4 }}>
                <Path d="M5 0L10 5L5 10" fill={COLORS.primary} />
              </Svg>
            </TouchableOpacity>

            <View style={{ height: hp(12) }} />
          </ScrollView>
        </View>

        {/* Bottom Tabs */}
        <BottomTabBar 
          activeTab="pool" 
          onNavigate={(tab) => {
            if (tab === 'home') onNavigateToHome?.();
            if (tab === 'jobs') onNavigateToJobs?.();
          }}
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
    height: hp(9), 
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  headerTitle: { 
    fontFamily: 'Murecho', 
    marginTop: scale(30),
    fontWeight: '700', 
    fontSize: rf(16), 
    lineHeight: rf(23), 
    color: '#FFFFFF' 
  },

  // Main Content Container
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  scroll: { 
    paddingHorizontal: wp(4), 
    paddingTop: hp(2.5),
  },

  // Section Title
  sectionTitle: { 
    fontFamily: 'Murecho', 
    fontWeight: '700', 
    fontSize: rf(15), 
    lineHeight: rf(20), 
    color: '#1A1A1A',
    marginBottom: hp(1.5),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  viewAllButton: {},
  viewAllText: { 
    fontFamily: 'Murecho', 
    fontWeight: '500', 
    fontSize: rf(14), 
    lineHeight: rf(20), 
    color: COLORS.primary 
  },

  // Overview Cards Row
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),
  },
  overviewCard: {
    width: scale(84),
    height: scale(82),
    backgroundColor: '#FFFFFF',
    borderWidth: 0.8,
    borderColor: COLORS.primary,
    borderRadius: scale(5),
    shadowColor: '#1d1a2eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
  },
  overviewLabel: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(10),
    lineHeight: rf(12),
    textAlign: 'center',
    color: COLORS.textSub,
    marginBottom: hp(0.8),
  },
  overviewValue: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(20),
    lineHeight: rf(29),
    color: '#000000ff',
  },

  // Table Card
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: hp(2),
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.2),
  },
  tableHeaderText: {
    fontFamily: 'Murecho',
    fontWeight: '500',
    fontSize: rf(12),
    lineHeight: rf(17),
    color: '#1A1A1A',
  },
  tableDivider: {
    height: 0.75,
    backgroundColor: '#E4E4E4',
    marginHorizontal: 0,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    alignItems: 'center',
  },
  tableCell: {
    fontFamily: 'Murecho',
    fontWeight: '400',
    fontSize: rf(10),
    lineHeight: rf(14),
    color: COLORS.textSub,
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
    borderRadius: scale(5),
    borderWidth: 0.5,
    minWidth: scale(52),
    alignItems: 'center',
  },
  statusBadgeText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: rf(8),
    lineHeight: rf(10),
  },

  // Status Text and Icon
  statusText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: rf(10),
    lineHeight: rf(12),
    color: COLORS.textSub,
  },
  statusIconContainer: {
    marginLeft: wp(2),
  },

  // Add Candidate Button
  addCandidateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2.5),
  },
  addCandidatePlus: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(22),
    lineHeight: rf(32),
    color: COLORS.primary,
    marginRight: wp(1),
  },
  addCandidateText: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(16),
    lineHeight: rf(23),
    color: COLORS.primary,
  },

  // View All Center
  viewAllCenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  viewAllCenterText: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(14),
    lineHeight: rf(20),
    color: COLORS.primary,
  },
});

export default PoolManagementScreen;
