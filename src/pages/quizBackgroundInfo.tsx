import React, { ChangeEvent, useContext } from 'react';
import { AGE, GENDER } from '../constants/Types';
import { FlexForm } from '../components/FlexForm';
import { LinkButton } from '../components/LinkButton';
import { Question } from '../components/Question';
import { QuizInput } from '../components/QuizInput';
import { QuizRow } from '../components/QuizRow';
import AppLogo from '../components/AppLogo';
import Link from 'next/link';
import { LanguageContext, QuizContext } from 'src/Contexts';
import { State } from 'src/constants/State';
import translations from 'src/translations';
import { useAnalytics } from 'src/hooks/useAnalytics';
import { sendQuizAnswersToDatabase } from 'src/backend/backend';

const NEXT_PAGE = '/quizResults';

const QuizBackgroundInfo = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);
  const handlePostNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.postNumber = event.target.value;
    quizContext.setQuizState(clone);
  };

  const handleAgeOptionChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.age = event.target.value;
    quizContext.setQuizState(clone);
  };

  const handleGenderOptionChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const clone = JSON.parse(JSON.stringify(quizContext.quizState)) as State;
    clone.airQualityIndex.answers.gender = event.target.value;
    quizContext.setQuizState(clone);
  };

  const { trackEvent } = useAnalytics();

  const handleNextPageClick = () => {
    // Report to GA
    trackEvent({
      action: 'results',
      category: 'quiz',
      value: quizContext.quizState.airQualityIndex.value,
    });
    // Report to some database
    try {
      sendQuizAnswersToDatabase(quizContext.quizState.airQualityIndex.answers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AppLogo />
      <FlexForm>
        <QuizRow>
          <Question>{translations[lng]['quiz-bg-postnumber']}</Question>
        </QuizRow>
        <QuizRow>
          <QuizInput
            name="post-number"
            value={quizContext.quizState.airQualityIndex.answers.postNumber}
            onChange={handlePostNumberChange}
            pattern="[0-9]{5}"
            required
          />
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-bg-age']}</Question>
        </QuizRow>
        <QuizRow>
          <select
            name="age"
            value={quizContext.quizState.airQualityIndex.answers.age}
            onChange={handleAgeOptionChange}
          >
            <option value={AGE.NOT_SELECTED}>
              {translations[lng]['common-dont-want-to-tell']}
            </option>
            <option value={AGE.L10}>0-17</option>
            <option value={AGE.L20}>18-24</option>
            <option value={AGE.L30}>25-34</option>
            <option value={AGE.L40}>35-44</option>
            <option value={AGE.L50}>45-54</option>
            <option value={AGE.L60}>55-64</option>
            <option value={AGE.L70}>65+</option>
          </select>
        </QuizRow>
        <QuizRow>
          <Question>{translations[lng]['quiz-bg-gender']}</Question>
        </QuizRow>
        <QuizRow>
          <select
            name="gender"
            value={quizContext.quizState.airQualityIndex.answers.gender}
            onChange={handleGenderOptionChange}
          >
            <option value={GENDER.NOT_SELECTED}>
              {translations[lng]['common-dont-want-to-tell']}
            </option>
            <option value={GENDER.FEMALE}>
              {translations[lng]['quiz-bg-gender-female']}
            </option>
            <option value={GENDER.MALE}>
              {translations[lng]['quiz-bg-gender-male']}
            </option>
            <option value={GENDER.OTHER}>
              {translations[lng]['quiz-bg-gender-other']}
            </option>
          </select>
        </QuizRow>
        <br />
        <QuizRow>
          <Link href={NEXT_PAGE} passHref>
            <LinkButton onClick={handleNextPageClick}>
              {translations[lng]['common-continue']}
            </LinkButton>
          </Link>
        </QuizRow>
      </FlexForm>
    </div>
  );
};

export default QuizBackgroundInfo;
