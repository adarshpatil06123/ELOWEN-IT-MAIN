import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import BottomTabBar from '../../components/BottomTabBar';
import LocationIcon from '../../components/LocationIcon';
import SalaryIcon from '../../components/SalaryIcon';
import CategoryIcon from '../../components/CategoryIcon';
import ExperienceIcon from '../../components/ExperienceIcon';
import BookmarkIcon from '../../components/BookmarkIcon';

const COLORS = {
  bg: '#FFFFFF',
  primary: '#084A8C',
  primaryDark: '#054F99',
  text: '#1A1A1A',
  textSub: '#454545',
  textMuted: '#737373',
  border: '#E4E4E4',
};

// Sample job data
const JOBS_DATA = [
  {
    id: 1,
    title: 'Delivery Associate',
    company: 'Shakti Engineering Works',
    location: 'Pune Maharashtra',
    category: 'Delivery & Transport',
    salary: '10k-18k/month',
    openings: '20 Openings',
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'Delivery Associate',
    company: 'Shakti Engineering Works',
    location: 'Pune Maharashtra',
    category: 'Delivery & Transport',
    salary: '10k-18k/month',
    openings: '20 Openings',
    isBookmarked: false,
  },
  {
    id: 3,
    title: 'Delivery Associate',
    company: 'Shakti Engineering Works',
    location: 'Pune Maharashtra',
    category: 'Delivery & Transport',
    salary: '10k-18k/month',
    openings: '20 Openings',
    isBookmarked: false,
  },
  {
    id: 4,
    title: 'Security Guard',
    company: 'Bajaj Finance Ltd',
    location: 'Mumbai Maharashtra',
    category: 'Security',
    salary: '12k-15k/month',
    openings: '15 Openings',
    isBookmarked: false,
  },
  {
    id: 5,
    title: 'Driver',
    company: 'ABC Transport',
    location: 'Delhi NCR',
    category: 'Delivery & Transport',
    salary: '15k-20k/month',
    openings: '10 Openings',
    isBookmarked: false,
  },
];

const JobsScreen = ({
  onNavigateToHome,
  onNavigateToPool,
  onNavigateToProfile,
  onNavigateToJobDetails,
}) => {
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState(JOBS_DATA);

  // Search Icon
  const SearchIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Circle cx="7" cy="7" r="5.5" stroke={COLORS.primary} strokeWidth="1.5" />
      <Path
        d="M11 11L14.5 14.5"
        stroke={COLORS.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );

  // Filter Icon - proper SVG from Figma
  const FilterIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5.7576 0C4.2373 0 2.959 1.047 2.5749 2.451H0.8605C0.7474 2.4506 0.6353 2.4726 0.5307 2.5156C0.4261 2.5587 0.3311 2.6221 0.2511 2.7021C0.1711 2.7821 0.1077 2.8771 0.0646 2.9817C0.0215 3.0864 -0.0004 3.1985 0 3.3116C0.0004 3.4241 0.023 3.5355 0.0665 3.6394C0.11 3.7432 0.1735 3.8374 0.2534 3.9167C0.3333 3.996 0.4281 4.0588 0.5323 4.1015C0.6364 4.1441 0.748 4.1659 0.8605 4.1654H2.5716C2.9531 5.5733 4.2346 6.6248 5.7576 6.6248C7.2653 6.6248 8.5361 5.5936 8.9319 4.2073L23.1442 4.1654C23.2568 4.1652 23.3682 4.1428 23.4721 4.0995C23.5761 4.0563 23.6704 3.9929 23.7499 3.9132C23.8293 3.8334 23.8923 3.7388 23.9352 3.6347C23.978 3.5306 24 3.4191 23.9998 3.3066C23.9993 3.0798 23.909 2.8625 23.7487 2.7021C23.5884 2.5418 23.371 2.4515 23.1442 2.451L8.9553 2.4929C8.586 1.0673 7.2933 0 5.7576 0ZM5.7576 1.7144C6.6508 1.7144 7.3565 2.4184 7.3565 3.3116C7.3565 4.2047 6.6508 4.9104 5.7576 4.9104C4.8644 4.9104 4.1604 4.2047 4.1604 3.3116C4.1604 2.4184 4.8644 1.7144 5.7576 1.7144ZM14.9155 8.284C13.3701 8.284 12.0696 9.3496 11.686 10.7785H0.8605C0.7478 10.7781 0.6361 10.7999 0.5319 10.8427C0.4276 10.8854 0.3328 10.9484 0.2528 11.0278C0.1729 11.1073 0.1094 11.2017 0.0661 11.3058C0.0227 11.4098 0.0002 11.5214 0 11.6341C-0.0002 11.7471 0.0219 11.859 0.0651 11.9634C0.1083 12.0678 0.1717 12.1626 0.2517 12.2425C0.3316 12.3223 0.4266 12.3855 0.5311 12.4285C0.6356 12.4715 0.7476 12.4934 0.8605 12.4929H11.6876C12.0725 13.9214 13.3714 14.9892 14.9155 14.9892C16.4596 14.9892 17.7586 13.9214 18.1434 12.4929H23.1442C23.2568 12.4927 23.3682 12.4703 23.4721 12.427C23.5761 12.3838 23.6704 12.3204 23.7499 12.2407C23.8293 12.1609 23.8923 12.0663 23.9352 11.9622C23.978 11.8581 24 11.7466 23.9998 11.6341C23.9993 11.4073 23.909 11.19 23.7487 11.0296C23.5884 10.8693 23.371 10.779 23.1442 10.7785H18.1451C17.7615 9.3496 16.4609 8.284 14.9155 8.284ZM14.9155 9.9984C15.8317 9.9984 16.5562 10.7179 16.5562 11.6341C16.5562 12.5502 15.8317 13.2748 14.9155 13.2748C13.9994 13.2748 13.2748 12.5502 13.2748 11.6341C13.2748 10.7179 13.9994 9.9984 14.9155 9.9984ZM8.2538 17.0233C6.7102 17.0233 5.4096 18.0901 5.0243 19.5179H0.8605C0.7474 19.5175 0.6353 19.5394 0.5307 19.5825C0.4261 19.6256 0.3311 19.689 0.2511 19.769C0.1711 19.849 0.1077 19.944 0.0646 20.0486C0.0215 20.1532 -0.0004 20.2653 0 20.3784C0.0004 20.491 0.023 20.6024 0.0665 20.7062C0.11 20.8101 0.1735 20.9043 0.2534 20.9836C0.3333 21.0629 0.4281 21.1256 0.5323 21.1683C0.6364 21.211 0.748 21.2327 0.8605 21.2323H5.0226C5.4055 22.6637 6.7077 23.7336 8.2538 23.7336C9.8 23.7336 11.1005 22.6636 11.4834 21.2323H23.1442C23.3707 21.2318 23.5878 21.1418 23.7481 20.9818C23.9084 20.8218 23.9989 20.6049 23.9998 20.3784C24.0002 20.2657 23.9784 20.154 23.9356 20.0498C23.8929 19.9455 23.8299 19.8507 23.7505 19.7707C23.671 19.6908 23.5766 19.6273 23.4725 19.584C23.3685 19.5406 23.257 19.5181 23.1442 19.5179H11.4817C11.0964 18.0902 9.7974 17.0233 8.2538 17.0233ZM8.2538 18.7377C9.17 18.7377 9.8946 19.4623 9.8946 20.3784C9.8946 21.2946 9.17 22.0192 8.2538 22.0192C7.3377 22.0192 6.6131 21.2946 6.6131 20.3784C6.6131 19.4623 7.3377 18.7377 8.2538 18.7377Z"
        fill={COLORS.primary}
      />
    </Svg>
  );

  // Toggle bookmark
  const toggleBookmark = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
  };

  // Filter jobs by search
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchText.toLowerCase()) ||
    job.company.toLowerCase().includes(searchText.toLowerCase()) ||
    job.location.toLowerCase().includes(searchText.toLowerCase())
  );

  // Render job card - using same structure as JobSeekerScreen
  const renderJobCard = ({ item }) => (
    <View style={styles.jobCard}>
      {/* Bookmark Icon */}
      <TouchableOpacity 
        style={styles.bookmarkIcon}
        onPress={() => toggleBookmark(item.id)}
      >
        <BookmarkIcon width={20} height={23} color={COLORS.text} />
      </TouchableOpacity>

      {/* Header Row: Logo + Title/Company */}
      <View style={styles.cardHeader}>
        {/* Company Logo */}
        <View style={styles.companyLogo}>
          <Image 
            source={require('../../assets/images/bjaja.png')} 
            style={styles.companyLogoImage}
            resizeMode="contain"
          />
        </View>

        {/* Title and Company Column */}
        <View style={styles.titleColumn}>
          {/* Job Title */}
          <Text style={styles.jobTitle}>{item.title}</Text>
          
          {/* Company Name */}
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
      </View>

      {/* Info Grid: 2 columns */}
      <View style={styles.infoGrid}>
        {/* Location */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <LocationIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>{item.location}</Text>
        </View>

        {/* Salary */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <SalaryIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>
            {item.minSalary && item.maxSalary 
              ? `₹${item.minSalary.toLocaleString('en-IN')}-₹${item.maxSalary.toLocaleString('en-IN')}`
              : item.salary || 'Not specified'}
          </Text>
        </View>

        {/* Category */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <CategoryIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>{item.category}</Text>
        </View>

        {/* Experience */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <ExperienceIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>
            {item.experience ? `${item.experience} years` : item.openings || 'Not specified'}
          </Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.viewMoreButton}
          onPress={() => onNavigateToJobDetails?.(item)}
        >
          <Text style={styles.viewMoreText}>View more</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>APPLY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primaryDark, COLORS.primary]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Jobs</Text>
        </LinearGradient>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Search Row */}
          <View style={styles.searchRow}>
            {/* Search Input */}
            <View style={styles.searchInputContainer}>
              <View style={styles.searchIconWrapper}>
                <SearchIcon />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by area, company, or skills"
                placeholderTextColor={COLORS.textMuted}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* Filter Button */}
            <TouchableOpacity style={styles.filterButton}>
              <FilterIcon />
            </TouchableOpacity>
          </View>

          {/* Jobs List */}
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderJobCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.jobsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No jobs found</Text>
              </View>
            }
          />
        </View>

        {/* Bottom Tab Bar */}
        <BottomTabBar
          activeTab="jobs"
          onNavigate={(tab) => {
            if (tab === 'home') onNavigateToHome?.();
            if (tab === 'pool') onNavigateToPool?.();
            if (tab === 'profile') onNavigateToProfile?.();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  root: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },

  // Header
  header: {
    paddingTop: hp(-10),
    paddingBottom: hp(1),
    paddingHorizontal: wp(4),
  },
  headerTitle: {
    fontSize: rf(16),
    fontWeight: '700',
    marginTop: scale(40),
    color: '#FFFFFF',
    lineHeight: rf(23),
    fontFamily: 'Murecho',
  },

  // Content Container
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: hp(3),
    paddingHorizontal: wp(4),
  },

  // Search Row
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5),
    gap: wp(3),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    height: scale(46),
    paddingHorizontal: wp(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIconWrapper: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: rf(14),
    fontWeight: '400',
    color: COLORS.text,
    paddingVertical: 0,
    fontFamily: 'Mukta',
  },
  filterButton: {
    width: scale(48),
    height: scale(48),
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  // Jobs List
  jobsList: {
    paddingBottom: hp(12),
  },

  // Job Card - matching JobSeekerScreen styles
  jobCard: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(10),
    paddingTop: verticalScale(20),
    paddingRight: scale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: scale(20),
    marginBottom: hp(2),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 2,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: verticalScale(20),
    right: scale(20),
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(16),
  },
  companyLogo: {
    width: scale(60),
    height: scale(60),
    backgroundColor: 'transparent',
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
    overflow: 'hidden',
  },
  companyLogoImage: {
    width: scale(45),
    height: scale(43),
  },
  titleColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: rf(18),
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: verticalScale(4),
    fontFamily: 'Murecho',
    lineHeight: rf(26),
  },
  companyName: {
    fontSize: rf(12),
    fontWeight: '400',
    color: COLORS.textSub,
    fontFamily: 'Murecho',
    lineHeight: rf(17),
  },
  
  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(20),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: verticalScale(12),
  },
  iconWrapper: {
    marginRight: scale(8),
    width: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: rf(8),
    fontWeight: '400',
    color: COLORS.textSub,
    fontFamily: 'Murecho',
    lineHeight: rf(12),
    flex: 1,
  },
  
  // Card Actions
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: verticalScale(4),
  },
  viewMoreButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(4),
    marginRight: scale(16),
  },
  viewMoreText: {
    fontSize: rf(10),
    fontWeight: '500',
    color: COLORS.primary,
    fontFamily: 'Murecho',
    lineHeight: rf(14),
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(6),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(45),
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  applyButtonText: {
    fontSize: rf(10),
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Murecho',
    textAlign: 'center',
    lineHeight: rf(14),
  },

  // Empty State
  emptyContainer: {
    padding: hp(4),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: rf(14),
    color: COLORS.textMuted,
  },
});

export default JobsScreen;
