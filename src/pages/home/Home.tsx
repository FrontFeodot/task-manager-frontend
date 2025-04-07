import { useNavigate } from 'react-router-dom';

import { useUserState } from '@common/providers/userProvider/useUserState';

import * as S from './Home.styled';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const isLoggedIn = useUserState((s) => s.isLoggedIn);

  const clickHandler = (): void => {
    if (isLoggedIn) return;

    return navigate('/registration');
  };
  return (
    <S.Wrapper>
      <S.TitleSection>
        <S.MainTitle>Welcome!</S.MainTitle>
        <S.MainSubTitle>To the Task Manager</S.MainSubTitle>
      </S.TitleSection>
      <S.DescriptionWrapper>
        <S.DescriptionText>
          This application will help you to manage your tasks and goals simply
          and comfortable.
        </S.DescriptionText>
        <br />
        <S.DescriptionText>
          You can use default layout with weekly planer:
        </S.DescriptionText>
        <S.ImageWrapper src="/images/boardExample.png" alt="weekly_planer" />
      </S.DescriptionWrapper>
      <S.DescriptionWrapper>
        <S.DescriptionText>Or just create you own workspace:</S.DescriptionText>
        <S.ImageWrapper
          src="/images/customBoardExample.png"
          alt="my_workspace"
        />
      </S.DescriptionWrapper>
      {!isLoggedIn ? (
        <S.DescriptionWrapper>
          <S.DescriptionText>
            Just try! Complete a simple
            <S.RegisterLink onClick={clickHandler} $isLoggedIn={isLoggedIn}>
              &nbsp;registration&nbsp;
            </S.RegisterLink>
            and start manage your tasks!
          </S.DescriptionText>
        </S.DescriptionWrapper>
      ) : null}
    </S.Wrapper>
  );
};

export default Home;
