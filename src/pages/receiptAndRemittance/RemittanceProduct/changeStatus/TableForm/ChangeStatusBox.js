import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import SelectItem from './SelectItem';
import DescriptionForStatus from './DescriptionForStatus';
import BuyerBox from './BuyerBox';
import NextStatusesBtn from './NextStatusesBtn';
import ShowBox from './ShowBox';
import StorekeeperBox from './StorekeeperBox';
import { handleStatusForm } from '../../../../../store/storehouse/StorehouseSlice';
import NewAmountBox from './NewAmountBox';
import ChoosePaceAndAmount from './ChoosePaceAndAmount';
import ShowProcessNew from '../../ShowProcessNew';

const ChangeStatusBox = () => {
  const {
    submitStatusForm,
    storekeeperList,
    nextStatusesList,
    buyerList,
    receiptAndRemittanceArray,
  } = useSelector((state) => state.Storehouse);
  const [hasDetailPlaces, setHasDetailPlaces] = useState(false);

  const [initialValues, setInitialValues] = useState([]);
  const [form] = Form.useForm();
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      form.submit();
    }
  }, [submitStatusForm]);
   useEffect(() => {
    if (receiptAndRemittanceArray.length) {
      let x = [];

      x = receiptAndRemittanceArray.map((i) => {
        return {
          status_id:(i.status?.options?.nextStatusesBtn && i.next_statuses) ? null : nextStatusesList[i.in_store === 0 ? 1 : 0]?.id,
          request_product_id: i.id,
          in_store: i.in_store,
          amount: i.amount,
          product_id: i.product_id,
          id: i.id,
          description:null
        };
      });
      setInitialValues(x);
    }
  }, [receiptAndRemittanceArray]);

  const onFinish = (values) => {
    let showErrorForPlaceId = false;
    values.products.forEach((item) => {
      if (hasDetailPlaces) {
        const totalAmount  = item.place_id ? item.place_id.reduce((sum, x) => sum + x.amount, 0) : 0;
        showErrorForPlaceId = !totalAmount;
      }
    });
    if (showErrorForPlaceId) {
      toast.error('لطفا مقدار از هر انبار مشخص کنید');
    } else {
      dispatch(handleStatusForm(values));
    }
  };
  return (
    <div>
      {initialValues.length && (
        <Form
          form={form}
          name="dynamic_form"
          onFinish={onFinish}
          initialValues={{
            products: initialValues,
          }}
        >
          <Form.List name="products">
            {(fields) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => {
                  const { status, next_statuses, detail_places } = receiptAndRemittanceArray[index];
                  setHasDetailPlaces(!!detail_places);
                  return (
                    <div
                      className="d-flex align-items-center gap-2  mb-2 rounded-2 border px-2 py-2 "
                      key={index}
                    >
                      {status?.options?.showSelectItem && next_statuses ? (
                        <SelectItem
                          form={form}
                          index={index}
                          restField={{ ...restField }}
                          name={[name, 'selected']}
                          item={receiptAndRemittanceArray[index]}
                        />
                      ) : (
                        ''
                      )}

                      <ShowBox index={index} />

                      {status?.options?.description && next_statuses ? (
                        <DescriptionForStatus
                          restField={{ ...restField }}
                          name={[name, 'description']}
                        />
                      ) : (
                        ''
                      )}

                      {status?.options?.newAmount && next_statuses ? (
                        <NewAmountBox
                          initialValues={initialValues}
                          index={index}
                          restField={{ ...restField }}
                          name={[name, 'new_amount']}
                        />
                      ) : (
                        ''
                      )}

                      {storekeeperList.length ? (
                        <StorekeeperBox
                          index={index}
                          restField={{ ...restField }}
                          name1={[name, 'storekeeper_id']}
                          name2={[name, 'storekeeper_user_id']}
                          name3={[name, 'storekeeperId']}
                          form={form}
                        />
                      ) : (
                        ''
                      )}

                      {buyerList.length ? (
                        <BuyerBox
                          name1={[name, 'buyer_user_id']}
                          name2={[name, 'buyer_id']}
                          name3={[name, 'buyerId']}
                          index={index}
                          restField={{ ...restField }}
                          form={form}
                        />
                      ) : (
                        ''
                      )}

                      {detail_places ? (
                        <ChoosePaceAndAmount
                          name={[name, 'place_id']}
                          index={index}
                          restField={{ ...restField }}
                          form={form}
                        />
                      ) : (
                        ''
                      )}

                      {status?.options?.nextStatusesBtn && next_statuses ? (
                        <NextStatusesBtn
                          restField={{ ...restField }}
                          name={[name, 'status_id']}
                          initialValues={initialValues}
                          index={index}
                        />
                      ) : (
                        ''
                      )}
                      <ShowProcessNew
                        data={receiptAndRemittanceArray[index]}
                        TooltipText="نمایش فرایند انجام شده"
                      />
                    </div>
                  );
                })}
              </>
            )}
          </Form.List>
        </Form>
      )}
    </div>
  );
};

export default ChangeStatusBox;
