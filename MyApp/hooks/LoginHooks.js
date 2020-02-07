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

  const useSetInputs = (attr, value)=>{
    setInputs(inputs => ({
      ...inputs,
      [attr]: value
    }));
    const val = validate({ [attr]: value }, constraints);
    setValid(valid => ({
      ...valid,
      [attr]: val[attr]
    }));
    console.log(val)
  }

  const handleUsernameChange = text => {
    useSetInputs('username', text);
  };

  const handlePasswordChange = text => {
    useSetInputs('password', text)
  };

  const handleEmailChange = text => {
    useSetInputs('email', text)
  };

  const handlePasswordCheck = text => {
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
