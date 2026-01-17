/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { LanguageProvider } from './src/context/LanguageContext';
import { AuthProvider } from './src/context/AuthContext';
import { JobsProvider } from './src/context/JobsContext';
import { PoolsProvider } from './src/context/PoolsContext';
import SplashScreen from './src/screens/main-page/SplashScreen.js';
import LanguageScreen from './src/screens/main-page/LanguageScreen.js';
import OptionScreen from './src/screens/main-page/OptionScreen.js';
import LoginScreen from './src/screens/job-seeker/LoginScreen.js';
import SignUpScreen from './src/screens/job-seeker/SignUpScreen.js';
import OTPScreen from './src/screens/job-seeker/OTPScreen.js';
import JobSeekerScreen from './src/screens/job-seeker/JobSeekerScreen.js';
import ConsultantLoginScreen from './src/screens/consultant/ConsultantLoginScreen.js';
import ConsultantSignUpScreen from './src/screens/consultant/ConsultantSignUpScreen.js';
import ConsultantOTPScreen from './src/screens/consultant/ConsultantOTPScreen.js';
import ConsultantHomeScreen from './src/screens/consultant/ConsultantHomeScreen.js';
import PoolManagementScreen from './src/screens/consultant/PoolManagementScreen.js';
import AllPoolsScreen from './src/screens/consultant/AllPoolsScreen.js';
import AddNewPoolScreen from './src/screens/consultant/AddNewPoolScreen.js';
import AddCandidateScreen from './src/screens/consultant/AddCandidateScreen.js';
import AddCandidateScreen2 from './src/screens/consultant/AddCandidateScreen2.js';
import RecentlyOnboardedScreen from './src/screens/consultant/RecentlyOnboardedScreen.js';
import ConsultantJobsScreen from './src/screens/consultant/ConsultantJobsScreen.js';
import JobsScreen from './src/screens/job-seeker/JobsScreen.js';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPool, setSelectedPool] = useState(null); // Track selected pool for candidate addition
  const [candidateData, setCandidateData] = useState(null); // Track candidate data across screens
  const [registeredPhone, setRegisteredPhone] = useState(null); // Track phone number for OTP verification

  // Removed automatic timer - now controlled by SplashScreen animation

  const handleOptionNext = (role) => {
    setSelectedRole(role);
    setCurrentScreen('language');
  };

  const handleLanguageNext = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToOTP = (phoneNumber) => {
    if (phoneNumber) {
      setRegisteredPhone(phoneNumber);
    }
    setCurrentScreen('otp');
  };

  const handleOTPVerified = () => {
    // Navigate to role-specific home after OTP
    console.log('🔍 OTP Verified! Current selectedRole:', selectedRole);
    console.log('🔍 Navigating to screen based on role...');
    
    if (selectedRole === 'consultant') {
      console.log('✅ Navigating to consultantHome');
      setCurrentScreen('consultantHome');
    } else {
      console.log('✅ Navigating to jobseeker home');
      setCurrentScreen('jobseeker');
    }
  };

  const handleNavigateToPool = () => {
    setCurrentScreen('pool');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('consultantHome');
  };

  const handleNavigateToAllPools = () => {
    setCurrentScreen('allPools');
  };

  const handleNavigateBackToPool = () => {
    setCurrentScreen('pool');
  };

  const handleNavigateToAddNewPool = () => {
    setCurrentScreen('addNewPool');
  };

  const handleNavigateBackToAllPools = () => {
    setCurrentScreen('allPools');
  };

  // Add Candidate navigation handlers
  const handleNavigateToAddCandidate = (poolId, poolName) => {
    setSelectedPool({ id: poolId, name: poolName });
    setCandidateData(null); // Reset candidate data for new flow
    setCurrentScreen('addCandidate');
  };

  const handleNavigateToNextCandidateStep = (data) => {
    setCandidateData(data);
    // Navigate to step 2 of candidate addition
    setCurrentScreen('addCandidateStep2');
  };

  const handleNavigateBackToStep1 = () => {
    setCurrentScreen('addCandidate');
  };

  const handleCandidateSubmit = (completeData) => {
    console.log('Complete candidate data:', completeData);
    // Reset state and go back to pools
    setCandidateData(null);
    setSelectedPool(null);
    setCurrentScreen('allPools');
  };

  // Jobs screen navigation
  const handleNavigateToJobs = () => {
    setCurrentScreen('consultantJobs');
  };

  const handleNavigateToJobSeekerJobs = () => {
    setCurrentScreen('jobs');
  };

  const handleNavigateToJobSeekerHome = () => {
    setCurrentScreen('jobseeker');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onTransitionStart={() => setCurrentScreen('option')} />;
      case 'language':
        return <LanguageScreen onNext={handleLanguageNext} selectedRole={selectedRole} />;
      case 'option':
        return <OptionScreen onNext={handleOptionNext} />;
      case 'login':
        if (selectedRole === 'consultant') {
          return <ConsultantLoginScreen onNavigateToSignUp={handleNavigateToSignUp} onNavigateToOTP={handleNavigateToOTP} onNavigateToHome={handleNavigateToHome} />;
        }
        return <LoginScreen selectedRole={selectedRole} onNavigateToSignUp={handleNavigateToSignUp} onNavigateToOTP={handleNavigateToOTP} />;
      case 'signup':
        if (selectedRole === 'consultant') {
          return <ConsultantSignUpScreen onNavigateToLogin={handleNavigateToLogin} onNavigateToOTP={handleNavigateToOTP} />;
        }
        return <SignUpScreen selectedRole={selectedRole} onNavigateToLogin={handleNavigateToLogin} onNavigateToOTP={handleNavigateToOTP} />;
      case 'otp':
        if (selectedRole === 'consultant') {
          return <ConsultantOTPScreen onNavigateToLogin={handleNavigateToLogin} onOTPVerified={handleOTPVerified} phoneNumber={registeredPhone} />;
        }
        return <OTPScreen onNavigateToLogin={handleNavigateToLogin} onOTPVerified={handleOTPVerified} phoneNumber={registeredPhone} />;
      case 'jobseeker':
        return <JobSeekerScreen onNavigateToJobs={handleNavigateToJobSeekerJobs} />;
      case 'jobs':
        return <JobsScreen 
          onNavigateToHome={handleNavigateToJobSeekerHome}
          onNavigateToPool={() => {}}
          onNavigateToProfile={() => {}}
          onNavigateToJobDetails={() => {}}
        />;
      case 'consultantJobs':
        return <ConsultantJobsScreen 
          onNavigateToHome={handleNavigateToHome}
          onNavigateToPool={handleNavigateToPool}
          onNavigateToProfile={() => {}}
          onNavigateToJobDetails={() => {}}
        />;
      case 'consultantHome':
        return <ConsultantHomeScreen onNavigateToPool={handleNavigateToPool} onNavigateToJobs={handleNavigateToJobs} />;
      case 'pool':
        return <PoolManagementScreen onNavigateToHome={handleNavigateToHome} onNavigateToAllPools={handleNavigateToAllPools} onNavigateToAddCandidate={() => handleNavigateToAddCandidate(null, null)} onNavigateToRecentlyOnboarded={() => setCurrentScreen('recentlyOnboarded')} onNavigateToJobs={handleNavigateToJobs} />;
      case 'recentlyOnboarded':
        return <RecentlyOnboardedScreen onNavigateBack={handleNavigateBackToPool} onNavigateToHome={handleNavigateToHome} onNavigateToJobs={handleNavigateToJobs} />;
      case 'allPools':
        return <AllPoolsScreen onNavigateBack={handleNavigateBackToPool} onNavigateToHome={handleNavigateToHome} onNavigateToAddNewPool={handleNavigateToAddNewPool} onNavigateToAddCandidate={handleNavigateToAddCandidate} onNavigateToJobs={handleNavigateToJobs} />;
      case 'addNewPool':
        return <AddNewPoolScreen onNavigateBack={handleNavigateBackToAllPools} onNavigateToHome={handleNavigateToHome} />;
      case 'addCandidate':
        return <AddCandidateScreen 
          onNavigateBack={handleNavigateBackToAllPools} 
          onNavigateToHome={handleNavigateToHome} 
          onNavigateToNext={handleNavigateToNextCandidateStep}
          poolId={selectedPool?.id}
          poolName={selectedPool?.name}
        />;
      case 'addCandidateStep2':
        return <AddCandidateScreen2 
          onNavigateBack={handleNavigateBackToStep1} 
          onNavigateToHome={handleNavigateToHome} 
          onSubmit={handleCandidateSubmit}
          candidateData={candidateData}
          poolId={selectedPool?.id}
          poolName={selectedPool?.name}
        />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <JobsProvider>
          <PoolsProvider>
            <SafeAreaProvider>
              <StatusBar barStyle="dark-content" />
              {renderScreen()}
            </SafeAreaProvider>
          </PoolsProvider>
        </JobsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
