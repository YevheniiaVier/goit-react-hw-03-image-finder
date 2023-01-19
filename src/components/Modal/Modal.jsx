import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Backdrop, LargeImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
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

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { clickedImg } = this.props;

    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <ModalImage image={clickedImg} />
        </ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}

export const ModalImage = ({ image }) => {
  const { largeImageURL, tags, id } = image;
  return <LargeImage src={largeImageURL} alt={tags} id={id} />;
};
