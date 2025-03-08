import Cookies from 'js-cookie';
import HttpClient from '../../HttpClient';
import { apiBase } from '../../url';

class Storehouse extends HttpClient {

  constructor(Callback) {

    super(Callback, {
      baseURL: apiBase,
      headers: {},
      Callback,
    });
    this.setHeader('Content-Type', 'application/json');
    this.setHeader('Accept', 'application/json');
    this.setBearerAuth(`Bearer  ${Cookies.get('token')}`);

  }

  static request(Callback) {
    return new Storehouse(Callback);
  }


  updateCreatePlace(data, id) {
    return this.post(`storehouse/place/${id ? 'update' : 'store'}/${id || ''}`, data);

  }

  paymentDeclaration(data) {
    return this.post('process/request/ware/store_automation_request', data);

  }

  AccountingStorehouseShow(id) {
    return this.post(`storehouse/detail_product/show/${id}`);
  }


  AccountingStorehouseStore(values) {
    return this.post(`storehouse/detail_product/store`,values);
  }

  AccountingStorehouseUpdate(data,id) {
    return this.post(`storehouse/detail_product/update/${id}`,data);
  }

  storehouseList() {
    return this.get(`storehouse/place/list_place`);
  }


  chartList() {
    return this.get(`storehouse/place/list_chart`);
  }

  handleRequestWare(address, data) {
    return this.post(address, data);
  }

  showRequestWare(id) {
    return this.post(`process/request/ware/show/${id}`);
  }

  showRemittance(id) {
    return this.post(`process/request/store_out/show/${id}`);
  }

  showStoreToStore(id) {
    return this.post(`process/request/store_to_store/show/${id}`);
  }

  PlaceList() {
    return this.get('process/form/list_place_for_storekeeper_login');
  }

  getQrCode(data) {
    // console.log(data)
    return this.post('exhibition/qr', data);
  }

  showReceipt(id) {
    return this.post(`process/form/show/${id}`);
  }


  listPlaceForStorekeeperLogin() {
    return this.get(`process/request/store_to_store/list_place_for_storekeeper_login`);
  }

  updateRequestWare(id, data) {
    return this.post(`process/request/update/${id}`, data);
  }

}

export default Storehouse;
