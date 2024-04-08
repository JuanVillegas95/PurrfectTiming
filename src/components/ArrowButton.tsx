"use client";

import styled from 'styled-components';

const Square = styled.div`
  width: 100px;
  height: 100px;
  background-color: #964B00; /* Brown color */
  position: relative;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 70px solid #FFA07A; /* Light Salmon color */
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  margin: auto;
`;

export default function ArrowButton() {
  return (
    <Square>
      hiasjdajksdbasjhdb
      <Triangle />
    </Square>
  );
}
