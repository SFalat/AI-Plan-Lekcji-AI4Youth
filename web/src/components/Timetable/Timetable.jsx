import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { eel } from '../../App.jsx';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';

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
  &.available {
    background-color: rgba(0, 255, 0, 0.25);
  }
  &.unavailable {
    background-color: rgba(255, 0, 0, 0.25);
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

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });

  const cols = ['lp.', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

  const setHours = number => {
    setHoursInDay([...Array(number).keys()].map(e => (e + 1).toString()));
  };

  const fetchHoursInDay = async () => {
    const response = await eel.request_handler('get_timetable_data', {})();
    console.log(response);
    if (response.status === 'success') {
      setHours(response.data.hours);
      setTeachers(response.data.teachers);
      setAvailability(splitIntoChunk(response.data.teachers[0].availability.split(''), response.data.hours));
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    fetchHoursInDay();
  }, []);

  // useEffect(() => {
  //   console.log(availability);
  // }, [availability]);

  useEffect(() => {
    if (isDragging) {
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
      setAvailability(columns);
    }
  }, [dragEndPos]);

  return (
    <StyledTimetable>
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
                    onDragStart={() => {
                      setIsDragging(true);
                      setDragStartPos({ x: colIndex - 1, y: val - 1 });
                    }}
                    onDragEnd={() => {
                      setIsDragging(false);
                    }}
                    onDragEnter={() => {
                      setDragEndPos({ x: colIndex - 1, y: val - 1 });
                    }}
                    className={availability[colIndex - 1][val - 1] ? 'available' : 'unavailable'}
                  >
                    col {colIndex - 1} row {val - 1}{' '}
                  </StyledBodyTd>
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
