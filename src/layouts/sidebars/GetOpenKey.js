import { useLocation } from 'react-router-dom';

const useGetOpenKey = () => {
  const location = useLocation();

  const { pathname ,search} = location;
  let initialOpenKey = ['/Official'];
  let selectedKeys = pathname;

  if (pathname.search('/storehouse/place') !== -1) {
    selectedKeys = '/storehouse/place';
  }
  if (pathname.search('/storehouse/warehouseInventory') !== -1) {
    selectedKeys = '/storehouse/warehouseInventory';
  }
  if (pathname.search('/storehouse/warehouseInventoryProduct') !== -1) {
    selectedKeys = '/storehouse/warehouseInventoryProduct';
  } else if (pathname.search('/correspondence') !== -1) {
    selectedKeys = '/automation/correspondence?status=pending';
  } else if (pathname.search('/payment') !== -1) {
    selectedKeys = '/automation/payment';
  } else if (pathname.search('/report/report_detail') !== -1 || pathname === '/report') {
    selectedKeys = '/automation/report';
  } else if (
    pathname.search('/commerce/purchase_detail/') !== -1 ||
    pathname === '/commerce/purchase'
  ) {
    selectedKeys = '/commerce/purchase';
  } else if (pathname.search('/request') !== -1) {
    selectedKeys = '/automation/request';
  } else if (pathname.search('/received_letter') !== -1) {
    selectedKeys = '/automation/received_letter';
  } else if (pathname.search('/sent_letter') !== -1) {
    selectedKeys = '/automation/sent_letter';
  } else if (
    pathname.search('/products/edit') !== -1 ||
    pathname.search('/products/create') !== -1 ||
    pathname.search('/products/single') !== -1
  ) {
    selectedKeys = '/products/list';
  }
  if (pathname.search('/receiptAndRemittance/requestProduct') !== -1) {
    selectedKeys = '/receiptAndRemittance/requestProduct';
  }
  if (pathname.search('/receiptAndRemittance/buyRequestProduct') !== -1) {
    selectedKeys = '/receiptAndRemittance/buyRequestProduct';
  }
  if (pathname.search('/receiptAndRemittance/receiptProduct') !== -1) {
    selectedKeys = '/receiptAndRemittance/receiptProduct';
  }
  if (pathname.search('/receiptAndRemittance/remittanceProduct') !== -1) {
    selectedKeys = '/receiptAndRemittance/remittanceProduct';
  }

  if (pathname.search('/receiptAndRemittance/warehouseToWarehouse') !== -1) {
    selectedKeys = '/receiptAndRemittance/warehouseToWarehouse';
  }
  if ((pathname+search) === '/accounting/receiptRemittance?list=in') {
    selectedKeys = '/accounting/receiptRemittance?list=in';
  }

  if ((pathname+search) === '/accounting/receiptRemittance?list=out') {
    selectedKeys = '/accounting/receiptRemittance?list=out';
  }

  if ((pathname+search) === '/accounting/receiptRemittance?list=complete_in') {
    selectedKeys = '/accounting/receiptRemittance?list=complete_in';
  }

  if ((pathname+search) === '/accounting/receiptRemittance?list=complete_out') {
    selectedKeys = '/accounting/receiptRemittance?list=complete_out';
  }




  if (
    pathname.search('/storehouse/place') !== -1 ||
    pathname.search('/storehouse/warehouseInventory') !== -1||
    pathname.search('/storehouse/warehouseInventoryProduct') !== -1
  ) {
    initialOpenKey = ['/storehouse'];
  } else if (
    [
      '/warehouses/location',
      '/warehouses/type',
      '/warehouses',
      '/warehouses/PlaceConsumption',
    ].includes(pathname)
  ) {
    initialOpenKey = ['/warehouses', '/warehouses/location'];
  } else if (
    ['/usersManagement/users', '/usersManagement/roles', '/usersManagement/section', '/usersManagement/companies', '/usersManagement/customers'].includes(
      pathname,
    )
  ) {
    initialOpenKey = ['/usersManagement'];
  } else if (pathname.search('/products') !== -1
    // ['/products/list', '/products/categories', '/products/Types', '/products/attribute'].includes(
    //   pathname,
    // )
  ) {
    initialOpenKey = ['/products'];
  } else if (
    ['/commerce/purchase', '/commerce/purchase/report', '/commerce/map'].includes(pathname)
  ) {
    initialOpenKey = ['/commerce'];
  } else if (
    ['/receiptAndRemittance',].includes(pathname) ||
    pathname.search('/receiptAndRemittance/requestProduct') !== -1 ||
    pathname.search('/receiptAndRemittance/buyRequestProduct') !== -1 ||
    pathname.search('/receiptAndRemittance/receiptProduct') !== -1 ||
    pathname.search('/receiptAndRemittance/remittanceProduct') !== -1||
    pathname.search('/receiptAndRemittance/warehouseToWarehouse') !== -1

  ) {
    initialOpenKey = ['/receiptAndRemittance'];
  }else if (

    pathname.search('/accounting/receiptRemittance') !== -1

  ) {
    initialOpenKey = ['/accounting'];
  } else if (
    [
      '/correspondence',
      '/sent_letter',
      '/received_letter',
      '/payment',
      '/request',
      '/report',
      '/messages',
    ].includes(pathname) ||
    pathname.search('/correspondence/correspondence') !== -1 ||
    pathname.search('/sent_letter/sent_letter') !== -1 ||
    pathname.search('/received_letter/received_letter') !== -1 ||
    pathname.search('/payment/payment') !== -1 ||
    pathname.search('/request/request') !== -1 ||
    pathname.search('/report/report') !== -1

  ) {
    initialOpenKey = ['/Official'];
  }

  return [initialOpenKey, selectedKeys];
};

export default useGetOpenKey;
