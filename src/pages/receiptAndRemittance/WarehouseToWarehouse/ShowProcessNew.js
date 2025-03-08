import React, { useState } from 'react';
import { Button, Modal, Timeline, Typography } from 'antd';
import { TbEye } from 'react-icons/tb';
import dayjs from 'dayjs';
import ShowDetailsOfWarehouseToWarehouseNew from './ShowDetailsOfWarehouseToWarehouseNew';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';


const ShowProcessNew = ({ data, TooltipText, title }) => {
  const [open, setOpen] = useState(false);
  const { Text } = Typography;
  const showModal = () => {

    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log(data);

  return (<>

    <div onClick={showModal}>
      <IconBtn TooltipText={TooltipText}
               btnClass="blueIconBtn"
               icon={<TbEye size={22} />} /></div>


    <Modal
      open={open}
      width={800}
      title={title ?? TooltipText}
      onCancel={handleCancel}
      footer={[<Button key="back" onClick={handleCancel}>
        انصراف
      </Button>,

      ]}
    >
      <ShowDetailsOfWarehouseToWarehouseNew data={data} />
      <div className="p-4">


        <Timeline mode="right">
          {data?.process_statuses?.map((item) => (<Timeline.Item

            key={item?.id}
            label={<div className="me-2 mb-3">

              <div>
                <div>
                  <Text>{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                </div>
                <div><Text type="secondary">
                  {dayjs(item?.created_at).format('HH:mm YYYY-MM-DD')}
                </Text>
                </div>
              </div>
            </div>}
          >
            <div className="ms-2 mb-3">

              <div>
                <Text strong>
                  <div className="value ">{item?.description_status}</div>
                </Text>
              </div>


              <div className="text-gray fs-6">
                {item?.description}
              </div>
            </div>
          </Timeline.Item>))}


          {data.accessible_users &&
            <Timeline.Item dot={<div style={{ marginTop: '-4px', color: '#371', borderColor: '#371' }}
                                     className="ant-timeline-item-head ant-timeline-item-head-green"></div>}
                           label={<div className="value me-2 mb-3" style={{ color: '#371' }}>
                             {`${data?.accessible_users.first_name} ${data?.accessible_users.last_name}`}
                           </div>}
            >
              <div className="ms-2 mb-3">

                  <Text style={{ color: '#371' }} strong>در انتظار </Text>


              </div>
            </Timeline.Item>}


        </Timeline>
      </div>

    </Modal>
  </>);
};


export default ShowProcessNew;