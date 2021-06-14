import clsx from 'clsx';
import React, { ReactNode, useContext } from 'react';
import Modal from 'react-modal';
import styles from './actionEffect.module.css';
import { LanguageContext } from 'src/Contexts';
import translations from 'src/translations';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

interface Props {
  name: string;
  value: number;
  modalDescription: string;
  link: string | undefined;
}

interface ActionContainerProps {
  effect: number;
  children?: ReactNode;
  onClick?: () => void;
}

const ActionContainer = (props: ActionContainerProps) => (
  <button
    className={clsx({
      [styles.actionContainer]: true,
      [styles.five]: props.effect === 5,
      [styles.four]: props.effect === 4,
      [styles.three]: props.effect === 3,
      [styles.two]: props.effect === 2,
    })}
    {...props}
  >
    {props.children}
  </button>
);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    padding: '15vmin',
    fontSize: '1.5em',
    backgroundColor: '#efefef',
    maxWidth: '80vw',
    border: '3px solid #58b998',
    fontFamily: 'Verdana, Tahoma, Arial, sans-serif',
  },
};

const ActionEffect = (props: Props): JSX.Element => {
  const lng = useContext(LanguageContext);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <ActionContainer effect={props.value} onClick={openModal}>
        {props.name}
      </ActionContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
      >
        <div>{props.modalDescription}</div>
        {props.link !== undefined ? (
          <>
            <br />
            <br />
            <div>
              {translations[lng]['actions-more']}{' '}
              <a href={props.link}>{props.link}</a>
            </div>
          </>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default ActionEffect;
