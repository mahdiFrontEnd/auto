import React from 'react';
import { hasPermission } from '../../permission/module';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import SectionColumn from './SectionColumn';
import UpdateCreateSection from './UpdateCreateSection';
import TitleBox from '../../components/TitleBox';


const SectionManagementPage = () => {
  const [columns] = SectionColumn();

  return (<>
      <TitleBox title="بخش ها">
        {hasPermission('section', ['create']) && <UpdateCreateSection />}
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="section">
        <CreatorTable columns={columns} listAddress="section" childrenColumnName="childs" expandable={{
          childrenColumnName: 'childs', indentSize: 15,
        }} />
      </CheckPermissionPage></>
  );
};

export default SectionManagementPage;
