import React from 'react';

const BirthdateBox = ({data}) => {
  return (
     <>
       {data.birthdate ? <div className="mb-4 col-md-6 col-xl-4 col-xxl-3"><div className="defBox h-100 ">

         {data.birthdate?.length ? (<div className="d-flex justify-content-center pt-3 align-items-center flex-column gap-3">


           <img width="80" src="/happy-birthday.png" alt="happy-birthday" />
           {/*<LiaBirthdayCakeSolid size={150} color="#f78e20" />*/}
           <h4 className="mb-0 text-center lh-md flex-1">زادروز تولدتان مبارک</h4>

           {data.birthdate.map((item) => (<div key={item.first_name + item.last_name}>
             <p className="d-flex align-items-center gap-1">

                  <span
                    style={{ fontSize: '13px' }}>{`${item.role} گرامی ${item.gender === 1 ? 'آقای' : 'خانم'} `}</span>
               <br />
               <strong style={{
                 fontSize: '16px', color: '#f78e20',
               }}>{`${item.first_name} ${item.last_name}`}</strong>
               <br />

             </p>
           </div>))}
           {/*<span>مبارک</span>*/}
         </div>) : ''}
       </div>
       </div> : ''}
     </>

  );
};

export default BirthdateBox;