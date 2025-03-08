import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import TableBox from './TableBox';
import { getDataTable2 } from '../../../api/automation/getDataTable';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import {
  getConfig,
  getDataRows,
  getFilter,
  getFullTableData,
  getTotalCount,
} from '../../../store/TableRedux/TableRedux';

const CreatorTable = ({
                        defFilter = {},
                        childrenColumnName,
                        expandable, handleRowClassName,
                        listAddress,
                        onDoubleClickRowHandler,
                        columns, endAddress="/list"
                      }) => {

  const didMountRef = useRef(false);
  const dispatch = useDispatch();

  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const loading = useSelector((state) => state.loadingReducer.loader);
  const filter = useSelector((state) => state.TableRedux.filter);
  const dataRows = useSelector((state) => state.TableRedux.dataRows);
  const total = useSelector((state) => state.TableRedux.totalCount);

  const [searchParams] = useSearchParams();


  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    dispatch(getFilter({ ...defFilter, ...params }));
  }, [searchParams, listAddress]);


  const getData = ({ data, totalCount, config }) => {
    dispatch(getDataRows(data));
    dispatch(getTotalCount(totalCount));
    if (config) {
      dispatch(getConfig(config));
    }

  };
  useEffect(() => {
    if (didMountRef.current) {
      getDataTable2(listAddress + (endAddress || ""), filter, dispatch, (data) => {
        dispatch(getFullTableData(data));
        getData(data);
      });
    } else {
      didMountRef.current = true;
    }
  }, [getAgain, JSON.stringify(filter), listAddress]);


  useEffect(() => {
    dispatch(getDataRows([]));
    dispatch(getTotalCount(0));
    const params = Object.fromEntries(searchParams.entries());
    dispatch(getFilter({ ...defFilter, ...params }));
    dispatch(getAgainHandler());
  }, [listAddress]);

  return (<div>

    <TableBox  handleRowClassName={handleRowClassName} childrenColumnName={childrenColumnName} loading={loading}
              columns={columns}
              dataRows={dataRows}
              totalCount={total}
              onDoubleClickRow={(row) => {
                // eslint-disable-next-line no-unused-expressions
                onDoubleClickRowHandler && onDoubleClickRowHandler(row);
              }}
              expandable={expandable}
    />
  </div>);
};

export default CreatorTable;