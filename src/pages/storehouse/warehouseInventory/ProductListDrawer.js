import React, { useState } from 'react';
import { Button, Drawer, Table } from 'antd';
// eslint-disable-next-line import/no-cycle
import ProductInventoryColumn from './ProductInventoryColumn';


const ProductListDrawer = ({ data }) => {
  const [columns] = ProductInventoryColumn();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>نمایش محصولات</Button>
      <Drawer
        title="محصولات انبار"
        placement="bottom"
        width={500}
        height="80%"
        onClose={onClose}
        open={open}
      >
        <Table className="reverseBgColor" size="small" rowKey={(record) => record.id} columns={columns}
               pagination={false} dataSource={data} />
      </Drawer>
    </div>
  );
};

export default ProductListDrawer;