import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { TbEye } from 'react-icons/tb';
import { LuPlus } from 'react-icons/lu';
import { receiptAndRemittanceArray } from '../../../helper/jsons/receiptAndRemittanceArray';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';

const AccountingReceiptRemittanceColumn = () => {
  const [searchParams] = useSearchParams();


  const columns = [

    {
      title: 'نام درخواست دهنده',
      dataIndex: 'create_by',
      className: 'text-start',
      key: 'create_by',
      render: (text) => {
        return (<span>{`${text?.first_name} ${text?.last_name}`}</span>
          // <ShowImageBox name={`${text?.first_name} ${text?.last_name}`}
          //               srcImage={text?.attachments && text?.attachments.length && `${baseURL}/${text?.attachments[0]?.path?.indexArray?.small}`} />
        );
      },

    }, {
      title: 'تاریخ ایجاد',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    }, {
      title: 'نوع جابجایی', dataIndex: 'type', key: 'type',
      render: (text) => {
        return (
          <span>{receiptAndRemittanceArray.find(i => i.eName === text)?.fName}</span>
        );
      },
    }, {
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex flex-column w-100">
          <div className="text-center d-flex gap-1 d-flex justify-content-center">

            {/*hasPermission('user', ['edit']) &&*/}
            {['in', 'out'].includes(searchParams.get('list')) &&
              <Link to={`/accounting/receiptRemittance/store/${searchParams.get('list')}/${row.id}`}><IconBtn
                TooltipText="ثبت اطلاعات"
                btnClass="greenIconBtn"
                icon={<LuPlus size={22} />} /></Link>

            }
            <Link to={`/accounting/receiptRemittance/show/${searchParams.get('list')}/${row.id}`}><IconBtn
              TooltipText="نمایش"
              btnClass="blueIconBtn"
              icon={<TbEye size={22} />} /></Link>
          </div>
        </div>;

      },
    },

  ];
  return [columns];
};


export default AccountingReceiptRemittanceColumn;