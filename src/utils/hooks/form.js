import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import graphql from '@app/graphql';

const diff = (obj1, obj2) => {
  const result = {};
  if (Object.is(obj1, obj2)) {
    return undefined;
  }
  if (!obj2 || typeof obj2 !== 'object') {
    return obj2;
  }
  Object.keys(obj1 || {})
    .concat(Object.keys(obj2 || {}))
    .forEach((key) => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key];
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = diff(obj1[key], obj2[key]);
        if (value !== undefined) {
          result[key] = value;
        }
      }
    });
  return result;
};

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
      required: true
    }
  };
};

export const useFormChangeValidator = (initialData, lastData) => {
  const [initialValue, setInitialValue] = useState();
  const [lastValue, setLastValue] = useState();
  const [changedValue, setChangedValue] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setInitialValue(initialValue);
  }, [initialData]);

  useEffect(() => {
    const result = diff(initialValue, lastValue);
    // set flag value for triggering the form changes
    if (!result || (result && Object.keys(result).length === 0))
      setIsChanged(false);

    if (result && Object.keys(result).length !== 0) setIsChanged(true);

    // set changed value of form data
    setChangedValue(result);
  }, [lastData]);

  return {
    isChanged,
    changedValue,
    setInitialValue,
    setLastValue
  };
};

export const useFetchDataByVariables = (variables) => {
  const { loading, error, data } = useQuery(graphql.queries.grouping, {
    variables
  });

  return {
    loading,
    error,
    data
  };
};
