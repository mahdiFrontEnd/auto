import React, { useEffect, useState } from 'react';
import ExtraDetailAutomationComment from './ExtraDetailAutomationComment';
import ExtraDetailAutomationDetail from './ExtraDetailAutomationDetail';
import ExtraDetailAutomationRefer from './ExtraDetailAutomationRefer';

const ExtraDetailAutomation = (props) => {
  const [newProps, setNewProps] = useState(props);
  useEffect(() => {
    setNewProps(props);
  }, [props]);




  return (<div>
    {props.activeTab === '1' ? <ExtraDetailAutomationDetail {...newProps} />

      : props.activeTab === '2' ? <ExtraDetailAutomationComment {...newProps} />

        : <ExtraDetailAutomationRefer {...newProps} />

    }
  </div>);
};

export default ExtraDetailAutomation;