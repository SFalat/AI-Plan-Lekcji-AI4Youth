import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { eel } from '../../App.jsx';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const StyledTr = styled.tr``;

const StyledTd = styled.td`
  border: 1px solid white;
`;

function Timetable() {
  const [hoursInDay, setHoursInDay] = useState([]);

  const cols = ['lp.', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

  const setDays = number => {
    const hours = [...Array(number + 1).keys()];
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
        <thead>
          <StyledTr>
            {cols.map(col => (
              <StyledTd key={col}>{col}</StyledTd>
            ))}
          </StyledTr>
        </thead>
        <tbody>
          {hoursInDay.map(val => (
            <StyledTr key={val}>{cols.map(col => (col === 'lp.' ? <StyledTd key={col}>{val}</StyledTd> : <StyledTd key={col} />))}</StyledTr>
          ))}
        </tbody>
      </StyledTable>
      <Buttons>
        <BackButton to="/teacher-info" />
        <ForwardButton to="/result" />
      </Buttons>
    </div>
  );
}

export default Timetable;
