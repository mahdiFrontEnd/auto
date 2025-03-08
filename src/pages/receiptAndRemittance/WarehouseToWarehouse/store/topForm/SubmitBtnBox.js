import React from 'react';
import { Button, Form } from 'antd';

const SubmitBtnBox = (props) => {
  return (
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
  );
};

export default SubmitBtnBox;
