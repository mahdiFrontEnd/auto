import React from 'react';
// import {useSelector} from "react-redux";
// import UseSetParams from "../../../helper/UseSetParams";
// import SearchFilterTable from "../../../components/MicroComponents/table/SearchFilterTable";
import UpdateCreatePlace from './UpdateCreatePlace';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const PlaceColumn = () => {


  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      className: 'text-start ',
      key: 'name',
        render: (text) => {
          return (
            <div style={{ padding: '7px' }}>
              {text}
            </div>
          );
        },

    },


    // {
    //   title: 'انباردار',
    //   dataIndex: 'storekeeper',
    //   className: 'text-start ',
    //   key: 'storekeeper',
    //   render: (item) => {
    //     return (
    //       <div className="text-center  d-flex flex-column w-100">
    //         {item?.position}
    //          </div>
    //     );
    //   },


    // },


    {
      title: 'نوع',
      dataIndex: 'parent_id',
      className: 'text-center ',
      key: 'parent_id',
      render: (text, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            {`${text}` === 'null' ? " اصلی" :row.is_partition ? "پارتیشن" : "زیرمجموعه"}
          </div>
        );
      },

    },


    {
      title: 'وضعیت',
      dataIndex: 'status',

      key: 'status',
      render: (text) => {
        return (
          <span className={`${Number(text) ? 'text-success' : 'text-danger'}`}>
            {Number(text) ? 'فعال' : 'غیر فعال'}
          </span>
        );
      },

    },
    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              <UpdateCreatePlace rowData={row} />
              {!row.children_place ? <ConfirmDeleteModal id={row.id} apiAddress="storehouse/place/remove" /> : ""}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default PlaceColumn;
