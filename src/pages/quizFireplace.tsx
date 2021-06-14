import React, { ChangeEvent, useContext } from 'react';
import Meter from '../components/Meter';
import RadioButton from '../components/RadioButton';
import { FIREPLACE_TRASH_TYPE } from '../constants/Types';
import { FlexForm } from '../components/FlexForm';
import { Question } from '../components/Question';
import { LinkButton } from '../components/LinkButton';
import { QuizRow } from '../components/QuizRow';
import AppLogo from '../components/AppLogo';
import Link from 'next/link';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import translations from 'src/translations';
import { SMOKE_COLOR } from 'src/constants/Quiz';

const NEXT_PAGE = '/quizTravel';

const QuizFireplace = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);

  const handleFuelDryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.fireplace.fuelDry =
      event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handleCleaningCountChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.fireplace.yearlyCleaning =
      event.target.value === 'true';
    quizContext.setQuizState(clone);
  };

  const handleTrashChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    let newTrashArray: FIREPLACE_TRASH_TYPE[] = [
      ...quizContext.quizState.airQualityIndex.answers.fireplace.trash,
    ];

    if (
      newTrashArray.some(
        (value) =>
          value ===
          FIREPLACE_TRASH_TYPE[
            event.target.value as keyof typeof FIREPLACE_TRASH_TYPE
          ]
      )
    ) {
      newTrashArray = newTrashArray.filter(
        (val) =>
          val !==
          FIREPLACE_TRASH_TYPE[
            event.target.value as keyof typeof FIREPLACE_TRASH_TYPE
          ]
      );
    } else {
      newTrashArray.push(
        FIREPLACE_TRASH_TYPE[
          event.target.value as keyof typeof FIREPLACE_TRASH_TYPE
        ]
      );
    }
    clone.airQualityIndex.answers.fireplace.trash = newTrashArray;
    quizContext.setQuizState(clone);
  };

  const handleSmokeColorChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.fireplace.smoke =
      SMOKE_COLOR[event.target.value as keyof typeof SMOKE_COLOR];
    quizContext.setQuizState(clone);
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-fireplace-dry']}</Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="fireplace-fuel-dry"
            value={'true'}
            check={
              quizContext.quizState.airQualityIndex.answers.fireplace
                .fuelDry === true
            }
            onChange={handleFuelDryChange}
            label={translations[lng]['quiz-fireplace-dry-always']}
          />
          <RadioButton
            id="fireplace-fuel-dry"
            value={'false'}
            check={
              !quizContext.quizState.airQualityIndex.answers.fireplace.fuelDry
            }
            onChange={handleFuelDryChange}
            label={translations[lng]['quiz-fireplace-dry-often']}
          />
        </QuizRow>
        <QuizRow>
          <Question>
            {translations[lng]['quiz-fireplace-chimney-cleaner']}
          </Question>
        </QuizRow>
        <QuizRow>
          <RadioButton
            id="fireplace-cleaning-count"
            value={'true'}
            check={
              quizContext.quizState.airQualityIndex.answers.fireplace
                .yearlyCleaning === true
            }
            onChange={handleCleaningCountChange}
            label={translations[lng]['quiz-fireplace-chimney-cleaner-once']}
          />
          <RadioButton
            id="fireplace-cleaning-count"
            value={'false'}
            check={
              quizContext.quizState.airQualityIndex.answers.fireplace
                .yearlyCleaning === false
            }
            onChange={handleCleaningCountChange}
            label={translations[lng]['quiz-fireplace-chimney-cleaner-less']}
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-fireplace-trash']}</Question>
        </QuizRow>
        <QuizRow>
          {(
            Object.keys(
              FIREPLACE_TRASH_TYPE
            ) as (keyof typeof FIREPLACE_TRASH_TYPE)[]
          ).map((trash, i) => (
            <RadioButton
              key={i}
              id="fireplace-trash"
              value={trash.toString()}
              check={quizContext.quizState.airQualityIndex.answers.fireplace.trash.includes(
                FIREPLACE_TRASH_TYPE[trash]
              )}
              onChange={handleTrashChange}
              label={
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                translations[lng][
                  'quiz-fireplace-trash-' + FIREPLACE_TRASH_TYPE[trash]
                ]
              }
              checkbox={true}
              required={false}
            />
          ))}
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-fireplace-smoke']}</Question>
        </QuizRow>
        <QuizRow>
          {(Object.keys(SMOKE_COLOR) as (keyof typeof SMOKE_COLOR)[]).map(
            (color, i) => (
              <RadioButton
                key={i}
                id="fireplace-smoke"
                value={color}
                check={
                  quizContext.quizState.airQualityIndex.answers.fireplace
                    .smoke === SMOKE_COLOR[color as keyof typeof SMOKE_COLOR]
                }
                onChange={handleSmokeColorChange}
                label={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  translations[lng][
                    'quiz-fireplace-smoke-' + SMOKE_COLOR[color]
                  ]
                }
                checkbox={true}
                required={false}
              />
            )
          )}
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

export default QuizFireplace;
