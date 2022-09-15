import { reactive } from 'vue';
import useValidators from '@/validators';

const errors = reactive({});
const {
  isEmpty, minLength, isEmail, passwordFormat, passwordConfirm,
} = useValidators();
const useFormValidation = () => {
  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4);
  };
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };
  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue)
      : passwordFormat(fieldName, fieldValue);
  };
  const confirmPasswordField = (fieldName, fieldValue, fieldValueConfirm) => {
    errors[fieldName] = passwordConfirm(fieldName, fieldValue, fieldValueConfirm);
  };
  return {
    errors, validateNameField, validateEmailField, validatePasswordField, confirmPasswordField,
  };
};

export default useFormValidation;
