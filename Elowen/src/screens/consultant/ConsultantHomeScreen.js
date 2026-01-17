import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Polyline, Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../../utils/responsive';
import HomeIcon from '../../components/HomeIcon';
import ProfileIcon from '../../components/ProfileIcon';
import EmployeeOverviewCard from '../../components/EmployeeOverviewCard';
import WorkforceMetricsCard from '../../components/WorkforceMetricsCard';
import BottomTabBar from '../../components/BottomTabBar';

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
  chip: 'rgba(200,217,227,0.25)',
  navy: '#0B1D51',
};

const ConsultantHomeScreen = ({ onNavigateToPool, onNavigateToJobs }) => {
  return (
    <SafeAreaView style={styles.safe}> 
      <View style={styles.root}>
        {/* Header */}
        <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.header}>
          <Text style={styles.headerTitle}>Connect Top Talent{"\n"}with the Right Employers</Text>
          
          {/* Chat Icon */}
          <TouchableOpacity style={styles.chatIcon}>
            <Svg width="24" height="23" viewBox="0 0 32 31" fill="none">
              <Path d="M23.5856 6.32651e-06H8.42255C5.98421 6.32651e-06 4 1.98422 4 4.42256V15.163C4 17.6014 5.98421 19.5856 8.42255 19.5856H10.0267L13.6188 22.6557C13.6188 22.6557 13.6471 22.6804 13.6632 22.6903C13.9544 22.8951 14.2851 23 14.6232 23C14.8601 23 15.0971 22.9494 15.3241 22.8458C15.8708 22.5928 16.2336 22.0844 16.2879 21.4847V21.4279V19.5868H23.5819C26.0203 19.5868 28.0045 17.6026 28.0045 15.1643V4.42255C28.0045 1.98421 26.0203 0 23.5819 0L23.5856 6.32651e-06ZM26.7445 15.163C26.7445 16.9042 25.3267 18.322 23.5856 18.322H15.6635C15.3155 18.322 15.0317 18.6033 15.0317 18.9538V21.3921C14.9997 21.5846 14.8577 21.6698 14.7985 21.6982C14.7381 21.7265 14.5801 21.7771 14.4135 21.6735L10.6695 18.4738C10.556 18.3763 10.4104 18.322 10.2586 18.322H8.41997C6.67884 18.322 5.261 16.9041 5.261 15.163L5.25977 4.42254C5.25977 2.68142 6.67761 1.26358 8.41873 1.26358H23.5818C25.3229 1.26358 26.7407 2.68142 26.7407 4.42254V15.163L26.7445 15.163Z" fill="white"/>
              <Path d="M8.42285 0.5H23.582L23.7832 0.504883C25.8523 0.610073 27.5049 2.32815 27.5049 4.42285V15.1641C27.5049 17.3262 25.7442 19.0869 23.582 19.0869H15.7881V21.4512C15.7466 21.8646 15.4982 22.213 15.1162 22.3906C14.9538 22.4647 14.7876 22.5 14.623 22.5C14.391 22.5 14.1605 22.4285 13.9512 22.2812L13.9434 22.2754L10.3516 19.2051L10.2109 19.0859H8.42285C6.26067 19.0859 4.50003 17.3253 4.5 15.1631V4.42285L4.50488 4.2207C4.61036 2.15185 6.32834 0.5 8.42285 0.5ZM8.41895 0.763672C6.40168 0.763672 4.75977 2.40558 4.75977 4.42285L4.76074 15.1631C4.76078 17.1803 6.40269 18.8222 8.41992 18.8223H10.2588C10.2911 18.8223 10.321 18.834 10.3438 18.8535H10.3447L14.0889 22.0537L14.1172 22.0781L14.1494 22.0977C14.5216 22.3292 14.8771 22.2131 15.0107 22.1504L15.0146 22.1494C15.1304 22.094 15.4534 21.9061 15.5254 21.4746L15.5312 21.4336V18.9541C15.5312 18.8812 15.5902 18.8225 15.6631 18.8223H23.5859C25.603 18.8221 27.2441 17.1802 27.2441 15.1631V14.665L27.2412 14.6641V4.42285C27.2412 2.40567 25.5992 0.763818 23.582 0.763672H8.41895Z" stroke="white"/>
              <Path d="M10.3271 6.98112H10.333C10.7079 7.00056 17.346 6.99193 21.6914 6.98209L21.709 6.98112C21.7727 6.99002 21.8232 7.04421 21.8232 7.11002C21.8232 7.18185 21.7632 7.24186 21.6914 7.24186H21.6904C20.544 7.24433 16.5349 7.25455 13.5889 7.25455C12.6991 7.25455 11.9073 7.25347 11.3203 7.25163C11.0266 7.2507 10.7841 7.24932 10.6074 7.24772C10.5192 7.24692 10.4483 7.24576 10.3955 7.24479C10.369 7.2443 10.3477 7.24429 10.332 7.24381C10.3167 7.24334 10.3106 7.24283 10.3105 7.24284H10.3086C10.2415 7.23854 10.1827 7.1777 10.1875 7.10123C10.192 7.03068 10.2515 6.97636 10.3271 6.98112Z" fill="white" stroke="white"/>
              <Path d="M10.3271 12.2316H10.333C10.7079 12.2511 17.346 12.2424 21.6914 12.2326L21.707 12.2316C21.7704 12.2408 21.8203 12.2949 21.8203 12.3605C21.8203 12.4324 21.7603 12.4924 21.6885 12.4924H21.6875C20.5407 12.4948 16.5327 12.5051 13.5869 12.5051C12.698 12.5051 11.9062 12.504 11.3193 12.5021C11.0259 12.5012 10.784 12.4998 10.6074 12.4982C10.5192 12.4974 10.4483 12.4963 10.3955 12.4953C10.369 12.4948 10.3477 12.4948 10.332 12.4943C10.3167 12.4939 10.3106 12.4933 10.3105 12.4934H10.3115C10.2385 12.4881 10.1829 12.425 10.1875 12.3518C10.192 12.2812 10.2515 12.2269 10.3271 12.2316Z" fill="white" stroke="white"/>
            </Svg>
          </TouchableOpacity>

          {/* Filter Icon */}
          <TouchableOpacity style={styles.filterIcon}>
            <Svg width="40" height="40" viewBox="0 0 56 56" fill="none">
              <Path d="M21.7576 12C20.2373 12 18.959 13.047 18.5749 14.451H16.8605C16.7474 14.4506 16.6353 14.4726 16.5307 14.5156C16.4261 14.5587 16.3311 14.6221 16.2511 14.7021C16.1711 14.7821 16.1077 14.8771 16.0646 14.9817C16.0215 15.0864 15.9996 15.1985 16 15.3116C16.0004 15.4241 16.023 15.5355 16.0665 15.6394C16.11 15.7432 16.1735 15.8374 16.2534 15.9167C16.3333 15.996 16.4281 16.0588 16.5323 16.1015C16.6364 16.1441 16.748 16.1659 16.8605 16.1654H18.5716C18.9531 17.5733 20.2346 18.6248 21.7576 18.6248C23.2653 18.6248 24.5361 17.5936 24.9319 16.2073L39.1442 16.1654C39.2568 16.1652 39.3682 16.1428 39.4721 16.0995C39.5761 16.0563 39.6704 15.9929 39.7499 15.9132C39.8293 15.8334 39.8923 15.7388 39.9352 15.6347C39.978 15.5306 40 15.4191 39.9998 15.3066C39.9993 15.0798 39.909 14.8625 39.7487 14.7021C39.5884 14.5418 39.371 14.4515 39.1442 14.451L24.9553 14.4929C24.586 13.0673 23.2933 12 21.7576 12ZM21.7576 13.7144C22.6508 13.7144 23.3565 14.4184 23.3565 15.3116C23.3565 16.2047 22.6508 16.9104 21.7576 16.9104C20.8644 16.9104 20.1604 16.2047 20.1604 15.3116C20.1604 14.4184 20.8644 13.7144 21.7576 13.7144ZM30.9155 20.284C29.3701 20.284 28.0696 21.3496 27.686 22.7785H16.8605C16.7478 22.7781 16.6361 22.7999 16.5319 22.8427C16.4276 22.8854 16.3328 22.9484 16.2528 23.0278C16.1729 23.1073 16.1094 23.2017 16.0661 23.3058C16.0227 23.4098 16.0002 23.5214 16 23.6341C15.9998 23.7471 16.0219 23.859 16.0651 23.9634C16.1083 24.0678 16.1717 24.1626 16.2517 24.2425C16.3316 24.3223 16.4266 24.3855 16.5311 24.4285C16.6356 24.4715 16.7476 24.4934 16.8605 24.4929H27.6876C28.0725 25.9214 29.3714 26.9892 30.9155 26.9892C32.4596 26.9892 33.7586 25.9214 34.1434 24.4929H39.1442C39.2568 24.4927 39.3682 24.4703 39.4721 24.427C39.5761 24.3838 39.6704 24.3204 39.7499 24.2407C39.8293 24.1609 39.8923 24.0663 39.9352 23.9622C39.978 23.8581 40 23.7466 39.9998 23.6341C39.9993 23.4073 39.909 23.19 39.7487 23.0296C39.5884 22.8693 39.371 22.779 39.1442 22.7785H34.1451C33.7615 21.3496 32.4609 20.284 30.9155 20.284ZM30.9155 21.9984C31.8317 21.9984 32.5562 22.7179 32.5562 23.6341C32.5562 24.5502 31.8317 25.2748 30.9155 25.2748C29.9994 25.2748 29.2748 24.5502 29.2748 23.6341C29.2748 22.7179 29.9994 21.9984 30.9155 21.9984ZM24.2538 29.0233C22.7102 29.0233 21.4096 30.0901 21.0243 31.5179H16.8605C16.7474 31.5175 16.6353 31.5394 16.5307 31.5825C16.4261 31.6256 16.3311 31.689 16.2511 31.769C16.1711 31.849 16.1077 31.944 16.0646 32.0486C16.0215 32.1532 15.9996 32.2653 16 32.3784C16.0004 32.491 16.023 32.6024 16.0665 32.7062C16.11 32.8101 16.1735 32.9043 16.2534 32.9836C16.3333 33.0629 16.4281 33.1256 16.5323 33.1683C16.6364 33.211 16.748 33.2327 16.8605 33.2323H21.0226C21.4055 34.6637 22.7077 35.7336 24.2538 35.7336C25.8 35.7336 27.1005 34.6636 27.4834 33.2323H39.1442C39.3707 33.2318 39.5878 33.1418 39.7481 32.9818C39.9084 32.8218 39.9989 32.6049 39.9998 32.3784C40.0002 32.2657 39.9784 32.154 39.9356 32.0498C39.8929 31.9455 39.8299 31.8507 39.7505 31.7707C39.671 31.6908 39.5766 31.6273 39.4725 31.584C39.3685 31.5406 39.257 31.5181 39.1442 31.5179H27.4817C27.0964 30.0902 25.7974 29.0233 24.2538 29.0233ZM24.2538 30.7377C25.17 30.7377 25.8946 31.4623 25.8946 32.3784C25.8946 33.2946 25.17 34.0192 24.2538 34.0192C23.3377 34.0192 22.6131 33.2946 22.6131 32.3784C22.6131 31.4623 23.3377 30.7377 24.2538 30.7377Z" fill="#084A8C"/>
            </Svg>
          </TouchableOpacity>

          {/* Search */}
          <View style={styles.searchRow}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={styles.searchIcon}>
              <Path d="M11.7428 10.3439C12.7267 9.09853 13.1455 7.51769 12.9019 5.96985C12.6583 4.42201 11.7721 3.04424 10.4577 2.1516C9.14327 1.25895 7.51571 0.928503 5.93003 1.22703C4.34435 1.52556 2.93594 2.42897 2.00491 3.74899C1.07388 5.06901 0.695023 6.70197 0.945916 8.30137C1.19681 9.90077 2.05685 11.3391 3.34756 12.2922C4.63826 13.2453 6.25733 13.6386 7.85098 13.387C9.44463 13.1353 10.8789 12.2572 11.7428 10.9439V10.3439ZM11.7428 10.3439L15.4 14" stroke="#084A8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <TextInput
              placeholder="Search by area, company, or skills"
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Employees Overview Section - Dynamic Component */}
          <EmployeeOverviewCard 
            title="Employee Overview"
            appliedCount={5732}
            appliedLabel="Applied for job"
            joinedCount={5732}
            joinedLabel="Joined the job"
          />

          {/* Workforce Metrics Section */}
          <WorkforceMetricsCard 
            title="Workforce Metrics"
            totalWorkers={5432}
            activeCount={3200}
            activeLabel="Active"
            availableCount={2232}
            availableLabel="Available"
            attritionRate="4.3%"
            attritionLabel="Attrition Rate"
          />

          {/* Performance Metrics Section */}
          <Text style={styles.performanceTitle}>Performance Metrics</Text>
          
          <View style={styles.performanceRow}>
            {/* Past Placements Card */}
            <View style={styles.pastPlacementsCard}>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.5)}}>
                  <Svg width="14" height="12" viewBox="0 0 14 12" fill="none" style={{marginRight: wp(1)}}>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M11.9354 5.16423L7.7535 6.22352V6.42261C7.7535 6.60743 7.68131 6.7757 7.56446 6.90043L7.55106 6.91545C7.42603 7.04167 7.25336 7.1198 7.06283 7.1198H5.4664C5.27662 7.1198 5.10322 7.04167 4.97817 6.91545V6.9147C4.85314 6.78849 4.77573 6.61419 4.77573 6.42337V6.22427L0.59456 5.16424V10.3045C0.59456 10.3856 0.631773 10.4608 0.691313 10.5164C0.756063 10.5765 0.846118 10.6133 0.947347 10.6133H9.91863C9.88737 10.4608 9.87099 10.3023 9.87099 10.1407C9.87099 9.50367 10.127 8.92594 10.5408 8.50823C10.9055 8.1401 11.393 7.89594 11.9356 7.84261L11.9354 5.16423ZM8.59603 1.90221H12.1193C12.2347 1.90221 12.3388 1.94729 12.4133 2.01866C12.4847 2.08777 12.5301 2.18243 12.5301 2.28685V4.5511L7.7387 5.76515C7.71041 5.63217 7.64343 5.51347 7.55189 5.42106C7.42685 5.29484 7.25418 5.21671 7.06365 5.21671H5.46723C5.27744 5.21671 5.10404 5.29484 4.97899 5.42106C4.8867 5.51422 4.82047 5.63292 4.79218 5.76515L0.000744438 4.5511L0 2.28685C0 2.18318 0.0446564 2.08853 0.116848 2.01866C0.191273 1.94653 0.29547 1.90221 0.411578 1.90221H3.93485V0.432731C3.93485 0.194575 4.12761 0 4.36354 0H8.16747C8.4034 0 8.59616 0.194575 8.59616 0.432731L8.59603 1.90221ZM4.59185 1.90221H7.9387V0.663367H4.59185V1.90221ZM12.158 8.28124C12.6671 8.28124 13.1277 8.48934 13.4604 8.82591C13.7938 9.16248 14 9.62752 14 10.1406C14 10.6545 13.7938 11.1195 13.4604 11.4553C13.127 11.7919 12.6663 12 12.158 12C11.6489 12 11.1882 11.7919 10.8555 11.4553C10.5221 11.1188 10.316 10.6537 10.316 10.1406C10.316 9.62675 10.5221 9.16173 10.8555 8.82591C11.1882 8.48934 11.6489 8.28124 12.158 8.28124ZM10.985 9.90399C11.0721 9.81684 11.2128 9.81684 11.2999 9.90399L11.8714 10.481L13.0168 9.32476C13.1032 9.23761 13.2446 9.23761 13.3309 9.32476C13.4173 9.41266 13.4173 9.55465 13.3309 9.64254L12.0285 10.9573C11.9421 11.0444 11.8007 11.0444 11.7144 10.9573L10.985 10.221C10.8987 10.1339 10.8987 9.99113 10.985 9.90399ZM7.30915 6.42252C7.30915 6.48638 7.28459 6.54573 7.24514 6.5893L7.23696 6.59757C7.1923 6.64264 7.13127 6.67044 7.06354 6.67044H5.46712C5.39939 6.67044 5.33836 6.64264 5.2937 6.59757C5.24905 6.55249 5.22151 6.49088 5.22151 6.42252V5.91317C5.22151 5.8448 5.24905 5.7832 5.2937 5.73812C5.33836 5.69304 5.39939 5.66525 5.46712 5.66525H7.06354C7.13127 5.66525 7.1923 5.69304 7.23696 5.73812C7.28161 5.7832 7.30915 5.8448 7.30915 5.91317L7.30915 6.42252Z" fill="#084A8C"/>
                  </Svg>
                  <Text style={styles.pastPlacementsLabel}>Past Placements</Text>
                </View>
                <Text style={styles.pastPlacementsValue}>250</Text>
              </View>
              
              {/* Bar Chart (background decorative) */}
              <View style={styles.barChartContainer}>
                <View style={[styles.barChart, {height: scale(22)}]}/>
                <View style={[styles.barChart, {height: scale(12)}]}/>
                <View style={[styles.barChart, {height: scale(28)}]}/>
                <View style={[styles.barChart, {height: scale(18)}]}/>
                <View style={[styles.barChart, {height: scale(30)}]}/>
                <View style={[styles.barChart, {height: scale(16)}]}/>
                <View style={[styles.barChart, {height: scale(26)}]}/>
                <View style={[styles.barChart, {height: scale(14)}]}/>
                <View style={[styles.barChart, {height: scale(24)}]}/>
                <View style={[styles.barChart, {height: scale(20)}]}/>
              </View>
              
              {/* Success Rate */}
              <View style={styles.successRateContainer}>
                <View style={styles.successBadge}>
                  <Text style={styles.successPercent}>72%</Text>
                </View>
                <Text style={styles.successLabel}>Success Rate</Text>
              </View>
            </View>

            {/* Incentives Card */}
            <View style={styles.incentivesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* Blue circle with dollar icon from SVG */}
                  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginRight: 6}}>
                    <Path d="M6 0C2.69268 0 0 2.69268 0 6C0 9.30732 2.69268 12 6 12C9.30732 12 12 9.30732 12 6C12 2.69268 9.30732 0 6 0ZM6.4686 8.81264H6.37477V9.37507C6.37477 9.58117 6.20609 9.74985 6 9.74985C5.7939 9.74985 5.62522 9.58117 5.62522 9.37507V8.81264H4.50038C4.29428 8.81264 4.1256 8.64396 4.1256 8.43787C4.1256 8.23177 4.29428 8.06309 4.50038 8.06309H6.4691C6.93411 8.06309 7.31299 7.68421 7.31299 7.2192C7.31299 6.75419 6.93411 6.37532 6.4691 6.37532H5.5314C4.65214 6.37532 3.93739 5.66114 3.93739 4.78131C3.93739 3.90205 4.65157 3.1873 5.5314 3.1873H5.62522V2.62488C5.62522 2.41878 5.7939 2.2501 6 2.2501C6.2061 2.2501 6.37478 2.41878 6.37478 2.62488V3.1873H7.49961C7.70571 3.1873 7.87439 3.35598 7.87439 3.56208C7.87439 3.76818 7.70571 3.93686 7.49961 3.93686H5.53089C5.06588 3.93686 4.68701 4.31573 4.68701 4.78075C4.68701 5.24576 5.06588 5.62463 5.53089 5.62463H6.4686C7.34785 5.62463 8.0626 6.3388 8.0626 7.21864C8.0626 8.09789 7.34843 8.81264 6.4686 8.81264Z" fill="#084A8C"/>
                  </Svg>
                  <Text style={styles.incentivesLabel}>Incentives</Text>
                </View>
                <Text style={styles.incentivesValue}>12,432</Text>
              </View>
            </View>
          </View>

          {/* Ratings Card */}
          <View style={[styles.performanceRow, {marginTop: 0}]}>
            <View style={{width: '48%'}}></View>
            <View style={styles.ratingsCard}>
              {/* Single-line layout: icon + label on left, value on right */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 5}}>
                  <Path d="M12.7906 10.6824C12.9877 10.4686 13.0499 10.1793 12.9591 9.9077C12.8684 9.636 12.6428 9.4373 12.3525 9.3769L8.7462 8.6298C8.6632 8.6122 8.5932 8.5619 8.5517 8.4914L6.7058 5.3949C6.558 5.1484 6.2935 5 6.0006 5C5.7076 5 5.4406 5.1484 5.2954 5.3949L3.4494 8.4914C3.4079 8.5619 3.3353 8.6122 3.255 8.6298L-0.3513 9.3769C-0.6391 9.4373 -0.8647 9.6335 -0.958 9.9077C-1.0513 10.1818 -0.9865 10.4686 -0.7895 10.6824L1.6736 13.3438C1.7306 13.4042 1.7565 13.4847 1.7487 13.5677L1.3676 17.1246C1.3365 17.4089 1.461 17.678 1.6995 17.8466C1.8421 17.9472 2.008 18 2.1765 18C2.288 18 2.4021 17.9774 2.5084 17.9296L5.8787 16.4781C5.9539 16.4454 6.0421 16.4454 6.1198 16.4781L9.4902 17.9296C9.7598 18.0453 10.0632 18.0151 10.3017 17.8466C10.5402 17.678 10.6646 17.4089 10.6335 17.1246L10.2524 13.5677C10.2446 13.4872 10.2706 13.4042 10.3276 13.3438L12.7906 10.6824Z" fill="#084A8C"/>
                </Svg>
                <Text style={styles.ratingsLabel}>Ratings</Text>
              </View>
              <Text style={styles.ratingsValue}>
                <Text style={{ color: '#008000' }}>4.3</Text>
                <Text style={{ color: '#084A8C' }}>/5</Text>
              </Text>
            </View>
          </View>

          {/* Finance Metrics Section */}
          <View style={styles.financeCard}>
            {/* Title Row: Finance Metrics on left, Total Commission on right */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(1.5)}}>
              <Text style={styles.financeTitle}>Finance Metrics</Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={styles.totalCommissionLabel}>Total Commission : </Text>
                <Text style={styles.totalCommissionValue}>1,45,320</Text>
              </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill}/>
            </View>
            
            {/* Commission Details Row */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(1.5)}}>
              <View>
                <Text style={styles.commissionEarnedValue}>52,487</Text>
                <Text style={styles.commissionEarnedLabel}>Commission Earned</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.pendingValue}>92,833</Text>
                <Text style={styles.pendingLabel}>Pending</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom tabs (static) */}
        <BottomTabBar 
          activeTab="home" 
          onNavigate={(tab) => {
            if (tab === 'pool') onNavigateToPool?.();
            if (tab === 'jobs') onNavigateToJobs?.();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

function StatCard({ title, value, tall }) {
  return (
    <View style={[styles.card, tall && { height: 112 }]}> 
      <View style={[styles.cardIcon]} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

function StatCardWithChart({ title, value }) {
  return (
    <View style={[styles.card, { height: 112 }]}> 
      <View style={[styles.cardIcon]} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardRow}>
        <Text style={[styles.cardValue, { marginRight: 8 }]}>{value}</Text>
        <TinySparkline />
      </View>
    </View>
  );
}

function TinySparkline() {
  const points = '0,20 10,15 20,18 30,8 40,14 50,5 60,12 70,4';
  return (
    <Svg width={72} height={36}>
      <Polyline points={points} fill="none" stroke={COLORS.primary} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}

function SuccessRateCard({ percent }) {
  const size = 104;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * percent;
  return (
    <View style={[styles.card, { height: 126 }]}> 
      <View style={[styles.cardIcon]} />
      <Text style={styles.cardTitle}>Success Rate</Text>
      <View style={styles.gaugeBox}>
        <Svg width={size} height={size}>
          <Circle cx={size / 2} cy={size / 2} r={r} stroke="#E6E9EC" strokeWidth={stroke} fill="none" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
          <Circle cx={size / 2} cy={size / 2} r={r} stroke={COLORS.primary} strokeWidth={stroke} fill="none" strokeDasharray={`${dash},${c - dash}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} strokeLinecap="round" />
        </Svg>
        <Text style={styles.gaugeValue}>{Math.round(percent * 100)}%</Text>
      </View>
    </View>
  );
}

function KpiTile({ title, value, rounded }) {
  return (
    <View style={[styles.kpi, rounded && { borderRadius: 10 }]}> 
      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  root: { flex: 1, backgroundColor: COLORS.bg },

  header: { width: '100%', height: hp(26), borderBottomLeftRadius: scale(20), borderBottomRightRadius: scale(20), position: 'relative', top: -5 },
  headerTitle: { position: 'absolute', left: wp(5), top: hp(5), width: wp(68), color: '#FFFFFF', fontFamily: 'Murecho', fontSize: rf(24), lineHeight: rf(35), fontWeight: '500' },
  chatIcon: { position: 'absolute', left: wp(83), top: hp(6.5), width: scale(48), height: scale(48), borderRadius: scale(10), backgroundColor: 'rgba(255, 255, 255, 0.2)', opacity: 0.8, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 2 },
  filterIcon: { position: 'absolute', right: wp(4), top: hp(16), width: scale(48), height: scale(48), borderRadius: scale(10), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 2 },

  searchRow: { position: 'absolute', left: wp(4), top: hp(16.2), width: wp(76.5), height: scale(46), backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E4E4', borderRadius: scale(8), flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(3.3), shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  searchIcon: { marginRight: wp(2.5) },
  searchInput: { flex: 1, fontSize: rf(14), lineHeight: rf(23), color: COLORS.text, fontFamily: 'Mukta', paddingVertical: 0 },

  scroll: { paddingBottom: hp(3), paddingTop: hp(2) },

  // Employees Overview Section
  sectionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp(4), marginBottom: hp() },
  sectionTitleText: { fontFamily: 'Murecho', fontWeight: '500', fontSize: rf(14), lineHeight: rf(20), color: '#1A1A1A' },
  viewListButton: { flexDirection: 'row', alignItems: 'center' },
  viewListText: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(14), lineHeight: rf(20), color: '#084A8C' },

  // Employee Cards Row
  employeeCardsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4), marginBottom: hp(3) },
  employeeCard: { width: '48%', height: scale(80), backgroundColor: '#EDF6FF', borderRadius: scale(8), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, padding: wp(4), position: 'relative' },
  employeeCardLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(11), lineHeight: rf(16), color: '#454545', marginBottom: hp(0.5) },
  employeeCardValue: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(26), lineHeight: rf(36), color: '#000000' },
  employeeIconCircle: { position: 'absolute', right: wp(3), top: hp(1.8), width: scale(32), height: scale(32), backgroundColor: '#FFFFFF', borderRadius: scale(16), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2, justifyContent: 'center', alignItems: 'center' },

  // Performance Metrics Section
  performanceTitle: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(16), lineHeight: rf(20), color: '#1A1A1A', paddingHorizontal: wp(4), marginBottom: hp(1.5) },
  performanceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4), marginBottom: hp(1.5) },
  
  pastPlacementsCard: { width: '48%', height: scale(142), backgroundColor: '#EDF6FF', borderWidth: 1, borderColor: '#EDF6FF', borderRadius: scale(8), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, paddingVertical: hp(1.2), paddingHorizontal: wp(3), position: 'relative', overflow: 'hidden' },
  placementIcon: { position: 'absolute', left: wp(3.5), top: hp(1.8) },
  pastPlacementsLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(12), lineHeight: rf(18), color: '#454545' },
  pastPlacementsValue: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(28), lineHeight: rf(40), color: '#084A8C', textAlign: 'center', marginTop: hp(0.3) },
  barChartContainer: { position: 'absolute', left: wp(2), right: wp(2), bottom: hp(1), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: scale(50), paddingHorizontal: wp(2) },
  barChart: { width: scale(10),backgroundColor: '#D2E8FF', borderRadius: scale(2), opacity: 1 },
  successRateContainer: { alignItems: 'center', marginTop: hp(0.6) },
  successBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: hp(0.2) },
  successPercent: { fontFamily: 'Murecho', fontWeight: '500', fontSize: rf(11), lineHeight: rf(16), color: '#008000' },
  successLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(9), lineHeight: rf(13), color: '#008000' },

  incentivesCard: { width: '48%', height: scale(68), backgroundColor: '#EDF6FF', borderWidth: 1, borderColor: '#D2E8FF', borderRadius: scale(8), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1, paddingHorizontal: wp(3.5), paddingVertical: hp(1), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  incentiveIcon: { marginRight: wp(2) },
  incentivesLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(12), lineHeight: rf(16), color: '#454545' },
  incentivesValue: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(22), lineHeight: rf(32), color: '#084A8C' },

  ratingsCard: {  width: '48%', height: scale(68),marginTop: scale(-80), backgroundColor: '#EDF6FF', borderWidth: 1, borderColor: '#D2E8FF', borderRadius: scale(8), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1, paddingHorizontal: wp(3.5), paddingVertical: hp(1), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  ratingsIcon: { marginRight: wp(5) },
  ratingsLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(13), lineHeight: rf(16),marginLeft: scale(-3), color: '#454545' },
  ratingsValue: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(22), lineHeight: rf(32), color: '#008000' },

  // Finance Metrics Section
  financeTitle: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(16), lineHeight: rf(22), color: '#1A1A1A' },
  financeCard: { paddingHorizontal: wp(4), marginBottom: hp(3) },
  totalCommissionLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(11), lineHeight: rf(15), color: '#454545' },
  totalCommissionValue: { fontFamily: 'Murecho', fontWeight: '600', fontSize: rf(18), lineHeight: rf(24), color: '#084A8C' },
  
  progressBarContainer: { width: '100%', height: scale(4), backgroundColor: '#EDF6FF', borderRadius: scale(2), marginBottom: hp(1.5), overflow: 'hidden' },
  progressBarBg: { width: '100%', height: scale(4), backgroundColor: '#EDF6FF' },
  progressBarFill: { position: 'absolute', left: 0, top: 0, width: '52%', height: scale(4), backgroundColor: '#145BA2', borderRadius: scale(2) },
  
  commissionEarnedValue: { fontFamily: 'Murecho', fontWeight: '500', fontSize: rf(18), lineHeight: rf(24), color: '#084A8C', marginBottom: hp(0.3) },
  commissionEarnedLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(10), lineHeight: rf(14), color: '#084A8C' },
  pendingValue: { fontFamily: 'Murecho', fontWeight: '500', fontSize: rf(18), lineHeight: rf(24), color: '#BF2020', marginBottom: hp(0.3) },
  pendingLabel: { fontFamily: 'Murecho', fontWeight: '400', fontSize: rf(10), lineHeight: rf(14), color: '#BF2020' },
});

export default ConsultantHomeScreen;
