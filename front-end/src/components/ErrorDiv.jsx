import PropTypes from 'prop-types';

export default function ErrorDiv({ dataTestId, message }) {
  return (
    <div>
      <span data-testid={ dataTestId }>{message}</span>
    </div>
  );
}

ErrorDiv.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
