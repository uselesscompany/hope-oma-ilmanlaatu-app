import React, { ReactNode, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ActionEffect from '../../components/ActionEffect';
import { LinkButton } from '../../components/LinkButton';
import { PageHeader } from '../../components/PageHeader';
import { FlexColumn, FlexRow } from '../../components/Flex';
import {
  IconButtonsRow,
  IconButtonsContainer,
  EmptyDiv,
  Icons,
} from '../../components/IconButtons';
import AppLogo from '../../components/AppLogo';
import styles from 'src/styles/actions.module.css';
import clsx from 'clsx';
import { pages } from '../../constants/Actions';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';
import { StarReview } from 'src/components/StarReview';

const DescriptionDiv = (props: { children: ReactNode }) => (
  <div className={styles.descriptionDiv}>{props.children}</div>
);

const ActionPage = (props: {
  children: ReactNode;
  hidden?: boolean;
}): JSX.Element => (
  <div
    className={clsx({
      [styles.actionPage]: true,
      [styles.hidden]: props.hidden,
    })}
  >
    {props.children}
  </div>
);

const Actions = (): JSX.Element => {
  const router = useRouter();
  const actionPage = router.query.action;
  const lng = useContext(LanguageContext);

  const getButtonTextForKey = (key: string): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translations[lng]['actions-' + key];
  };

  const getActionEffectName = (name: string): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translations[lng]['actions-' + name];
  };

  const getModalDescription = (name: string): string => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return translations[lng]['actions-' + name + '-description'];
  };

  return (
    <FlexColumn>
      <AppLogo />
      <FlexRow>
        <Link href="/" passHref>
          <LinkButton negative>
            {translations[lng]['common-frontpage']}
          </LinkButton>
        </Link>
      </FlexRow>
      <FlexRow>
        <PageHeader>{translations[lng]['actions-header']}</PageHeader>
      </FlexRow>
      <FlexRow>
        <DescriptionDiv>
          {translations[lng]['actions-description']}
        </DescriptionDiv>
      </FlexRow>
      <IconButtonsRow>
        <EmptyDiv />
        <IconButtonsContainer hidden={actionPage !== undefined}>
          {Object.entries(pages).map(([key, page], i) => (
            <div key={i}>
              <Link href={`/actions/${key}`} passHref>
                <LinkButton iconButton>
                  <img src={Icons[page.iconId]} alt={key} />
                  <p>{getButtonTextForKey(key)}</p>
                  <div></div>
                </LinkButton>
              </Link>
            </div>
          ))}
        </IconButtonsContainer>
        <ActionPage hidden={!actionPage}>
          <LinkButton onClick={(): void => router.back()}>
            {translations[lng]['common-back']}
          </LinkButton>
          {actionPage !== undefined ? (
            pages[actionPage.toString()].actions.map((action, i) => (
              <ActionEffect
                key={i}
                name={getActionEffectName(action.name)}
                value={action.effect}
                modalDescription={getModalDescription(action.name)}
                link={action.link}
              />
            ))
          ) : (
            <div></div>
          )}
          <StarReview label={actionPage?.toString() ?? 'undefined'} />
        </ActionPage>
        <EmptyDiv />
      </IconButtonsRow>
    </FlexColumn>
  );
};

export default Actions;
