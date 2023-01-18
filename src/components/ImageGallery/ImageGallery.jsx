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
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.props.searchQuery}&image_type=photo&orientation=horizontal&page=1&per_page=12`;

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, gallery: null });
      fetch(url)
        .then(res => {
          if (Response.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`No images for ${this.props.searchQuery} found`)
          );
        })
        .then(gallery => this.setState({ gallery }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { gallery, loading, error } = this.state;
    return (
      <Gallery>
        {error && <h1>{error.message}</h1>}
        {gallery && gallery.hits.length <= 0 && <h1>No images found</h1>}

        {loading && <Loader />}
        {gallery &&
          gallery.hits.map(({ webformatURL, largeImageURL, id, tags }) => (
            <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} />
          ))}
      </Gallery>
    );
  }
}
