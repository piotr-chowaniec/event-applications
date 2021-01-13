import React, { useState, useCallback, useMemo } from 'react';

import ConfirmModal from '../../displayComponents/confirmModal';

const useModal = ({
  ModalComponent = ConfirmModal,
} = {}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const hideModal = useCallback(() => setModalVisible(false), []);
  const showModal = useCallback(data => {
    setModalData(data);
    setModalVisible(true);
  }, []);

  const Modal = useMemo(
    () => {
      const Modal = props =>
        <ModalComponent
          show={isModalVisible}
          onHide={hideModal}
          modalData={modalData}
          {...props}
        />;
      return Modal;
    },
    [hideModal, isModalVisible, modalData],
  );

  return {
    Modal,
    showModal,
  };
};

export default useModal;
