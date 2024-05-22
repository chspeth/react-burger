import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children, customStyles }) => {
  return (
    <div style={{ height: customStyles.wrapperHeight, position: 'relative', maxHeight: customStyles.wrapperMaxHeight || 'auto' }}>
      <Scrollbars
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: '8px',
              backgroundColor: '#8585ad',
              position: 'relative',
              height: customStyles.thumbHeight
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
              bottom: customStyles.bottom
            }}
          />
        )}
        style={{ height: '100%' }}>{children}</Scrollbars>
    </div>
  )
}

CustomScrollbar.propTypes = {
  children: PropTypes.node,
  customStyles: PropTypes.shape({
    wrapperHeight: PropTypes.string.isRequired,
    wrapperMaxHeight: PropTypes.string,
    thumbHeight: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired
  }).isRequired
}

export default CustomScrollbar;