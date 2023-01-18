import PropTypes from 'prop-types';

import { StyledButton } from './Button.styled';

export const Button = ({ text, ...restProps }) => {
  return <StyledButton {...restProps}>{text}</StyledButton>;
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
