// import PropTypes from 'prop-types';

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
      return toast.error('Please enter something');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    e.currentTarget.reset();
  };

  render() {
    return (
      <StyledHeader>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledSearchBtn type="submit">
            <FaSearchengin />
            <StyledBtnLabel>Search</StyledBtnLabel>
          </StyledSearchBtn>
          <StyledInput
            type="text"
            autocomplete="off"
            autoFocus
            value={this.state.searchText}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}
