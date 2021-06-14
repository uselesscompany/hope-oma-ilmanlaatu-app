import React, { useContext } from 'react';
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

const Intro2 = (): JSX.Element => {
  const lng = useContext(LanguageContext);
  return (
    <FlexColumn>
      <OverlapDiv>
        <AppLogo inline />
        <PagePhoto src="/photo2.jpg" alt="Helsinki" width="2480" height="800" />
      </OverlapDiv>
      <PageHeader inline>{translations[lng]['intro-2-header']}</PageHeader>
      <PageBody>{translations[lng]['intro-2-body']}</PageBody>
      <Link href="/intro3" passHref>
        <LinkButton>{translations[lng]['common-next']}</LinkButton>
      </Link>
      <hr style={{ width: '100%' }} />
      <Funding />
    </FlexColumn>
  );
};

export default Intro2;
