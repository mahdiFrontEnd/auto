import React from 'react';
// import { useSelector } from 'react-redux';
import { Eye } from 'iconsax-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';

// import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
// import UseSetParams from '../../../helper/UseSetParams';
//
// import TreeSelectFilterTable from '../../../components/MicroComponents/table/TreeSelectFilterTable';
// import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';

const ReceiptProductColumn = (address) => {

  // const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  // const [userList, setUserList] = useState([]);
  // const filter = useSelector((state) => state.TableRedux?.filter);
  // const [getColumnTreeSelectProps] = TreeSelectFilterTable();
  // const [getColumnSearchProps] = SearchFilterTable();
  // // const navigate = useNavigate();
  //
  // const [handleSetParams] = UseSetParams();
  // const funcHandleSetParams = (newFilter) => {
  //   handleSetParams(newFilter);
  // };
  //
  // const GetAutomationUser = () => {
  //   GetAutomationUserList(
  //     setUserList,
  //
  //     null,
  //     { deactivate: 1 },
  //   );
  // };


  const columns = [
    {
      title: 'ثبت کننده',
      dataIndex: 'create_by',
      render: (text) => {
        return <span>{text ? `${text?.first_name} ${text?.last_name}` : ''}</span>;
      },


      key: 'person_id',
      // ...getColumnTreeSelectProps(
      //   filter?.person_id,
      //   'person_id',
      //   'نام و نام خانوادگی',
      //   userList,
      //   GetAutomationUser,
      //   (res) => {
      //     funcHandleSetParams([{ key: 'person_id', value: res }]);
      //   },
      //   undefined,
      //   ['message'].includes(automationAddress),
      // ),
    },
    {
      title: 'شماره درخواست',
      dataIndex: 'id',
      key: 'id',
      // ...getColumnSearchProps('شماره درخواست', filter.requestNumber, (res) => {
      //   funcHandleSetParams([{ key: 'requestNumber', value: res }]);
      // }),
    },

    {
      title: 'تاریخ ثبت',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    },

    {
      title: 'عملیات',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        return (
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`${address}/show/${text}`}
            >
              <IconBtn TooltipText="نمایش" btnClass="blueIconBtn" icon={<Eye size={24} />} />
            </Link>
          </div>
        );
      },
    },

  ];
  return [columns];
};

export default ReceiptProductColumn;
