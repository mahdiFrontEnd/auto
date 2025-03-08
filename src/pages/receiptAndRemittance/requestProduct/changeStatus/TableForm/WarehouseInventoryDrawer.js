import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { InfoCircle } from 'iconsax-react';
import { useSelector } from 'react-redux';
import IconBtn from '../../../../../components/MicroComponents/button/IconBtn';


const WarehouseInventoryDrawer = ({ index }) => {
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const [dataArray, setDataArray] = useState([]);
  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

   useEffect(() => {
    const resultArray = [];

    function traverse(category, subCategory, children, chart) {
      if (!children) return;

      children?.forEach(child => {
        if (child.is_partition === 1) {
          resultArray.push({
            amount: 0,
            name: `${category} - ${subCategory} - ${child.name}`,
            id: child.id,
            chart,
            in_main: child.in_main,
          });

        } else if (child.children) {
          traverse(category, child.name, child.children, child.chart);
        }
      });
    }

    receiptAndRemittanceArray[index].info_places?.forEach(mainCategory => {
      mainCategory.children?.forEach(subCategory => {
        traverse(mainCategory.name, subCategory.name, subCategory.children, subCategory.chart);
      });
    });
    setDataArray(resultArray);

  }, [JSON.stringify(receiptAndRemittanceArray[index].info_places)]);


  return (
    <div>
      <IconBtn icon={<InfoCircle variant="Outline" />} onClick={showDrawer} btnClass="greenIconBtn" />
      <Drawer
        title="موجودی انبار"
        placement="bottom"
        width={500}
        height="80%"
        onClose={onClose}
        open={open}
      >
        <div className="row">
          {dataArray.length ? dataArray.map((item, i) => (
            <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="shadow-sm p-4 text-center rounded-3 " style={{ backgroundColor: '#f8f8f8' }}>
                <p className="orangeText fw-bold fs-5 " style={{ height: '48px' }}
                   key={i}>{item.name} / {item.chart.chart_user[0].first_name} {item.chart.chart_user[0].last_name} </p>
                <p>
                  <div>


                    <p className="keyValue justify-content-between">
                      <span className="key">کل موجودی</span>
                      <span className="value">{item.in_main?.total_product || 0} {receiptAndRemittanceArray[index]?.product?.unit?.unit_value}</span>
                    </p>
                    <hr />
                    <p className="keyValue justify-content-between">
                      <span className="key">تعداد فریز شده</span>
                      <span className="value">{item.in_main?.freeze_product || 0} {receiptAndRemittanceArray[index]?.product?.unit?.unit_value}</span>
                    </p>
                    <hr />
                    <p className="keyValue justify-content-between">
                      <span className="key">تعداد در دسترس</span>
                      <span className="value">{item.in_main?.marketable_product || 0} {receiptAndRemittanceArray[index]?.product?.unit?.unit_value}</span>
                    </p>
                  </div>
                </p>
              </div>
            </div>
          )) : <p className="fw-bold">در انبار ها از این کالا وجود ندارد. </p>}


        </div>
      </Drawer>
    </div>
  );
};


export default WarehouseInventoryDrawer;