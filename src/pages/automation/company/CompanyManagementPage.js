import { hasPermission } from '../../../permission/module';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CompanyColumn from '../../../components/automation/company/CompanyColumn';
import UpdateCreateCompanies from '../../../components/automation/company/UpdateCreateCompanies';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';


const CompanyManagementPage = () => {
  const [columns] = CompanyColumn();

  return (<>
      <TitleBox title="شرکت ها">
        {hasPermission('company', ['create']) && <UpdateCreateCompanies />}
        <DeleteFilterTable />
      </TitleBox>

      <CheckPermissionPage module="automation_company">
        <CreatorTable columns={columns} listAddress="automation_company" />
      </CheckPermissionPage></>
  );
};

export default CompanyManagementPage;
