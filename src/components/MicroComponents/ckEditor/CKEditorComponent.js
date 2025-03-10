import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Tag } from 'antd';

import AiModal from './AiModal';
import VoiceBox from './VoiceBox2';

const CkEditorComponent = ({ getData, initialText = '', useDefWord }) => {
  const [initialData, setInitialData] = useState(initialText);


  const defWords = ['با سلام', 'صادر شد', 'پرداخت شد', 'انجام شد', 'مورد قبول است', 'تایید شد', 'پیگیری خواهد شد', 'اقدامات لازم انجام شود', 'پیوست شد', 'با سپاس از شما'];
  console.log(initialData);
  return (
    <div>


      {useDefWord && <div className="d-flex defWords flex-wrap align-items-center mb-2">

        {defWords.map((item) => (

          <div className="mb-2 cursor-pointer">
            <Tag key={item} onClick={() => {
              setInitialData(`${initialData} ${item}`);
            }}
            >{item}</Tag>
          </div>

        ))
        }

      </div>}
      <div style={{ marginTop: '-30px' }} className="d-flex justify-content-end mb-2 gap-2">
        <VoiceBox getText={(newText) => {
            alert(newText)
          setInitialData(`${initialData}  ${newText} `);
        }} />
        <AiModal body={initialData} setInitialData={setInitialData} />
      </div>

      <CKEditor

        config={{
          link: {
            addTargetToExternalLinks: true,
          },
          language: {
            ui: 'fa',
            content: 'ar',
          },
          toolbar: ['bold', 'italic', 'Link', 'numberedList',
            'heading', 'insertTable', 'undo', 'redo'],
          // removePlugins: [ 'blockquote' ,'ol','bulletedList',]
          // plugins: [ Paragraph, Bold, Italic, Essentials ],

        }}
        editor={ClassicEditor}
        data={initialData}
        onChange={(e, event) => {

          setInitialData(event.getData());
          getData(event.getData());
        }}
        // onBlur={(event, editor) => {
        // }}
        // onFocus={(event, editor) => {
        // }}
        // onReady={editor => {
        //   // You can store the "editor" and use when it is needed.
        // }}
      />

    </div>
  );
};

export default CkEditorComponent;
