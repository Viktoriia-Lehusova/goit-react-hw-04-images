import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const ButtonLoader = ({ loadMore }) => {
  return (
    <StyledButton type="button" onClick={loadMore}>
      Load More
    </StyledButton>
  );
};

StyledButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
