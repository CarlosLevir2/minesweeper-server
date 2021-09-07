import styled from 'styled-components';

export const Board = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #212329;
  padding: 0;
`;

export const RowContainer = styled.ul``;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Result = styled.h1`
  color: ${({ win }: { win: boolean }) => (win ? 'green' : '#ff2748')};
  margin-bottom: 20px;
  font-size: 42px;
  font-weight: bold;
`;

export const Cell = styled.li`
  width: 50px;
  height: 50px;
  background: ${({
    hasMine,
    hasFlag,
  }: {
    hasMine?: boolean;
    hasFlag?: boolean;
    flagEnabled?: boolean;
  }) => (hasMine ? '#ff2748' : hasFlag ? 'blue' : 'green')};

  border-radius: 8px;
  margin: 5px;
  list-style: none;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: ${({ flagEnabled }) => (flagEnabled ? 'copy' : 'pointer')};
`;

export const Details = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: large;
  color: #fff;
  font-weight: bold;

  li {
    box-shadow: ${({ flagEnabled }: { flagEnabled?: boolean }) =>
      flagEnabled && 'inset 0 0 0.3em gold, 0 0 0.3em blue'};
    cursor: ${({ flagEnabled }: { flagEnabled?: boolean }) =>
      flagEnabled && 'copy'};
  }
`;

export const Button = styled.button`
  font-weight: bold;
  font-size: 18px;
  padding: 15px 20px;
  background-color: #ff2748;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin: 5px;
  margin-top: 20px;
  cursor: pointer;
`;
