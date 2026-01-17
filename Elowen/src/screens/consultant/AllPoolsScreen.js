import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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
};

const AllPoolsScreen = ({ onNavigateBack, onNavigateToHome, onNavigateToAddNewPool, onNavigateToAddCandidate, onNavigateToJobs }) => {
  // Get pools from context
  const { pools } = usePools();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <ConsultantHeader title="All Pools" onBackPress={onNavigateBack} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Existing Pools Title */}
            <Text style={styles.sectionTitle}>Existing Pools</Text>

            {/* Pool Cards - Now using pools from context */}
            {pools.map((pool) => (
              <TouchableOpacity 
                key={pool.id} 
                style={styles.poolCard} 
                activeOpacity={0.7}
                onPress={() => onNavigateToAddCandidate?.(pool.id, pool.name)}
              >
                {/* Blue Left Border */}
                <View style={styles.poolCardBorder} />
                
                {/* Card Content */}
                <View style={styles.poolCardContent}>
                  <View style={styles.poolCardLeft}>
                    <Text style={styles.poolName}>{pool.name}</Text>
                    <Text style={styles.poolCategory}>{pool.categoryLabel}</Text>
                  </View>
                  <View style={styles.poolCardRight}>
                    <Text style={styles.poolCandidateCount}>{pool.candidates}</Text>
                    <Text style={styles.poolCandidateLabel}>Candidate</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Add New Pool Button */}
            <TouchableOpacity style={styles.addNewPoolButton} activeOpacity={0.7} onPress={onNavigateToAddNewPool}>
              <Text style={styles.addNewPoolPlus}>+</Text>
              <Text style={styles.addNewPoolText}>ADD NEW POOL</Text>
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
    marginTop: scale(15),
  },
  headerTitle: { 
    fontFamily: 'Murecho', 
    fontWeight: '700', 
    fontSize: rf(16), 
    lineHeight: rf(23), 
    color: '#FFFFFF',
    marginLeft: wp(2),
    marginTop: scale(15),
  },

  // Content Container
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },

  // Section Title
  sectionTitle: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(16),
    lineHeight: rf(20),
    color: COLORS.text,
    marginBottom: hp(2),
  },

  // Pool Card
  poolCard: {
    width: '100%',
    height: scale(72),
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: COLORS.border,
    borderRadius: scale(5),
    marginBottom: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  poolCardBorder: {
    width: scale(8),
    height: '100%',
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5),
  },
  poolCardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },
  poolCardLeft: {
    flex: 1,
  },
  poolCardRight: {
    alignItems: 'flex-end',
  },
  poolName: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(20),
    lineHeight: rf(29),
    color: COLORS.text,
    marginBottom: hp(0.3),
  },
  poolCategory: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(10),
    lineHeight: rf(14),
    color: COLORS.textMuted,
  },
  poolCandidateCount: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(22),
    lineHeight: rf(32),
    color: COLORS.primary,
  },
  poolCandidateLabel: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(10),
    lineHeight: rf(14),
    color: COLORS.textMuted,
  },

  // Add New Pool Button
  addNewPoolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    marginTop: hp(1),
  },
  addNewPoolPlus: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(22),
    lineHeight: rf(32),
    color: COLORS.primary,
    marginRight: wp(1),
  },
  addNewPoolText: {
    fontFamily: 'Murecho',
    fontWeight: '700',
    fontSize: rf(16),
    lineHeight: rf(23),
    color: COLORS.primary,
  },
});

export default AllPoolsScreen;
