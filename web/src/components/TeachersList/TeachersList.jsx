import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';
import { IconPlus, IconX } from '@tabler/icons';
import Modal from '../Modal/Modal';
import { AddSubjectModalContent } from './ModalContent/AddSubjectModalContent';
import AddPreferredClassroomModalContent from './ModalContent/AddPreferredClassroomModalContent';

const StyledTeacherInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
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
  overflow: hidden;
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

const StyledAddTeacher = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-radius: 0.5rem;
  font-family: inherit;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #14b1ae;
  &:hover {
    /* background-color: hsla(0, 0%, 100%, 0.1); */
    background-color: hsl(178.8535031847134, 79.69543147208124%, 30%);
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
  overflow-y: auto;
`;

const StyledSectionHeader = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledAddSubjectButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.125rem 0.25rem;
  font-weight: 400;
  font-size: 0.8rem;
  /* background-color: hsla(0, 0%, 100%, 0.05); */
  background-color: #14b1ae;
  &:hover {
    /* background-color: hsla(0, 0%, 100%, 0.1); */
    background-color: hsl(178.8535031847134, 79.69543147208124%, 30%);
  }
  svg {
    margin-left: 0.25rem;
    width: 1rem;
    height: 1rem;
  }
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
  margin-top: 0.5rem;
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
  margin-top: 0.5rem;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

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

  const [subjects, setSubjects] = useState([
    'Matematyka',
    'Język polski',
    'Język angielski',
    'Biologia',
    'Chemia',
    'Fizyka',
    'Geografia',
    'Historia',
  ]);

  const openAddingSubjectsModal = () => {
    setIsModalOpen(true);
    setModalTitle('Dodaj przedmiot');

    setModalContent(
      <AddSubjectModalContent
        subjects={subjects}
        setSubjects={setSubjects}
        teachersList={teachersList}
        setTeachersList={setTeachersList}
        selectedTeacher={selectedTeacher}
        setIsModalOpen={setIsModalOpen}
      />,
    );
  };

  const openAddingPreferredClassroomsModal = subject => {
    setIsModalOpen(true);
    setModalTitle('Dodaj salę');

    setModalContent(
      <AddPreferredClassroomModalContent
        currentClassrooms={subject.preferredClassrooms}
        teachersList={teachersList}
        setTeachersList={setTeachersList}
        selectedTeacher={selectedTeacher}
        subjectName={subject.name}
        setIsModalOpen={setIsModalOpen}
      />,
    );
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
          <StyledAddTeacher>Dodaj</StyledAddTeacher>
        </StyledList>
        <StyledForm>
          <StyledTeacherName>{selectedTeacher}</StyledTeacherName>
          <StyledSection>
            <StyledSectionHeader>
              <p>Przedmioty</p>
              <StyledAddSubjectButton onClick={openAddingSubjectsModal}>
                <p>Dodaj przedmiot</p>
                <IconPlus />
              </StyledAddSubjectButton>
            </StyledSectionHeader>
            {teachersList
              .find(teacher => teacher.name === selectedTeacher)
              ?.subjects.map((subject, index) => (
                <StyledSubject key={index}>
                  <StyledSubjectName>{subject.name}</StyledSubjectName>
                  <p>Preferowane sale:</p>
                  <StyledClassroomsList>
                    {subject.preferredClassrooms?.sort().map((classroom, index) => (
                      <StyledClassroom key={index}>
                        <p>{classroom}</p>
                        <IconX
                          onClick={() => {
                            removeClassroom(subject, classroom);
                          }}
                        />
                      </StyledClassroom>
                    ))}
                    <StyledAddClassroomButton onClick={() => openAddingPreferredClassroomsModal(subject)}>
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
      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen} title={modalTitle} content={modalContent} />
    </StyledTeacherInfo>
  );
}

export default TeachersList;
