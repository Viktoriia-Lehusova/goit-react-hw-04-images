import { React, Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <StyledOverlay onClick={this.handleBackdropClick} className="overlay">
        <StyledModal className="modal">
          <img src={this.props.url} alt={this.props.alt} />
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
StyledOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
