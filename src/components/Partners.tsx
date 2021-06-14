import React, { ReactNode, useContext } from 'react';
import { ImageProps } from 'next/image';
import styles from './partners.module.css';
import { FlexColumn, FlexRow } from '../components/Flex';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

const PartnerText = (props: { children: ReactNode }) => (
  <p className={styles.text}>{props.children}</p>
);

const PartnerLogo = (props: ImageProps) => (
  <img className={styles.image} alt={props.alt} {...props} />
);

const Partners = (): JSX.Element => {
  const lng = useContext(LanguageContext);
  return (
    <FlexColumn>
      <FlexRow>
        <PartnerLogo
          src="/partners/hope.jpg"
          alt="Hope logo"
          width={256}
          height={144}
        />
        <PartnerLogo
          src="/partners/helsinki.jpg"
          alt="Helsingin logo"
          width={256}
          height={144}
        />
        <PartnerLogo
          src="/partners/yo.jpg"
          alt="Helsingin Yliopiston logo"
          width={256}
          height={144}
        />
        <PartnerLogo
          src="/partners/vaisala.jpg"
          alt="Vaisalan logo"
          width={256}
          height={144}
        />
      </FlexRow>
      <FlexRow>
        <PartnerLogo
          src="/partners/hsy.jpg"
          alt="HSY Logo"
          width={256}
          height={144}
        />
        <PartnerLogo
          src="/partners/il.jpg"
          alt="Ilmatieteen laitoksen Logo"
          width={256}
          height={144}
        />
        <PartnerLogo
          src="/partners/fvh.jpg"
          alt="Forum Virium Helsinki Logo"
          width={256}
          height={144}
        />
        <a href="https://useless.fi">
          <PartnerLogo
            src="/partners/UseLess.jpg"
            alt="UseLessin Logo"
            width={256}
            height={144}
          />
        </a>
      </FlexRow>
      <FlexRow>
        <PartnerText>
          {translations[lng]['partners-pre']}{' '}
          <a href="https://ilmanlaatu.eu">ilmanlaatu.eu</a>.
        </PartnerText>
      </FlexRow>
    </FlexColumn>
  );
};

export default Partners;
