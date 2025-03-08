import React, { useEffect } from 'react';
import { Radio } from 'antd';
import { useSearchParams } from 'react-router-dom';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';
import ProductRequestColumn from './ProductRequestColumn';
import { hasPermission } from '../../../permission/module';
import UpdateCreateProductRequest from './UpdateCreateProductRequest';

const ProductRequestPage = () => {
  const [columns] = ProductRequestColumn();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleClick = (e) => {
    setSearchParams({ status: e.target.value });
  };

  useEffect(() => {
    if (!searchParams.get('status')) {
      setSearchParams({ status: 'pending' });
    }
  }, [searchParams.get('status')]);

  return (<>

    <TitleBox title="درخواست کالا">
      {hasPermission('ware', ['create']) && <UpdateCreateProductRequest />}
      <DeleteFilterTable />
    </TitleBox>


    <CheckPermissionPage module="ware">
      <div className="d-flex justify-content-end mb-3">


        <Radio.Group value={searchParams.get('status')} buttonStyle="solid" onChange={handleClick}>
          <Radio.Button value="pending">درخواست های باز</Radio.Button>
          <Radio.Button value="complete">درخواست های اتمام یافته</Radio.Button>
        </Radio.Group>


      </div>


      <CreatorTable defFilter={{ status: 'pending' }}
                    columns={columns}
                    listAddress="ware"
      />
    </CheckPermissionPage>
  </>);
};

export default ProductRequestPage;
