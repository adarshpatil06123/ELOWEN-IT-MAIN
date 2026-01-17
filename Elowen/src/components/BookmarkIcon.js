import React from 'react';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const BookmarkIcon = ({ width = 20, height = 23, color = '#1A1A1A' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 23" fill="none">
      <Defs>
        <Filter id="filter0_d" x="0" y="-4" width="19.25" height="26.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="4"/>
          <FeGaussianBlur stdDeviation="2"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </Filter>
      </Defs>
      <G filter="url(#filter0_d)">
        <Path 
          d="M5.5822 0.125C4.78065 0.125 4.125 0.766491 4.125 1.55233V13.907C4.12556 13.9874 4.17123 14.0607 4.24309 14.0984C4.31494 14.1361 4.4024 14.1323 4.47036 14.088L9.62495 10.7001L14.778 14.088C14.8459 14.1328 14.9339 14.1372 15.0064 14.0995C15.0793 14.0618 15.1244 13.9879 15.125 13.907V1.55233C15.125 0.766451 14.4694 0.125002 13.6678 0.125002L5.5822 0.125ZM5.5822 0.562508H13.6679C14.2293 0.562508 14.6794 1.00329 14.6794 1.55237V13.4968L9.74871 10.2544H9.74815C9.67351 10.2057 9.57659 10.2057 9.50194 10.2544L4.56952 13.4968L4.56896 1.55237C4.56896 1.00329 5.02017 0.562508 5.5822 0.562508Z" 
          fill={color}
          stroke={color}
          strokeWidth="0.25"
        />
      </G>
    </Svg>
  );
};

export default BookmarkIcon;
