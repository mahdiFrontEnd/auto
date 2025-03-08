import React from 'react';
import dayjs from 'dayjs';
import AccountingReceiptRemittanceUpdate from './AccountingReceiptRemittanceUpdate';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';
import { baseURL } from '../../../api/http_request/url';
import { getNamesListInParent } from '../../../helper/getNamesListInParent';

const AccountingReceiptRemittanceShowColumn = (type) => {


  const columns = [

    {
      title: 'نام کالا',
      dataIndex: 'product',
      className: 'text-start',
      key: 'product',
      render: (text) => {
        return (
          <ShowImageBox name={text?.name}
                        srcImage={text?.attachments && text?.attachments.length && `${baseURL}/${text?.attachments[0]?.path?.indexArray?.small}`} />
        );
      },

    }, {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
      render: (item, row) => {
        return <span>{item} {row?.product?.unit?.unit_value}</span>;
      },
    }, {
      title: 'انبار', dataIndex: 'place', key: 'place',
      render: (text) => {
        return (
          <div>
            {
              text?.map((item, index) => (

                <span key={index}>{getNamesListInParent(item)}</span>
              ))
            }
          </div>
        );
      },
    }, {
      title: 'زمان جابجایی',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    }, {
      title: 'برند',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    },{
      title: 'دسته بندی',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    },
    ...(['complete_in', 'complete_out'].includes(type) ?  [{
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex flex-column w-100">
          <div className="text-center d-flex gap-1 d-flex justify-content-center">

            {/*hasPermission('user', ['edit']) &&*/}
            {['complete_in', 'complete_out'].includes(type) &&
              <AccountingReceiptRemittanceUpdate rowData={row} />}
          </div>
        </div>;

      },
    }] : [] )

  ];
  return [columns];
};


export default AccountingReceiptRemittanceShowColumn;