import styled from 'styled-components';

export const Form = styled.form`
  ${(props) => props.theme.flexbox};
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 30px;
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.p`
  padding: 10px 0;
`;

export const ErrorTooltip = styled.div<{ isGlobal?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.errorBg}; /* Вторичный фон */
  color: ${({ theme }) => theme.errorText}; /* Акцентный цвет текста */
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  font-size: 14px;
  white-space: nowrap;
  width: ${({ isGlobal }) => (isGlobal ? '100%' : 'auto')};

  & p {
    color: ${({ theme }) => theme.errorText}; /* Акцентный цвет текста */
  }
  /* Анимация появления */
  opacity: 1;
  transform: translateY(10px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  /* Активный стиль */
  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Стрелка для тултипа */
`;
