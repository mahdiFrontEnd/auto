import React, { useEffect, useState } from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Switch } from 'antd';
import CircleChartLoading from './CircleChartLoading';


const options = {
  cutout: '70%', // تغییر ضخامت حلقه (هرچه درصد بالاتر باشد، حلقه نازک‌تر می‌شود)
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false, // Disable tooltip
    },
  },
};

const LeaveTimeBox = ({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [leaveType, setLeaveType] = useState(true);
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(leaveType ? data?.month.total_vacations : data?.year.total_vacations);
  }, [leaveType, data]);


  const dataChart = {
    labels: [],
    datasets: [
      {
        data: [value?.duration_number, value?.duration_remainder_number > 0 ? value?.duration_remainder_number : 0],
        backgroundColor: [
          '#f78e20',
          '#a7a9ac',
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="defBox h-100">
      {
        value ? <>
            <div className="d-flex mb-4 align-items-center justify-content-between gap-3">
              <h5 className="mb-0 fw-bold text-black"> مرخصی ها </h5>
              <Switch value={leaveType} onChange={(e) => {
                setLeaveType(e);
              }}
                      checkedChildren="ماه جاری" unCheckedChildren="سال جاری" />
            </div>
            <div className="">
              <div className="">
                <div className="d-flex align-items-center justify-content-between mb-2">

                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary rounded-2" style={{ width: '20px', height: '20px' }} />
                    <span className="fs-7 white-space-nowrap">استفاده شده:</span>
                  </div>


                  <span className="fs-6 fw-bold text-black">{value?.duration_number > 0 ? value?.duration : '0'} </span>

                </div>


                <div className="d-flex align-items-center justify-content-between mb-2">

                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-grayLight rounded-2" style={{ width: '20px', height: '20px' }} />
                    <span className="fs-7 white-space-nowrap">مانده:</span>
                  </div>


                  <span
                    className="fs-6 fw-bold text-black">{value?.duration_remainder_number > 0 ? value?.duration_remainder : '0'} </span>

                </div>

              </div>
              <div className=" d-flex align-items-center justify-content-center">
                <div className="w-50">
                  <Doughnut data={dataChart} options={options} />
                </div>
              </div>
            </div>
          </> :

          <CircleChartLoading />

      }


    </div>
  );
};

export default LeaveTimeBox;