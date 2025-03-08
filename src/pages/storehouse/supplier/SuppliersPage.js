import React from 'react';
import UpdateCreateSuppliers from './UpdateCreateSuppliers';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import SupplierColumn from './SupplierColumn';
import { hasPermission } from '../../../permission/module';


const SuppliersPage = () => {
  const [columns] = SupplierColumn();


  return (<>

      <TitleBox title="تامین کننده ها">
        <div className="d-flex gap-2 align-items-center">
          <SearchInputTopTable searchName="name" />
          {hasPermission('storehouse_supplier', ['create']) &&
            <UpdateCreateSuppliers />
          }
          <DeleteFilterTable />
        </div>
      </TitleBox>

      {/*<CheckPermissionPage module="storehouse_supplier">*/}
      <CreatorTable columns={columns} listAddress="storehouse/supplier" />
      {/*</CheckPermissionPage>*/}
    </>
  );


};


export default SuppliersPage;