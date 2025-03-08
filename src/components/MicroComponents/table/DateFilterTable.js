import { SearchOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import MultiDatePicker from '../../datePicker/MultiDatePicker';


const DateFilterTable = () => {
  const searchInput = useRef(null);
  const filter = useSelector((state) => state.TableRedux.filter);


  const getColor = (filterNameArray) => {
    let color;
    // eslint-disable-next-line array-callback-return
    filterNameArray.map((item) => {
      if (filter[item]) {
        color = '#1677ff';
      }

    });
    return color;
  };

  const getColumnDateProps = (initialValue = [], callbackData, hidden, filterName = []) => (hidden ? {} : {

    filterDropdown: () => {


      return <div
        style={{
          padding: 8, width: '200px',
        }}
      >


        <MultiDatePicker ref={searchInput} dates={initialValue} activeAll
                         onChange={(e) => {
                           const x = {}
                           if (e) {
                             if(e[0]){
                               x.from_date =  dayjs(e[0]).startOf('day').unix()
                             }
                             if(e[1]){
                               x.end_date =   dayjs(e[1]).endOf('day').unix()
                             }
                             callbackData(x);
                           } else {
                             callbackData({ 'from_date': null, 'end_date': null });
                           }
                         }}
                         isMulti
                         placeholder="تاریخ"
                         currentDate />


      </div>;
    }, filterIcon: () => (<SearchOutlined
      style={{
        color: getColor(filterName),
      }}
    />), filterDropdownProps: {
      onOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });


  return [getColumnDateProps];
};

export default DateFilterTable;