import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = React.forwardRef(({ children, customStyles, onScrollFrame }, ref) => {
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

CustomScrollbar.propTypes = {
  children: PropTypes.node,
  customStyles: PropTypes.shape({
    wrapperMaxHeight: PropTypes.string,
    wrapperHeight: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string
  }).isRequired,
  onScrollFrame: PropTypes.func
}

export default CustomScrollbar;