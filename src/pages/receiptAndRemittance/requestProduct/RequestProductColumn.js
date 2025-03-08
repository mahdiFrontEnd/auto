import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Eye, EyeSlash } from 'iconsax-react';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
// import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
// import UseSetParams from '../../../helper/UseSetParams';
//
// import TreeSelectFilterTable from '../../../components/MicroComponents/table/TreeSelectFilterTable';
// import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';

const RequestProductColumn = () => {
  const [searchParams] = useSearchParams();

  // const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  // const [userList, setUserList] = useState([]);
  const [isMyRequest, setIsMyRequest] = useState(false);
  // const filter = useSelector((state) => state.TableRedux?.filter);
  // const [getColumnTreeSelectProps] = TreeSelectFilterTable();
  // const [getColumnSearchProps] = SearchFilterTable();
  // const navigate = useNavigate();

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
  useEffect(() => {
    setIsMyRequest(searchParams.get('my_request'));
  }, [searchParams.get('my_request')]);

  const getType = (nextStep) => {

    let address = 'status';
    if (nextStep?.type === 'storehouse_outLink') {
      address = 'EntryExit';
    }
    return address;
  };
  const columns = [
    {
      title: 'درخواست کننده',
      dataIndex: 'user',
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
      title: 'عنوان',
      dataIndex: 'request_name',
      key: 'request_name',
      // ...getColumnSearchProps('عنوان', filter.request_name, (res) => {
      //   funcHandleSetParams([{ key: 'request_name', value: res }]);
      // }),
    },
    {
      title: 'تاریخ درخواست',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>{dayjs(item).format('HH:mm YYYY-MM-DD')}</span>;
      },
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (text, row) => {
        return <div className="d-flex justify-content-center gap-2 flex-column align-items-center">
          <div className="fw-bold" style={{ color: text?.colors }}>{text?.persian_title}</div>
          {row?.next_step ? <div className="d-flex gap-2 text-gray">

            <span>در انتظار {row?.next_step[0]?.step_fa}</span>
          </div> : ''}
        </div>;
      },
    },
    {
      title: 'عملیات',
      dataIndex: 'id',
      key: 'id',
      render: (text, { next_step, next_status }) => {


        return (
          <div className="d-flex justify-content-center gap-2">
            {isMyRequest === 'true' ? (
              <Link
                to={`/receiptAndRemittance/requestProduct/show/${text}?my_request=${isMyRequest}`}
              >
                <IconBtn TooltipText="نمایش" btnClass="blueIconBtn" icon={<Eye size={24} />} />
              </Link>
            ) : (
              <Link
                to={`/receiptAndRemittance/requestProduct/${next_status ? getType(next_step[0]) : 'show'}/${text}?my_request=${isMyRequest}`}
              >
                <IconBtn TooltipText="نمایش" btnClass={next_status ? 'orangeIconBtn' : 'blueIconBtn'}
                         icon={next_status ? <EyeSlash size={24} /> : <Eye size={24} />} />
              </Link>
            )}
          </div>
        );
      },
    },

  ];
  return [columns];
};

export default RequestProductColumn;
