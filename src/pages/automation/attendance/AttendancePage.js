import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Radio } from 'antd';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import AttendanceColumn from './AttendanceColumn';
import BestAndWorst from './BestAndWorst';
import { deviceNumberList } from '../../../helper/jsons/deviceNumberList';


const AttendancePage = () => {
  const [columns] = AttendanceColumn();
  const [searchParams, setSearchParams] = useSearchParams();


  const handleClick = (e) => {
    setSearchParams({ device_number: e.target.value });
  };

  useEffect(() => {

    if (!searchParams.get('device_number')) {
      setSearchParams({ device_number: '1' });
    }
  }, [searchParams.get('device_number')]);
  return (<>
    <TitleBox title="ورود و خروج ها">
      <DeleteFilterTable />
    </TitleBox>


    <BestAndWorst expandIcon={<div onClick={(e)=>{ e.stopPropagation()}}><Radio.Group value={searchParams.get('device_number')} buttonStyle="solid" onChange={handleClick}>
      {
        deviceNumberList.map((item) => (
          <Radio.Button value={item.value}>{item.label}</Radio.Button>

        ))
      }
    </Radio.Group></div>} />


    <CreatorTable columns={columns} listAddress="attendance" />
  </>);
};

export default AttendancePage;
