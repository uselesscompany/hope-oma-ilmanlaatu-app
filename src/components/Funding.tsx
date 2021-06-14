import React, { useContext } from 'react';
import styles from './funding.module.css';
import { FlexColumn, FlexRow, SpacedFlexRow } from '../components/Flex';
import { LightPageBody } from './PageBody';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

const Funding = (): JSX.Element => {
  const lng = useContext(LanguageContext);
  return (
    <FlexColumn>
      <SpacedFlexRow>
        <img
          className={styles.large}
          src="/partners/uia.jpg"
          alt="UIA logo"
          width="768"
          height="432"
        />
        <img
          className={styles.large}
          src="/partners/eu.jpg"
          alt="EU logo"
          width="768"
          height="432"
        />
      </SpacedFlexRow>
      <FlexRow>
        <LightPageBody>
          <i>{translations[lng]['funding']}</i>
        </LightPageBody>
      </FlexRow>
    </FlexColumn>
  );
};

export default Funding;
