import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal (props) {

  

  useEffect(() => {
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    }
  })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      props.onModalClose();
    }
  };

 const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      props.onModalClose();
    }
  };

  const modalRoot = document.querySelector('#modal-root');

    return createPortal(
      <div className="overlay" onClick={handleOverlayClick}>
        <div>{props.children}</div>
      </div>,
      modalRoot
    );
}

  Modal.propTypes = {
    onModalClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };