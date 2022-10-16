import React from 'react';
import styled from 'styled-components';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';

const StyledSummary = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const StyledHeader = styled.header`
  color: #14b1ae;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const StyledImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 70rem;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

function Summary() {
  return (
    <StyledSummary>
      <StyledHeader>Podsumowanie</StyledHeader>
      <StyledImagesContainer>
        <StyledImage referrerPolicy="no-referrer" src={'https://i.imgur.com/PO1HJkA.png'} alt="image1" />
        <StyledImage referrerPolicy="no-referrer" src={'https://i.imgur.com/4b9hTRX.png'} alt="image1" />
      </StyledImagesContainer>
      <Buttons>
        <BackButton to="/result" />
      </Buttons>
    </StyledSummary>
  );
}

export default Summary;
