import PropTypes from 'prop-types';

export const ChartPropTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      '0-1': PropTypes.number.isRequired,
      '1-2': PropTypes.number.isRequired,
      '2-3': PropTypes.number.isRequired,
      '3-4': PropTypes.number.isRequired,
      '4-5': PropTypes.number.isRequired,
      '5-6': PropTypes.number.isRequired,
      '6-7': PropTypes.number.isRequired,
      '7+': PropTypes.number.isRequired,
      angle: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const ChartDefaultProps = {
  width: 500,
  height: 500,
  columns: ['angle', '0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7+'],
};
