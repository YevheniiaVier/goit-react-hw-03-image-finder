import { ThreeDots } from 'react-loader-spinner';
import { StyledBox } from '../ImagesAbsenceView/ImagesAbsenceView.styled';

export const Loader = () => {
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
    </StyledBox>
  );
};
