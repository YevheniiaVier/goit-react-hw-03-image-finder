import PropTypes from 'prop-types';

import {
  StyledForm,
  StyledBtnLabel,
  StyledHeader,
  StyledInput,
  StyledSearchBtn,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    text: '',
  };
  render() {
    return (
      <StyledHeader>
        <StyledForm>
          <StyledSearchBtn type="submit">
            <StyledBtnLabel>Search</StyledBtnLabel>
          </StyledSearchBtn>
          <StyledInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}
