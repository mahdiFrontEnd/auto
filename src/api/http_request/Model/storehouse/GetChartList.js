import { toast } from 'react-toastify';
import Storehouse from './Storehouse';

const GetChartList = (setList, setLoading) => {


  Storehouse.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: (result) => {
      const newData = result.result.map(({ position, user, id }) => {
        return {
          name: `${position } ${
            user.map((item) => {
              return  `(${item.first_name} ${item.last_name})` ;
            })
          }`


          , id, selectable: false,
        };

      });
      setList(newData);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);

    },
  }).addParams({ skip: 0, take: 5000 }).chartList();
  // storehouse/place/list_chart
};
export default GetChartList;


