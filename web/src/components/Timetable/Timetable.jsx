import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { eel } from '../../App.jsx';

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const StyledTr = styled.tr`
  border: 1px solid white;
`;

function Timetable() {
  const [cols, setCols] = useState([]);
  const [hoursInDay, setHoursInDay] = useState([]);

  const setDays = number => {
    const hours = [...Array(number).keys()];
    hours.map(e => e.toString());
    setHoursInDay(hours);
  };

  const fetchHoursInDay = async () => {
    const response = await eel.request_handler('get_hours_in_day', {})();
    console.log(response);
    if (response.status === 'success') {
      console.log(response.data);
      setDays(response.data);
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    fetchHoursInDay();
  }, []);

  return (
    <div>
      <StyledTable>
        <tbody>
          {hoursInDay.map(val => (
            <StyledTr key={val}>
              <td>{val}</td>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default Timetable;
