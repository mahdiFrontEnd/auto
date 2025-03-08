import React from 'react';
import { Button, Tooltip } from 'antd';

const IconBtn = ({ onClick,type="button", icon, btnClass, style = {}, loading = false, disabled = false, TooltipText = '' }) => {
  return (

    <Tooltip title={TooltipText}>
      <Button style={style} htmlType={type}
              disabled={disabled}
              loading={loading}
              className={`defIconBtn ${btnClass} `}
              onClick={onClick}>
        {!loading && icon && icon}
      </Button>
    </Tooltip>

  );
};

export default IconBtn;