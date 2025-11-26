import './optimizationIcon.css';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const icon = require('./Red_Hat-IT_Optimization-Gray.svg');

interface OptimizationIconProps {
  className?: string;
  alt?: string;
}

const OptimizationIcon: React.FC<OptimizationIconProps> = ({ className = '', alt = 'Optimizations' }) => {
  return <img className={`optimization-icon ${className}`} src={icon} alt={alt} aria-hidden="true" />;
};

export default OptimizationIcon;


