import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import { handleData } from '../../../helper/ConvertData';

const { SHOW_PARENT } = TreeSelect;

const TreeSelectFilterTable = (loading) => {
  const filter = useSelector((state) => state.TableRedux.filter);

  const getColumnSelectProps = (initialValue = '[]', dataIndex, placeholder, dataArray, getData, callbackData, mode = 'multiple', hidden, fieldNames) => {

    return hidden ? {} : {

      filterDropdown: () => (<div className={`p-3 w-fit `} onKeyDown={(e) => e.stopPropagation()}>
        <TreeSelect style={{ width: '180px' }} loading={loading}
                    defaultValue={mode === 'multiple' ? filter[dataIndex] ? JSON.parse(initialValue) : [] : ''}
                    fieldNames={fieldNames ?? {}}
                    treeCheckable
                    showCheckedStrategy={SHOW_PARENT}
                    treeData={dataArray}     treeNodeFilterProp="title"
                    onChange={(e) => {
                      callbackData(handleData(e));
                    }}
                    showSearch
                    value={mode === 'multiple' ? filter[dataIndex] ? JSON.parse(filter[dataIndex]) : [] : filter[dataIndex]}

                    mode={mode} allowClear={mode === 'multiple'} placeholder={placeholder} />

      </div>),
      filterIcon: () => (<SearchOutlined style={{ color: initialValue !== '[]' ? '#1677ff' : undefined }} />),
      // onFilter: (value, record) => (record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())),
        filterDropdownProps: {
          onOpenChange: (show) => {
        if (show && !dataArray.length) {
          getData();
        }

      },
      },

    };
  };


  return [getColumnSelectProps];
};

export default TreeSelectFilterTable;