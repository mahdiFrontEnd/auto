import React from 'react';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import BrandColumn from './TypesColumn';
import UpdateCreateTypes from './UpdateCreateTypes';


const TypesPage = () => {
  const [columns] = BrandColumn();


  return (<>

      <TitleBox title="انواع محصول">
        <div className="d-flex gap-2 align-items-center">
          <SearchInputTopTable searchName="name" />

          <UpdateCreateTypes />
          <DeleteFilterTable />
        </div>
      </TitleBox>

      <CheckPermissionPage module="storehouse_type">
        <CreatorTable columns={columns} listAddress="storehouse/type" />
      </CheckPermissionPage></>
  );


};


export default TypesPage;