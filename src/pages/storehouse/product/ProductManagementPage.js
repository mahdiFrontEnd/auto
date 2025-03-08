import React from 'react';

import ProductColumn from './ProductColumn';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import UpdateCreateProduct from './UpdateCreateProduct';
import { hasPermission } from '../../../permission/module';

const UserManagementPage = () => {
  const [columns] = ProductColumn();

  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">محصولات</h4>
        <div className="d-flex gap-2 align-items-center">
          {hasPermission('storehouse_product', ['create']) && <UpdateCreateProduct />}
          <DeleteFilterTable />
        </div>
      </div>
      <CheckPermissionPage module="storehouse_product">
        <CreatorTable
          columns={columns}
          listAddress="storehouse/product"
        />
      </CheckPermissionPage>
    </>
  );
};
export default UserManagementPage;
