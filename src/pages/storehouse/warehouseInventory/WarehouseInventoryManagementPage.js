import React from 'react';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import WarehouseInventoryColumn from './WarehouseInventoryColumn';
import TitleBox from '../../../components/TitleBox';


const UpdateCreateSection = () => {
  const [columns] = WarehouseInventoryColumn();

  return (<>

      <TitleBox title="موجودی انبار ها">
      </TitleBox>

      <CheckPermissionPage module="storehouse_place">
        <CreatorTable defFilter={{ my: 'main_places' }} columns={columns} endAddress={false}
                      listAddress="storehouse/main/list_for_login_user" childrenColumnName="children" expandable={{
          childrenColumnName: 'children', indentSize: 15,

        }} />
      </CheckPermissionPage></>
  );
};

export default UpdateCreateSection;
