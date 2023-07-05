import useInput from '../hooks/use-input';
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SimpleInput = () => {
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

  const validateEmail = (emailInput) => {
    return emailInput.match(mailRegex);
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
  if (enteredEmailIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (nameInputHasError) return;
    if (emailInputHasError) return;
    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = 'form-control'+ nameInputHasError ? 'invalid' : '';
  const emailInputClasses = 'form-control'+ emailInputHasError ? 'invalid' : '';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty</p>)
        }
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
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
