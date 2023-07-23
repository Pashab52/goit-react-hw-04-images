import PropTypes from 'prop-types';
export function Button({ onClick }) {
  return (
    <div className="wrap">
      <button onClick={() => onClick()} className="button-load" type="button">
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}