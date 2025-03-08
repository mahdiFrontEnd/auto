import { Radio } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import { isMyRequest } from '../../../helper/jsons/isMyRequest';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import WarehouseToWarehouseColumn from './WarehouseToWarehouseColumn';
import ResetInventoryState from '../ResetInventoryState';


const WarehouseToWarehouse = ({storeAddress}) => {
  const [columns] = WarehouseToWarehouseColumn();

  const [searchParams, setSearchParams] = useSearchParams();
  const [resetStates] = ResetInventoryState();


  const handleClick = (e) => {
    setSearchParams({ my_request: e.target.value });
  };

  useEffect(() => {
    resetStates();
    setSearchParams({ my_request: searchParams.get('my_request') !== 'false' });

  }, [searchParams.get('my_request')]);


  return (<>
    <TitleBox title="انبار به انبار ">
      <DeleteFilterTable />
      <Link to={storeAddress}>
        <IconBtn btnClass="greenIconBtn" icon={<LuPlus size={22} />} />
      </Link>
      <Radio.Group value={searchParams.get('my_request')} buttonStyle="solid" onChange={handleClick}>
        {isMyRequest.map((item) => (<Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>))}
      </Radio.Group>
    </TitleBox>
    <CreatorTable defFilter={{ my_request: 'true' }} columns={columns} listAddress="process/request/store_to_store" />
  </>);
};


export default WarehouseToWarehouse;