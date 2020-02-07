import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'native-base';

const FormTextInput = (props) => {
  const {...otherProps} = props;
  return (
    <Input {...otherProps} />
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
