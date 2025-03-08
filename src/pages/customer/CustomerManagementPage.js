import { hasPermission } from '../../permission/module';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import CustomerColumn from './CustomerColumn';
import UpdateCreateCustomer from './UpdateCreateCustomer';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import TitleBox from '../../components/TitleBox';


const CustomerManagementPage = () => {
  const [columns] = CustomerColumn();

  return (
    <>

      <TitleBox title="مشتریان">
        {hasPermission('customer', ['create']) && <UpdateCreateCustomer />}
        <DeleteFilterTable />
      </TitleBox>


      <CheckPermissionPage module="customer">

        <CreatorTable columns={columns} listAddress="customer" />
      </CheckPermissionPage>
    </>
  );
};

export default CustomerManagementPage;
