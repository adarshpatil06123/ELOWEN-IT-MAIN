import React from 'react';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';
import { scale } from '../utils/responsive';

const AreaIcon = ({ size = 25, highlighted = false }) => {
  const iconSize = scale(size);
  const color = highlighted ? '#009990' : '#05386B';
  
  return (
    <Svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 32 33" 
      fill="none"
    >
      <G filter="url(#filter0_d_312_413)">
        <Path 
          d="M26.896 22.6579L23.7423 15.3947C23.4795 14.7895 22.875 14.3684 22.218 14.3684H20.6937C20.1155 15.4474 19.4584 16.6842 18.67 18.0526C18.013 19.1842 16.8303 19.8684 15.5163 19.8684C14.2022 19.8684 13.0458 19.1842 12.3625 18.0526C11.5741 16.6842 10.8908 15.4474 10.3388 14.3684H8.81454C8.13123 14.3684 7.55304 14.7631 7.29023 15.3947L4.13648 22.6579C3.66342 23.7631 4.47814 25 5.68707 25H25.3717C26.5544 25 27.3691 23.7631 26.896 22.6579Z" 
          fill={color}
        />
        <Path 
          d="M16.7251 16.921C18.4596 13.8947 21.482 8.31579 21.482 5.97368C21.482 2.68421 18.8013 0 15.5161 0C12.231 0 9.55029 2.68421 9.55029 5.97368C9.55029 8.31579 12.5726 13.8947 14.3072 16.921C14.8591 17.8684 16.1732 17.8684 16.7251 16.921ZM12.7303 5.97368C12.7303 4.44737 13.9655 3.18421 15.5161 3.18421C17.0667 3.18421 18.3019 4.42105 18.3019 5.97368C18.3019 7.5 17.0667 8.76315 15.5161 8.76315C13.9655 8.76315 12.7303 7.5 12.7303 5.97368Z" 
          fill={color}
        />
      </G>
      <Defs>
        <Filter 
          id="filter0_d_312_413" 
          x="0" 
          y="-4" 
          width="31.0327" 
          height="37" 
          filterUnits="userSpaceOnUse" 
          colorInterpolationFilters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"
          />
          <FeOffset dy="4"/>
          <FeGaussianBlur stdDeviation="2"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
          />
          <FeBlend 
            mode="normal" 
            in2="BackgroundImageFix" 
            result="effect1_dropShadow_312_413"
          />
          <FeBlend 
            mode="normal" 
            in="SourceGraphic" 
            in2="effect1_dropShadow_312_413" 
            result="shape"
          />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default AreaIcon;
