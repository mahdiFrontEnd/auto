import React from 'react';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import WarehouseInventoryProductColumn from './WarehouseInventoryProductColumn';
import TitleBox from '../../../components/TitleBox';


const WarehouseInventoryProductManagementPage = () => {
  const [columns] = WarehouseInventoryProductColumn();

  return (<>

      <TitleBox title="موجودی کالاها">
      </TitleBox>
      <CheckPermissionPage module="storehouse_place">
        <CreatorTable defFilter={{ my: 'main_place_product' }} columns={columns} endAddress={false}
                      listAddress="storehouse/main/list" childrenColumnName="children" expandable={{
          childrenColumnName: 'children', indentSize: 15,

        }} />
      </CheckPermissionPage>
    </>
  );
};

export default WarehouseInventoryProductManagementPage;
