import { useState, useCallback } from 'react';

const useFormAndValidation = (defaultValues = {}, config) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = useCallback(
    (evt) => {
      const { target } = evt;
      const isCheckbox = target.type === 'checkbox';
      const { name } = target;
      const value = isCheckbox ? target.checked : target.value;
      const isNotValidValue = !config?.REGEX[name]?.test(value);

      setValues((oldValues) => ({ ...oldValues, [name]: value }));
      if (isNotValidValue && config?.INPUTS.includes(name) && value.length) {
        setErrors({ ...errors, [name]: config.MESSAGES[name] });
      } else setErrors({ ...errors, [name]: target.validationMessage });
    },
    [setValues, setErrors]
  );

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = true) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    setIsValid,
    resetForm,
  };
};

export default useFormAndValidation;
