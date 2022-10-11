import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { eel } from '../../App.jsx';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';
import { IconCheck, IconX } from '@tabler/icons';

const StyledTimetable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 50rem;
`;

// Table head
const StyledThead = styled.thead`
  border: 1px solid white;
  background-color: white;
  color: #060d11;
  font-weight: 500;
`;

const StyledHeadTd = styled.td`
  padding: 0.5rem 1rem;
  text-align: center;
`;

const StyledHeadTr = styled.tr``;

// Table body
const StyledTbody = styled.tbody``;

const StyledBodyTr = styled.tr``;

const StyledBodyTd = styled.td`
  border: 1px solid hsla(0, 0%, 100%, 0.25);
  padding: 0.5rem 1rem;
  text-align: center;
  ${({ hour }) => (hour ? `cursor: cell` : '')};
  &.available {
    background-color: rgba(0, 255, 0, 0.1);
  }
  &.unavailable {
    background-color: rgba(255, 0, 0, 0.1);
  }
  &.selected {
    outline-width: 2px;
    outline-style: solid;
    outline-color: rgba(64, 64, 255, 1);
  }
`;

const AvailabilityButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  & > button:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const AvailabilityButton = styled.button`
  background-color: hsla(0, 0%, 100%, 0.1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  background-color: ${({ available }) => (available ? 'rgba(64, 255, 64, 0.25)' : 'rgba(255, 64, 64, 0.25)')};
  &:hover {
    background-color: ${({ available }) => (available ? 'rgba(64, 255, 64, 0.2)' : 'rgba(255, 64, 64, 0.2)')};
  }
  svg {
    width: 1.2rem;
    height: 1.2rem;
    background: white;
    margin-left: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${({ available }) => (available ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)')};
  }
`;

const StyledSelect = styled.select`
  background-color: hsla(0, 0%, 100%, 0.1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  option {
    background-color: hsl(202, 48%, 10%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
`;

const splitIntoChunk = (arr, chunk) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunk) {
    let tempArray;
    tempArray = arr.slice(i, i + chunk);
    res.push(tempArray);
  }
  return res;
};

function Timetable() {
  const [hoursInDay, setHoursInDay] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });

  const cols = ['lp.', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

  const setHours = number => {
    setHoursInDay([...Array(number).keys()].map(e => (e + 1).toString()));
  };

  const fetchHoursInDay = async () => {
    const response = await eel.request_handler('get_timetable_data', {})();
    if (response.status === 'success') {
      const firstTeacher = response.data.teachers[0];

      setHours(response.data.hours);
      setTeachers(response.data.teachers);
      setSelectedTeacherId(firstTeacher.id);

      setAvailability(splitIntoChunk(firstTeacher.availability.split(''), response.data.hours));

      setSelected(splitIntoChunk(Array(response.data.hours * firstTeacher.availability.length).fill(0), response.data.hours));
      setSelected(prev => {
        prev[0][0] = 1;
        return prev;
      });
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    fetchHoursInDay();
  }, []);

  const handleSelectTeacher = id => {
    setSelectedTeacherId(id);
    console.log(teachers.find(teacher => teacher.id === Number(id)));
    setAvailability(splitIntoChunk(teachers.find(teacher => teacher.id === Number(id)).availability.split(''), hoursInDay.length));
  };

  useEffect(() => {
    const columns = [];
    for (let i = 0; i <= cols.length - 2; i++) {
      const row = [];
      for (let j = 0; j <= hoursInDay.length - 1; j++) {
        const highestX = dragStartPos.x > dragEndPos.x ? dragStartPos.x : dragEndPos.x;
        const lowestX = dragStartPos.x < dragEndPos.x ? dragStartPos.x : dragEndPos.x;
        const highestY = dragStartPos.y > dragEndPos.y ? dragStartPos.y : dragEndPos.y;
        const lowestY = dragStartPos.y < dragEndPos.y ? dragStartPos.y : dragEndPos.y;
        if (i >= lowestX && i <= highestX && j >= lowestY && j <= highestY) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
      columns.push(row);
    }
    setSelected(columns);
  }, [dragEndPos]);

  const updateAvailability = status => {
    const tempAvailability = [...availability];
    availability.forEach((row, i) => {
      row.forEach((col, j) => {
        if (selected[i][j]) {
          tempAvailability[i][j] = status ? '1' : '0';
        }
      });
    });
    setAvailability(tempAvailability);
  };

  return (
    <StyledTimetable>
      <StyledSelect
        onChange={e => {
          handleSelectTeacher(e.target.value);
        }}
        defaultValue={setSelectedTeacherId}
      >
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name} {teacher.id}
          </option>
        ))}
      </StyledSelect>
      <StyledTable>
        <StyledThead>
          <StyledHeadTr>
            {cols.map(col => (
              <StyledHeadTd key={col}>{col}</StyledHeadTd>
            ))}
          </StyledHeadTr>
        </StyledThead>
        <StyledTbody>
          {hoursInDay.map(val => (
            <StyledBodyTr key={val}>
              {cols.map((col, colIndex) => {
                return col === 'lp.' ? (
                  <StyledBodyTd key={col}>{val}</StyledBodyTd>
                ) : (
                  <StyledBodyTd
                    key={col}
                    row={val - 1}
                    column={colIndex - 1}
                    draggable
                    hour
                    onDragStart={() => {
                      setDragStartPos({ x: colIndex - 1, y: val - 1 });
                    }}
                    onDragEnter={() => {
                      setDragEndPos({ x: colIndex - 1, y: val - 1 });
                    }}
                    onClick={() => {
                      setDragStartPos({ x: colIndex - 1, y: val - 1 });
                      setDragEndPos({ x: colIndex - 1, y: val - 1 });
                    }}
                    className={`${Number(availability[colIndex - 1][val - 1]) ? 'available' : 'unavailable'} ${
                      selected[colIndex - 1][val - 1] && 'selected'
                    }`}
                  />
                );
              })}
            </StyledBodyTr>
          ))}
        </StyledTbody>
      </StyledTable>
      <AvailabilityButtons>
        <AvailabilityButton
          available
          onClick={() => {
            updateAvailability(true);
          }}
        >
          <p>Dostępne</p>
          <IconCheck />
        </AvailabilityButton>
        <AvailabilityButton
          onClick={() => {
            updateAvailability(false);
          }}
        >
          <p>Niedostępne</p>
          <IconX />
        </AvailabilityButton>
      </AvailabilityButtons>
      <Buttons>
        <BackButton to="/teacher-info" />
        <ForwardButton to="/result" />
      </Buttons>
    </StyledTimetable>
  );
}

export default Timetable;
