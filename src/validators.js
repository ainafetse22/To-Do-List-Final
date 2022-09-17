const useValidators = () => {
  const isEmpty = (fieldName, fieldValue) => (!fieldValue ? `The ${fieldName} field is required` : '');
  const minLength = (fieldName, fieldValue, min) => (fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : '');
  const isEmail = (fieldName, fieldValue) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? `The input is not a valid ${fieldName} address` : '';
  };
  const passwordFormat = (fieldName, fieldValue) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return !re.test(fieldValue) ? `The password should has Minimum eight characters, 
    at least one uppercase letter, one lowercase letter and one number` : '';
  };
  const passwordConfirm = (fieldName, fieldValue, fieldConfirm) => (fieldValue === fieldConfirm ? '' : 'The passwords are not equal');
  return {
    isEmpty,
    minLength,
    isEmail,
    passwordFormat,
    passwordConfirm,
  };
};
export default useValidators;
