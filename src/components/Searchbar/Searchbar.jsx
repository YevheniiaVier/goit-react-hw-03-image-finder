import PropTypes from 'prop-types';

import { FaSearchengin } from 'react-icons/fa';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  StyledForm,
  StyledBtnLabel,
  StyledHeader,
  StyledInput,
  StyledSearchBtn,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Plese enter what you are looking for', {
        theme: 'colored',
        pauseOnHover: true,
      });
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    e.currentTarget.reset();
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <StyledHeader>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledSearchBtn type="submit">
            <FaSearchengin size={30} />
            <StyledBtnLabel>Search</StyledBtnLabel>
          </StyledSearchBtn>
          <StyledInput
            type="text"
            autocomplete="off"
            autoFocus
            value={searchQuery}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
