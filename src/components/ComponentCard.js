// const ComponentCard = ({children, title, bg, classNames = 'mb-2',CardBodyClass=''}) => {
const ComponentCard = ({ children, CardBodyClass = '' }) => {
  return (
    <div className={`mb-2 ${CardBodyClass}`}>{children}</div>
    // <>
    //     {bg ? (
    //         <div className="mb-0">
    //             <div>{children}</div>
    //         </div>
    //     ) : (
    //         <Card className={classNames}>
    //             {title && <CardTitle tag="h4" className="border-bottom p-3 mb-0">
    //                 {title}
    //             </CardTitle>
    //             }
    //             <CardBody className={CardBodyClass}>
    //                 <div>{children}</div>
    //              </CardBody>
    //           </Card>
    //     )}
    // </>
  );
};


export default ComponentCard;
