import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { eel } from '../../App.jsx';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';
import { IconCheck, IconDeviceFloppy, IconX } from '@tabler/icons';
import * as styles from './styles.js';
import splitIntoChunk from './splitIntoChunk.js';

const {
  StyledTimetable,
  StyledTable,
  StyledThead,
  StyledHeadTd,
  StyledHeadTr,
  StyledTbody,
  StyledBodyTr,
  StyledBodyTd,
  TopButtons,
  AvailabilityButtons,
  AvailabilityButton,
  SaveButton,
  StyledSelect,
} = styles;

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

  const saveAvailability = async () => {
    const availabilityString = availability.map(row => row.join('')).join('');
    const response = await eel.request_handler('update_availability', { id: selectedTeacherId, availability: availabilityString })();
    if (response.status === 'success') {
      toast.success('Zapisano zmiany');
      teachers.find(teacher => teacher.id === Number(selectedTeacherId)).availability = availabilityString;
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  return (
    <StyledTimetable>
      <TopButtons>
        <StyledSelect
          onChange={e => {
            handleSelectTeacher(e.target.value);
          }}
          defaultValue={setSelectedTeacherId}
        >
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </StyledSelect>
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
          <SaveButton onClick={saveAvailability}>
            <p>Zapisz</p>
            <IconDeviceFloppy />
          </SaveButton>
        </AvailabilityButtons>
      </TopButtons>
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
      <Buttons>
        <BackButton to="/teacher-info" />
        <ForwardButton to="/result" />
      </Buttons>
    </StyledTimetable>
  );
}

export default Timetable;
