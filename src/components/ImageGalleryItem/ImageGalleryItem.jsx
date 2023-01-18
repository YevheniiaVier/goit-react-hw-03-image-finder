// import PropTypes from 'prop-types';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, largeImg, alt, id }) => {
  return (
    <GalleryItem>
      <GalleryImage src={src} alt={alt} id={id} />
    </GalleryItem>
  );
};
