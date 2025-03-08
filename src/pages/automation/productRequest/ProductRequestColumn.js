import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { TfiMoney } from 'react-icons/tfi';
import SearchFilterTable from '../../../components/MicroComponents/table/SearchFilterTable';
import UseSetParams from '../../../helper/UseSetParams';
import SelectFilterTable from '../../../components/MicroComponents/table/SelectFilterTable';
import GetAutomationUserList from '../../../api/http_request/Model/automation/automationUserList';
// import GetRequestProductIdList from '../../../api/http_request/Model/automation/GetRequestProductIdList';
// import RejectAcceptBox from './RejectAcceptBox';
import RejectAcceptBox from './RejectAcceptBox';
import ShowProcess from './ShowProcess';
import AutomationAddModal from '../../../components/automation/AutomationFunctionButtons/AutomationAddModal';
import TreeSelectFilterTable from '../../../components/MicroComponents/table/TreeSelectFilterTable';

const ProductRequestColumn = () => {
  const [getColumnTreeSelectProps] = TreeSelectFilterTable();

  const filter = useSelector((state) => state.TableRedux.filter);
  const [ListLoading, setListLoading] = useState(false);
  const [getColumnSelectProps] = SelectFilterTable(ListLoading);
  const [userList, setUserList] = useState([]);
  // const [idsList, setIdsList] = useState([]);
  const [listStatus, setListStatus] = useState([]);

  const fullTableData = useSelector((state) => state.TableRedux.fullTableData);

  const [handleSetParams] = UseSetParams();

  useEffect(() => {

    if (fullTableData?.listStatus && !listStatus.length) {
      setListStatus(fullTableData.listStatus.map((item) => (
        { label: item?.persian_title, value: `${item.id}` }
      )));
    }
  }, [fullTableData]);

  const GetAutomationUser = () => {
    GetAutomationUserList(setUserList, setListLoading, { deactivate: 1 });
  };
  // const GetRequestProductIds = () => {
  //   GetRequestProductIdList(setIdsList, setListLoading);
  // };
  const funcHandleSetParams = (newFilter) => {
    handleSetParams(newFilter);
  };
  const [getColumnSearchProps] = SearchFilterTable();


  const columns = [
    {
      title: 'درخواست کننده',
      dataIndex: 'created_by',
      render: (text, row) => {

        return (
          <div className="text-start d-flex align-items-center gap-2 ">
            <img
              className="circleImageMini "
              src={row?.image_of_created_by?.length > 4 ? row?.image_of_created_by : '/noImage.png'}
              alt="userImage"
            />


            <Tooltip title="جستجوی این کاربر"><span onClick={() => {
              funcHandleSetParams([{ key: 'from', value: [row?.created_user_id] }]);
            }}><CiSearch /></span></Tooltip>

            <span>{text}</span>


          </div>
        );
      },
      key: 'created_by',

      ...getColumnTreeSelectProps(
        filter?.from,
        'from',
        'فرستنده',
        userList,
        GetAutomationUser,
        (res) => {
          funcHandleSetParams([{ key: 'from', value: res }]);
        },
      ),




    },
    {
      title: 'شماره درخواست',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('شماره درخواست', filter.id, (res) => {
        funcHandleSetParams([{ key: 'id', value: res }]);
      }),


    },
    {
      title: 'نام کالا ',
      dataIndex: 'request_name',
      ...getColumnSearchProps('نام کالا', filter.request_name, (res) => {
        funcHandleSetParams([{ key: 'request_name', value: res }]);
      }),
    },
    {
      title: 'مقدار',
      dataIndex: 'count_request',
      render: (text, row) => {

        return (
          <div>
            {text} {row?.unit?.unit_value}
          </div>
        );
      },
    },
    {
      title: 'محدودیت زمانی خرید',
      dataIndex: 'dead_time',
      render: (text) => {

        return (
          <span>
            {text ? `${text} روز` : 'ندارد'}
          </span>
        );
      },
    },
    {
      title: 'وضعیت کنونی',
      dataIndex: 'status',
      render: (text) => {

        return (
          <div className="">
            {text?.persian_title}
          </div>
        );
      },
      ...getColumnSelectProps(
        filter?.now_status,
        'now_status',
        'وضعیت کنونی',
        listStatus,
        false,
        (res) => {

          funcHandleSetParams([{ key: 'now_status', value: `${res}` }]);
        }, false,
      ),


    },
    {
      title: 'در انتظار',
      dataIndex: 'status',
      render: (text, row) => {

        return (
          <div className="">
            <div>
              {
                text?.waiting_status
              }
              {row.relation_request_id && (<><span>/</span>
                <Link to={row.relation_request_id} target="_blank"> اعلامیه پرداخت </Link></>)}

            </div>
            <div className="text-gray mt-1">{row.waiting_name}
            </div>
          </div>
        );
      },


    },
    {
      title: 'عملیات', dataIndex: 'function', key: 'function', fixed: 'right', render: (text, row) => {
        return <div className="text-center d-flex gap-1 d-flex justify-content-center">
          <RejectAcceptBox data={row} />
          {row?.boxPayment &&
            <AutomationAddModal disabled={['subject']} defData={{ subject: row.request_name }}
                                address="automation_payment" title="اضافه کردن اعلامیه پرداخت"
                                addValues={{ request_ware: row?.id }}
                                icon={<TfiMoney size={22} />} />

          }
          <ShowProcess data={row} TooltipText="نمایش فرایند انجام شده" />


        </div>;
      },
    },
  ];
  return [columns];
};

export default ProductRequestColumn;