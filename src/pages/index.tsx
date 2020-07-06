import React from 'react';
import { Redirect } from 'react-router';
export default () => {
  return (
    <div>
      <Redirect to="/home" />
      欢迎来到umiDC 指挥官
    </div>
  );
};
