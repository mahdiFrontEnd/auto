import React from 'react';
import { TickCircle } from 'iconsax-react';
import { Form } from 'antd';
import IconBtn from '../../../../../components/MicroComponents/button/IconBtn';

const RecordBtnBox = () => {
  return (
    <div className="d-flex justify-content-center" style={{ width: '80px' }}>
      <Form.Item className="mb-0">
        <IconBtn type="submit" btnClass="greenIconBtn" icon={<TickCircle size="20" />} />
      </Form.Item>
    </div>
  );
};

export default RecordBtnBox;
