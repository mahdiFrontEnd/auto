import React from 'react';
import CategoryColumn from './CategoryColumn';
import UpdateCreateCategory from './UpdateCreateCategory';
import TitleBox from '../../../components/TitleBox';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';


const UpdateCreateSection = () => {
  const [columns] = CategoryColumn();

  return (<>

      <TitleBox title="دسته بندی محصولات">
        <UpdateCreateCategory />
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="storehouse_category">
        <CreatorTable columns={columns} listAddress="storehouse/category" childrenColumnName="children_category"
                      expandable={{
                        childrenColumnName: 'children_category', indentSize: 15,

                      }} />
      </CheckPermissionPage></>
  );
};

export default UpdateCreateSection;
