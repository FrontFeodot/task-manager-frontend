import { MOBILE, TABLET } from '@common/utils/mediaHelper';
import { Text, TextInline } from '@components/text/TextCommon.styled';
import styled, { DefaultTheme } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: fit-content;
  min-height: 100%;

  padding-bottom: 80px;
  background: linear-gradient(315deg, #000000 15%, #9b51e0 135%);
`;

export const TitleSection = styled.div`
  ${(props) => props.theme.flexbox};
  flex-direction: column;
  width: 100%;
  height: 30%;
  min-height: 400px;

  @media (${MOBILE}) {
    min-height: 320px;
  }
`;

export const MainTitle = styled(Text)`
  ${(props) => props.theme.flexbox};
  flex-direction: column;
  width: 100%;

  font-size: ${(props) => props.theme.fontH1};
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontH2};
  }
`;

export const MainSubTitle = styled(Text)`
  ${(props) => props.theme.flexbox};

  width: 100%;

  font-size: ${(props) => props.theme.fontH2};
  color: ${(props) => props.theme.textPrimary};

  @media (${TABLET}) {
    text-align: center;
  }

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontH3};
  }
`;

export const DescriptionWrapper = styled.div`
  width: 60%;
  height: auto;

  padding: 24px;
  margin: 24px 0;
  border-radius: 20px;
  background-color: ${(props) => props.theme.bgPrimary};

  @media (${TABLET}) {
    width: 90%;
  }
`;

export const DescriptionText = styled(Text)`
  color: ${(props) => props.theme.textPrimary};
  font-size: ${(props) => props.theme.fontXXL};

  @media (${MOBILE}) {
    font-size: ${(props) => props.theme.fontXL};
  }
`;

export const ImageWrapper = styled.img`
  width: 100%;
  margin: 16px 0;
`;

const getRegisterLinkStyles = (theme: DefaultTheme) => `
  color: ${theme.link};
  cursor: pointer;
`;

export const RegisterLink = styled(TextInline)<{ $isLoggedIn?: boolean }>`
  ${({ $isLoggedIn, theme }) =>
    !$isLoggedIn ? getRegisterLinkStyles(theme) : ''};
`;
