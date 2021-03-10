import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const noop = () => null;

const ConfirmModal = ({
  show,
  onHide,
  onCancel,
  onConfirm,
  title,
  body,
  cancelButtonDescription,
  confirmButtonDescription,
  modalData, // eslint-disable-line no-unused-vars
  ...props
}) => {
  const handleCancel = useCallback(() => {
    onCancel();
    onHide();
  }, [onCancel, onHide]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onHide();
  }, [onConfirm, onHide]);

  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      centered
      aria-labelledby="confirmModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirmModal">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} variant="secondary">{cancelButtonDescription}</Button>
        <Button onClick={handleConfirm} variant="success">{confirmButtonDescription}</Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelButtonDescription: PropTypes.string,
  confirmButtonDescription: PropTypes.string,
  modalData: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

ConfirmModal.defaultProps = {
  show: false,
  onHide: noop,
  onCancel: noop,
  onConfirm: noop,
  cancelButtonDescription: 'Cancel',
  confirmButtonDescription: 'Confirm',
};

export default ConfirmModal;
