import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AccountingReceiptRemittanceColumn from './AccountingReceiptRemittanceColumn';
import TitleBox from '../../../components/TitleBox';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';


const AccountingReceiptRemittance = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columns] = AccountingReceiptRemittanceColumn(searchParams);


  // const handleClick = (e) => {
  //   setSearchParams({ list: e.target.value });
  // };

  useEffect(() => {
    setSearchParams({ list: searchParams.get('list') || 'in' });

  }, [searchParams.get('list')]);


  return (<>

    <TitleBox title="حسابداری">
      {/*<Radio.Group value={searchParams.get('list')} buttonStyle="solid" onChange={handleClick}>*/}
      {/*  {AccountingReceiptRemittanceTypesArray.map((item) => (*/}
      {/*    <Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>))}*/}
      {/*</Radio.Group>*/}
      <DeleteFilterTable />
    </TitleBox>

    {/*<CheckPermissionPage module="accounting">*/}

    <CreatorTable defFilter={{ list: 'in' }} columns={columns} listAddress="storehouse/detail_product" />

    {/*</CheckPermissionPage>*/}
  </>);
};


export default AccountingReceiptRemittance;