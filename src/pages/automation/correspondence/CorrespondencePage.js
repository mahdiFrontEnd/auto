import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Radio } from 'antd';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import SearchInputTopTable from '../../../components/MicroComponents/table/SearchInputTopTable';
import AutomationColumn from '../../../components/automation/AutomationColumn';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import TitleBox from '../../../components/TitleBox';
import SeeAllButton from '../../../components/automation/AutomationFunctionButtons/SeeAllButton';


const CorrespondencePage = () => {
  const [columns] = AutomationColumn('correspondence', ['module_name', 'subjectSelect', 'price', 'detail', 'computing', 'company', 'status']);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  //
  // const handleClick = (e) => {
  //   setSearchParams({ status: e.target.value });
  // };
  //
  // useEffect(() => {
  //   if (!searchParams.get('status')) {
  //     setSearchParams({ status: 'pending' });
  //   }
  // }, [searchParams.get('status')]);
  //


  const handleClick = (e) => {
    setSearchParams({ status: e.target.value });
  };

  useEffect(() => {
    if (!searchParams.get('status')) {
      setSearchParams({ status: 'pending' });
    }
  }, [searchParams.get('status')]);

  return (<>


    <TitleBox title="مکاتبات داخلی">
      <SearchInputTopTable showSeen />
      <AutomationAddModal  address="automation_correspondence" title="اضافه کردن مکاتبات"
                          showList={['inputSubject', 'selectSubject', 'to', 'cc', 'company_id', 'body', 'attachments']} />
      <SeeAllButton address="correspondence" />
      <DeleteFilterTable />
    </TitleBox>
    <CheckPermissionPage module="automation_correspondence">
      <div className="d-flex justify-content-end ">
        <Radio.Group value={searchParams.get('status')} buttonStyle="solid" onChange={handleClick}>
          <Radio.Button value="pending">مکاتبات باز</Radio.Button>
          <Radio.Button value="complete">مکاتبات آرشیو</Radio.Button>
        </Radio.Group>
      </div>
      <CreatorTable defFilter={{ status: 'pending' }} columns={columns} listAddress="automation_correspondence"
                    handleRowClassName={() => {return  searchParams.get('status') === 'complete' ? 'red20' : ''}}
                    onDoubleClickRowHandler={(row) => navigate(`/automation/correspondence/correspondence_detail/${row?.id}`)} />
    </CheckPermissionPage>
  </>);
};

export default CorrespondencePage;
