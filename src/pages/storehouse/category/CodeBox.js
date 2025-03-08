import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { convertPersianNumberToEng } from '../../../helper/convertPersianNumberToEng';

const CodeBox = ({ parentCompleteCode,code, onChangeCode }) => {
  const [value, setValue] = useState('');
  const [parentCompleteCodeValue, setParentCompleteCodeValue] = useState('');

  useEffect(() => {
    setParentCompleteCodeValue(parentCompleteCode);
  }, [parentCompleteCode]);


  useEffect(() => {
    setValue(code);
  }, [code]);


  useEffect(() => {
    onChangeCode(value);
  }, [value]);
  console.log( parentCompleteCode,code);
  return (

    <div className="d-flex align-items-center gap-1 justify-content-end" dir="ltr">
      {parentCompleteCodeValue && <><OtpInput inputType="tel" shouldAutoFocus name="code"
                                    inputStyle="otpInput"
                                    value={parentCompleteCodeValue}
                                    numInputs={parentCompleteCodeValue.length}
                                    renderSeparator={<span className="mx-1">-</span>}
                                    renderInput={(props) => <input  {...props} disabled />}
      /><span></span></>}

      <OtpInput inputType="tel" shouldAutoFocus name="code"
                inputStyle="otpInput"
                value={value}
                onChange={(e) => {setValue(convertPersianNumberToEng(e));}}
                numInputs={2}
                renderSeparator={<span className="mx-1">-</span>}
                renderInput={(props) => <input  {...props} />}
      />
    </div>

  );
};

export default CodeBox;