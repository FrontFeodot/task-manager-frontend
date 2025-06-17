import styled, { keyframes } from 'styled-components';

import { ITaskPriority } from '@common/interfaces/ITask';

const gradientFlow = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(-15deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
`;

const gradientSlide = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgPrimary};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;

    background-size: 200% 200%;
    animation:
      ${gradientFlow} 5s ease infinite,
      ${gradientSlide} 5s ease-in-out infinite;
  }

  /*     background: linear-gradient(
      90deg,
      #bae6fd, 
      #60a5fa, 
      #bae6fd
    ); */

  &.done::before {
    background: linear-gradient(90deg, #bae6fd, #60a5fa, #bae6fd);
    background-size: 200% 200%;
    animation:
      ${gradientFlow} 5s ease infinite,
      ${gradientSlide} 5s ease-in-out infinite;
  }

  &.${ITaskPriority.LOW}::before {
    background: linear-gradient(
      90deg,
      #4ade80,
      #16a34a,
      #166534,
      #16a34a,
      #4ade80
    );
    background-size: 200% 200%;
    animation:
      ${gradientFlow} 5s ease infinite,
      ${gradientSlide} 5s ease-in-out infinite;
  }

  &.${ITaskPriority.MEDIUM}::before {
    background: linear-gradient(
      90deg,
      #fde047,
      #eab308,
      #ca8a04,
      #eab308,
      #fde047
    );
    background-size: 200% 100%;
    animation:
      ${gradientFlow} 4s ease infinite,
      ${gradientSlide} 4s ease-in-out infinite;
  }

  &.${ITaskPriority.HIGH}::before {
    background: linear-gradient(
      90deg,
      #f87171,
      #dc2626,
      #7f1d1d,
      #dc2626,
      #f87171
    );
    background-size: 200% 200%;
    animation:
      ${gradientFlow} 3s ease infinite,
      ${gradientSlide} 3s ease-in-out infinite;
  }
`;
