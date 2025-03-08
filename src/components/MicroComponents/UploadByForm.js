import React, { useEffect, useState } from 'react';
import { Flex, Upload } from 'antd';
import { baseURL } from '../../api/http_request/url';


const UploadByForm = ({
                        onChangeImage, rowData, getDeletedItems,
                        count = 8,
                        accept = '.gif , .jpg , .png',
                      }) => {
  const [fileList, setFileList] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const handleChange = (info) => {
    if (info.file.status === 'removed' && info?.file?.id) {
      setDeletedItems([...deletedItems, info.file.id]);
    }
    // Set custom tooltip (title) for each file
    const updatedFileList = info.fileList.map(file => ({
      ...file,
      response: file.name,
    }));
    setFileList(updatedFileList);
  };


  useEffect(() => {
    if (getDeletedItems) {
      getDeletedItems(deletedItems);
    }
  }, [deletedItems]);

  useEffect(() => {
    const files = [];
    for (let i = 0; i < fileList?.length; i++) {
      if (fileList[i].originFileObj) {

        files[`attachments[${i}]`] = fileList[i].originFileObj;
      }
    }

    onChangeImage(files);
  }, [fileList]);

  useEffect(() => {
    let files = [];
    if (rowData?.attachments) {
      files = rowData?.attachments.map((item) => {

          return { url: `${baseURL}/${item?.path?.indexArray?.small}`, deletedKey: item.directory, id: item.id };
        },
      );
    }

    setFileList(files);
  }, [rowData]);


  const beforeUpload = () => {
    return false;
  };


  return (
    <Flex gap="middle" wrap>
      <Upload maxCount={count} multiple accept={accept}
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={beforeUpload}

      >
        {fileList?.length >= count ? null : '+ آپلود'}
      </Upload>

    </Flex>
  );
};
export default UploadByForm;

