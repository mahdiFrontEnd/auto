import Common from '../common/common';
import { placeList } from '../../../../helper/jsons/placaList';


const GetAutomationUserList = (setAutomationUserList, setAutomationUserListLoading, params = {}, setFlatList) => {

  // eslint-disable-next-line no-unused-expressions
  setAutomationUserListLoading && setAutomationUserListLoading(true);
  Common.request({
    success: (data) => {

      const userList = data?.result;
      // eslint-disable-next-line no-unused-expressions
      setAutomationUserListLoading && setAutomationUserListLoading(false);

      let newData = [];
      placeList.forEach(({ workplace, workplaceName }, ) => {
        const employees = userList[workplace] || [];

        if (employees.length) {
          const x = employees.map(emp => emp.id);
          newData = [...newData, {
            title: workplaceName, value: JSON.stringify(x), // key: `0-${index}`,
            children: employees.map((emp) => ({
              title: `${emp.first_name} ${emp.last_name}`, value: emp.id,
              // key: `0-${index}-${empIndex + 1}`,
              workplace: emp.workplace.toString(),
            })),
          }];
        }
      });

      const flatResult = Object.values(userList).flat().map(person => ({
        value: person.id, label: `${person.first_name} ${person.last_name}`,
      }));


      // eslint-disable-next-line no-unused-expressions
      setAutomationUserList && setAutomationUserList(newData);
      // eslint-disable-next-line no-unused-expressions
      setFlatList && setFlatList(flatResult);
    },
  }).addParams(params).automationUserList();

};
export default GetAutomationUserList;



