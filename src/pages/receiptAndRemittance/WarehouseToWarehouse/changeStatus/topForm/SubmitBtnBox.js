import React from 'react';
import { Button, Form } from 'antd';
import { useSelector } from 'react-redux';
import PaymentDeclarationModal from './PaymentDeclarationModal';

const SubmitBtnBox = (props) => {
  const { receiptAndRemittanceArray, nextStatusesList } = useSelector((state) => state.Storehouse);
  const status = receiptAndRemittanceArray[0]?.status;

  const showJson = status?.options || {};
  return (
    <>
      {showJson.paymentRequested && nextStatusesList.length ? (
        <PaymentDeclarationModal />
      ) : (
        <>
          {nextStatusesList.length ? (
            <Form.Item className="mb-0">
              <Button
                variant="solid"
                loading={props.loading}
                className="defBtn bgGreenBtn"
                style={{ padding: '18px 30px' }}
                htmlType="submit"
              >
                ثبت
              </Button>
            </Form.Item>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default SubmitBtnBox;
