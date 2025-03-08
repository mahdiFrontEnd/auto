import React from 'react';
import { Tooltip } from 'antd';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateProduct from './UpdateCreateProduct';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';
import { baseURL } from '../../../api/http_request/url';


const UserColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps] = SearchFilterTable();
  //
  // const [handleSetParams] = UseSetParams();
  //
  // const funcHandleSetParams = (newFilter) => {
  //   handleSetParams(newFilter);
  // };

  const columns = [

    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => {
        console.log(row?.final_code);
        return (

          <ShowImageBox name={text} qrCode={row?.final_code}
                        srcImage={row?.attachments && row?.attachments.length && row?.attachments[0] ? `${baseURL}/${row?.attachments[0]?.path?.indexArray?.small}` : '/noImage.png'} />
        );
      },
      // ...getColumnSearchProps('نام محصول', filter?.name, (res) => {
      //   funcHandleSetParams([{ key: 'name', value: res }]);
      // }),
    },

    // {
    //   title: 'نام محصول',
    //   dataIndex: 'name',
    //   key: 'name',
    //   ...getColumnSearchProps('نام محصول', filter?.name, (res) => {
    //     funcHandleSetParams([{ key: 'name', value: res }]);
    //   }),
    // },
    {
      title: 'کد ',
      dataIndex: 'final_code',
      key: 'final_code',

      // , ...getColumnSearchProps('کد', filter.sku, (res) => {
      //     funcHandleSetParams([{key: 'sku', value: res}])
      // }),
    },
    // {
    //   title: 'توضیحات ',
    //   dataIndex: 'description',
    //   key: 'description',
    //
    // ...getColumnSearchProps('توضیحات', filter.description, (res) => {
    //     funcHandleSetParams([{key: 'description', value: res}])
    // }),
    // },

    //
    //     {
    //     title: 'موجود',
    //     dataIndex: 'username',
    //     key: 'username', ...getColumnSearchProps('نام کاربری ', filter.username, (res) => {
    //         funcHandleSetParams([{key: 'username', value: res}])
    //     }),
    // },
    //

    {
      title: 'دسته بندی ',
      dataIndex: 'category',
      key: 'category',
      render: (text) => {
        const fullName = [];
        let lastName = '';
        const getAllNames = (obj) => {
          while (obj) {
            fullName.push(<p className="mb-0" key={obj.id}>- <span>{obj.name}</span><br /></p>);

            if (!obj?.children_category) {
              lastName = obj?.name;
            }
            obj = obj.children_category; // به سطح بعدی برو

          }
          return fullName;
        };


        return (
          <Tooltip title={getAllNames(text)}>
            <div>{lastName}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'برند ',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => {
        return (
          <div>{text?.name || '...'}</div>
        );
      },
    },
    {
      title: 'واحد ',
      dataIndex: 'unit',
      key: 'unit',
      render: (text) => {
        return (
          <div>{text?.unit_value}</div>
        );
      },
    },
    // {
    //   title: 'نوع ',
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (text) => {
    //     return (
    //       <div>{text?.name}</div>
    //     );
    //   },
    // },

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
          <div className="text-center d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {hasPermission('storehouse_product', ['update']) && <UpdateCreateProduct rowData={row} />}

              {hasPermission('storehouse_product', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/product/remove" id={row?.id} />

              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default UserColumn;
