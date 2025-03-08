import React, { useRef } from 'react';
import { QRCode, Tooltip } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { useReactToPrint } from 'react-to-print';
import { ScanBarcode } from 'iconsax-react';
import { ComponentToPrint } from '../ComponentToPrint';

const ShowImageBox = ({
                        srcImage = '/noImage.png',
                        name = '', qrCode,
                        showSearch,
                        searchTooltip = '',
                        handleClick,
                      }) => {
  const componentRefDetailPayment = useRef();

  const showPrint = useReactToPrint({
    content: () => componentRefDetailPayment.current,


  });
  return (
    <div>
      <div className="d-flex gap-2 align-items-center">
        <img
          alt="category"
          className="circleImageMini"
          src={srcImage || '/noImage.png'}
          width={40}
          height={40}
        />
        {qrCode ?

          <div>
            {/*<QRCode onClick={showPrint}*/}
            {/*        value={qrCode}*/}
            {/*        bgColor="#fff"*/}
            {/*        size={50}*/}
            {/*        className="p-1"*/}
            {/*        padding={0}*/}
            {/*        icon="./filelogo/logo.png"*/}
            {/*/>*/}
            <div className="orangeText">

              <ScanBarcode onClick={showPrint}
                           size="20"
                           variant="Outline"
              />
            </div>


            <ComponentToPrint ref={componentRefDetailPayment}>

              <div>
                <QRCode
                  value={qrCode}
                  bgColor="#fff"
                  size={500}
                  iconSize={200}
                  className="p-1"
                  padding={0}
                  icon="/filelogo/logo.png"
                />
              </div>

            </ComponentToPrint>

          </div>

          : ''}
        {showSearch ? <Tooltip title={searchTooltip}><span onClick={handleClick}><CiSearch /></span></Tooltip> : ''}


        <span>{name}</span>
      </div>
    </div>
  );
};

export default ShowImageBox;