import React, { ChangeEvent, useContext } from 'react';
import Meter from '../components/Meter';
import RadioButton from '../components/RadioButton';
import { FlexForm } from '../components/FlexForm';
import { LinkButton } from '../components/LinkButton';
import { Question } from '../components/Question';
import { QuizRow } from '../components/QuizRow';
import AppLogo from '../components/AppLogo';
import Link from 'next/link';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import translations from 'src/translations';

const NEXT_PAGE = '/quizBackgroundInfo';

const QuizLifeChoices = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);
  const handleAvoidRushHoursOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.avoidRushHours =
      event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handlePreferPublicTransportationOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.preferPublicTransportation =
      event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handleWorkRemoteOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.workRemote = event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-lc-jam']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="avoid-rush-hours"
            value="true"
            check={
              quizContext.quizState.airQualityIndex.answers.avoidRushHours ===
              true
            }
            onChange={handleAvoidRushHoursOptionChange}
            label={translations[lng]['common-yes']}
          />
          <RadioButton
            id="avoid-rush-hours"
            value="false"
            check={
              quizContext.quizState.airQualityIndex.answers.avoidRushHours ===
              false
            }
            onChange={handleAvoidRushHoursOptionChange}
            label={translations[lng]['common-no-i-dont']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-lc-walking']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="prefer-public-transportation"
            value="true"
            check={
              quizContext.quizState.airQualityIndex.answers
                .preferPublicTransportation === true
            }
            onChange={handlePreferPublicTransportationOptionChange}
            label={translations[lng]['common-yes']}
          />
          <RadioButton
            id="prefer-public-transportation"
            value="false"
            check={
              quizContext.quizState.airQualityIndex.answers
                .preferPublicTransportation === false
            }
            onChange={handlePreferPublicTransportationOptionChange}
            label={translations[lng]['common-no-i-dont']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-lc-remote']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="work-remote"
            value="true"
            check={
              quizContext.quizState.airQualityIndex.answers.workRemote === true
            }
            onChange={handleWorkRemoteOptionChange}
            label={translations[lng]['common-yes']}
          />
          <RadioButton
            id="work-remote"
            value="false"
            check={
              quizContext.quizState.airQualityIndex.answers.workRemote === false
            }
            onChange={handleWorkRemoteOptionChange}
            label={translations[lng]['common-no-i-dont']}
          />
        </QuizRow>
        <QuizRow>
          <Meter value={quizContext.quizState.airQualityIndex.value} />
        </QuizRow>
        <QuizRow>
          <Link href={NEXT_PAGE} passHref>
            <LinkButton>{translations[lng]['common-continue']}</LinkButton>
          </Link>
        </QuizRow>
      </FlexForm>
    </div>
  );
};

export default QuizLifeChoices;
