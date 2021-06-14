import React, { ReactNode, useContext } from 'react';
import Link from 'next/link';
import { FlexColumn, FlexRow } from '../components/Flex';
import styles from './buttons.module.css';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

const ButtonsDiv = (props: { children: ReactNode }): JSX.Element => (
  <div className={styles.buttonsDiv}>{props.children}</div>
);

interface StyledLinkProps {
  children: ReactNode;
}

const StyledLinkContainer = (props: StyledLinkProps): JSX.Element => (
  <div className={styles.styledLink}>{props.children}</div>
);

interface RoundImgButtonProps {
  children: ReactNode;
}

const RoundImgButton = (props: RoundImgButtonProps): JSX.Element => (
  <button className={styles.roundImgButton}>{props.children}</button>
);

function Buttons(): JSX.Element {
  const lng = useContext(LanguageContext);
  return (
    <ButtonsDiv>
      <FlexColumn>
        <FlexRow>
          <Link href="/quizIntro">
            <a>
              <StyledLinkContainer>
                <RoundImgButton>
                  <img src="/noun_test_2974484.svg" alt="Quiz icon" />
                </RoundImgButton>
                <p>{translations[lng]['buttons-quiz']}</p>
              </StyledLinkContainer>
            </a>
          </Link>
          <Link href="/actions">
            <a>
              <StyledLinkContainer>
                <RoundImgButton>
                  <img src="/noun_Warning_3049314.svg" alt="Actions icon" />
                </RoundImgButton>
                <p>{translations[lng]['buttons-actions']}</p>
              </StyledLinkContainer>
            </a>
          </Link>
        </FlexRow>
      </FlexColumn>
    </ButtonsDiv>
  );
}

export default Buttons;
