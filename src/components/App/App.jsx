import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal, ModalImage } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageAbsenceView } from 'components/ImagesAbsenceView/ImagesAbsenceView';
import { fetchImages } from 'api/imagesApi';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    gallery: [],
    error: null,
    status: 'idle',
    showModal: false,
    clickedImg: {},
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });
      fetchImages(searchQuery, page)
        .then(gallery => {
          if (!gallery[0]) {
            return Promise.reject(
              new Error(
                `No images for ${searchQuery}. Please try something else`
              )
            );
          }
          if (page > 1) {
            return this.setState(prevState => ({
              ...prevState,
              gallery: [...prevState.gallery, ...gallery],
              status: 'resolved',
            }));
          }
          return this.setState({ gallery, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, gallery: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = e => {
    // const { id, largeImageURL, alt } = e.currentTarget;
    const clickedImgId = Number(e.currentTarget.id);
    const foundImg = this.state.gallery.find(
      element => element.id === clickedImgId
    );
    // console.log(foundImg);

    this.setState({
      clickedImg: foundImg,
    });

    this.toggleModal();
  };
  render() {
    const { gallery, status, error, showModal, clickedImg } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {status === 'idle' && <h1>search Images here</h1>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ImageAbsenceView message={error.message} />}
        {status === 'resolved' && (
          <ImageGallery gallery={gallery} onImgClick={this.onImgClick} />
        )}
        <Button type="button" text="Load more" onClick={this.loadMore} />
        {showModal && (
          <Modal onClose={this.toggleModal} clickedImg={clickedImg}></Modal>
        )}
        <ToastContainer />
      </Container>
    );
  }
}
