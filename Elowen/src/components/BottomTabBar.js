import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../utils/responsive';

const COLORS = {
  primary: '#084A8C',
  textSub: '#454545',
  textMuted: '#737373',
};

const BottomTabBar = ({ activeTab, onNavigate }) => {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'pool', label: 'Pool' },
    { key: 'jobs', label: 'Jobs' },
    { key: 'profile', label: 'Profile' },
  ];

  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.key}
          label={tab.label}
          icon={tab.key}
          active={activeTab === tab.key}
          onPress={() => onNavigate && onNavigate(tab.key)}
        />
      ))}
    </View>
  );
};

function TabItem({ label, icon, active, onPress }) {
  const iconColor = active ? COLORS.primary : COLORS.textMuted;

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <View style={styles.tabIconContainer}>
        {icon === 'home' && (
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path
              d="M12.5 3.125L3.125 10.9375V21.875H9.375V15.625H15.625V21.875H21.875V10.9375L12.5 3.125Z"
              fill={iconColor}
              stroke={iconColor}
              strokeWidth="0.75"
            />
          </Svg>
        )}
        {icon === 'pool' && (
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path d="M5 5H11V11H5V5Z" fill={iconColor} />
            <Path d="M14 5H20V11H14V5Z" fill={iconColor} />
            <Path d="M5 14H11V20H5V14Z" fill={iconColor} />
            <Path d="M14 14H20V20H14V14Z" fill={iconColor} />
          </Svg>
        )}
        {icon === 'jobs' && (
          <Svg width="20" height="17" viewBox="0 0 25 21" fill="none">
            <Path
              d="M9.59035 0C8.90663 0 8.34527 0.55434 8.34527 1.22832V2.67449H1.51068C0.680684 2.67449 0 3.34541 0 4.16464V7.4364C0 7.89561 0.181561 8.32516 0.486576 8.64529V17.9555C0.486576 19.0795 1.42047 20 2.56076 20L22.4392 19.999C23.5785 19.999 24.5134 19.0785 24.5134 17.9545V8.64427C24.8184 8.32414 25 7.89459 25 7.43537V4.16361C25 3.34541 24.3193 2.67346 23.4893 2.67346L16.6547 2.67449V1.22832C16.6547 0.55434 16.0933 0 15.4096 0L9.59035 0ZM9.59035 0.77013H15.4103C15.6707 0.77013 15.8741 0.97059 15.8741 1.22832L15.8731 2.67449H9.12671V1.22832C9.12671 0.97059 9.33002 0.77013 9.59035 0.77013Z"
              fill={iconColor}
            />
            <Path
              d="M14.7671 11.5049L23.5503 8.37637C23.9539 8.23318 24.2196 7.85885 24.2196 7.43543V4.16367C24.2196 3.76069 23.8979 3.44467 23.4901 3.44467H1.51058C1.10278 3.44467 0.78125 3.76069 0.78125 4.16367V7.43543C0.78125 7.85885 1.04699 8.23319 1.45061 8.37637L10.2327 11.5049V10.1385C10.2338 9.9268 10.4081 9.755 10.6229 9.755H14.377M12.4604 15.0896C11.235 15.0896 10.2337 14.1027 10.2337 12.8948V12.32L1.26886 9.1281L1.26879 17.9545C1.26879 18.6622 1.84361 19.2278 2.56058 19.2278H22.4411C23.1581 19.2278 23.733 18.6622 23.733 17.9545V9.1281L14.7681 12.32V12.8948M11.0149 10.5241L11.015 12.8949C11.015 13.6875 11.6573 14.3196 12.4594 14.3196H12.5434C13.3455 14.3196 13.9846 13.6865 13.9846 12.8949M9.59035 0C8.90663 0 8.34527 0.55434 8.34527 1.22832V2.67449H1.51068C0.680684 2.67449 0 3.34541 0 4.16464V7.4364C0 7.89561 0.181561 8.32516 0.486576 8.64529V17.9555C0.486576 19.0795 1.42047 20 2.56076 20L22.4392 19.999C23.5785 19.999 24.5134 19.0785 24.5134 17.9545V8.64427C24.8184 8.32414 25 7.89459 25 7.43537V4.16361C25 3.34541 24.3193 2.67346 23.4893 2.67346L16.6547 2.67449V1.22832C16.6547 0.55434 16.0933 0 15.4096 0L9.59035 0ZM9.59035 0.77013H15.4103C15.6707 0.77013 15.8741 0.97059 15.8741 1.22832L15.8731 2.67449H9.12671V1.22832C9.12671 0.97059 9.33002 0.77013 9.59035 0.77013Z"
              stroke={iconColor}
            />
          </Svg>
        )}
        {icon === 'profile' && (
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <Path
              d="M12.5 2.5C14.9853 2.5 17 4.51472 17 7C17 9.48528 14.9853 11.5 12.5 11.5C10.0147 11.5 8 9.48528 8 7C8 4.51472 10.0147 2.5 12.5 2.5ZM12.5 22.5C17.9 22.5 22.5 20.2 22.5 17.5C22.5 14.8 17.9 12.5 12.5 12.5C7.1 12.5 2.5 14.8 2.5 17.5C2.5 20.2 7.1 22.5 12.5 22.5Z"
              fill={iconColor}
              stroke={iconColor}
              strokeWidth="1"
            />
          </Svg>
        )}
      </View>
      <Text style={[styles.tabLabel, active && { color: COLORS.primary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: scale(84),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E4E4',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(8.9),
    paddingVertical: hp(2.6),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    width: scale(25),
    height: scale(25),
    marginBottom: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: 'Murecho',
    fontSize: rf(13),
    lineHeight: rf(19),
    textAlign: 'center',
    color: COLORS.textSub,
    fontWeight: '500',
  },
});

export default BottomTabBar;
