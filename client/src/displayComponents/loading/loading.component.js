import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

import styles from './styles.module.scss';

const Loading = ({
  isLoading = false,
  loadingMessage,
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loading}>
      <div className="text-center">
        <PulseLoader
          sizeUnit={'px'}
          size={20}
          color={'#2d2e2e'}
          loading
        />
        <div className="mt-4"><code className="text-muted">{loadingMessage}</code></div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

Loading.defaultProps = {
  loadingMessage: 'Loading...',
};

export default Loading;
