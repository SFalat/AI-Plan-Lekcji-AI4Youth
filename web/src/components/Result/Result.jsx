import React, { useEffect } from 'react';
import styled from 'styled-components';
import Buttons from '~/components/StyledButtons/Buttons';
import BackButton from '~/components/StyledButtons/BackButton';
import ForwardButton from '~/components/StyledButtons/ForwardButton';

const StyledTimetable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
`;

const StyledHeader = styled.header`
  color: #14b1ae;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 70rem;
  overflow-y: auto;
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
  padding: 0.25rem 0.5rem;
  text-align: center;
`;

const StyledCellContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.25rem 0.5rem;
  line-height: 1.2rem;
  &:not(:last-child) {
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.25);
  }
`;

const StyledGroupAndTeacher = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  display: flex;
  flex-wrap: nowrap;
  line-height: 1.2rem;
  color: hsla(0, 0%, 100%, 0.5);

  p:not(:last-child) {
    margin-right: 0.25rem;
  }
`;

const StyledSubjectName = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

const cols = ['lp.', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];

function Result() {
  const [resultData, setResultData] = React.useState(null);
  const [hoursArray, setHoursArray] = React.useState(null);

  const getResultData = async () => {
    let response = await eel.request_handler('get_result', {})();
    console.log(response);
    if (response.status === 'success') {
      setResultData(response.data);
    } else {
      toast.error(response.message || 'Wystąpił błąd');
    }
  };

  useEffect(() => {
    setHoursArray(
      Array.apply(null, Array(resultData?.hours)).map(function (x, i) {
        return i;
      }),
    );
  }, [resultData]);

  useEffect(() => {
    getResultData();
  }, []);

  if (!resultData) {
    return <div>Ładowanie...</div>;
  }

  const getCell = hourInWeek => {
    let cells = resultData?.timetable?.filter(el => el[0] === hourInWeek);
    if (cells) {
      const abc = [];
      cells.forEach((cell, index) => {
        abc.push(
          <StyledCellContent key={index}>
            <StyledSubjectName>{cell[2]}</StyledSubjectName>
            <StyledGroupAndTeacher>
              <p style={{ fontWeight: 600 }}>{cell[1]}</p>
              <p>
                {cell[3]} {cell[4]}
              </p>
            </StyledGroupAndTeacher>
          </StyledCellContent>,
        );
      });
      return abc;
    } else {
      return <div></div>;
    }
  };

  return (
    <StyledTimetable>
      <StyledHeader>Wygenerowany plan</StyledHeader>
      <StyledTable>
        <StyledThead>
          <StyledHeadTr>
            {cols.map(col => (
              <StyledHeadTd key={col}>{col}</StyledHeadTd>
            ))}
          </StyledHeadTr>
        </StyledThead>
        <StyledTbody>
          {hoursArray.map((hour, hourIndex) => (
            <StyledBodyTr key={hourIndex}>
              {cols.map((col, colIndex) =>
                col === 'lp.' ? (
                  <StyledBodyTd key={colIndex}>{hour + 1}</StyledBodyTd>
                ) : (
                  <StyledBodyTd key={colIndex}>{getCell(resultData?.hours * (colIndex - 1) + hour + 1)}</StyledBodyTd>
                ),
              )}
            </StyledBodyTr>
          ))}
        </StyledTbody>
      </StyledTable>
      <Buttons>
        <BackButton to="/timetable" />
        <ForwardButton to="/summary" />
      </Buttons>
    </StyledTimetable>
  );
}

export default Result;
