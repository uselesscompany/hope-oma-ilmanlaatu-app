import React, { useContext } from 'react';
import Link from 'next/link';
import { LinkButton } from '../components/LinkButton';
import { FlexDiv } from '../components/FlexDiv';
import { QuizRow } from '../components/QuizRow';
import { PageHeader } from '../components/PageHeader';
import { PageBody } from '../components/PageBody';
import AppLogo from '../components/AppLogo';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { DEFAULT } from 'src/constants/State';
import translations from 'src/translations';

const QuizIntro = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);
  const handleCancelClicked = () => {
    quizContext.setQuizState(DEFAULT);
  };
  return (
    <FlexDiv>
      <AppLogo />
      <QuizRow>
        <PageHeader>{translations[lng]['quiz-intro-header']}</PageHeader>
      </QuizRow>
      <QuizRow>
        <PageBody>
          {translations[lng]['quiz-intro-body-1']}
          <br />
          {translations[lng]['quiz-intro-body-2-pre']}{' '}
          <em>{translations[lng]['quiz-intro-body-2-em']}</em>
          {translations[lng]['quiz-intro-body-2-post']}
        </PageBody>
      </QuizRow>
      <QuizRow>
        <Link href="/quizBasic" passHref>
          <LinkButton>{translations[lng]['common-continue']}</LinkButton>
        </Link>
      </QuizRow>
      <QuizRow>
        <LinkButton negative onClick={handleCancelClicked}>
          {translations[lng]['quiz-intro-clear-answers']}
        </LinkButton>
      </QuizRow>
    </FlexDiv>
  );
};

export default QuizIntro;
