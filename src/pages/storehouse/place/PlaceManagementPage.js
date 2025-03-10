import React from 'react';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import PlaceColumn from './PlaceColumn';
import UpdateCreatePlace from './UpdateCreatePlace';
import TitleBox from '../../../components/TitleBox';


const UpdateCreateSection = () => {
  const [columns] = PlaceColumn();

  return (<>

      <TitleBox title="انبارها">
        <UpdateCreatePlace />
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="storehouse_place">
        <CreatorTable columns={columns} listAddress="storehouse/place" childrenColumnName="childs" expandable={{
          childrenColumnName: 'children_place', indentSize: 15,

        }} />
      </CheckPermissionPage></>
  );
};

export default UpdateCreateSection;
