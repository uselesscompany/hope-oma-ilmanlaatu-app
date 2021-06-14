import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import styles from '../styles/app.module.css';
import { LanguageContext, QuizContext } from 'src/Contexts';
import translations, { Languages } from 'src/translations';
import { DEFAULT, State } from 'src/constants/State';
import { getAirQualityIndex } from 'src/constants/Quiz';
import { useAnalytics } from 'src/hooks/useAnalytics';
import { Router } from 'next/router';
import * as Sentry from '@sentry/browser';

const SENTRY_DSN = 'YOUR_SENTRY_DSN';
const GOOGLE_ANALYTICS_ID = 'YOUR_GA_ID';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

export function App({ Component, pageProps }: AppProps): JSX.Element {
  const defaultLanguage = Languages.en;
  const [lng, setLng] = useState(defaultLanguage);
  const [quizState, setQuizState] = useState<State>(DEFAULT);
  const { initAnalytics, trackPageViewed } = useAnalytics();

  useEffect(() => {
    const userLanguage = localStorage.getItem('language');
    if (userLanguage) {
      if (userLanguage === 'fi') {
        setLng(userLanguage === 'fi' ? Languages.fi : Languages.en);
      }
    } else if (
      process.browser &&
      (navigator.language.toLocaleLowerCase() === 'fi' ||
        navigator.language.toLocaleLowerCase() === 'fi-fi')
    ) {
      setLng(Languages.fi);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    setQuizState(savedState ? JSON.parse(savedState) : DEFAULT);
  }, []);

  const handleRouteChangeComplete = () => {
    trackPageViewed();
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initAnalytics(GOOGLE_ANALYTICS_ID);
    }
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    trackPageViewed();
  }, []);

  const handleSetLng = (newLanguage: Languages): void => {
    localStorage.setItem('language', newLanguage);
    setLng(newLanguage);
  };

  const calculateValueForNewQuizState = (newQuizState: State): State => {
    const clone = JSON.parse(JSON.stringify(newQuizState)) as State;
    clone.airQualityIndex.value = getAirQualityIndex(
      newQuizState.airQualityIndex.answers
    );
    return clone;
  };

  return (
    <>
      <Head>
        <title>{translations[lng]['title']}</title>
      </Head>
      <LanguageContext.Provider value={lng}>
        <QuizContext.Provider
          value={{
            quizState: quizState,
            setQuizState: (newQuizState) => {
              const state = calculateValueForNewQuizState(newQuizState);
              localStorage.setItem('quizState', JSON.stringify(state));
              setQuizState(state);
            },
          }}
        >
          <div id="root" className={styles.app}>
            <div className={styles.languageContainer}>
              {lng === Languages.fi ? (
                <button onClick={() => handleSetLng(Languages.en)}>
                  {translations[lng]['english']}
                </button>
              ) : (
                <button onClick={() => handleSetLng(Languages.fi)}>
                  {translations[lng]['finnish']}
                </button>
              )}
            </div>
            <Component {...pageProps} />
          </div>
        </QuizContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
