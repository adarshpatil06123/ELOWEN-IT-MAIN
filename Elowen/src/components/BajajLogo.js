import React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

const BajajLogo = ({ width = 47, height = 45 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 47 45" fill="none">
      <Rect width="47" height="45" rx="5" fill="#0066CC" />
      <Rect x="10" y="15" width="27" height="15" fill="white" />
    </Svg>
  );
};

export default BajajLogo;
