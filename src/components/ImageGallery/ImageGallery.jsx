import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery }) => {
  return (
    <Gallery>
      {gallery?.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem key={id} id={id} src={webformatURL} alt={tags} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};
