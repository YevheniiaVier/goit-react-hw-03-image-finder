// import PropTypes from 'prop-types';
import { Component } from 'react';
// import { toast } from 'react-toastify';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { ImageAbsenceView } from 'components/ImagesAbsenceView/ImagesAbsenceView';
import { fetchImages } from 'api/imagesApi';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      fetchImages(this.props.searchQuery)
        .then(gallery => {
          if (!gallery.total) {
            return Promise.reject(
              new Error(
                `No images for ${this.props.searchQuery}. Please try something else`
              )
            );
          }
          return this.setState({ gallery, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { gallery, error, status } = this.state;
    if (status === 'idle') {
      return <h1>search Images here</h1>;
    }
    if (status === 'pending') {
      return <Loader searchQuery={this.props.searchQuery} />;
    }
    if (status === 'rejected') {
      return <ImageAbsenceView message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <Gallery>
          {gallery.hits.map(({ webformatURL, largeImageURL, id, tags }) => (
            <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} />
          ))}
        </Gallery>
      );
    }
  }
}
