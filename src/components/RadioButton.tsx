import React, { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import styles from './radioButton.module.css';

interface Props {
  id: string;
  checkbox?: boolean;
  required?: boolean;
  label: string;
  value: string;
  check: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Container = (props: { children: ReactNode }) => (
  <div className={styles.container}>{props.children}</div>
);

const Label = (props: { children: ReactNode; htmlFor: string }) => (
  <label className={styles.label} {...props}>
    {props.children}
  </label>
);

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={styles.input} {...props} />
);

const P = (props: { children: ReactNode }) => (
  <p className={styles.padded}>{props.children}</p>
);

class RadioButton extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <Input
          id={this.props.id + '_' + this.props.value}
          name={this.props.id}
          type={this.props.checkbox ? 'checkbox' : 'radio'}
          value={this.props.value}
          checked={this.props.check}
          onChange={this.props.onChange}
          required={this.props.required}
        />
        <Label htmlFor={this.props.id + '_' + this.props.value}>
          <P>{this.props.label}</P>
        </Label>
      </Container>
    );
  }
}

export default RadioButton;
