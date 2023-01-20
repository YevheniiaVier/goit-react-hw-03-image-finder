import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
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
    showButton: false,
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    const prevPage = prevState.page;
    const prevSearchQuery = prevState.searchQuery;

    if (prevPage !== page || prevSearchQuery !== searchQuery) {
      this.setState({ status: 'pending', showButton: false });
      fetchImages(searchQuery, page)
        .then(gallery => {
          if (gallery.length <= 11 && page !== 1) {
            this.setState({ showButton: false });
            onSearchEndNotice();
          } else {
            this.setState({ showButton: true });
          }
          if (!gallery[0]) {
            this.setState({ showButton: false });
            return onSearchError(searchQuery);
          }

          if (page > 1) {
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...gallery],
              status: 'resolved',
            }));
            onSmoothScroll();
            return;
          }

          this.setState({ showButton: true });

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
    const clickedImgId = Number(e.currentTarget.id);
    const foundImg = this.state.gallery.find(
      element => element.id === clickedImgId
    );
    this.setState({
      clickedImg: foundImg,
    });
    this.toggleModal();
  };

  render() {
    const { gallery, status, error, showModal, clickedImg, showButton } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <ImageAbsenceView message={error.message} />}
        {gallery[0] && (
          <ImageGallery
            id="gallery"
            gallery={gallery}
            onImgClick={this.onImgClick}
          />
        )}
        {status === 'pending' && gallery[0] && <Loader />}
        {showButton && (
          <Button type="button" text="Load more" onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} clickedImg={clickedImg}></Modal>
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}

function onSearchEndNotice() {
  return toast.warn(
    `We're sorry, but you've reached the end of search results.`,
    {
      theme: 'colored',
      pauseOnHover: true,
    }
  );
}

function onSearchError(searchQuery) {
  return Promise.reject(
    new Error(`No images for ${searchQuery}. Please try something else`)
  );
}

function onSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('#gallery')
    .firstElementChild.getBoundingClientRect();
  console.log(cardHeight);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
