import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';
import Link from 'next/link';
import { PagePhoto } from '../components/PagePhoto';
import { PageHeader } from '../components/PageHeader';
import Buttons from '../components/Buttons';
import Partners from '../components/Partners';
import Funding from '../components/Funding';
import { FlexColumn } from '../components/Flex';
import AppLogo, { OverlapDiv } from '../components/AppLogo';
import { PageBody } from '../components/PageBody';

const LandingPage = (): JSX.Element => {
  const lng = useContext(LanguageContext);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('alreadyVisited')) {
      router.push('/intro');
    }
  }, []);
  return (
    <FlexColumn>
      <OverlapDiv>
        <AppLogo inline />
        <PagePhoto src="/photo4.jpg" alt="Helsinki" width="2480" height="800" />
      </OverlapDiv>
      <div>
        <p>{translations[lng]['index-list-1']}</p>
        <p>{translations[lng]['index-list-2']}</p>
      </div>
      <Buttons />
      <hr style={{ width: '100%' }} />
      <PageHeader>{translations[lng]['index-header']}</PageHeader>
      <PageBody>
        {translations[lng]['index-body-1-pre']}{' '}
        <a href="https://ilmanlaatu.eu/" style={{ color: '#58b998' }}>
          {translations[lng]['index-body-1-link']}
        </a>{' '}
        {translations[lng]['index-body-1-post']}
      </PageBody>
      <hr style={{ width: '100%' }} />
      <Funding />
      <Partners />
      <p>
        {translations[lng]['index-footer-pre']}{' '}
        <a href="https://useless.fi">
          {translations[lng]['index-footer-link']}
        </a>
        .
        <br />(
        <Link href="/attributions">
          <a>{translations[lng]['index-attributions']}</a>
        </Link>
        )
      </p>
    </FlexColumn>
  );
};

export default LandingPage;
