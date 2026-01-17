import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, rf, scale, verticalScale } from '../../utils/responsive';

const SplashScreen = ({onTransitionStart}) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const translateY = new Animated.Value(0);

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After entrance, wait ~1.5 seconds then start exit animation
      setTimeout(() => {
        // Animate logo moving up smoothly (using spring for smooth feel)
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: -hp(30),
            tension: 40,
            friction: 12,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onTransitionStart) {
            onTransitionStart();
          }
        });
      }, 1500);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Gradient Circles */}
    

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Animated.View 
          style={[
            styles.logoGroup,
            {
              opacity: fadeAnim,
              transform: [
                {scale: scaleAnim},
                {translateY: translateY}
              ],
            }
          ]}
        >
          {/* Elowen Logo Image */}
          <Image 
            source={require('../../assets/images/glowen_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
        
        <Text style={styles.tagline}>Smart IT Solutions for Your Business</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGroup: {
    // Drop shadow effect
    shadowColor: '#0d0909ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  logoImage: {
    width: scale(268),
    height: scale(85),
    marginBottom: hp(1),
  },
  tagline: {
    marginTop: 0,
    fontSize: rf(18),
    fontWeight: 'bold',
    color: '#05386B',
    textAlign: 'center',
    lineHeight: rf(26),
    fontFamily: 'System',
    width: wp(80),
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});

export default SplashScreen;
