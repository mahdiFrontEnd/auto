import Common from '../common/common';


const GetRequestProductIdList = (setAutomationUserList, setAutomationUserListLoading, params = {}) => {
  // eslint-disable-next-line no-unused-expressions
  setAutomationUserListLoading && setAutomationUserListLoading(true);
  Common.request({
    success: (data) => {
      // eslint-disable-next-line no-unused-expressions
      setAutomationUserListLoading && setAutomationUserListLoading(false);
      setAutomationUserList(data?.result);
    },
  }).addParams({ ...params }).automationUserList();

};
export default GetRequestProductIdList;
