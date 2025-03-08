import React from 'react';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateBrands from './UpdateCreateBrands';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';
import { baseURL } from '../../../api/http_request/url';

const StorehouseColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps] = SearchFilterTable();
  // const [handleSetParams] = UseSetParams();

  // const funcHandleSetParams = (newFilter) => {
  //   handleSetParams(newFilter);
  // };

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => {
        return (
          <ShowImageBox name={text}
                        srcImage={row?.attachments && row?.attachments.length && row?.attachments[0] ? `${baseURL}/${row?.attachments[0]?.path?.indexArray?.small}` : '/noImage.png'} />
        );
      },
      // ...getColumnSearchProps('نام محصول', filter?.name, (res) => {
      //   funcHandleSetParams([{ key: 'name', value: res }]);
      // }),
    },

    {
      title: 'نام انگلیسی',
      dataIndex: 'english_name',
      // ...getColumnSearchProps('نام', filter.english_name, (res) => {
      //   funcHandleSetParams([{ key: 'english_name', value: res }]);
      // }),
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
              {hasPermission('storehouse_brand', ['edit']) && <UpdateCreateBrands rowData={row} />}
              {hasPermission('storehouse_brand', ['delete']) && !row.children_brand?.length && (
                <ConfirmDeleteModal apiAddress="storehouse/brand/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default StorehouseColumn;
