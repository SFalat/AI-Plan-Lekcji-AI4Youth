import React, { useEffect, useState } from 'react';

function AddPreferredClassroomModalContent({ currentClassrooms, teachersList, setTeachersList, selectedTeacher, subjectName, setIsModalOpen }) {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const fetchClassrooms = async () => {
    const response = await eel.request_handler('get_classrooms', {})();
    if (response.status === 'success') {
      const filteredClassrooms = response.data.classrooms.filter(classroom => !currentClassrooms.includes(classroom));
      setClassrooms(filteredClassrooms);
      setSelectedClassroom(filteredClassrooms[0]);
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const confirmAddingClassroom = () => {
    const newTeachersList = [...teachersList];
    const selectedTeacherIndex = newTeachersList.findIndex(teacher => teacher.name === selectedTeacher);
    newTeachersList[selectedTeacherIndex].subjects.find(subject => subject.name === subjectName).preferredClassrooms.push(selectedClassroom);

    setTeachersList(newTeachersList);
    setIsModalOpen(false);
  };

  return (
    <>
      <select
        defaultValue={classrooms[0]}
        onChange={e => {
          setSelectedClassroom(e.target.value);
        }}
      >
        {classrooms.map(classroom => (
          <option key={classroom} value={classroom}>
            {classroom}
          </option>
        ))}
      </select>
      <div className="buttons">
        <button className="filled" onClick={confirmAddingClassroom}>
          Dodaj
        </button>
      </div>
    </>
  );
}

export default AddPreferredClassroomModalContent;
