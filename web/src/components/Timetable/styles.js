import styled from 'styled-components';

const StyledTimetable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
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

const TopButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin-bottom: 1rem;
`;

const AvailabilityButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > *:not(:last-child) {
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
  font-size: 1rem;
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

const SaveButton = styled.button`
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
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.5rem;
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
  margin-right: 0.5rem;

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

export {
  StyledTimetable,
  StyledHeader,
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
};
