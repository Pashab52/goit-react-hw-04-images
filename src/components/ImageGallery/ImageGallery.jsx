import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"; 
import PropTypes from 'prop-types';

export function ImageGallery({ images, onImgClick }) {
  return (
    <ul className="gallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            modalSrc={image.largeImageURL}
            onImgClick={onImgClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.protoType = {
  images: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired}).isRequired).isRequired,
};