import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

const Loading = ({
  isLoading = false,
  loadingMessage,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <PulseLoader
          sizeUnit={'px'}
          size={20}
          color={'#2d2e2e'}
          loading
        />
        <div className="mt-4"><code className="text-muted">{loadingMessage}</code></div>
      </div>
    );
  }

  return <>{children}</>;
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

Loading.defaultProps = {
  loadingMessage: 'Loading...',
};

export default Loading;
