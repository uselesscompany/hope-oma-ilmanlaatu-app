import React, { useContext } from 'react';
import Link from 'next/link';
import Meter from '../components/Meter';
import { LinkButton } from '../components/LinkButton';
import { QuizRow } from '../components/QuizRow';
import { FlexDiv } from '../components/FlexDiv';
import { PagePhoto } from '../components/PagePhoto';
import { PageHeader } from '../components/PageHeader';
import { PageBody } from '../components/PageBody';
import AppLogo, { OverlapDiv } from '../components/AppLogo';
import { LanguageContext, QuizContext } from 'src/Contexts';
import translations from 'src/translations';
import { getDetailedAirQualityIndex } from 'src/constants/Quiz';
import { FlexColumn } from 'src/components/Flex';
import styles from '../styles/quizResults.module.css';

const QuizLifeChoices = (): JSX.Element => {
  const quizContext = useContext(QuizContext);
  const lng = useContext(LanguageContext);

  const resultString = (value: number): string => {
    if (value < 50) return translations[lng]['quiz-result-1'];
    if (value < 75) return translations[lng]['quiz-result-2'];
    if (value < 90) return translations[lng]['quiz-result-3'];
    return translations[lng]['quiz-result-4'];
  };

  const resultDescriptionString = (value: number): string => {
    if (value < 50) return translations[lng]['quiz-result-description-1'];
    if (value < 75) return translations[lng]['quiz-result-description-2'];
    if (value < 90) return translations[lng]['quiz-result-description-3'];
    return translations[lng]['quiz-result-description-4'];
  };

  const sortedDetailedAirQualityIndex = (): {
    key: string;
    value: number;
  }[] => {
    const detailed = getDetailedAirQualityIndex(
      quizContext.quizState.airQualityIndex.answers
    );
    return (
      Object.keys(detailed)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .sort((a, b) => (detailed[a] > detailed[b] ? -1 : 1))
        .map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return { key: key, value: detailed[key] };
        })
    );
  };

  const getTitleForKey = (key: string): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translations[lng]['quiz-result-' + key + '-title'];
  };

  const getLevel = (key: string, value: number): number => {
    return Math.floor(((key === 'sustainable' ? 2 * value : value) + 10) / 20);
  };

  // Get's the description text, for example 'quiz-result-fireplace-description-level-0'
  const getDescriptionForValue = (key: string, value: number): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translations[lng][
      'quiz-result-' + key + '-description-level-' + getLevel(key, value)
    ];
  };

  return (
    <FlexDiv>
      <OverlapDiv>
        <AppLogo inline />
        <PagePhoto src="/photo2.jpg" alt="Helsinki" width="2480" height="800" />
      </OverlapDiv>
      <QuizRow>
        <PageHeader inline>
          {resultString(quizContext.quizState.airQualityIndex.value)}
        </PageHeader>
      </QuizRow>
      <QuizRow>
        <PageBody>
          {resultDescriptionString(quizContext.quizState.airQualityIndex.value)}
        </PageBody>
      </QuizRow>
      <QuizRow>
        <Meter value={quizContext.quizState.airQualityIndex.value} />
      </QuizRow>
      <QuizRow>
        <FlexColumn>
          <hr className={styles.hr} />
          {sortedDetailedAirQualityIndex().map((entry) => (
            <React.Fragment key={entry.key}>
              <FlexColumn>
                <div className={styles.actionHeaderContainer}>
                  <div></div>
                  <h2 className={styles.actionTitle}>
                    {getTitleForKey(entry.key)}
                  </h2>
                  <div>
                    {getLevel(entry.key, entry.value) !== 0 ? (
                      getLevel(entry.key, entry.value) !== 1 ? (
                        <img
                          src="/noun_confused_2972824.svg"
                          alt="Negative icon"
                        />
                      ) : (
                        <img
                          src="/noun_sceptic_2972842.svg"
                          alt="Neutral icon"
                        />
                      )
                    ) : (
                      <img src="/noun_Happy_2693990.svg" alt="Positive icon" />
                    )}
                  </div>
                </div>
                <p className={styles.feedbackText}>
                  {getDescriptionForValue(entry.key, entry.value)}
                </p>
                <Link href={`/actions/${encodeURIComponent(entry.key)}`}>
                  <a className={styles.actionLink}>
                    {translations[lng]['quiz-result-tips']}
                  </a>
                </Link>
              </FlexColumn>
              <hr className={styles.hr} />
            </React.Fragment>
          ))}
        </FlexColumn>
      </QuizRow>
      <br />
      <QuizRow>
        <Link href="/" passHref>
          <LinkButton>{translations[lng]['common-frontpage']}</LinkButton>
        </Link>
      </QuizRow>
      <QuizRow>
        <Link href="/quizIntro">
          <LinkButton negative>{translations[lng]['quiz-return']}</LinkButton>
        </Link>
      </QuizRow>
    </FlexDiv>
  );
};

export default QuizLifeChoices;
