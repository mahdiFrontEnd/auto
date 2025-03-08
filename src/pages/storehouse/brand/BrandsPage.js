import React from 'react';
import UpdateCreateBrands from './UpdateCreateBrands';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import BrandColumn from './BrandColumn';
import { hasPermission } from '../../../permission/module';


const BrandsPage = () => {
  const [columns] = BrandColumn();


  return (<>

      <TitleBox title="برند ها">
        <div className="d-flex gap-2 align-items-center">
          <SearchInputTopTable searchName="name" />
          {hasPermission('storehouse_brand', ['create']) &&
            <UpdateCreateBrands />
          }
          <DeleteFilterTable />
        </div>
      </TitleBox>

      <CheckPermissionPage module="storehouse_brand">
        <CreatorTable columns={columns} listAddress="storehouse/brand"
                      childrenColumnName="children_brand"
                      expandable={{
                        childrenColumnName: 'children_brand', indentSize: 15,
                      }} />
      </CheckPermissionPage></>
  );


};


export default BrandsPage;