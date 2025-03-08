import React, { lazy, Suspense } from 'react';

import { Navigate } from 'react-router-dom';
import StoreRequestProduct from '../pages/receiptAndRemittance/requestProduct/store/StoreRequestProduct';
import StatusRequestProduct from '../pages/receiptAndRemittance/requestProduct/changeStatus/StatusRequestProduct';
import ShowRequestProduct from '../pages/receiptAndRemittance/requestProduct/show/ShowRequestProduct';
import RequestProduct from '../pages/receiptAndRemittance/requestProduct/RequestProduct';
import ReceiptProduct from '../pages/receiptAndRemittance/receiptProduct/ReceiptProduct';
import ShowReceiptProduct from '../pages/receiptAndRemittance/receiptProduct/show/ShowReceiptProduct';
import StoreReceiptProduct from '../pages/receiptAndRemittance/receiptProduct/store/StoreReceiptProduct';
// import StatusReceiptProduct from '../pages/receiptAndRemittance/receiptProduct/changeStatus/StatusReceiptProduct';
import ShowRemittanceProduct from '../pages/receiptAndRemittance/RemittanceProduct/show/ShowRemittanceProduct';
import StoreRemittanceProduct from '../pages/receiptAndRemittance/RemittanceProduct/store/StoreRemittanceProduct';
import StatusRemittanceProduct
  from '../pages/receiptAndRemittance/RemittanceProduct/changeStatus/StatusRemittanceProduct';
import RemittanceProduct from '../pages/receiptAndRemittance/RemittanceProduct/RemittanceProduct';
// import BuyRequestProduct from '../pages/receiptAndRemittance/buyRequestProduct/BuyRequestProduct';
// import StoreBuyRequestProduct from '../pages/receiptAndRemittance/buyRequestProduct/store/StoreBuyRequestProduct';
// import ShowBuyRequestProduct from '../pages/receiptAndRemittance/buyRequestProduct/show/ShowBuyRequestProduct';
// import StatusBuyRequestProduct from '../pages/receiptAndRemittance/buyRequestProduct/changeStatus/StatusBuyRequestProduct';
import ShowWarehouseToWarehouse from '../pages/receiptAndRemittance/WarehouseToWarehouse/show/ShowWarehouseToWarehouse';
import StoreWarehouseToWarehouse
  from '../pages/receiptAndRemittance/WarehouseToWarehouse/store/StoreWarehouseToWarehouse';
import StatusWarehouseToWarehouse
  from '../pages/receiptAndRemittance/WarehouseToWarehouse/changeStatus/StatusWarehouseToWarehouse';
import WarehouseToWarehouse from '../pages/receiptAndRemittance/WarehouseToWarehouse/WarehouseToWarehouse';
import WarehouseInventoryManagementPage from '../pages/storehouse/warehouseInventory/WarehouseInventoryManagementPage';
import QrcodeScanner from '../pages/receiptAndRemittance/qrcodeScanner/QrcodeScanner';
import WarehouseInventoryProductManagementPage
  from '../pages/storehouse/warehouseInventoryProducts/WarehouseInventoryProductManagementPage';
import AccountingReceiptRemittance from '../pages/accounting/accountingReceiptRemittance/AccountingReceiptRemittance';
import AccountingReceiptRemittanceStore
  from '../pages/accounting/accountingReceiptRemittance/AccountingReceiptRemittanceStore';
import AccountingReceiptRemittanceShow
  from '../pages/accounting/accountingReceiptRemittance/AccountingReceiptRemittanceShow';

const Dashboard = lazy(()=> import( '../pages/dashboards/Dashboard')) ;
const WorkDetails = lazy(()=> import( '../pages/workDetails/WorkDetails')) ;
const ChangePass = lazy(()=> import( '../pages/changePass/ChangePass')) ;
const Profile = lazy(()=> import( '../pages/profile/Profile')) ;
const UserManagementPage = lazy(()=> import( '../pages/user/UserManagementPage')) ;
const RoleManagementPage = lazy(()=> import( '../pages/role/RoleManagementPage')) ;
const SectionManagementPage = lazy(()=> import( '../pages/section/SectionManagementPage')) ;
const CustomerManagementPage = lazy(()=> import( '../pages/customer/CustomerManagementPage')) ;
const CompanyManagementPage = lazy(()=> import( '../pages/automation/company/CompanyManagementPage')) ;
const CorrespondencePage = lazy(()=> import( '../pages/automation/correspondence/CorrespondencePage')) ;
const PaymentPage = lazy(()=> import( '../pages/automation/payment/PaymentPage')) ;
const MessagePage = lazy(()=> import( '../pages/automation/message/MessagePage')) ;
const RegulationsPage = lazy(()=> import( '../pages/automation/Regulations/RegulationsPage')) ;
const CorrespondenceDetail = lazy(()=> import( '../pages/automation/correspondence/CorrespondenceDetail')) ;
const PaymentDetail = lazy(()=> import( '../pages/automation/payment/PaymentDetail')) ;
const ReportPage = lazy(()=> import( '../pages/automation/report/ReportPage')) ;
const ReportDetail = lazy(()=> import( '../pages/automation/report/ReportDetail')) ;
const RequestPage = lazy(()=> import( '../pages/automation/request/RequestPage')) ;
const RequestDetail = lazy(()=> import( '../pages/automation/request/RequestDetail')) ;
const DraftPage = lazy(()=> import( '../pages/automation/draft/DraftPage')) ;
const DraftDetail = lazy(()=> import( '../pages/automation/draft/DraftDetail')) ;
const ReceivedLetterPage = lazy(()=> import( '../pages/automation/receivedLetter/ReceivedLetterPage')) ;
const ReceivedLetterDetail = lazy(()=> import( '../pages/automation/receivedLetter/ReceivedLetterDetail')) ;
const SentLetterPage = lazy(()=> import( '../pages/automation/sentLetter/SentLetterPage')) ;
const SentLetterDetail = lazy(()=> import( '../pages/automation/sentLetter/SentLetterDetail')) ;
const Purchase = lazy(()=> import( '../pages/commerce/Purchase')) ;
const PurchaseReportPage = lazy(()=> import( '../pages/commerce/PurchaseReportPage')) ;
const PurchaseDetail = lazy(()=> import( '../pages/commerce/PurchaseDetail')) ;
const CommerceMap = lazy(()=> import( '../pages/commerce/CommerceMap')) ;
const Error = lazy(()=> import( '../pages/not-found/Error')) ;
const Login = lazy(()=> import( '../pages/auth/Login')) ;
const FullLayout = lazy(()=> import( '../layouts/FullLayout')) ;
const LoginLayout = lazy(()=> import( '../layouts/LoginLayout')) ;
const RecoverPwd = lazy(()=> import( '../pages/auth/RecoverPwd')) ;
const BlackBoard = lazy(()=> import( '../pages/calendar/BlackBoard')) ;
const AttendancePage = lazy(()=> import( '../pages/automation/attendance/AttendancePage')) ;
const CategoryManagementPage = lazy(()=> import( '../pages/storehouse/category/CategoryManagementPage')) ;
const BrandsPage = lazy(()=> import( '../pages/storehouse/brand/BrandsPage')) ;
const SuppliersPage = lazy(()=> import( '../pages/storehouse/supplier/SuppliersPage')) ;
const AttributePage = lazy(()=> import( '../pages/storehouse/attribute/AttributePage')) ;
const TypesPage = lazy(()=> import( '../pages/storehouse/Types/TypesPage')) ;
const UpdateCreateProduct = lazy(()=> import( '../pages/storehouse/product/UpdateCreateProduct')) ;
const ProductManagementPage = lazy(()=> import( '../pages/storehouse/product/ProductManagementPage')) ;
const PlaceManagementPage = lazy(()=> import( '../pages/storehouse/place/PlaceManagementPage')) ;
const AttributeCategoriesManagementPage = lazy(()=> import( '../pages/storehouse/AttributeCategories/AttributeCategoriesManagementPage')) ;
const ProductRequestPage = lazy(()=> import( '../pages/automation/productRequest/ProductRequestPage')) ;
const ReferPage = lazy(()=> import( '../pages/automation/refer/ReferPage')) ;
// const InventoryBuyRequest = lazy(()=> import( '../pages/receiptAndRemittance/inventoryBuyRequest/InventoryBuyRequest')) ;
// const InventoryBuyRequestSingle = lazy(()=> import( '../pages/receiptAndRemittance/inventoryBuyRequest/InventoryBuyRequestSingle')) ;
// const ReceiptRequest = lazy(()=> import( '../pages/receiptAndRemittance/receipt/ReceiptRemittanceRequest')) ;
// const ReceiptRemittanceRequestSingle = lazy(()=> import( '../pages/receiptAndRemittance/receipt/ReceiptRemittanceRequestSingle')) ;



/*****Auth access******/
const ThemeRoutes = [
  {
    path: '/', element:  <Suspense fallback={<div></div>}><FullLayout /></Suspense>, children: [
      { path: '/', name: 'Home', element:  <Suspense fallback={<div></div>}><Navigate to="/home" /></Suspense> },
      { path: '/home', name: 'Dashboard', exact: true, element:  <Suspense fallback={<div></div>}><Dashboard /></Suspense> },
      { path: '/WorkDetails', name: 'WorkDetails', exact: true, element:  <Suspense fallback={<div></div>}><WorkDetails /></Suspense> },

      {
        path: '/profile', name: 'profile', element: '', children: [
          { path: '/profile', name: 'profile', exact: true, element:  <Suspense fallback={<div></div>}><Profile /></Suspense> },
          { path: '/profile/ChangePwd', name: 'ChangePwd', exact: true, element:  <Suspense fallback={<div></div>}><ChangePass /></Suspense> },
        ],
      },

      {
        path: '/usersManagement', name: 'usersManagement', element: '', children: [
          { path: '/usersManagement/users', name: 'users', exact: true, element:  <Suspense fallback={<div></div>}><UserManagementPage /></Suspense> },
          { path: '/usersManagement/roles', name: 'roles', exact: true, element:  <Suspense fallback={<div></div>}><RoleManagementPage /></Suspense> },
          { path: '/usersManagement/section', name: 'section', exact: true, element:  <Suspense fallback={<div></div>}><SectionManagementPage /></Suspense> },
          { path: '/usersManagement/customers', name: 'customers', exact: true, element:  <Suspense fallback={<div></div>}><CustomerManagementPage /></Suspense> },
          { path: '/usersManagement/companies', name: 'companies', exact: true, element:  <Suspense fallback={<div></div>}><CompanyManagementPage /></Suspense> },
        ],
      },

      {
        path: '/products', name: 'products', element: '', children: [
          { path: '/products/categories', name: 'categories', exact: true, element:  <Suspense fallback={<div></div>}><CategoryManagementPage /></Suspense> },
          { path: '/products/list', name: 'products', exact: true, element:  <Suspense fallback={<div></div>}><ProductManagementPage /></Suspense> },
          { path: '/products/edit/:id', name: 'UpdateCreateProduct', exact: true, element:  <Suspense fallback={<div></div>}><UpdateCreateProduct /></Suspense> },
          { path: '/products/store', name: 'UpdateCreateProduct', exact: true, element:  <Suspense fallback={<div></div>}><UpdateCreateProduct /></Suspense> },
          { path: '/products/single', name: 'UpdateCreateProduct', exact: true, element:  <Suspense fallback={<div></div>}><UpdateCreateProduct /></Suspense> },
          { path: '/products/Types', name: 'products', exact: true, element:  <Suspense fallback={<div></div>}><TypesPage /></Suspense> },
          { path: '/products/brands', name: 'brands', exact: true, element:  <Suspense fallback={<div></div>}><BrandsPage /></Suspense> },
          { path: '/products/suppliers', name: 'suppliers', exact: true, element:  <Suspense fallback={<div></div>}><SuppliersPage /></Suspense> },
          { path: '/products/attribute', name: 'products', exact: true, element:  <Suspense fallback={<div></div>}><AttributePage /></Suspense> },
          {
            path: '/products/attribute/categories',
            name: 'products',
            exact: true,
            element:  <Suspense fallback={<div></div>}><AttributeCategoriesManagementPage /></Suspense>,
          },

        ],
      },
      {
        path: '/automation', name: 'automation', element: '', children: [
          { path: '/automation/messages', name: 'messages', exact: true, element:  <Suspense fallback={<div></div>}><MessagePage /></Suspense> },
          { path: '/automation/refers', name: 'refers', exact: true, element:  <Suspense fallback={<div></div>}><ReferPage /></Suspense> },
          { path: '/automation/product_request', name: 'messages', exact: true, element:  <Suspense fallback={<div></div>}><ProductRequestPage /></Suspense> },
          { path: '/automation/regulations', name: 'RegulationsPage', exact: true, element:  <Suspense fallback={<div></div>}><RegulationsPage /></Suspense> },
          { path: '/automation/correspondence', name: 'correspondence', exact: true, element:  <Suspense fallback={<div></div>}><CorrespondencePage /></Suspense> },
          { path: '/automation/attendance', name: 'attendance', exact: true, element:  <Suspense fallback={<div></div>}><AttendancePage /></Suspense> },
          {
            path: '/automation/correspondence/correspondence_detail/:id',
            name: 'correspondenceDetail',
            exact: true,
            element:  <Suspense fallback={<div></div>}><CorrespondenceDetail /></Suspense>,
          },
          { path: '/automation/payment', name: 'payment', exact: true, element:  <Suspense fallback={<div></div>}><PaymentPage /></Suspense> },
          { path: '/automation/payment/payment_detail/:id', name: 'payment', exact: true, element:  <Suspense fallback={<div></div>}><PaymentDetail /></Suspense> },
          { path: '/automation/report', name: 'report', exact: true, element:  <Suspense fallback={<div></div>}><ReportPage /></Suspense> },
          {
            path: '/automation/report/report_detail/:id',
            name: 'reportDetail',
            exact: true,
            element:  <Suspense fallback={<div></div>}><ReportDetail /></Suspense>,
          },
          { path: '/automation/request', name: 'request', exact: true, element:  <Suspense fallback={<div></div>}><RequestPage /></Suspense> },
          {
            path: '/automation/request/request_detail/:id',
            name: 'requestDetail',
            exact: true,
            element:  <Suspense fallback={<div></div>}><RequestDetail /></Suspense>,
          },
          { path: '/automation/draft', name: 'request', exact: true, element:  <Suspense fallback={<div></div>}><DraftPage /></Suspense> },
          { path: '/automation/draft/draft_detail/:id', name: 'draftDetail', exact: true, element:  <Suspense fallback={<div></div>}><DraftDetail /></Suspense> },
          {
            path: '/automation/received_letter',
            name: 'receivedLetter',
            exact: true,
            element:  <Suspense fallback={<div></div>}><ReceivedLetterPage /></Suspense>,
          },
          {
            path: '/automation/received_letter/received_letter_detail/:id',
            name: 'receivedLetterDetail',
            exact: true,
            element:  <Suspense fallback={<div></div>}><ReceivedLetterDetail /></Suspense>,
          },
          { path: '/automation/sent_letter', name: 'sentLetter', exact: true, element:  <Suspense fallback={<div></div>}><SentLetterPage /></Suspense> },
          {
            path: '/automation/sent_letter/sent_letter_detail/:id',
            name: 'sentLetterDetail',
            exact: true,
            element:  <Suspense fallback={<div></div>}><SentLetterDetail /></Suspense>,
          },
        ],
      },
      {
        path: '/commerce', name: 'commerce', element: '', children: [
          { path: '/commerce/purchase', name: 'purchaseList', exact: true, element:  <Suspense fallback={<div></div>}><Purchase /></Suspense> },
          {
            path: '/commerce/purchase/report',
            name: 'purchaseReportList',
            exact: true,
            element:  <Suspense fallback={<div></div>}><PurchaseReportPage /></Suspense>,
          },
          { path: '/commerce/purchase_detail/:id', name: 'purchaseDetail', exact: true, element:  <Suspense fallback={<div></div>}><PurchaseDetail /></Suspense> },
          { path: '/commerce/map', name: 'map', exact: true, element:  <Suspense fallback={<div></div>}><CommerceMap /></Suspense> },
        ],
      },


      {
        path: '/receiptAndRemittance', name: 'receiptAndRemittance', element: '', children: [
           { path: '/receiptAndRemittance/receiptProduct', name: 'inventoryRequest', exact: true, element: '', children: [

              { path: '/receiptAndRemittance/receiptProduct', name: 'receipt', exact: true, element:  <Suspense fallback={<div></div>}><ReceiptProduct address="/receiptAndRemittance/receiptProduct"/></Suspense> },
              { path: '/receiptAndRemittance/receiptProduct/show/:id', name: 'receiptSingle_show', exact: true, element:  <Suspense fallback={<div></div>}><ShowReceiptProduct title="نمایش ورود کالا به انبار" type="show" address="process/form/show"  /></Suspense> },
              { path: '/receiptAndRemittance/receiptProduct/store', name: 'receiptSingle_store', exact: true, element:  <Suspense fallback={<div></div>}><StoreReceiptProduct   title="ایجاد ورود کالا به انبار" type="store" address="process/form/store"  /></Suspense> },
              // { path: '/receiptAndRemittance/receiptProduct/status/:id', name: 'receiptSingle_changeStatus', exact: true, element:  <Suspense fallback={<div></div>}><StatusReceiptProduct title="تغییر وضعیت در ورود کالا به انبار" type="changeStatus" address="process/form/status"  /></Suspense> },
              // { path: '/receiptAndRemittance/receiptProduct/EntryExit/:id', name: 'receiptSingle_EntryExit', exact: true, element:  <Suspense fallback={<div></div>}><StatusReceiptProduct title="ورود کالا به انبار" type="EntryExit" address="process/form/store_form"  /></Suspense> },

            ]},
           { path: '/receiptAndRemittance/remittanceProduct', name: 'inventoryRequest', exact: true, element: '', children: [

              { path: '/receiptAndRemittance/remittanceProduct', name: 'receipt', exact: true, element:  <Suspense fallback={<div></div>}><RemittanceProduct storeAddress="/receiptAndRemittance/remittanceProduct/store"/></Suspense> },
              { path: '/receiptAndRemittance/remittanceProduct/show/:id', name: 'receiptSingle_show', exact: true, element:  <Suspense fallback={<div></div>}><ShowRemittanceProduct title="نمایش خروج کالا از انبار" type="show" address="process/form/show"  /></Suspense> },
              { path: '/receiptAndRemittance/remittanceProduct/store', name: 'receiptSingle_store', exact: true, element:  <Suspense fallback={<div></div>}><StoreRemittanceProduct title="ایجاد خروج کالا از انبار" type="store" address="process/request/store_out/store"  /></Suspense> },
              { path: '/receiptAndRemittance/remittanceProduct/status/:id', name: 'receiptSingle_changeStatus', exact: true, element:  <Suspense fallback={<div></div>}><StatusRemittanceProduct title="تغییر وضعیت در خروج کالا از انبار" type="changeStatus" address="process/request/store_out/status"  /></Suspense> },
              { path: '/receiptAndRemittance/remittanceProduct/EntryExit/:id', name: 'receiptSingle_EntryExit', exact: true, element:  <Suspense fallback={<div></div>}><StatusRemittanceProduct title="خروج کالا از انبار" type="EntryExit" address="process/form/store_form"  /></Suspense> },

            ]},

///////////////////
           { path: '/receiptAndRemittance/warehouseToWarehouse', name: 'warehouseToWarehouse', exact: true, element: '', children: [

              { path: '/receiptAndRemittance/warehouseToWarehouse', name: 'warehouseToWarehouse', exact: true, element:  <Suspense fallback={<div></div>}><WarehouseToWarehouse storeAddress="/receiptAndRemittance/warehouseToWarehouse/store"/></Suspense> },
              { path: '/receiptAndRemittance/warehouseToWarehouse/show/:id', name: 'warehouseToWarehouse_show', exact: true, element:  <Suspense fallback={<div></div>}><ShowWarehouseToWarehouse title="نمایش خروج کالا از انبار" type="show" address="process/form/show"  /></Suspense> },
              { path: '/receiptAndRemittance/warehouseToWarehouse/store', name: 'warehouseToWarehouse_store', exact: true, element:  <Suspense fallback={<div></div>}><StoreWarehouseToWarehouse title="ایجاد خروج کالا از انبار" type="store" address="process/request/store_to_store/store"  /></Suspense> },
              { path: '/receiptAndRemittance/warehouseToWarehouse/status/:id', name: 'warehouseToWarehouse_changeStatus', exact: true, element:  <Suspense fallback={<div></div>}><StatusWarehouseToWarehouse title="تغییر وضعیت در خروج کالا از انبار" type="changeStatus" address="process/request/store_to_store/status"  /></Suspense> },
              { path: '/receiptAndRemittance/warehouseToWarehouse/EntryExit/:id', name: 'warehouseToWarehouse_EntryExit', exact: true, element:  <Suspense fallback={<div></div>}><StatusWarehouseToWarehouse title="خروج کالا از انبار" type="EntryExit" address="process/form/store_form"  /></Suspense> },

            ]},


          { path: '/receiptAndRemittance/requestProduct', name: '/receiptAndRemittance/requestProduct', element: '', children: [
              { path: '/receiptAndRemittance/requestProduct', name: 'requestProduct', exact: true, element:  <Suspense fallback={<div></div>}><RequestProduct /></Suspense> },
              { path: '/receiptAndRemittance/requestProduct/store', name: 'inventoryRequestSingle_Store', exact: true, element:  <Suspense fallback={<div></div>}><StoreRequestProduct  address="process/request/ware/store" /></Suspense> },
              { path: '/receiptAndRemittance/requestProduct/show/:id', name: 'inventoryRequestSingle_show', exact: true, element:  <Suspense fallback={<div></div>}><ShowRequestProduct   /></Suspense> },
              { path: '/receiptAndRemittance/requestProduct/status/:id', name: 'inventoryRequestSingle_Status', exact: true, element:  <Suspense fallback={<div></div>}><StatusRequestProduct title="تغییر وضعیت درخواست خرید کالا" type="changeStatus" address="process/request/ware/status"  /></Suspense> },
              { path: '/receiptAndRemittance/requestProduct/entryExit/:id', name: 'inventoryRequestEntryExit', exact: true, element:  <Suspense fallback={<div></div>}><StatusRequestProduct title="ورود خروج کالا" type="EntryExit" address="process/form/store_form"   /></Suspense> },
            ]
          },


          // { path: '/receiptAndRemittance/buyRequestProduct', name: '/receiptAndRemittance/buyRequestProduct', element: '', children: [
          //     { path: '/receiptAndRemittance/buyRequestProduct', name: 'buyRequestProduct', exact: true, element:  <Suspense fallback={<div></div>}><BuyRequestProduct /></Suspense> },
          //     { path: '/receiptAndRemittance/buyRequestProduct/store', name: 'inventoryBuyRequestSingle_Store', exact: true, element:  <Suspense fallback={<div></div>}><StoreBuyRequestProduct  address="process/request/ware/store" /></Suspense> },
          //     { path: '/receiptAndRemittance/buyRequestProduct/show/:id', name: 'inventoryBuyRequestSingle_show', exact: true, element:  <Suspense fallback={<div></div>}><ShowBuyRequestProduct   /></Suspense> },
          //     { path: '/receiptAndRemittance/buyRequestProduct/status/:id', name: 'inventoryBuyRequestSingle_Status', exact: true, element:  <Suspense fallback={<div></div>}><StatusBuyRequestProduct title="تغییر وضعیت درخواست خرید کالا" type="changeStatus" address="process/request/ware/status"  /></Suspense> },
          //     { path: '/receiptAndRemittance/buyRequestProduct/entryExit/:id', name: 'inventoryBuyRequestEntryExit', exact: true, element:  <Suspense fallback={<div></div>}><StatusBuyRequestProduct title="ورود خروج کالا" type="EntryExit" address="process/form/store_form"   /></Suspense> },
          //   ]
          // },
          { path: '/receiptAndRemittance/qrcodeScanner', name: 'qrcodeScanner', exact: true, element:  <Suspense fallback={<div></div>}><QrcodeScanner  /></Suspense> },






        ]},
      { path: '/accounting', name: 'accounting', exact: true, element: "" , children: [
          { path: '/accounting/receiptRemittance', name: 'accounting', exact: true, element:  <Suspense fallback={<div></div>}><AccountingReceiptRemittance /></Suspense> },
          { path: '/accounting/receiptRemittance/show/:type/:id', name: 'accountingShow', exact: true, element:  <Suspense fallback={<div></div>}><AccountingReceiptRemittanceShow /></Suspense> },
          { path: '/accounting/receiptRemittance/store/:type/:id', name: 'accountingStore', exact: true, element:  <Suspense fallback={<div></div>}><AccountingReceiptRemittanceStore /></Suspense> },
        ]
      },


      { path: '/storehouse/place', name: 'place', exact: true, element:  <Suspense fallback={<div></div>}><PlaceManagementPage /></Suspense> },
      { path: '/storehouse/warehouseInventory', name: 'warehouseInventory', exact: true, element:  <Suspense fallback={<div></div>}><WarehouseInventoryManagementPage /></Suspense> },
      { path: '/storehouse/warehouseInventoryProduct', name: 'warehouseInventoryProduct', exact: true, element:  <Suspense fallback={<div></div>}><WarehouseInventoryProductManagementPage /></Suspense> },


      { path: '/BlackBoard', name: 'BlackBoard', exact: true, element:  <Suspense fallback={<div></div>}><BlackBoard /></Suspense> },
      { path: '*', element:  <Suspense fallback={<div></div>}><Error /></Suspense> }],
  },
  {
    path: '/', element:  <Suspense fallback={<div></div>}><LoginLayout /></Suspense>, children: [
      { path: '/login', element:  <Suspense fallback={<div></div>}><Login /></Suspense> },
      { path: '/recover-password', element:  <Suspense fallback={<div></div>}><RecoverPwd /></Suspense> },
    ],
  },
  { path: '/error/:status', element:  <Suspense fallback={<div></div>}><Error /></Suspense> }];

export default ThemeRoutes;
