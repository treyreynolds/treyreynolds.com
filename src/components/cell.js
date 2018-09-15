// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  size: number,
  x: number,
  y: number
};

const Cell: React$ComponentType<Props> = props => {
  return (
    <StyledCell
      {...props}
      style={{ left: `${props.x * props.size}px`, top: `${props.y * props.size}px` }}
      gradientIndex={(props.x + props.y) % 10}
    />
  );
};

export default Cell;

const colorGradient = [
  '#fcfe21',
  '#e7f945',
  '#d2f45e',
  '#b9ed76',
  '#a3e78b',
  '#a3e78a',
  '#89e19f',
  '#5dd6c3',
  '#45d1d7',
  '#2ccae8',
  '#1cdde8',
  '#1cdde8'
];

const StyledCell = styled.div`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: ${p => p.size / 2}px;
  background-color: ${p => colorGradient[p.gradientIndex]};
`;