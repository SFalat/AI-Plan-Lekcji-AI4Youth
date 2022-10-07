import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';

const StyledTeacherInfo = styled.div`
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
  align-items: flex-start;
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
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  outline: none;
  :focus {
    border: solid 1px white;
  }
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const StyledHeader = styled.header`
  color: #14b1ae;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

function TeacherInfo() {
  return (
    <StyledTeacherInfo>
      <StyledHeader>Uzupełnij informacje o nauczycielach:</StyledHeader>

      <Buttons>
        <BackButton to="/basic-info" />
        <ForwardButton to="/timetable" />
      </Buttons>
    </StyledTeacherInfo>
  );
}

export default TeacherInfo;
