import React, { useEffect, useState } from 'react';
import { Input, Skeleton } from 'antd';
import Auth from '../../api/http_request/Model/auth/Auth';
import { convertPersianNumberToEng } from '../../helper/convertPersianNumberToEng';


const ReCaptchaComponent = ({ setValidReCAPTCHA, reset }) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [value, setValue] = useState('');
  // let captcha;
  //
  //
  // const didMountRef = useRef(false);
  //
  //
  // useEffect(() => {
  //     if (didMountRef.current) {
  //
  //         captcha.reset();
  //     } else {
  //         didMountRef.current = true;
  //     }
  //
  //
  // }, [reset])
  // const setCaptchaRef = (ref) => {
  //     if (ref) {
  //           captcha = ref;
  //     }
  // };
  useEffect(() => {
    setValidReCAPTCHA({});
    setValue('');
    Auth.request({
      beforeSend: () => {
        setLoading(true);

      },
      error: () => {


      }, success: async ({ result }) => {
        setData(result);
      }, final: () => {
        setLoading(false);

      },
    }).captcha();

  }, [reset]);
  return (


    <div className="d-flex align-items-start gap-2 py-1 w-100">
      <div className="flex-1">
        <Input type="tel" maxLength={4} value={value} onChange={(e) => {
          setValue(convertPersianNumberToEng(e.target.value));
          if (e.target.value?.length === 4) {
            setValidReCAPTCHA({ captcha: convertPersianNumberToEng(e.target.value), token: data.token });
          } else {
            setValidReCAPTCHA({});
          }

        }}
               className="defInput text-center form-control" placeholder="کد امنیتی را وارد کنید." />
      </div>
      {!loading ?
        <img src={data.image} alt="haselnovin" className="form-control p-0 rounded-2 "
             style={{ width: 'fit-content', height: '36.5px' }} /> :
        <Skeleton.Input active size={36} />}

    </div>);
};

export default ReCaptchaComponent;