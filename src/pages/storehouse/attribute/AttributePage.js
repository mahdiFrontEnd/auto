import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import UpdateCreateAttribute from './UpdateCreateAttribute';
import { HandleSetParamsInRedux } from '../../../helper/HandleSetParamsInRedux';
import { getFilter } from '../../../store/TableRedux/TableRedux';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import AttributeColumn from './AttributeColumn';
import TitleBox from '../../../components/TitleBox';

const AttributePage = () => {
  const [searchParams] = useSearchParams();
  const [columns] = AttributeColumn();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoading(true);
  //
  //   Products.request({
  //     success: ({ result }) => {
  //       setRoleList(result.data);
  //     },
  //     final: () => {
  //       setLoading(false);
  //     },
  //   })
  //     .addParams(filter)
  //     .attribute();
  // }, [getAgain, filter]);

  useEffect(() => {
    HandleSetParamsInRedux(dispatch, getFilter, searchParams);
  }, [searchParams]);

  return (
    <>


      <TitleBox title="ویژگی ها">
        <div className="d-flex gap-2 align-items-center">
          <UpdateCreateAttribute />
          <DeleteFilterTable />
        </div>
      </TitleBox>


      <CheckPermissionPage module="storehouse_attribute">
        <CreatorTable
          columns={columns}
          listAddress="storehouse/attribute"
          childrenColumnName="childs"
          expandable={{
            childrenColumnName: 'childs',
            indentSize: 15,
          }}
        />
      </CheckPermissionPage>
    </>
  );
};

export default AttributePage;
