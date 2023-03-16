import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, url, alt }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handleBackdropClick} className="overlay">
      <StyledModal className="modal">
        <img src={url} alt={alt} />
      </StyledModal>
    </StyledOverlay>,
    modalRoot
  );
}
// export default function Modal () {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <StyledOverlay onClick={this.handleBackdropClick} className="overlay">
//         <StyledModal className="modal">
//           <img src={this.props.url} alt={this.props.alt} />
//         </StyledModal>
//       </StyledOverlay>,
//       modalRoot
//     );
//   }
// }
StyledOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
