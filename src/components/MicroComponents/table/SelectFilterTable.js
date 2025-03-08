import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';


const SelectFilterTable = (loading) => {
  const filter = useSelector((state) => state.TableRedux.filter);

  const getColumnSelectProps = (initialValue = '[]',
                                dataIndex,
                                placeholder,
                                dataArray, getData,
                                callbackData,
                                mode = 'multiple',
                                hidden,
                                fieldNames,
                                showSecondSelectOption,
                                initialValue2 = '[]',
                                dataIndex2,
                                placeholder2,
                                dataArray2,
                                getData2,
                                callbackData2,
                                mode2 = 'multiple',
                                fieldNames2) => (


    hidden ? {} : {
      filterDropdown: () => (<div className={`p-3 w-fit d-flex flex-column `} onKeyDown={(e) => e.stopPropagation()}>
        <Select style={{ width: '180px' }} loading={loading}
                defaultValue={mode === 'multiple' ? (filter[dataIndex] ? JSON.parse(initialValue) : []) : ''}
                fieldNames={fieldNames ?? {}}


                value={mode === 'multiple' ? (filter[dataIndex] ? JSON.parse(filter[dataIndex]) : []) : filter[dataIndex]}
                filterOption={(input, option) => {

                  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());

                }}
                optionFilterProp="label"
                onChange={callbackData}
                options={dataArray} mode={mode} allowClear={mode === 'multiple'} placeholder={placeholder} />


        {showSecondSelectOption ? <Select style={{ width: '180px' }} loading={loading}
                                          defaultValue={mode2 === 'multiple' ? (filter[dataIndex2] ? JSON.parse(initialValue2) : []) : ''}
                                          fieldNames={fieldNames2 ?? {}}


                                          value={mode2 === 'multiple' ? (filter[dataIndex2] ? JSON.parse(filter[dataIndex2]) : []) : filter[dataIndex2]}
                                          filterOption={(input, option) => {

                                            return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());

                                          }}
                                          optionFilterProp="label"
                                          onChange={callbackData2}
                                          options={dataArray2} mode={mode2} allowClear={mode2 === 'multiple'}
                                          placeholder={placeholder2} />

          : ''}


      </div>), filterIcon: () => (<SearchOutlined
        style={{ color: initialValue !== '[]' ? '#1677ff' : undefined }} />), // onFilter: (value, record) => (record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())),

      filterDropdownProps: {
        onOpenChange: (show) => {

          // onFilterDropdownOpenChange: (show) => {

          if (show && !dataArray.length) {
            getData();
          }
        },

      },

    });


  return [getColumnSelectProps];
};

export default SelectFilterTable;