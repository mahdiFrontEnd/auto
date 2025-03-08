import React, { useState } from 'react';
import { TreeSelect } from 'antd';


const CustomTree = (props) => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const onExpand = (keys) => {
    setExpandedKeys(keys);
  };

  const handleNodeClick = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter((k) => k !== key));
    } else {
      setExpandedKeys([...expandedKeys, key]);
    }
  };


  return (<TreeSelect
    {...props}
    treeTitleRender={(e) => {
      return <div onClick={() => handleNodeClick(e.id)} style={{ cursor: 'pointer' }}>{e.name}</div>;
    }}
    treeExpandedKeys={expandedKeys}
    onTreeExpand={onExpand}
  />);
};


export default CustomTree;