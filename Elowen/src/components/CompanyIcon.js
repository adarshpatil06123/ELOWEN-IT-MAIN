import React from 'react';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const CompanyIcon = ({ size = 25, highlighted = false }) => {
  const color = highlighted ? '#009990' : '#05386B';
  
  return (
    <Svg width={size} height={size} viewBox="0 0 33 33" fill="none">
      <Defs>
        <Filter id="filter0_d_312_425" x="0" y="-4" width="33" height="37" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="4"/>
          <FeGaussianBlur stdDeviation="2"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_312_425"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_312_425" result="shape"/>
        </Filter>
      </Defs>
      <Path 
        d="M29 8.12655V22.9637C29 24.0799 28.081 24.9989 26.9647 24.9989H25.9411C26.0337 24.7318 26.0926 24.4288 26.0926 24.1268V4.69716L27.2318 5.26729C28.3252 5.81341 28.9989 6.90677 28.9989 8.12766L29 8.12655ZM6.90628 24.1268V4.69716L5.7671 5.26729C4.67368 5.81341 4 6.90677 4 8.12766V22.9648C4 24.0811 4.91899 25 6.03529 25H7.05893C6.96627 24.7329 6.9074 24.4299 6.9074 24.1279L6.90628 24.1268ZM18.8247 18.0223H14.1731C14.0128 18.0223 13.882 18.1532 13.882 18.3134V24.9989H19.1146V18.3134C19.1146 18.1532 18.9838 18.0223 18.8236 18.0223H18.8247ZM24.3484 3.19721V24.1268C24.3484 24.6086 23.9581 24.9989 23.4763 24.9989H20.86V18.3134C20.86 17.1917 19.9465 16.2782 18.8247 16.2782H14.1731C13.0513 16.2782 12.1378 17.1917 12.1378 18.3134V24.9989H9.52148C9.03963 24.9989 8.64937 24.6086 8.64937 24.1268L8.65046 3.19721C8.65046 1.43345 10.0851 0 11.8478 0H21.1499C22.9137 0 24.3473 1.43454 24.3473 3.19721H24.3484ZM19.6968 12.4989C19.6968 12.0171 19.3065 11.6268 18.8247 11.6268H14.1731C13.6912 11.6268 13.301 12.0171 13.301 12.4989C13.301 12.9807 13.6912 13.371 14.1731 13.371H18.8247C19.3065 13.371 19.6968 12.9807 19.6968 12.4989ZM19.6968 9.01062C19.6968 8.52879 19.3065 8.13855 18.8247 8.13855H14.1731C13.6912 8.13855 13.301 8.52879 13.301 9.01062C13.301 9.49244 13.6912 9.88268 14.1731 9.88268H18.8247C19.3065 9.88268 19.6968 9.49244 19.6968 9.01062ZM19.6968 5.52235C19.6968 5.04052 19.3065 4.65028 18.8247 4.65028H14.1731C13.6912 4.65028 13.301 5.04052 13.301 5.52235C13.301 6.00417 13.6912 6.39441 14.1731 6.39441H18.8247C19.3065 6.39441 19.6968 6.00417 19.6968 5.52235Z" 
        fill={color}
      />
    </Svg>
  );
};

export default CompanyIcon;
