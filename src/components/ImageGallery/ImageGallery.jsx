// import PropTypes from 'prop-types';
import { Component } from 'react';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

const API_KEY = '31477938-fd248c01ea14c0dbe5bfc1d84';
const BASE_URL = 'https://pixabay.com/api';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.props.searchQuery}&image_type=photo&orientation=horizontal&page=1&per_page=12`;

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true });
      fetch(url)
        .then(res => res.json())
        .then(gallery => this.setState({ gallery }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { gallery, loading } = this.state;
    return (
      <Gallery>
        {loading && <Loader />}
        {gallery &&
          gallery.hits.map(({ webformatURL, largeImageURL, id, tags }) => (
            <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} />
          ))}
      </Gallery>
    );
  }
}
