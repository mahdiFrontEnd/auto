import React from 'react';

import { Media } from 'reactstrap';
import CommentsDetail from '../comment/Comments';
import LoadingAutoDetailComment from '../../../../layouts/loader/LoadingAutoDetailComment';
// eslint-disable-next-line import/no-cycle

const CommentsBox = ({
                       hasMaxWidth,

                       loading,
                       data,
                     }) => {


  return (
    <div className="">
      <div style={{ maxWidth: hasMaxWidth ? '600px' : '100%' }}>
        {!loading ? (
          <>

            {data?.list?.length > 0 ? (
              data?.list?.map((item) => <>
                <CommentsDetail showEdit key={item.id} data={item} />
              </>)
            ) : (
              <Media className="defBox ">هیچ کامنتی وجود ندارد.</Media>
            )}
          </>
        ) : (
          <LoadingAutoDetailComment />
        )}
      </div>
    </div>
  );
};

export default CommentsBox;
