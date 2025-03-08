import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {QrReader} from 'react-qr-reader';
import Storehouse from '../../../api/http_request/Model/storehouse/Storehouse';


const QrcodeScanner = () => {//  user
    const [error] = useState(null);
    const [loading,setLoading ] = useState(false);
    // const [resultData, setResultData] = useState({});
    const soundSuccess = new Audio('/success-221935.mp3');
    const soundError = new Audio('/error-10-206498.mp3');
    const handleScan = (data) => {

        if (data) {
            console.log(data.text )
            handlePostRequest({qrcode : data.text});
        }
    };

    const handleError = (err) => {
        console.error(err);
    };
    const handlePostRequest = (data) => {
        console.log(data)
        Storehouse.request({
            beforeSend: () => {
                setLoading(true);
            }, success: ({result}) => {
                setLoading(false);
                if (result === 0) {
                    // setResultData(result);
                    soundError.play();

                } else {
                    soundSuccess.play();
                }
            }, error: ({res}) => {
                setLoading(false);
                toast.error(res);
            }, final: () => {
                setLoading(false);
            },
        }).getQrCode(data);


    };
    // useEffect(() => {
    //   if (!resultData.show) {
    //     // setData();
    //
    //   }
    // }, [resultData.show]);

    return (<div className="px-3">

        <div className=" position-relative h-100">

            <div className="d-flex justify-content-center align-items-center">


                <div style={{maxWidth: '30rem', maxHeight: '30rem'}} className="w-100 h-100 p-0">
                    <div className="position-relative h-100 w-100">
                        {/*{!resultData.show ?*/}
                        <div className="qr-video-container rounded-3  ">
                            <QrReader
                                delay={1000}
                                constraints={{facingMode: 'environment'}}
                                onError={handleError}
                                onResult={handleScan}
                                style={{width: '100%'}}
                            />
                            {loading ? 'loading...' : ''}

                        </div>
                        <div style={{
                            borderRadius: '10px 0 0 0',
                            height: '20px',
                            width: '20px',
                            borderTop: '4px solid orange',
                            borderLeft: '4px solid orange',
                        }}
                             className="position-absolute top-0 left-0"></div>
                        <div style={{
                            borderRadius: '0 10px  0 0',
                            height: '20px',
                            width: '20px',
                            borderTop: '4px solid orange',
                            borderRight: '4px solid orange',
                        }}
                             className="position-absolute top-0 right-0"></div>
                        <div style={{
                            borderRadius: '0 0 0 10px',
                            height: '20px',
                            width: '20px',
                            borderBottom: '4px solid orange',
                            borderLeft: '4px solid orange',
                        }}
                             className="position-absolute left-0 bottom-0"></div>
                        <div style={{
                            borderRadius: '0 0 10px 0',
                            height: '20px',
                            width: '20px',
                            borderBottom: '4px solid orange',
                            borderRight: '4px solid orange',
                        }}
                             className="position-absolute right-0 bottom-0"></div>

                        <div className="animateBox "></div>

                    </div>
                </div>
            </div>
            {error && <p className="text-orange-500  text-center mt-12 text-xl ">{error}</p>}
            <p className="orangeText fw-bold  text-center mt-8 text-2xl ">لطفا QR Code را مقابل دوربین قرار دهید.</p>


        </div>

    </div>);
};


export default QrcodeScanner;