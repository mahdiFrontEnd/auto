import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../layouts/loader/Loading';
import Commerce from '../../api/http_request/Model/commerce/Commerce';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import CollapseBox from '../../components/MicroComponents/CollapseBox';
import TitleBox from '../../components/TitleBox';
import ShowSearchBtn from '../../components/MicroComponents/button/ShowSearchBtn';
import FilterMap from '../../components/commerce/map/FilterCommerce';


const MapBox = React.lazy(() => import('../../components/MapBox'));


const CommerceMap = () => {
  const [dataCluster, setDataCluster] = useState([]);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Commerce.request({
      beforeSend: () => {
        setLoading(true);
      }, error: () => {
      }, success: async (data) => {
        setDataCluster(data?.result);
      }, failed: () => {
      }, final: () => {
        setLoading(false);
      },
    }).addParams(params).mapList();

  }, [params]);

  const handleSearch = (values) => {
    setParams(values);
  };
  const showSearchBox = useSelector((state) => state.PurchaseTableRedux.showSearchBox);

  return <CheckPermissionPage module="commerce_purchase">

    <TitleBox title="نقشه" afterBox={<div className="searchBox">
      <CollapseBox activeKey={showSearchBox ? ['1'] : null}
                   items={[{
                     showArrow: false,
                     headerPadding: '1px',
                     style: { backgroundColor: 'white', border: 'none' },
                     key: '1',
                     children: <FilterMap handleSearch={handleSearch} searchInfo={dataCluster?.config?.serach_info} />,
                   }]} />

    </div>}>

      <ShowSearchBtn />
    </TitleBox>


    {loading && <Loading isFullLoading />}
    <div style={{ height: 'calc(100vh - 200px)' }}>


      <React.Suspense fallback={<div>Loading map...</div>}> <MapBox zoom={3} dataCluster={dataCluster}
                                                                    total={dataCluster?.totalCount} /></React.Suspense>


    </div>

  </CheckPermissionPage>;
};

export default CommerceMap;
