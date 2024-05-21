import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children }) => {
  return (
    <Scrollbars 
      style={{ width: '100%', height: '100vh' }}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            width: '8px',
            backgroundColor: '#8585ad'
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            width: '8px',
            height: '95vh',
            backgroundColor: '#2f2f37',
            right: '2px',
            bottom: '2px',
            top: '2px'
          }}
        />
      )}>{children}</Scrollbars>
  )
}

export default CustomScrollbar;