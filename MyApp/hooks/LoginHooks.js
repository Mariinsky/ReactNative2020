import { useState } from "react";
import validate from "validate.js";

const constraints = {
  username: {
    presence: {
      message: "input a username"
    },
    length: {
      minimum: 3,
      message: "min 3 char"
    }
  },
  email: {
    presence: {
      message: "input email"
    },
    email: {
      message: "input a valid email"
    }
  },
  password: {
    presence: {
      message: "input password"
    },
    length: {
      minimum: 5,
      message: "minimum 5 characters"
    }
  }
};

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const [valid, setValid] = useState({});
  const handleUsernameChange = text => {
    const val = validate({ username: text }, constraints);
    setValid(valid => ({
      ...valid,
      username: val.username
    }));
    setInputs(inputs => ({
      ...inputs,
      username: text
    }));
  };
  const handlePasswordChange = text => {
    const val = validate({ password: text }, constraints);
    setValid(valid => ({
      ...valid,
      password: val.password
    }));

    setInputs(inputs => ({
      ...inputs,
      password: text
    }));
  };
  const handlePasswordCheck = text => {
    console.log(valid);
    if (text != inputs.password) {
      setValid(valid => ({
        ...valid,
        passCheck: "password doesn't match"
      }));
    } else {
      setValid(valid => ({
        ...valid,
        passCheck: undefined
      }));
    }
  };

  const handleEmailChange = text => {
    const val = validate({ email: text }, constraints);
    setValid(valid => ({
      ...valid,
      email: val.email
    }));
    setInputs(inputs => ({
      ...inputs,
      email: text
    }));
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handlePasswordCheck,
    inputs,
    valid
  };
};

export default useSignUpForm;
