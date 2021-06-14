import React, { ChangeEvent, useContext } from 'react';
import Meter from '../components/Meter';
import RadioButton from '../components/RadioButton';
import { ELECTRICITY } from '../constants/Types';
import { FlexForm } from '../components/FlexForm';
import { QuizRow } from '../components/QuizRow';
import { Question } from '../components/Question';
import { LinkButton } from '../components/LinkButton';
import AppLogo from '../components/AppLogo';
import { QuizContext, LanguageContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import Link from 'next/link';
import translations from 'src/translations';
import { FIREPLACE_USAGE } from 'src/constants/Quiz';

const QuizBasic = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);

  const handleCarOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.car.owned = event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handleFireplaceOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.fireplace.usage = event.target
      .value as FIREPLACE_USAGE;
    quizContext.setQuizState(clone);
  };

  const handleElectricityOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.electricity = event.target.value;
    quizContext.setQuizState(clone);
  };

  const getNextPage = (): string => {
    return quizContext.quizState.airQualityIndex.answers.car.owned
      ? '/quizCar'
      : quizContext.quizState.airQualityIndex.answers.fireplace.usage !==
        FIREPLACE_USAGE.NONE
      ? '/quizFireplace'
      : '/quizTravel';
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-basic-car']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="car-input"
            value="true"
            check={
              quizContext.quizState.airQualityIndex.answers.car.owned === true
            }
            onChange={handleCarOptionChange}
            label={translations[lng]['common-yes']}
          />
          <RadioButton
            id="car-input"
            value="false"
            check={
              quizContext.quizState.airQualityIndex.answers.car.owned === false
            }
            onChange={handleCarOptionChange}
            label={translations[lng]['common-no-i-dont']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-basic-fireplace']}</Question>
        </QuizRow>
        <QuizRow>
          {(
            Object.keys(FIREPLACE_USAGE) as (keyof typeof FIREPLACE_USAGE)[]
          ).map((usage) => (
            <RadioButton
              id="fireplace-input"
              key={usage}
              value={FIREPLACE_USAGE[usage as keyof typeof FIREPLACE_USAGE]}
              check={
                quizContext.quizState.airQualityIndex.answers.fireplace
                  .usage ===
                FIREPLACE_USAGE[usage as keyof typeof FIREPLACE_USAGE]
              }
              onChange={handleFireplaceOptionChange}
              label={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                translations[lng][
                  'quiz-basic-fireplace-usage-' + FIREPLACE_USAGE[usage]
                ]
              }
            />
          ))}
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-basic-electricity']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="electricity-type"
            value={ELECTRICITY.RENEWABLE}
            check={
              quizContext.quizState.airQualityIndex.answers.electricity ===
              ELECTRICITY.RENEWABLE
            }
            onChange={handleElectricityOptionChange}
            label={translations[lng]['quiz-basic-electricity-renewable']}
          />
          <RadioButton
            id="electricity-type"
            value={ELECTRICITY.NUCLEAR}
            check={
              quizContext.quizState.airQualityIndex.answers.electricity ===
              ELECTRICITY.NUCLEAR
            }
            onChange={handleElectricityOptionChange}
            label={translations[lng]['quiz-basic-electricity-nuclear']}
          />
          <RadioButton
            id="electricity-type"
            value={ELECTRICITY.MIXED}
            check={
              quizContext.quizState.airQualityIndex.answers.electricity ===
              ELECTRICITY.MIXED
            }
            onChange={handleElectricityOptionChange}
            label={translations[lng]['quiz-basic-electricity-mixed']}
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

export default QuizBasic;
