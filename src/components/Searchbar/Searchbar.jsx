import React, { Component } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  StyledHeader,
  StyledForm,
  StyledBtn,
  StyledSpan,
  StyledInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageValue: '',
  };

  handleSearchValueChange = evt => {
    this.setState({ imageValue: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imageValue.trim() === '') {
      toast.error('Something went wrong.');
      return;
    }

    this.props.onSubmit(this.state.imageValue);
    this.setState({ imageValue: '' });
  };

  render() {
    return (
      <StyledHeader className="searchbar">
        <StyledForm className="form" onSubmit={this.handleSubmit}>
          <StyledBtn type="submit" className="button">
            <StyledSpan className="button-label">Search</StyledSpan>
            <BiSearchAlt2 />
          </StyledBtn>

          <StyledInput
            className="input"
            type="text"
            name="imageValue"
            value={this.state.imageValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchValueChange}
          />
        </StyledForm>
      </StyledHeader>
    );
  }
}

StyledForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
