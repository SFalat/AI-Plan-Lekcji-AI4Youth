import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconChevronLeft } from '@tabler/icons';

const StyledBackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;

const BackButton = props => {
  return (
    <StyledBackButton to={props.to}>
      <IconChevronLeft />
      <p>Cofnij</p>
    </StyledBackButton>
  );
};

export default BackButton;
