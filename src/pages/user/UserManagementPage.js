import React, { useEffect, useState } from 'react';
import { hasPermission } from '../../permission/module';
import CreatorTable from '../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../components/MicroComponents/DeleteFilterTable';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import UserColumn from './UserColumn';
import UpdateCreateUser from './UpdateCreateUser';
import Permissions from '../../api/http_request/Model/permissions/Permissions';
import User from '../../api/http_request/Model/User/User';
import TitleBox from '../../components/TitleBox';
import GetAutomationUserList from '../../api/http_request/Model/automation/automationUserList';


const UserManagementPage = () => {
  const [permissionList, setPermissionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [columns] = UserColumn(permissionList, roleList, managerList);

  useEffect(() => {
    if (!permissionList.length) {
      Permissions.request({

        success: ({ result }) => {
          setPermissionList(result);
        }, final: () => {
        },
      }).permission();
    }
  }, []);


  useEffect(() => {


    if (!roleList.length) {
      User.request({
        success: ({ result }) => {
          setRoleList(result);
        },
      }).role();
    }
    if (!managerList.length) {


      GetAutomationUserList(false,false,{},setManagerList);



      // User.request({
      //   success: ({ result }) => {
      //     (result);
      //   },
      // }).automationUser();

    }

  }, []);


  return (<>

    <TitleBox title="کاربران">
      {hasPermission('user', ['create']) && <UpdateCreateUser permissionList={permissionList} roleList={roleList}
                                                              managerList={managerList} />}
      <DeleteFilterTable />
    </TitleBox>

    <CheckPermissionPage module="user">

      <CreatorTable columns={columns} listAddress="user" childrenColumnName="childs"
                    expandable={{ childrenColumnName: 'childs' }} />

    </CheckPermissionPage></>);
};

export default UserManagementPage;
