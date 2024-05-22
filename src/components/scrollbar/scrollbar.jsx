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

export default CustomScrollbar;