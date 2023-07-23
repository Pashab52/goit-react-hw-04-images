import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, alt, modalSrc, onImgClick }) {
  return (
    <li className="gallery-item">
      <img
        className="item-image"
        src={src}
        alt={alt}
        onClick={() => onImgClick(modalSrc, alt)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalSrc: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};