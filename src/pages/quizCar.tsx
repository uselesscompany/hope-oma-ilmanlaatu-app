import React, { ChangeEvent, useContext } from 'react';
import Meter from '../components/Meter';
import RadioButton from '../components/RadioButton';
import { CAR_FUEL, CAR_AGE } from '../constants/Types';
import { FlexForm } from '../components/FlexForm';
import { QuizRow } from '../components/QuizRow';
import { Question } from '../components/Question';
import { LinkButton } from '../components/LinkButton';
import AppLogo from '../components/AppLogo';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import Link from 'next/link';
import translations from 'src/translations';
import { FIREPLACE_USAGE } from 'src/constants/Quiz';

const QuizCar = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);

  const handleCarYearChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.year = event.target.value;
    quizContext.setQuizState(clone);
  };

  const handleFrictionTiresOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.frictionTires =
      event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handleEngineTypeOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.engineType = event.target.value;
    quizContext.setQuizState(clone);
  };

  const getNextPage = (): string => {
    return quizContext.quizState.airQualityIndex.answers.fireplace.usage !==
      FIREPLACE_USAGE.NONE
      ? '/quizFireplace'
      : '/quizTravel';
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-car-age']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="car-year"
            value={CAR_AGE.NEW}
            check={
              quizContext.quizState.airQualityIndex.answers.car.year ===
              CAR_AGE.NEW
            }
            onChange={handleCarYearChange}
            label={translations[lng]['quiz-car-age-new']}
          />
          <RadioButton
            id="car-year"
            value={CAR_AGE.SEMI_NEW}
            check={
              quizContext.quizState.airQualityIndex.answers.car.year ===
              CAR_AGE.SEMI_NEW
            }
            onChange={handleCarYearChange}
            label={translations[lng]['quiz-car-age-semi-new']}
          />
          <RadioButton
            id="car-year"
            value={CAR_AGE.SEMI_OLD}
            check={
              quizContext.quizState.airQualityIndex.answers.car.year ===
              CAR_AGE.SEMI_OLD
            }
            onChange={handleCarYearChange}
            label={translations[lng]['quiz-car-age-semi-old']}
          />
          <RadioButton
            id="car-year"
            value={CAR_AGE.OLD}
            check={
              quizContext.quizState.airQualityIndex.answers.car.year ===
              CAR_AGE.OLD
            }
            onChange={handleCarYearChange}
            label={translations[lng]['quiz-car-age-old']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-car-friction-tires']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="friction-tire"
            value="true"
            check={
              quizContext.quizState.airQualityIndex.answers.car
                .frictionTires === true
            }
            onChange={handleFrictionTiresOptionChange}
            label={translations[lng]['common-yes']}
          />
          <RadioButton
            id="friction-tire"
            value="false"
            check={
              quizContext.quizState.airQualityIndex.answers.car
                .frictionTires === false
            }
            onChange={handleFrictionTiresOptionChange}
            label={translations[lng]['common-no-i-dont']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-car-engine']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="engine-type"
            value={CAR_FUEL.ELECTRIC}
            check={
              quizContext.quizState.airQualityIndex.answers.car.engineType ===
              CAR_FUEL.ELECTRIC
            }
            onChange={handleEngineTypeOptionChange}
            label={translations[lng]['quiz-car-engine-electric']}
          />
          <RadioButton
            id="engine-type"
            value={CAR_FUEL.GAS}
            check={
              quizContext.quizState.airQualityIndex.answers.car.engineType ===
              CAR_FUEL.GAS
            }
            onChange={handleEngineTypeOptionChange}
            label={translations[lng]['quiz-car-engine-gas']}
          />
          <RadioButton
            id="engine-type"
            value={CAR_FUEL.HYBRID}
            check={
              quizContext.quizState.airQualityIndex.answers.car.engineType ===
              CAR_FUEL.HYBRID
            }
            onChange={handleEngineTypeOptionChange}
            label={translations[lng]['quiz-car-engine-hybrid']}
          />
          <RadioButton
            id="engine-type"
            value={CAR_FUEL.PETROL}
            check={
              quizContext.quizState.airQualityIndex.answers.car.engineType ===
              CAR_FUEL.PETROL
            }
            onChange={handleEngineTypeOptionChange}
            label={translations[lng]['quiz-car-engine-petrol']}
          />
          <RadioButton
            id="engine-type"
            value={CAR_FUEL.DIESEL}
            check={
              quizContext.quizState.airQualityIndex.answers.car.engineType ===
              CAR_FUEL.DIESEL
            }
            onChange={handleEngineTypeOptionChange}
            label={translations[lng]['quiz-car-engine-diesel']}
          />
        </QuizRow>
        <QuizRow>
          <Meter value={quizContext.quizState.airQualityIndex.value} />
        </QuizRow>
        <QuizRow>
          <Link href={getNextPage()} passHref>
            <LinkButton>{translations[lng]['common-continue']}</LinkButton>
          </Link>
        </QuizRow>
      </FlexForm>
    </div>
  );
};

export default QuizCar;
