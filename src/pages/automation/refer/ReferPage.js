import { useNavigate } from 'react-router-dom';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import TitleBox from '../../../components/TitleBox';


const ReferPage = () => {
  const [columns] = AutomationColumn('message', ['price', 'subjectSelect', 'is_favorited', 'function', 'number', 'detail', 'computing', 'company', 'status']);
  const navigate = useNavigate();


  return (<>
    <TitleBox title="ارجاعی ها">
      <DeleteFilterTable />
    </TitleBox>

    <CreatorTable defFilter={{ type: 'all' }} columns={columns} onDoubleClickRowHandler={(row) => {
      navigate(`/automation/${row.module}/${row.module}_detail/${row.module_id}?activeTab=3`);
    }}
                  listAddress="refer"
    />
  </>);
};

export default ReferPage;
