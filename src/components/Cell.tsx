import styled from "styled-components";

interface CellProps {
  size: number;
  x: number;
  y: number;
}

export default function Cell(props: CellProps) {
  return (
    <StyledCell
      {...props}
      style={{
        left: `${props.x * props.size}px`,
        top: `${props.y * props.size}px`,
      }}
      $gradientIndex={(props.x + props.y) % 10}
    />
  );
}

const colorGradient = [
  "#fcfe21",
  "#e7f945",
  "#d2f45e",
  "#b9ed76",
  "#a3e78b",
  "#a3e78a",
  "#89e19f",
  "#5dd6c3",
  "#45d1d7",
  "#2ccae8",
  "#1cdde8",
  "#1cdde8",
];

interface CellProps {
  x: number;
  y: number;
  size: number;
}

interface StyledCellProps extends CellProps {
  $gradientIndex: number;
}

const StyledCell = styled.div<StyledCellProps>`
  position: absolute;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  // prettier-ignore
  box-shadow: 0 0 20px #fff,
    -10px 0 10px #ee00ff,
    10px 0 8px #0ff;
  background-color: ${(p) => colorGradient[p.$gradientIndex]};
`;
