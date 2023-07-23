import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onModalClose();
    }
  };

  modalRoot = document.querySelector('#modal-root');

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div>{this.props.children}</div>
      </div>,
      this.modalRoot
    );
  }
}
