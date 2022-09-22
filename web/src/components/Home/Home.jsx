import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import background from '../../assets/background.jpg';
import eznLogo from '../../assets/ezn-logo.png';

const StyledHome = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  height: 100vh;
  background-image: url(${background});
`;

const StyledOptionsBar = styled.div`
  grid-column: auto / span 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(6, 13, 17, 0.95);
  backdrop-filter: blur(0.5rem);
`;

const StyledTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
`;

const StyledOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const StyledOptionLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
  color: #14b1ae;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  :hover {
    opacity: 0.9;
  }
`;

const StyledOptionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #14b1ae;
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  :hover {
    opacity: 0.9;
  }
`;

const StyledLogoSpace = styled.div`
  grid-column: auto / span 7;
  background-color: rgba(6, 13, 17, 0.75);
  backdrop-filter: blur(0.25rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSchoolLogo = styled.img`
  max-width: 20rem;
  max-height: 20rem;
`;

const Option = props => {
  return props.path ? (
    <StyledOption>
      <StyledOptionLink to={props.to}>{props.children}</StyledOptionLink>
    </StyledOption>
  ) : (
    <StyledOption to={props.path}>
      <StyledOptionButton onClick={props.clickHandler}>{props.children}</StyledOptionButton>
    </StyledOption>
  );
};

const closeApp = () => {};

function Home() {
  return (
    <StyledHome>
      <StyledOptionsBar>
        <StyledTitle>Plan lekcji</StyledTitle>
        <StyledOptionsList>
          <Option path to={'/open-file'}>
            Otwórz plik
          </Option>
          <Option path to={'/basic-info'}>
            Utwórz nowy plik
          </Option>
          <Option
            button
            clickHandler={e => {
              closeApp;
            }}
          >
            Zakończ
          </Option>
        </StyledOptionsList>
      </StyledOptionsBar>
      <StyledLogoSpace>
        <StyledSchoolLogo src={eznLogo} />
      </StyledLogoSpace>
    </StyledHome>
  );
}

export default Home;
