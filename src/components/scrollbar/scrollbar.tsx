import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ICustomScrollbarProps } from '../../utils/types';

const CustomScrollbar = React.forwardRef<Scrollbars, ICustomScrollbarProps>(
  ({ children, customStyles, onScrollFrame }, ref) => {
  return (
    <div 
      style={{ 
        position: 'relative', 
        height: customStyles.wrapperHeight || 'auto',
        overflowY: 'auto'
      }} >
      <Scrollbars
        ref={ref}
        onScrollFrame={onScrollFrame}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: '8px',
              backgroundColor: '#8585ad',
              position: 'relative'
            }}
          />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: '8px',
              backgroundColor: '#2f2f37',
              position: 'absolute',
              right: '0',
              top: customStyles.top,
              bottom: customStyles.bottom,
              borderRadius: '4px'
            }}
          />
        )}
        style={{ height: '100%' }}>{children}</Scrollbars>
    </div>
  )
})

export default CustomScrollbar;