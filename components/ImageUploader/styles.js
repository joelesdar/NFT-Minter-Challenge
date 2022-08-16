import styled from 'styled-components';

export const DivUploader = styled.div`
`;

export const DivCard = styled.div`
  padding: 0px;
  border: 2px solid var(--green-blue);
  border-radius: 16px;
  display: inline-block;
  background: var(--intense-blue);
  margin: 16px;
`;

export const ImageWrapper = styled.div`
  border-radius: 16px;
  display: block;
  height: 0;
  overflow: hidden;
  padding: 56.25% 0 0 0;
  position: relative;
  width: 100%;

  img {
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  margin: 16px 0;

  /* label {
    color: white;
  } */

  input {
    margin-bottom: 16px;
    max-height: 32px;
    /* background: var(--green-blue); */
  }
`;