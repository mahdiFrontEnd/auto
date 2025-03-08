import React, { useEffect, useRef, useState } from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import ReCaptchaComponent from './ReCAPTCHAComponent';
import Auth from '../../api/http_request/Model/auth/Auth';
import OtpBox from './OtpBox';
import { validatePattern } from '../../helper/validatePattern';

const LoginForm = () => {
  const [showStatus, setShowStatus] = useState(true);

  const [reset, setReset] = useState(false);
  // const [showPass, setShowPass] = useState(false);
  const [validReCAPTCHA, setValidReCAPTCHA] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const initialValues = {
    mobile: '',
    // password: '',
  };

  const validationSchema = Yup.object().shape({
    // username: Yup.string().required('لطفا پر کنید'),
    mobile: Yup.string().required('لطفا شماره موبایل را وارد کنید').matches(validatePattern.mobile,
      'لطفا شماره موبایل را صحیح وارد کنید'),
    // password: Yup.string().min(6, 'رمزعبور شماباید بیش از 6 کاراکتر باشد').required('لطفا پر کنید'),
  });


  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;
    const { values } = current;
    if (validReCAPTCHA?.captcha?.length === 4 && values.mobile) {
      current.handleSubmit();
    }
  }, [validReCAPTCHA]);
  const onSubmit = (fildes) => {
    if (validReCAPTCHA.captcha) {

      fildes = { ...fildes, ...validReCAPTCHA };

      setLoading(true);
      setErrorText('');

      Auth.request({
        error: (error) => {

          setReset(!reset);
          toast.error(error?.message);

        }, unAuth: (data) => {

          toast.error(data.data.message);
          setReset(!reset);

        }, success: async () => {

          setShowStatus(false);

        }, final: () => {
          setLoading(false);

        },
      }).preLogin(fildes);
    }
  };
  const handleReturn = () => {
    setShowStatus(true);
    setReset(!reset);
  };


  return (<div className="loginForm">
    {
      showStatus
        ? <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (<Form>
            <FormGroup>
              <Label className="text-white" htmlFor="mobile">شماره موبایل</Label>
              <Field
                name="mobile"
                type="tel"
                maxLength="11"
                className={`form-control fs-3 text-center ${(errors.mobile && touched.mobile) || errorText ? ' is-invalid' : ''}`}
              />
              <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
            </FormGroup>

            <div className="d-flex justify-content-center my-4">
              <ReCaptchaComponent
                reset={reset}
                setValidReCAPTCHA={setValidReCAPTCHA}
              />
            </div>

            <Button
              disabled={loading || !validReCAPTCHA.captcha}
              type="submit" color="primary"
              className="w-100 text-white mt-3 bg-warning fw-bold" style={{ fontSize:'17px',padding:'20px 0' }}>
              ورود به سامانه
            </Button>
          </Form>)}
        </Formik>
        :
        <OtpBox userData={ref.current.values} handleReturn={handleReturn} />
    }

  </div>);
};

export default LoginForm;
