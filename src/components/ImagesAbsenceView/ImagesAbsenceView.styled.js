import styled from 'styled-components';

export const StyledBox = styled.div``;
export const ErrorMessage = styled.p``;

export const ErrorImage = styled.img.attrs(props => ({
  src: props.src,
  alt: props.alt,
}))`
  width: 260px;
`;
