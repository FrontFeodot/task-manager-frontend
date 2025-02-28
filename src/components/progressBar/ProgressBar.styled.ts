import { ITaskStatus } from '@common/interfaces/ITask';
import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #303134;
  overflow: hidden;
  position: relative;

  &::before {
    display: block;
    height: 100%;
    width: 100%;
  }

  &.${ITaskStatus.TO_DO}::before {
    content: '';
    background: linear-gradient(90deg, #4f93ff, #1c3db3);

    background-size: 200% 200%;
    animation: gradient-flow 5s ease infinite;
  }

  &.${ITaskStatus.IN_PROGRESS}::before {
    content: '';
    background: linear-gradient(90deg, #3abf9a, #fbbf24);
    background-size: 200% 100%;
    animation:
      gradient-flow 5s ease infinite,
      gradient-slide 5s ease-in-out infinite;
  }

  &.${ITaskStatus.DONE}::before {
    content: '';
    background: #34d399;
    animation: gradient-flow 5s ease infinite;
  }

  @keyframes gradient-slide {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  @keyframes gradient-flow {
    0% {
      filter: hue-rotate(0deg);
    }
    50% {
      filter: hue-rotate(-15deg);
    }
    100% {
      filter: hue-rotate(0deg);
    }
  }
`;
