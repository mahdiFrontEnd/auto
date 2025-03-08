import React from 'react';

const ManagersBox = ({ data }) => {
  return (
    <>
      {data.options?.managers ? data.options.managers.map((item) => (<div className="mb-4 col-md-6 col-xl-4 col-xxl-3">
            <div className="defBox  h-100">

              <div>
                <div>
                  <h5 className="mb-4 fw-bold text-black">{item.title}</h5>
                  {item.body.map((name) => (<div className="d-flex gap-2 justify-content-between mb-2 text-black fs-7 ">
                    <div>{name.name}</div>
                    <div style={{ fontSize: '12px' }}>{name.time}</div>
                    <div style={{ fontSize: '12px' }}>{name.date}</div>
                  </div>))}


                </div>
              </div>

            </div>
          </div>
        ))


        : ''}
    </>
  );
};

export default ManagersBox;