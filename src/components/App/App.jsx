import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  handleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer />
      </Container>
    );
  }
}
