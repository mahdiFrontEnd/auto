import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from 'antd';
import {
  ArrowLeft2,
  ArrowSwapHorizontal,
  Briefcase,
  Building,
  HomeTrendUp,
  I3Dcube, Moneys,
  Profile2User,
  Ship,
} from 'iconsax-react';
import Logo from '../logo/Logo';
import { hasPermission } from '../../permission/module';
import { ToggleShowSidebar } from '../../store/customizer/CustomizerSlice';

const SidebarJson = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [iconSize] = useState(19);
  const [SidebarData, setSidebarData] = useState([]);
  const innerIcon = <ArrowLeft2 size={10} />;
  const { pathname } = location;
  // const ref1 = useRef(null);
  // const ref2 = useRef(null);

  // const steps = [
  //   {
  //     title: 'معرفی بخش درخواست کالا',
  //     description: <p style={{maxWidth:"250px"}}>آموزش مربوط به بخش درخوست کالا در صفحه اصلی داده شده است. لطفا از این پس برای درخواست کالا از این قسمت استفاده کنید.</p>,
  //     target: () => ref1.current,
  //   },
  // ];
  const getItem = ({ children, href, icon, show, title, inbox }) => {
    if (show) {
      return {
        key: href,
        icon,
        children,
        label: (
          <div className="d-flex justify-content-between align-items-center pe-1"
            // ref={href === '/automation/product_request' ? ref1 : ref2}
          >
            {/*{href === '/automation/product_request' && <TourBox  steps={steps} />}*/}


            {children ? title : <Link to={href} onClick={() => dispatch(ToggleShowSidebar(false))}>{title}</Link>}
            {inbox ? <Badge
              count={inbox}
              color="#f78e20"
            /> : ''}
          </div>
        ),
      };
    }
    return null;
  };

  const notifCount = useSelector((state) => state.loadingReducer.notifCount);

  const getVariant = (address) => {
    return pathname.search(address) !== -1 ? 'Bold' : 'Linear';
  };
  useEffect(() => {
    setSidebarData([
      {
        label: <div className="sidebarLogoBox">
          <Link to="/">
            <div className="d-flex justify-content-center py-3"><Logo /></div>
          </Link>
        </div>,
      },

      getItem({
        title: 'خانه ',
        href: '/home',
        icon: <HomeTrendUp variant={getVariant('/home')} size={iconSize} />,
        key: 'home',
        show: true,
      }),
      ////////////////////////////////////////////
      getItem({
        title: 'اداری',
        key: 'Official',
        href: '/Official',
        icon: <Briefcase variant={getVariant('/automation')} size={iconSize} />,
        inbox:
          notifCount?.automation_correspondence_count +
          notifCount?.automation_sent_letter_count +
          notifCount?.automation_received_letter_count +
          notifCount?.automation_payment_count +
          notifCount?.automation_request_count +
          notifCount?.automation_report_count,

        show:
          hasPermission('automation_correspondence', ['list', 'self_list', 'show']) ||
          hasPermission('automation_sent_letter', ['list', 'self_list', 'show']) ||
          hasPermission('automation_received_letter', ['list', 'self_list', 'show']) ||
          hasPermission('automation_payment', ['list', 'self_list', 'show']) ||
          hasPermission('automation_report', ['list', 'self_list', 'show']) ||
          hasPermission('automation_draft', ['list', 'self_list', 'show']) ||
          hasPermission('automation_request', ['list', 'self_list', 'show']) ||
          hasPermission('ware', ['list', 'self_list', 'show']),
        children: [
          getItem({
            title: 'مکاتبات داخلی',
            href: '/automation/correspondence?status=pending',
            key: 'sub8',
            icon: innerIcon,
            show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_correspondence_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'نامه های ارسالی',
            href: '/automation/sent_letter',
            key: 'sub9',
            icon: innerIcon,

            show: hasPermission('automation_sent_letter', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_sent_letter_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'نامه های دریافتی',
            href: '/automation/received_letter',
            key: 'sub10',
            icon: innerIcon,

            show: hasPermission('automation_received_letter', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_received_letter_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'اعلامیه پرداخت',
            href: '/automation/payment',
            key: 'sub11',
            icon: innerIcon,

            show: hasPermission('automation_payment', ['list', 'self_list', 'show']),

            inbox: notifCount?.automation_payment_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'درخواست',
            href: '/automation/request',
            key: 'sub12',
            icon: innerIcon,

            show: hasPermission('automation_request', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_request_count,
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'پیش نویس نامه',
            href: '/automation/draft',
            key: 'sub14',
            icon: innerIcon,

            show: hasPermission('automation_draft', ['list', 'self_list', 'show']),
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'گزارش دهی',
            href: '/automation/report',
            key: 'sub13',
            icon: innerIcon,

            show: hasPermission('automation_report', ['list', 'self_list', 'show']),
            inbox: notifCount?.automation_report_count,
          }),

          ////////////////////////////////////////////
          getItem({
            title: 'درخواست کالا'
            ,
            href: '/automation/product_request',
            key: 'sub1',
            inbox: notifCount?.automation_ware_count,
            icon: innerIcon,
            show: hasPermission('ware', ['list', 'self_list', 'show']),
          }),
          ////////////////////////////////////////////
          ////////////////////////////////////////////
          getItem({
            title: 'آیین نامه ها',
            href: '/automation/regulations',
            key: 'sub16',
            icon: innerIcon,
            inbox: notifCount?.regulations_count,
            show: hasPermission('regulations', ['list']),
          }),
          ////////////////////////////////////////////
          ////////////////////////////////////////////
          getItem({
            title: 'ورود و خروج ها',
            href: '/automation/attendance',
            key: 'sub17',
            icon: innerIcon,
            // inbox: notifCount?.regulations_count,
            show: hasPermission('regulations', ['list']),
          }),
          ////////////////////////////////////////////
        ],
      }),
      /////////////////////////////
      getItem({
        title: 'مدیریت انبارها',
        key: 'storehouse',
        href: '/storehouse',


        icon: <Building variant={getVariant('/storehouse')} size={iconSize} />,

         show:false,
        //show: hasPermission('storehouse_place', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'موجودی انبار ها',
            href: '/storehouse/warehouseInventory',
            key: 'WarehouseInventory',
            icon: innerIcon,
            show:true,
            // show: hasPermission('storehouse_place', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'موجودی کالاها',
            href: '/storehouse/warehouseInventoryProduct',
            key: 'warehouseInventoryProduct',
            icon: innerIcon,
            show:true,
            // show: hasPermission('storehouse_place', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'انبار ها',
            href: '/storehouse/place',
            key: 'storehouse',
            icon: innerIcon,
            show:true,
            // show: hasPermission('storehouse_place', ['list', 'self_list', 'show']),
          }),
        ],
      }),
      getItem({
        title: 'مدیریت کالا',
        key: 'products',
        href: '/products',
        icon: <I3Dcube variant={getVariant('/products')} size={iconSize} />,

        // icon: pathname.search('/products') !== -1 ? <I3Dcube variant="Bold" size={iconSize} /> :
        //   <I3Dcube size={iconSize} />,
        show: false,
        // show:
        //   hasPermission('storehouse_attribute_category', ['list', 'self_list', 'show']) ||
        //   hasPermission('storehouse_product', ['list', 'self_list', 'show']) ||
        //   hasPermission('storehouse_brand', ['list', 'self_list', 'show']) ||
        //   hasPermission('storehouse_category', ['list', 'self_list', 'show']) ||
        //   hasPermission('storehouse_attribute', ['list', 'self_list', 'show']) ||
        //   hasPermission('storehouse_type', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'محصولات',
            href: '/products/list',
            key: 'products-list',
            icon: innerIcon,
            show: hasPermission('storehouse_product', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'دسته بندی محصولات',
            href: '/products/categories',
            key: 'products-categories',
            icon: innerIcon,
            show: hasPermission('storehouse_category', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'برند ها',
            href: '/products/brands',
            key: 'products-brands',
            icon: innerIcon,
            show: hasPermission('storehouse_brand', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'تامین کننده ها',
            href: '/products/suppliers',
            key: 'products-suppliers',
            icon: innerIcon,
            show: true,
            // show: hasPermission('storehouse_supplier', ['list', 'self_list', 'show']),
          }),
          // getItem({
          //   title: 'انواع محصول',
          //   href: '/products/Types',
          //   key: 'products-Types',
          //   icon: innerIcon,
          //   show: hasPermission('storehouse_type', ['list', 'self_list', 'show']),
          // }),
          // getItem({
          //   title: 'ویژگی ها',
          //   href: '/products/attribute',
          //   key: 'products-attribute',
          //   icon: innerIcon,
          //
          //   show: hasPermission('storehouse_attribute', ['list', 'self_list', 'show']),
          // }),
          // getItem({
          //   title: 'دسته بندی ویژگی ها',
          //   href: '/products/attribute/categories',
          //   key: 'products-attribute-categories',
          //   icon: innerIcon,
          //   show: false,
          //   // show: hasPermission('storehouse_attribute_category', ['list', 'self_list', 'show']),
          // }),
        ],
      }),

      getItem({
        title: 'رسید و حواله',
        key: 'receiptAndRemittance',
        href: '/receiptAndRemittance',


        icon: <ArrowSwapHorizontal variant={getVariant('/receiptAndRemittance')} size={iconSize} />,

         show:false,
        //show: true,

        children: [
          getItem({
            title: 'درخواست کالا',
            href: '/receiptAndRemittance/requestProduct',
            key: 'requestProduct',
            icon: innerIcon,
            inbox: notifCount?.inventory_request_count,
            show: true,

          }),
          // getItem({
          //   title: 'درخواست خرید کالا',
          //   href: '/receiptAndRemittance/buyRequestProduct',
          //   key: 'buyRequestProduct',
          //   icon: innerIcon,
          //   inbox: notifCount?.inventory_buy_request_count,
          //   show: true,
          //
          // }),
          getItem({
            title: 'رسید کالا ',
            href: '/receiptAndRemittance/receiptProduct',
            key: 'receipt',
            icon: innerIcon,
            inbox: notifCount?.inventory_buy_request_count,
            show: true,

          }),
          getItem({
            title: 'حواله کالا ',
            href: '/receiptAndRemittance/remittanceProduct',
            key: 'remittance',
            icon: innerIcon,
            inbox: notifCount?.inventory_buy_request_count,
            show: true,

          }),
          getItem({
            title: 'انبار به انبار ',
            href: '/receiptAndRemittance/warehouseToWarehouse',
            key: 'warehouseToWarehouse',
            icon: innerIcon,
            inbox: notifCount?.inventory_buy_request_count,
            show: true,

          }),
          getItem({
            title: 'بارکد خوان',
            href: '/receiptAndRemittance/qrcodeScanner',
            key: 'qrcode',
            icon: innerIcon,
            inbox: notifCount?.inventory_buy_request_count,
            show: true,

          }),
        ],
      }),
      ////////////////////////////////////////
      ////////////////////////////////////////////
      getItem({
        title: 'حسابداری',
        key: 'accounting',
        href: '/accounting',
        icon: <Moneys variant={getVariant('/accounting')} size={iconSize} />,

        show: false,

        children: [
          getItem({
            title: 'ورود به انبار',
            href: '/accounting/receiptRemittance?list=in',
            key: 'accounting',
            icon: innerIcon,

            show: true
          }),
          getItem({
            title: 'خروج به انبار',
            href: '/accounting/receiptRemittance?list=out',
            key: 'accounting',
            icon: innerIcon,

            show: true
          }),
          getItem({
            title: 'ورود تکمیل شده',
            href: '/accounting/receiptRemittance?list=complete_in',
            key: 'accounting',
            icon: innerIcon,

            show: true
          }),
          getItem({
            title: 'خروج تکمیل شده',
            href: '/accounting/receiptRemittance?list=complete_out',
            key: 'accounting',
            icon: innerIcon,

            show: true
          }),

        ],
      }),


      getItem({
        title: 'بازرگانی',
        key: 'commerce',
        href: '/commerce',
        icon: <Ship variant={getVariant('/commerce')} size={iconSize} />,

        show: hasPermission('commerce_purchase', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'لیست خرید',
            href: '/commerce/purchase',
            key: 'purchase',
            icon: innerIcon,

            show: hasPermission('commerce_purchase', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'گزارشات',
            href: '/commerce/purchase/report',
            key: 'purchase-report',
            icon: innerIcon,

            show: true,
          }),
          getItem({
            title: 'نقشه',
            href: '/commerce/map',
            key: 'map',
            icon: innerIcon,

            show: true,
          }),
        ],
      }),
      ///////////////////////
      // getItem({
      //   title: 'ایمنی، بهداشت، محیط',
      //   key: 'hse',
      //   href: '/hse',
      //   icon: <MdHealthAndSafety size={iconSize} />,
      //            icon: pathname.search('/hse') !== -1 ? <MdHealthAndSafety  size={iconSize} /> :
      //           <MdOutlineHealthAndSafety  size={iconSize} />,
      //   show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),
      //
      //   children: [
      //     getItem({
      //       title: 'نظافت',
      //       href: '/hse/cleaning',
      //       key: 'sub15',
      //       icon: innerIcon,
      //
      //       show: hasPermission('automation_correspondence', ['list', 'self_list', 'show']),
      //
      //       inbox: notifCount?.automation_correspondence_count,
      //     }),
      //     ////////////////////////////////////////////
      //   ],
      // }),
      ////////////////////////////////////////////

      ////////////////////////////////////////////
      getItem({
        title: 'مدیریت کاربران',
        key: 'usersManagement',
        href: '/usersManagement',
        icon: <Profile2User variant={getVariant('/usersManagement')} size={iconSize} />,

        show:
          hasPermission('user', ['list', 'self_list', 'show']) ||
          hasPermission('automation_company', ['list', 'self_list', 'show']) ||
          hasPermission('customer', ['list', 'self_list', 'show']) ||
          hasPermission('role', ['list', 'self_list', 'show']),

        children: [
          getItem({
            title: 'کاربران',
            href: '/usersManagement/users',
            key: 'users',
            icon: innerIcon,

            show: hasPermission('user', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'نقش ها',
            href: '/usersManagement/roles',
            key: 'roles',
            icon: innerIcon,

            show: hasPermission('role', ['list', 'self_list', 'show']),
          }),
          getItem({
            title: 'شرکت ها',
            href: '/usersManagement/companies',
            key: 'sub6',

            icon: innerIcon,
            show: hasPermission('automation_company', ['list', 'self_list', 'show']),
          }),
          ////////////////////////////////////////////
          getItem({
            title: 'مشتریان',
            href: '/usersManagement/customers',
            key: 'sub7',

            icon: innerIcon,
            show: hasPermission('customer', ['list', 'self_list', 'show']),
          }),

          // getItem({
          //   title: 'بخش ها',
          //   href: '/usersManagement/section',
          //   key: 'section',
          //   icon: innerIcon,
          //
          //   show: hasPermission('section', ['list', 'self_list', 'show']),
          // }),
        ],
      }),
      ////////////////////////////////////////////
    ]);
  }, [notifCount, pathname]);
  return [SidebarData];
};

export default SidebarJson;
