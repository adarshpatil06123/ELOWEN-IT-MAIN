import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobsContext';
import { getTranslation } from '../../translations/translations';
import AreaIcon from '../../components/AreaIcon';
import HomeIcon from '../../components/HomeIcon';
import CompanyIcon from '../../components/CompanyIcon';
import SkillsIcon from '../../components/SkillsIcon';
import SpeakingIcon from '../../components/SpeakingIcon';
import CategoriesIcon from '../../components/CategoriesIcon';
import GalleryIcon from '../../components/GalleryIcon';
import ProfileIcon from '../../components/ProfileIcon';
import LocationIcon from '../../components/LocationIcon';
import SalaryIcon from '../../components/SalaryIcon';
import CategoryIcon from '../../components/CategoryIcon';
import ExperienceIcon from '../../components/ExperienceIcon';
import BookmarkIcon from '../../components/BookmarkIcon';

const JobSeekerScreen = ({ onNavigateToJobs }) => {
  const { language } = useLanguage();
  const { jobs, loading, error, fetchJobs, applyToJob, searchJobs } = useJobs();
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allJobs, setAllJobs] = useState([]); // Store all jobs for client-side filtering
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered results

  // Fetch jobs when screen loads
  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load all jobs
  const loadJobs = async () => {
    await fetchJobs();
  };

  // Update allJobs when jobs change
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setAllJobs(jobs);
      if (!searchQuery) {
        setFilteredJobs(jobs);
      }
    }
  }, [jobs]);

  // Handle category selection - show search bar when clicked
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowSearchBar(true);
    setSearchQuery('');
    setFilteredJobs(allJobs); // Reset to all jobs when category changes
  };

  // Handle search query change with client-side filtering
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredJobs(allJobs);
      return;
    }

    const searchTerm = text.toLowerCase().trim();
    let results = [];

    // Filter based on selected category
    if (selectedCategory === 'area') {
      // Search by location (city, state, or full location)
      results = allJobs.filter(job => 
        job.location?.toLowerCase().includes(searchTerm) ||
        job.city?.toLowerCase().includes(searchTerm) ||
        job.state?.toLowerCase().includes(searchTerm)
      );
    } else if (selectedCategory === 'company') {
      // Search by company name
      results = allJobs.filter(job => 
        job.company?.toLowerCase().includes(searchTerm)
      );
    } else if (selectedCategory === 'skills') {
      // Search by category or job title
      results = allJobs.filter(job => 
        job.category?.toLowerCase().includes(searchTerm) ||
        job.title?.toLowerCase().includes(searchTerm)
      );
    } else if (selectedCategory === 'speaking') {
      // Search in languages field and other text fields
      results = allJobs.filter(job => 
        job.languages?.toLowerCase().includes(searchTerm) ||
        job.title?.toLowerCase().includes(searchTerm) ||
        job.company?.toLowerCase().includes(searchTerm) ||
        job.category?.toLowerCase().includes(searchTerm)
      );
    } else {
      // Generic search across all fields
      results = allJobs.filter(job => 
        job.title?.toLowerCase().includes(searchTerm) ||
        job.company?.toLowerCase().includes(searchTerm) ||
        job.location?.toLowerCase().includes(searchTerm) ||
        job.category?.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredJobs(results);
  };

  // Close search bar
  const closeSearchBar = () => {
    setShowSearchBar(false);
    setSearchQuery('');
    setSelectedCategory(null);
    setFilteredJobs(allJobs); // Reset to all jobs
  };

  // Handle job application
  const handleApply = async (jobId) => {
    const result = await applyToJob(jobId);
    if (result.success) {
      Alert.alert(
        getTranslation(language, 'success') || 'Success',
        result.message || getTranslation(language, 'appliedSuccessfully') || 'Applied successfully!'
      );
    } else {
      Alert.alert(
        getTranslation(language, 'error') || 'Error',
        result.error || getTranslation(language, 'applicationFailed') || 'Failed to apply. Please try again.'
      );
    }
  };

  const searchCategories = [
    {
      id: 'area',
      label: getTranslation(language, 'area'),
      icon: 'location',
    },
    {
      id: 'company',
      label: getTranslation(language, 'company'),
      icon: 'company',
    },
    {
      id: 'skills',
      label: getTranslation(language, 'skills'),
      icon: 'skills',
    },
    {
      id: 'speaking',
      label: getTranslation(language, 'speaking'),
      icon: 'speaking',
    },
  ];

  const renderJobCard = (job) => (
    <View
      key={job.id}
      style={[styles.jobCard, job.featured && styles.featuredJobCard]}
    >
      {/* Bookmark Icon */}
      <TouchableOpacity style={styles.bookmarkIcon}>
        <BookmarkIcon width={20} height={23} color="#1A1A1A" />
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
          <Text style={styles.jobTitle}>{job.title}</Text>
          
          {/* Company Name */}
          <Text style={styles.companyName}>{job.company}</Text>
        </View>
      </View>

      {/* Info Grid: 2 columns */}
      <View style={styles.infoGrid}>
        {/* Location */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <LocationIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>{job.location}</Text>
        </View>

        {/* Salary */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <SalaryIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>
            {job.minSalary && job.maxSalary 
              ? `₹${job.minSalary.toLocaleString('en-IN')}-₹${job.maxSalary.toLocaleString('en-IN')}`
              : job.salary || 'Not specified'}
          </Text>
        </View>

        {/* Category */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <CategoryIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>{job.category}</Text>
        </View>

        {/* Experience */}
        <View style={styles.infoItem}>
          <View style={styles.iconWrapper}>
            <ExperienceIcon size={12} color="#757575" />
          </View>
          <Text style={styles.infoText}>
            {job.experience ? `${job.experience} years` : 'Not specified'}
          </Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>
            {getTranslation(language, 'viewMore')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.applyButton, job.applied && styles.appliedButton]}
          onPress={() => handleApply(job.id)}
          disabled={job.applied}
        >
          <Text style={styles.applyButtonText}>
            {job.applied 
              ? (getTranslation(language, 'applied') || 'Applied')
              : getTranslation(language, 'apply')
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchCategory = (category) => {
    const isSelected = selectedCategory === category.id;
    
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryCard,
          isSelected && styles.highlightedCategory,
        ]}
        onPress={() => handleCategorySelect(category.id)}
      >
        {category.id === 'area' ? (
          <AreaIcon 
            size={25} 
            highlighted={isSelected}
          />
        ) : category.id === 'company' ? (
          <CompanyIcon 
            size={25} 
            highlighted={isSelected}
          />
        ) : category.id === 'skills' ? (
          <SkillsIcon 
            size={25} 
            highlighted={isSelected}
          />
        ) : category.id === 'speaking' ? (
          <SpeakingIcon 
            size={25}
            highlighted={isSelected}
          />
        ) : (
          <View 
            style={[
              styles.categoryIcon,
              isSelected && styles.categoryIconHighlighted,
            ]} 
          />
        )}
        <Text
          style={[
            styles.categoryLabel,
            isSelected && styles.highlightedCategoryLabel,
          ]}
        >
          {category.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Background Gradient Circles */}
      <View style={styles.backgroundCircles}>
        <LinearGradient
          colors={['rgba(238, 88, 53, 0.5)', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse1}
        />
        <LinearGradient
          colors={['rgba(238, 88, 53, 0.7)', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse2}
        />
        <LinearGradient
          colors={['#EE5835', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse3}
        />
        <LinearGradient
          colors={['#009990', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse4}
        />
        <LinearGradient
          colors={['#009990', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse5}
        />
        <LinearGradient
          colors={['#F8DEC5', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.ellipse6}
        />
      </View>

      {/* White Overlay */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.1)', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.whiteOverlay}
      />

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>
              {getTranslation(language, 'findYourCareer')}
            </Text>
          </View>
          <Image
            source={require('../../assets/job seeker images/person.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>

        {/* Search Job By Section */}
        <Text style={styles.sectionTitle}>
          {getTranslation(language, 'searchJobBy')}
        </Text>

        <View style={styles.categoriesGrid}>
          {searchCategories.map(renderSearchCategory)}
        </View>

        {/* Search Bar - Shows when category is clicked */}
        {showSearchBar && (
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBarWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder={`${getTranslation(language, 'search')} ${getTranslation(language, selectedCategory)}...`}
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
              />
              <TouchableOpacity 
                style={styles.closeSearchButton}
                onPress={closeSearchBar}
              >
                <Text style={styles.closeSearchText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recommended Jobs Section */}
        <Text style={styles.sectionTitle}>
          {showSearchBar && searchQuery 
            ? `${getTranslation(language, 'searchResults') || 'Search Results'} (${filteredJobs.length})`
            : getTranslation(language, 'recommendedJobs')}
        </Text>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#05386B" />
            <Text style={styles.loadingText}>
              {getTranslation(language, 'loading') || 'Loading jobs...'}
            </Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => loadJobs()}
            >
              <Text style={styles.retryButtonText}>
                {getTranslation(language, 'retry') || 'Retry'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Jobs List */}
        {!loading && !error && filteredJobs.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {showSearchBar && searchQuery
                ? getTranslation(language, 'noResultsFound') || 'No results found'
                : getTranslation(language, 'noJobsFound') || 'No jobs found'}
            </Text>
          </View>
        )}

        {!loading && !error && filteredJobs.length > 0 && filteredJobs.map(renderJobCard)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navBackground} />
        
        <View style={styles.navContent}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab('home')}
          >
            <HomeIcon 
              size={25} 
              active={selectedTab === 'home'}
            />
            <Text
              style={[
                styles.navLabel,
                selectedTab === 'home' && styles.navLabelActive,
              ]}
            >
              {getTranslation(language, 'home')}
            </Text>
            {selectedTab === 'home' && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab('categories')}
          >
            <CategoriesIcon 
              size={25} 
              active={selectedTab === 'categories'}
            />
            <Text
              style={[
                styles.navLabel,
                selectedTab === 'categories' && styles.navLabelActive,
              ]}
            >
              {getTranslation(language, 'categories')}
            </Text>
            {selectedTab === 'categories' && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab('gallery')}
          >
            <GalleryIcon 
              size={25} 
              active={selectedTab === 'gallery'}
            />
            <Text
              style={[
                styles.navLabel,
                selectedTab === 'gallery' && styles.navLabelActive,
              ]}
            >
              {getTranslation(language, 'gallery')}
            </Text>
            {selectedTab === 'gallery' && <View style={styles.navIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setSelectedTab('profile')}
          >
            <ProfileIcon 
              size={25} 
              active={selectedTab === 'profile'}
            />
            <Text
              style={[
                styles.navLabel,
                selectedTab === 'profile' && styles.navLabelActive,
              ]}
            >
              {getTranslation(language, 'profile')}
            </Text>
            {selectedTab === 'profile' && <View style={styles.navIndicator} />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundCircles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  ellipse6: {
    position: 'absolute',
    width: scale(27.53),
    height: scale(27.53),
    left: scale(333),
    top: verticalScale(40),
    borderRadius: scale(13.765),
    transform: [{ rotate: '42.47deg' }],
  },
  whiteOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: wp(4),
    paddingTop: hp(5),
    marginBottom: hp(3),
  },
  headerLeft: {
    flex: 1,
    paddingRight: wp(4),
  },
  headerTitle: {
    fontSize: rf(26),
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: rf(38),
    fontFamily: 'Murecho',
  },
  headerImage: {
    width: scale(165),
    height: scale(110),
  },
  sectionTitle: {
    fontSize: rf(15),
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: wp(4),
    marginTop: hp(2),
    marginBottom: hp(2),
    fontFamily: 'Murecho',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginBottom: hp(1),
  },
  categoryCard: {
    width: scale(77),
    height: scale(72),
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: '#E4E1E1',
    borderRadius: scale(5),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#009990',
  },
  categoryIcon: {
    width: scale(25),
    height: scale(25),
    backgroundColor: '#05386B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: hp(1),
  },
  categoryIconHighlighted: {
    backgroundColor: '#009990',
  },
  categoryLabel: {
    fontSize: rf(14),
    fontWeight: '500',
    color: '#1A1A1A',
    fontFamily: 'Murecho',
  },
  highlightedCategoryLabel: {
    color: '#009990',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: scale(10),
    marginHorizontal: wp(4),
    marginBottom: hp(2.5),
    paddingTop: verticalScale(20),
    paddingRight: scale(20),
    paddingBottom: verticalScale(20),
    paddingLeft: scale(20),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  featuredJobCard: {
    borderColor: '#05386B',
    borderWidth: 2,
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
    fontSize: rf(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: verticalScale(4),
    fontFamily: 'Murecho',
    lineHeight: rf(26),
  },
  companyName: {
    fontSize: rf(14),
    fontWeight: '400',
    color: '#757575',
    fontFamily: 'Murecho',
    lineHeight: rf(20),
  },
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
  locationIcon: {
    marginRight: scale(10),
  },
  salaryIcon: {
    marginRight: scale(10),
  },
  categoryIconSmall: {
    marginRight: scale(10),
  },
  experienceIcon: {
    marginRight: scale(10),
  },
  infoText: {
    fontSize: rf(13),
    fontWeight: '400',
    color: '#424242',
    fontFamily: 'Murecho',
    lineHeight: rf(18),
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(4),
    borderTopWidth: 0,
  },
  viewMoreButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(4),
  },
  viewMoreText: {
    fontSize: rf(14),
    fontWeight: '600',
    color: '#05386B',
    fontFamily: 'Murecho',
  },
  applyButton: {
    backgroundColor: '#05386B',
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(40),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applyButtonText: {
    fontSize: rf(16),
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Murecho',
    textTransform: 'uppercase',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(10),
  },
  navBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(6.5),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E4E4',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  navContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: hp(1.5),
    paddingBottom: hp(3),
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navIcon: {
    width: scale(25),
    height: scale(25),
    marginBottom: hp(0.5),
  },
  homeIconContainer: {
    width: scale(25),
    height: scale(25),
    marginBottom: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIconRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: scale(10),
    borderRightWidth: scale(10),
    borderBottomWidth: scale(8),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#737373',
    marginBottom: scale(2),
  },
  homeIconBase: {
    width: scale(16),
    height: scale(12),
    backgroundColor: '#737373',
    borderRadius: scale(2),
  },
  homeIconActive: {
    borderBottomColor: '#0B1D51',
    backgroundColor: '#0B1D51',
  },
  navLabel: {
    fontSize: rf(13),
    fontWeight: '500',
    color: '#737373',
    fontFamily: 'Murecho',
  },
  navLabelActive: {
    color: '#0B1D51',
  },
  navIndicator: {
    position: 'absolute',
    top: -hp(1),
    width: scale(55),
    height: scale(20),
    backgroundColor: 'rgba(200, 217, 227, 0.25)',
    borderRadius: scale(5),
  },
  loadingContainer: {
    padding: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: rf(14),
    color: '#757575',
    fontFamily: 'Murecho',
  },
  errorContainer: {
    padding: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: rf(14),
    color: '#DD0202',
    textAlign: 'center',
    marginBottom: hp(2),
    fontFamily: 'Murecho',
  },
  retryButton: {
    backgroundColor: '#05386B',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: scale(8),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontWeight: '600',
    fontFamily: 'Murecho',
  },
  emptyContainer: {
    padding: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: rf(14),
    color: '#757575',
    textAlign: 'center',
    fontFamily: 'Murecho',
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
    opacity: 0.7,
  },
  searchBarContainer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#009990',
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    fontSize: rf(15),
    color: '#1A1A1A',
    fontFamily: 'Murecho',
  },
  closeSearchButton: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeSearchText: {
    fontSize: rf(20),
    color: '#757575',
    fontWeight: '600',
  },
});

export default JobSeekerScreen;
