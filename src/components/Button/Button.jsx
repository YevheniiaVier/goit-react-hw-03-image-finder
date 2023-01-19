import PropTypes from 'prop-types';

import { StyledButton } from './Button.styled';

export const Button = ({ text, type, active, onClick, disabled }) => {
  return (
    <StyledButton
      type={type}
      active={active}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

// import PropTypes from 'prop-types';
// import { Component } from 'react';

// import { StyledButton } from './Button.styled';

// export class Button extends Component {
//   state = {
//     disabled: false,
//     visible: false,
//   };
//   render() {
//     return <StyledButton type="button">{this.props.text}</StyledButton>;
//   }
// }

// Button.propTypes = {
//   text: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   active: PropTypes.bool,
//   onClick: PropTypes.func,
//   disabled: PropTypes.bool,
// };
