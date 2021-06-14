import React, { ChangeEvent, MouseEvent, useContext } from 'react';
import Meter from '../components/Meter';
import { FlexForm } from '../components/FlexForm';
import { Question } from '../components/Question';
import { LinkButton } from '../components/LinkButton';
import { QuizInput } from '../components/QuizInput';
import { QuizRow } from '../components/QuizRow';
import AppLogo from '../components/AppLogo';
import Link from 'next/link';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import translations from 'src/translations';

const NEXT_PAGE = '/quizLifeChoices';

const DEFAULT_CAR_RANGE = 175;

const QuizTravel = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);

  const handleCarRangeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.rangePerWeek = Math.min(
      999,
      Math.max(0, parseInt(event.target.value) || 0)
    );
    quizContext.setQuizState(clone);
  };

  const handleDefaultButtonClicked = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.rangePerWeek = DEFAULT_CAR_RANGE;
    quizContext.setQuizState(clone);
  };

  const handlePassengerCountChanged = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.passengers = Math.min(
      99,
      Math.max(0, parseInt(event.target.value) || 0)
    );
    quizContext.setQuizState(clone);
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-travel-car']}</Question>
        </QuizRow>
        <QuizRow>
          <LinkButton onClick={handleDefaultButtonClicked} small>
            {translations[lng]['quiz-travel-car-default']}
          </LinkButton>
        </QuizRow>
        <QuizRow>
          <div>
            <QuizInput
              value={
                quizContext.quizState.airQualityIndex.answers.car.rangePerWeek
              }
              onChange={handleCarRangeChange}
              small
            />
            <QuizInput
              type="range"
              min="0"
              max="999"
              value={
                quizContext.quizState.airQualityIndex.answers.car.rangePerWeek
              }
              onChange={handleCarRangeChange}
              id="car-range"
            />
          </div>
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-travel-passengers']}</Question>
        </QuizRow>
        <QuizRow>
          <QuizInput
            name="passenger-count"
            value={quizContext.quizState.airQualityIndex.answers.car.passengers}
            onChange={handlePassengerCountChanged}
            required
            pattern="[1-9]{1}"
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

export default QuizTravel;
