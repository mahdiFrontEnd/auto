import React from 'react';
import { ConfigProvider, DatePicker, Form } from 'antd';
import locale from 'antd/es/date-picker/locale/fa_IR';
import fa_IR from 'antd/locale/fa_IR';
import dayjs from 'dayjs';

const DeadTimeInputBox = () => {

  return (
    <div className="flex-1 d-flex justify-content-center">
      <ConfigProvider   direction="ltr">
        <Form.Item className="mb-0  flex-1" name="dead_time"
                   rules={[{ required: true, message: '' }]}>
          <DatePicker showTime popupClassName="changePlaceTimeDate"  minDate={dayjs()}
                      className="w-100" needConfirm={false}
                      format="HH:mm YYYY-MM-DD"
                      locale={{
                        locale: fa_IR,
                        lang: {
                          ...locale.lang, ok: 'تایید',
                        },
                      }} />
        </Form.Item>
      </ConfigProvider>


    </div>
  );
};

export default DeadTimeInputBox;