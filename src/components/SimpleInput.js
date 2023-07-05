import { useState } from 'react';

const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredEmailIsValid = enteredEmail.match(mailRegex);

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  }
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }
  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    if (!enteredNameIsValid) return;
    if (!enteredEmailIsValid) return;

    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    enteredEmailTouched(false)
  }

  const nameInputClasses = (nameInputIsInvalid ? 'form-control invalid' : 'form-control');
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must not be empty</p>)
        }
      </div>
      <div className={nameInputClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className='error-text'>Not valid email</p>)
        }
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
