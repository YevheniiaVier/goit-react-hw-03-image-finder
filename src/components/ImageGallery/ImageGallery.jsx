import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, onImgClick }) => {
  return (
    <Gallery>
      {gallery?.map(({ webformatURL, id, tags }) => (
        <ImageGalleryItem
          onImgClick={onImgClick}
          key={id}
          id={id}
          src={webformatURL}
          alt={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};
