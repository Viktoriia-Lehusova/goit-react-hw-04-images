import { useState } from 'react';
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

export default function Searchbar({ onSubmit }) {
  const [imageValue, setImageValue] = useState('');

  const handleSearchValueChange = evt => {
    setImageValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imageValue.trim() === '') {
      toast.error('Something went wrong.');
      return;
    }

    onSubmit(imageValue);
    setImageValue('');
  };

  return (
    <StyledHeader className="searchbar">
      <StyledForm className="form" onSubmit={handleSubmit}>
        <StyledBtn type="submit" className="button">
          <StyledSpan className="button-label">Search</StyledSpan>
          <BiSearchAlt2 />
        </StyledBtn>

        <StyledInput
          className="input"
          type="text"
          name="imageValue"
          value={imageValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchValueChange}
        />
      </StyledForm>
    </StyledHeader>
  );
}

StyledForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
