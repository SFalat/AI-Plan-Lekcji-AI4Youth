import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const StyledOption = styled.div`
  display: flex;
  max-width: 20rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const StyledOptionInput = styled.input`
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


function BasicInfo() {
  return <StyledBasicInfo>
    <StyledOption>
    <label htmlFor="number_of_teachers">Ilość nauczycieli:</label>
    <StyledOptionInput type="number" name="number_of_teachers"/>
    </StyledOption>
  </StyledBasicInfo>;
}

export default BasicInfo;
