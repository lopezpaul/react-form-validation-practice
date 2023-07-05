import useInput from '../hooks/use-input';

const BasicForm = () => {
  const validateName = (nameInput) => {
    return nameInput.trim() !== '';
  }
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(validateName);

  const validateLastName = (nameInput) => {
    return nameInput.trim() !== '';
  }
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(validateLastName);

  const validateEmail = (emailInput) => {
    return emailInput.includes('@');
  }
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(validateEmail);

  let formIsValid = false;
  if (enteredNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (nameInputHasError) return;
    if (lastNameInputHasError) return;
    if (emailInputHasError) return;
    resetNameInput();
    resetLastNameInput();
    resetEmailInput();
    const result = {
      name: enteredName,
      lastName: enteredLastName,
      email: enteredEmail
    }

    alert(JSON.stringify(result, null, 2));
  }
  const nameInputClasses = `form-control  ${nameInputHasError ? 'invalid' : ''}`;
  const lastNameInputClasses = `form-control  ${lastNameInputHasError ? 'invalid' : ''}`;
  const emailInputClasses = `form-control  ${emailInputHasError ? 'invalid' : ''}`;
  return (
    <div>
      <h3>Using Custom validations</h3>
      <form onSubmit={formSubmissionHandler}>
        <div className='control-group'>
          <div className={nameInputClasses}>
            <label htmlFor='name'>First Name</label>
            <input type='text' id='name'
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className='error-text'>Name must not be empty</p>)
            }
          </div>
          <div className={lastNameInputClasses}>
            <label htmlFor='lastname'>Last Name</label>
            <input type='text' id='lastname'
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              value={enteredLastName}
            />
            {lastNameInputHasError && (
              <p className='error-text'>Last Name must not be empty</p>)
            }
          </div>
        </div>
        <div className={emailInputClasses}>
          <label htmlFor='email'>E-Mail Address</label>
          <input type='text' id='email'
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className='error-text'>Email must contain @</p>)
          }
        </div>
        <div className='form-actions'>
          <button disabled={!formIsValid} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BasicForm;
