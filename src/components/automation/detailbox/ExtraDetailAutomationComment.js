import React from 'react';
import { useSelector } from 'react-redux';
import CommentModal from '../../CommentModal';
import { hasPermission } from '../../../permission/module';

const ExtraDetailAutomationComment = ({
                                        PrintButton, dataId, dontSendFile, hiddenReplayBtn,
                                      }) => {

  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end gap-2 mb-2">
        {PrintButton && <div className="d-flex align-items-center justify-content-end">{PrintButton}</div>}

        {hasPermission(`automation_${automationAddress}`, ['reply']) && !hiddenReplayBtn && (
          <CommentModal dontSendFile={dontSendFile}
                        inDetail


                        rowData={{ id: dataId }}
          />
        )}
      </div>
    </div>
  );
};

export default ExtraDetailAutomationComment;