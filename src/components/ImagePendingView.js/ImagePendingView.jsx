import searchingImage from '../../images/searching.jpg';
import {
  StyledBox,
  ErrorImage,
  ErrorMessage,
} from './ImagesAbsenceView.styled';

export const ImagePendingView = ({ searchQuery }) => {
  return (
    <StyledBox>
      <ErrorMessage>{`Searching for ${searchQuery}, please wait`}</ErrorMessage>
      <ErrorImage src={searchingImage} alt="searching fo images" />
    </StyledBox>
  );
};
