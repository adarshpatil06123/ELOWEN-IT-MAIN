import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { wp, hp, rf, scale } from '../utils/responsive';

const WorkforceMetricsCard = ({
  title = "Workforce Metrics",
  totalWorkers = 5432,
  activeCount = 3200,
  activeLabel = "Active",
  availableCount = 2232,
  availableLabel = "Available",
  attritionRate = "4.3%",
  attritionLabel = "Attrition Rate"
}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Card */}
      <View style={styles.card}>
        {/* Top Section - Total Workers */}
        <View style={styles.topSection}>
          {/* People Icon */}
          <View style={styles.iconContainer}>
            <Svg width={scale(52)} height={scale(52)} viewBox="0 0 62 58" fill="none">
              <Path 
                d="M30.999 11.0451C30.999 4.95776 35.8159 0 41.7294 0C47.6428 0 52.4597 4.95824 52.4597 11.0451C52.4597 17.132 47.6428 22.0902 41.7294 22.0902C35.8159 22.0902 30.999 17.132 30.999 11.0451ZM15.4995 25.7722C20.7575 25.7722 25.0379 21.3663 25.0379 15.9542C25.0379 10.5419 20.7575 6.13599 15.4995 6.13599C10.2415 6.13599 5.9611 10.5419 5.9611 15.9542C5.9611 21.3663 10.2415 25.7722 15.4995 25.7722ZM46.5413 27H36.9197C32.0193 27 27.5126 29.3192 24.5618 33.357C22.5349 36.1312 21.4618 39.4322 21.4618 42.9112V52.7732C21.4618 53.4482 21.9983 54 22.6541 54H60.8078C61.4636 54 62 53.4482 62 52.7732V42.9112C62 34.1362 55.0664 27 46.5413 27ZM19.7979 30.7312L11.8749 30.6822C5.32924 30.6822 0 36.1672 0 42.9052V52.772C0 53.447 0.536476 53.9988 1.1923 53.9988H16.2157C16.8714 53.9988 17.408 53.447 17.408 52.772V42.91C17.408 39.069 18.5288 35.6392 20.7345 32.712C21.0147 32.344 21.0624 31.841 20.8657 31.423C20.663 31.006 20.2516 30.736 19.7986 30.73L19.7979 30.7312Z" 
                fill="#084A8C"
              />
            </Svg>
          </View>

          {/* Total Workers Info */}
          <View style={styles.totalWorkersInfo}>
            <Text style={styles.totalWorkersLabel}>Total Workers</Text>
            <Text style={styles.totalWorkersValue}>{totalWorkers}</Text>
          </View>

          {/* Info Icon */}
          <View style={styles.infoIconContainer}>
            <Svg width={scale(10)} height={scale(10)} viewBox="0 0 32 31" fill="none">
              <Path 
                d="M16 0.5H16.1771C24.7152 0.609258 31.5 7.48185 31.5 15.5C31.5 23.6081 24.8081 30.3 16.7 30.3L16 30.2956C7.46181 30.1864 0.677033 23.3138 0.676816 15.2956L0.681136 14.5956C0.79055 6.05746 7.66315 -0.727373 15.6812 -0.727151L16 -0.723066V0.5ZM16 3.87159C9.50761 3.87159 4.24918 9.13002 4.24918 15.6224C4.24918 22.1148 9.50761 27.3732 16 27.3732C22.4924 27.3732 27.7508 22.1148 27.7508 15.6224C27.7508 9.13002 22.4924 3.87159 16 3.87159Z" 
                fill="#084A8C"
                stroke="#084A8C"
              />
              <Path 
                d="M15.437 6.47911C15.437 7.05265 14.562 7.05265 14.562 6.47911C14.562 5.90556 15.437 5.90556 15.437 6.47911Z" 
                fill="#084A8C"
              />
              <Path 
                d="M16 7.21658C15.813 7.21658 15.688 7.33958 15.688 7.52379V10.964C15.688 11.1482 15.813 11.2712 16 11.2712C16.187 11.2712 16.312 11.1482 16.312 10.964V7.52379C16.312 7.37018 16.187 7.21658 16 7.21658Z" 
                fill="#084A8C"
              />
            </Svg>
          </View>
        </View>

        {/* Status Row */}
        <View style={styles.statusRow}>
          {/* Active Status */}
          <View style={styles.statusItem}>
            <View style={[styles.dot, styles.dotGreen]}>
              <View style={[styles.dotInner, styles.dotInnerGreen]} />
            </View>
            <Text style={[styles.statusLabel, styles.statusLabelGreen]}>{activeLabel}</Text>
            <Text style={styles.statusValue}>{activeCount}</Text>
          </View>

          {/* Available Status */}
          <View style={styles.statusItem}>
            <View style={[styles.dot, styles.dotBlue]}>
              <View style={[styles.dotInner, styles.dotInnerBlue]} />
            </View>
            <Text style={[styles.statusLabel, styles.statusLabelBlue]}>{availableLabel}</Text>
            <Text style={styles.statusValue}>{availableCount}</Text>
          </View>

          {/* Attrition Rate Status */}
          <View style={styles.statusItem}>
            <View style={[styles.dot, styles.dotRed]}>
              <View style={[styles.dotInner, styles.dotInnerRed]} />
            </View>
            <Text style={[styles.statusLabel, styles.statusLabelRed]}>{attritionLabel}</Text>
            <Text style={styles.statusValue}>{attritionRate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontFamily: 'Murecho',
    fontWeight: '600',
    fontSize: rf(16),
    lineHeight: rf(20),
    color: '#1A1A1A',
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
  },
  card: {
    width: scale(361),
    height: scale(116),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'center',
    paddingLeft: scale(38),
    paddingRight: scale(5),
    paddingTop: scale(-2),
    paddingBottom: scale(),
    overflow: 'hidden',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(-65),
    
  },
  iconContainer: {
    width: scale(54),
    height: scale(54),
    marginRight: scale(-50),
    marginTop: scale(55),
  },
  totalWorkersInfo: {
    flex: 1,
       marginTop: scale(7),
  },
  totalWorkersLabel: {
    fontFamily: 'Murecho',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(8),
    lineHeight: scale(12),
    color: '#454545',
    marginBottom: scale(0),
  },
  totalWorkersValue: {
    fontFamily: 'Murecho',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(22),
    lineHeight: scale(32),
    color: '#000000',
    marginBottom: scale(5),
  },
  infoIconContainer: {
    position: 'absolute',
    right: scale(5),
    top: scale(16),
    width: scale(25),
    height: scale(25),
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: scale(90),
    marginLeft: scale(1),
  },
  statusItem: {
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  dotGreen: {
    backgroundColor: '#62E762',
  },
  dotBlue: {
    backgroundColor: '#82B9F0',
  },
  dotRed: {
    backgroundColor: '#E87E7E',
  },
  dotInner: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
  },
  dotInnerGreen: {
    backgroundColor: '#51BD51',
  },
  dotInnerBlue: {
    backgroundColor: '#084A8C',
  },
  dotInnerRed: {
    backgroundColor: '#BF2020',
  },
  statusLabel: {
    fontFamily: 'Murecho',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(10),
    lineHeight: scale(14),
    textAlign: 'center',
    marginBottom: scale(2),
  },
  statusLabelGreen: {
    color: '#51BD51',
  },
  statusLabelBlue: {
    color: '#084A8C',
  },
  statusLabelRed: {
    color: '#BF2020',
  },
  statusValue: {
    fontFamily: 'Murecho',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(20),
    color: '#000000',
    textAlign: 'center',
  },
});

export default WorkforceMetricsCard;
