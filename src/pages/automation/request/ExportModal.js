import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { RiFileExcel2Line } from 'react-icons/ri';
import { FaSackDollar } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { baseURL } from '../../../api/http_request/url';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';

const ExportModal = () => {

  const [loading, setLoading] = useState(false);
  const filter = useSelector((state) => state.TableRedux.filter);


  const onFinish = (address) => {

    if (filter.from_date && filter.end_date) {
      setLoading(true);


      Automation.request({
        success: (result) => {
          toast.success(result.message);

          window.open(baseURL + result.result, '_blank');
        },
        error: ({ response }) => {

          toast.error(response?.data?.message);

        },
        final: () => {
          setLoading(false);
        },
      }).addParams({ ...filter }).getReport(address);
    } else {
      toast.error('لطفا از جدول پایین از قسمت ، جزییات و تاریخ ، یک بازه زمانی انتخاب کنید.');

    }

  };
  const items = [
    {
      label: <div className="py-2" onClick={() => onFinish('report')}>خروجی
        اکسل</div>,
      key: '1',
      icon: <FaUsers size={18} />,
    },
    {
      type: 'divider',
    },
    {
      label: <div className="py-2" onClick={() => onFinish('report-accounting')}>خروجی
        اکسل مالی</div>,
      key: '2',
      icon: <MdOutlineAttachMoney size={20} />,
    },
    {
      type: 'divider',
    },
    {
      label: <div className="py-2" onClick={() => onFinish('imprest-accounting')}>خروجی
        اکسل مساعده ها</div>,
      key: '3',
      icon: <FaSackDollar size={18} />,
    },
  ];

  return (
    <>
      {/*<Dropdown.Button className="w-auto" type="primary" loading={loading} menu={{ items }}> </Dropdown.Button>*/}
      <Dropdown menu={{ items }} trigger={['click']}>

        <IconBtn loading={loading} TooltipText="خروجی اکسل"
                 btnClass="blueIconBtn"
                 icon={<RiFileExcel2Line size={22} />} />
      </Dropdown>

    </>
  );
};
export default ExportModal;





