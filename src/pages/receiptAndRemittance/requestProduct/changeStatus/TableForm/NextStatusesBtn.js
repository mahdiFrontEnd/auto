import React, { useEffect, useState } from 'react';
import { Form, Radio, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

const NextStatusesBtn = ({ restField, initialValues, index, name }) => {
  const { nextStatusesList } = useSelector((state) => state.Storehouse);
  const [radioOptions, setRadioOptions] = useState([]);

  useEffect(() => {
    setRadioOptions(
      nextStatusesList.map((item) => {
        return { label: item?.persian_title, value: item.id };
      }),
    );
  }, [nextStatusesList]);

  return (
    <div className="flex-1 NextStatusesBtn d-flex gap-2 justify-content-center">
      <Form.Item className="mb-0 flex-1 d-flex justify-content-center" {...restField} name={name}  rules={[{ required: true, message: '' }]}>
        <Radio.Group

          optionType="button"
          buttonStyle="solid"
        >
          {radioOptions.map((item,i) => (
            <Tooltip title={item.label} key={nanoid()}>
              <Radio disabled={initialValues[index].in_store === 0 && i === 0 } value={item.value}>{item.label}</Radio>
            </Tooltip>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default NextStatusesBtn;
