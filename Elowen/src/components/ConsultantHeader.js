import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../utils/responsive';

const COLORS = {
  primary: '#084A8C',
  primaryDark: '#054F99',
};

/**
 * Reusable header component for consultant screens
 * @param {string} title - Header title text
 * @param {function} onBackPress - Callback when back button is pressed
 * @param {boolean} showBackButton - Whether to show back button (default: true)
 */
const ConsultantHeader = ({ title, onBackPress, showBackButton = true }) => {
  return (
    <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress} activeOpacity={0.7}>
          <Svg width="14" height="17" viewBox="0 0 14 17" fill="none">
            <Path 
              d="M12 2L3 8.5L12 15" 
              stroke="#FFFFFF" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, !showBackButton && styles.headerTitleNoBack]}>
        {title}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
  },
  backButton: {
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Murecho',
    fontWeight: '500',
    fontSize: rf(16),
    lineHeight: rf(23),
    color: '#FFFFFF',
    marginLeft: wp(1),
  },
  headerTitleNoBack: {
    marginLeft: 0,
  },
});

export default ConsultantHeader;
