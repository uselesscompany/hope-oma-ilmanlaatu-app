import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { LinkButton } from '../components/LinkButton';
import { PagePhoto } from '../components/PagePhoto';
import { PageHeader } from '../components/PageHeader';
import { PageBody } from '../components/PageBody';
import AppLogo, { OverlapDiv } from '../components/AppLogo';
import { FlexColumn } from '../components/Flex';
import Funding from '../components/Funding';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

const Intro = (): JSX.Element => {
  const lng = useContext(LanguageContext);
  useEffect(() => {
    localStorage.setItem('alreadyVisited', 'true');
  }, []);
  return (
    <FlexColumn>
      <OverlapDiv>
        <AppLogo inline />
        <PagePhoto src="/photo1.jpg" alt="Helsinki" width="2480" height="800" />
      </OverlapDiv>
      <PageHeader inline>{translations[lng]['intro-1-header']}</PageHeader>
      <PageBody>{translations[lng]['intro-1-body']}</PageBody>
      <Link href="/intro2" passHref>
        <LinkButton>{translations[lng]['intro-1-button']}</LinkButton>
      </Link>
      <hr style={{ width: '100%' }} />
      <Funding />
    </FlexColumn>
  );
};

export default Intro;
