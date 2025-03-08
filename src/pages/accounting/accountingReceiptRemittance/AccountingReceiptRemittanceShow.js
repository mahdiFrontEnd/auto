import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import TitleBox from '../../../components/TitleBox';
import TableBox from '../../../components/MicroComponents/table/TableBox';
import AccountingReceiptRemittanceShowColumn from './AccountingReceiptRemittanceShowColumn';
import Storehouse from '../../../api/http_request/Model/storehouse/Storehouse';
import ShowMainInfo from './ShowMainInfo';
import NewLoading from '../../../layouts/loader/NewLoading';


const AccountingReceiptRemittanceShow = () => {
  const { type, id } = useParams();
  const [columns] = AccountingReceiptRemittanceShowColumn(type);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);


    Storehouse.request({
      success: async ({ result }) => {
        console.log(result);
        setData(result);

      }, error: (error) => {
        toast.error(error.message);

      }, final: () => {
        setLoading(false);

      },
    }).setHeader('list', type).AccountingStorehouseShow(id);


  }, []);

  return (<>

    <TitleBox title="حسابداری">

    </TitleBox>
    {!loading ? <>
      <ShowMainInfo data={data} />

      <TableBox loading={loading}
                columns={columns}
                dataRows={data.form_product || []}

      />
    </>
:
      <>
        <div

          style={{ height: '100px' }}
          className="mb-2 rounded-2 overflow-hidden w-100"
        >
          <NewLoading />
        </div>
        {Array.from(Array(3).keys()).map((item) => (
          <div
            key={item}
            style={{ height: '40px' }}
            className="mb-2 rounded-2 overflow-hidden w-100"
          >
            <NewLoading />
          </div>
        ))}
      </>
    }


  </>);


};

export default AccountingReceiptRemittanceShow;