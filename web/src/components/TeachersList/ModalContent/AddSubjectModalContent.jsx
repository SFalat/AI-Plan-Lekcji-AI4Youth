import React, { useState } from 'react';

export const AddSubjectModalContent = ({ subjects, setSubjects, teachersList, setTeachersList, selectedTeacher, setIsModalOpen }) => {
  const [addedSubject, setAddedSubject] = useState(subjects[0]);

  const confirmAddingSubject = () => {
    const newTeachersList = [...teachersList];
    const selectedTeacherIndex = newTeachersList.findIndex(teacher => teacher.name === selectedTeacher);
    newTeachersList[selectedTeacherIndex].subjects.push({ name: addedSubject, preferredClassrooms: [] });
    setTeachersList(newTeachersList);
    setSubjects(subjects.filter(subject => subject !== addedSubject));
    setIsModalOpen(false);
  };

  return (
    <>
      <select
        defaultValue={subjects[0]}
        onChange={e => {
          setAddedSubject(e.target.value);
        }}
      >
        {subjects.map(subject => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      <div className="buttons">
        <button className="filled" onClick={confirmAddingSubject}>
          Dodaj
        </button>
      </div>
    </>
  );
};
