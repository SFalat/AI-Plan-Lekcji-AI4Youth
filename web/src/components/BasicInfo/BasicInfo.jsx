import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { eel } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ConfirmButton from '~/components/StyledButtons/ConfirmButton';

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
  align-items: flex-start;
  justify-content: center;
  width: 100%;
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
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  margin-top: 0.5rem;
`;

const StyledHeader = styled.header`
  color: #14b1ae;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

function BasicInfo() {
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState({
    numberOfTeachers: 1,
    numberOfHours: 1,
    numberOfClassrooms: 1,
    numberOfGroups: 1,
  });

  const confirmBasicInfo = async () => {
    let response = await eel.request_handler('confirm_basic_info', { basicInfo: basicInfo })();
    console.log(response);
    if (response.status === 'success') {
      navigate('/teacher-info');
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  return (
    <StyledBasicInfo>
      <StyledHeader>Podaj podstawowe informacje</StyledHeader>
      <StyledOption>
        <label htmlFor="number_of_teachers">Ilość nauczycieli</label>
        <StyledOptionInput
          type="number"
          name="number_of_teachers"
          min={1}
          defaultValue={basicInfo.numberOfTeachers}
          onChange={e => {
            setBasicInfo({ ...basicInfo, numberOfTeachers: e.target.value });
          }}
        />
        <label htmlFor="number_of_hours">Ilość godzin w ciągu dnia</label>
        <StyledOptionInput
          type="number"
          name="number_of_hours"
          min={1}
          defaultValue={basicInfo.numberOfHours}
          onChange={e => {
            setBasicInfo({ ...basicInfo, numberOfHours: e.target.value });
          }}
        />
        <label htmlFor="number_of_classrooms">Ilość sal lekcyjnych w szkole</label>
        <StyledOptionInput
          type="number"
          name="number_of_classrooms"
          min={1}
          defaultValue={basicInfo.numberOfClassrooms}
          onChange={e => {
            setBasicInfo({ ...basicInfo, numberOfClassrooms: e.target.value });
          }}
        />
        <label htmlFor="number_of_groups">Ilość oddziałów w szkole</label>
        <StyledOptionInput
          type="number"
          name="number_of_groups"
          min={1}
          defaultValue={basicInfo.numberOfGroups}
          onChange={e => {
            setBasicInfo({ ...basicInfo, numberOfGroups: e.target.value });
          }}
        />
      </StyledOption>
      <Buttons>
        <BackButton to={'../'} />
        <ConfirmButton clickHandler={confirmBasicInfo} />
      </Buttons>
    </StyledBasicInfo>
  );
}

export default BasicInfo;
