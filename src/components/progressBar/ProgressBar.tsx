import { parseValueToClassName } from '@common/helpers/appHelper';
import * as S from './ProgressBar.styled';
import { IProgressBar } from './ProgressBar.types';

const ProgressBar = ({ status }: IProgressBar): JSX.Element => {
  return (
    <S.ProgressBarContainer className={`${parseValueToClassName(status)}`} />
  );
};

export default ProgressBar;
