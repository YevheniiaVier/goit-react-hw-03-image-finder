import PropTypes from 'prop-types';

import { ThreeDots } from 'react-loader-spinner';
import searchingImage from '../../images/searching.jpg';
import {
  StyledBox,
  ErrorImage,
  ErrorMessage,
} from '../ImagesAbsenceView/ImagesAbsenceView.styled';

export const Loader = ({ searchQuery }) => {
  return (
    <StyledBox>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <ErrorMessage>{`Searching for ${searchQuery}, please wait`}</ErrorMessage>
      <ErrorImage src={searchingImage} alt="searching fo images" />
    </StyledBox>
  );
};

Loader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
