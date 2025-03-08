import React from 'react';

import { Media } from 'reactstrap';
import RefersDetail from '../refers/Refers';
import LoadingAutoDetailReferences from '../../../../layouts/loader/LoadingAutoDetailReferences';


const References = ({data, loading }) => {
  return (
    <>
      {!loading ? <>

        <div>
          {data.length > 0 ? (data.map((item) => <>
            <RefersDetail key={item.user_id} data={item} /></>)) : (
            <Media className="defBox d-flex ">هیچ ارجاعی وجود ندارد.</Media>)}
        </div>
      </> : <LoadingAutoDetailReferences />}
    </>
  );
};

export default References;