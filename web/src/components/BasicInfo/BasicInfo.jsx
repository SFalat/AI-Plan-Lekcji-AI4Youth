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
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;


function BasicInfo() {
  return <StyledBasicInfo>
    <StyledOption>
    <label htmlFor="number_of_teachers">Ilość nauczycieli</label>
      <StyledOptionInput type="number" name="number_of_teachers"/>
      <label htmlFor="number_of_hours">Ilość godzin w ciągu dnia</label>
      <StyledOptionInput type="number" name="number_of_hours"/>
      <label htmlFor="number_of_classrooms">Ilość sal lekcyjnych w szkole</label>
      <StyledOptionInput type="number" name="number_of_classrooms"/>
      <label htmlFor="number_of_groups">Ilość oddziałów w szkole</label>
      <StyledOptionInput type="number" name="number_of_groups"/>
    </StyledOption>
  </StyledBasicInfo>;
}

export default BasicInfo;
