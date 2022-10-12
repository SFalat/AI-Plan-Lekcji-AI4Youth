import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';
import { IconPlus, IconX } from '@tabler/icons';

const StyledTeacherInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-width: 50rem;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
  /* background-color: hsla(0, 0%, 100%, 0.05); */
  /* border-radius: 0.5rem; */
  padding: 0.5rem 1rem;
  width: 40%;
  max-width: 20rem;
  border-right: 1px solid #14b1ae;
`;

const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isSelected }) => (isSelected ? '#14b1ae' : 'transparent')};
  background-color: ${({ isSelected }) => (isSelected ? 'hsla(0, 0%, 100%, 0.1)' : 'hsla(0, 0%, 100%, 0.05)')};
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex-grow: 1;
  padding: 0.5rem 1rem;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const StyledTeacherName = styled.h2`
  margin-bottom: 1rem;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledSectionHeader = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StyledSubject = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: hsla(0, 0%, 100%, 0.05);
`;

const StyledSubjectName = styled.h3`
  margin-bottom: 0.5rem;
`;

const StyledClassroomsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  p {
    margin-right: 0.5rem;
  }
`;

const StyledClassroom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: hsla(0, 0%, 100%, 0.05);
  height: 2rem;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  svg {
    cursor: pointer;
    width: 1rem;
    height: 1rem;
  }
`;

const StyledAddClassroomButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #14b1ae;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  height: 2rem;
  &:hover {
    background-color: hsl(178.8535031847134, 79.69543147208124%, 30%);
  }
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

function TeachersList() {
  const [teachersList, setTeachersList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachersList = async () => {
    const response = await eel.request_handler('get_teachers_list', {})();
    if (response.status === 'success') {
      setTeachersList(response.data.teachers);
      setSelectedTeacher(response.data.teachers[0].name);
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    fetchTeachersList();
  }, []);

  const removeClassroom = (subject, classroom) => {
    const newTeachersList = [...teachersList];

    const selectedTeacherIndex = newTeachersList.findIndex(teacher => teacher.name === selectedTeacher);
    const selectedSubjectIndex = newTeachersList[selectedTeacherIndex].subjects.findIndex(subjectItem => subjectItem.name === subject.name);

    newTeachersList[selectedTeacherIndex].subjects[selectedSubjectIndex].preferredClassrooms = newTeachersList[selectedTeacherIndex].subjects[
      selectedSubjectIndex
    ].preferredClassrooms.filter(classroomItem => classroomItem !== classroom);
    setTeachersList(newTeachersList);
  };

  return (
    <StyledTeacherInfo>
      <StyledHeader>Nauczyciele</StyledHeader>

      <StyledContent>
        <StyledList>
          {teachersList.map((teacher, index) => (
            <StyledOption
              key={index}
              isSelected={teacher.name === selectedTeacher}
              onClick={() => {
                setSelectedTeacher(teacher.name);
              }}
            >
              {teacher.name}
            </StyledOption>
          ))}
        </StyledList>
        <StyledForm>
          <StyledTeacherName>{selectedTeacher}</StyledTeacherName>
          <StyledSection>
            <StyledSectionHeader>Przedmioty</StyledSectionHeader>
            {teachersList
              .find(teacher => teacher.name === selectedTeacher)
              ?.subjects.map((subject, index) => (
                <StyledSubject key={index}>
                  <StyledSubjectName>{subject.name}</StyledSubjectName>
                  <p>Preferowane sale:</p>
                  <StyledClassroomsList>
                    {subject.preferredClassrooms?.map((classroom, index) => (
                      <StyledClassroom key={index}>
                        <p>{classroom}</p>
                        <IconX
                          onClick={() => {
                            removeClassroom(subject, classroom);
                          }}
                        />
                      </StyledClassroom>
                    ))}
                    <StyledAddClassroomButton>
                      <IconPlus />
                    </StyledAddClassroomButton>
                  </StyledClassroomsList>
                </StyledSubject>
              ))}
          </StyledSection>
        </StyledForm>
      </StyledContent>

      <Buttons>
        <BackButton to="/basic-info" />
        <ForwardButton to="/timetable" />
      </Buttons>
    </StyledTeacherInfo>
  );
}

export default TeachersList;
