import { Radio } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import { isMyRequest } from '../../../helper/jsons/isMyRequest';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import RemittanceProductColumn from './RemittanceProductColumn';
import ResetInventoryState from '../ResetInventoryState';


const RemittanceProduct = ({storeAddress}) => {
  const [columns] = RemittanceProductColumn();

  const [searchParams, setSearchParams] = useSearchParams();
  const [resetStates] = ResetInventoryState();
  useEffect(() => {
    resetStates();
    setSearchParams({ my_request: searchParams.get('my_request') !== 'false' });

  }, [searchParams.get('my_request')]);


  const handleClick = (e) => {
    setSearchParams({ my_request: e.target.value });
  };



  return (<>
    <TitleBox title="حواله کالا">
      <DeleteFilterTable />
      <Link to={storeAddress}>
        <IconBtn btnClass="greenIconBtn" icon={<LuPlus size={22} />} />
      </Link>
      <Radio.Group value={searchParams.get('my_request')} buttonStyle="solid" onChange={handleClick}>
        {isMyRequest.map((item) => (<Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>))}
      </Radio.Group>
    </TitleBox>
    <CreatorTable defFilter={{ my_request: 'true' }} columns={columns} listAddress="process/request/store_out" />
  </>);
};


export default RemittanceProduct;