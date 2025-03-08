import React, {useEffect, useRef, useState} from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { Microphone2 } from 'iconsax-react';

const VoiceBox = ({ getText }) => {
  const recognitionRef = useRef(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const initializeRecognition = () => {
    if (window?.SpeechRecognition || window?.webkitSpeechRecognition) {

      const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast.error('مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند.');
        return null;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'fa-IR'; // زبان فارسی
      recognition.interimResults = true; // نمایش نتایج موقت

      recognition.onresult = (event) => {

        // eslint-disable-next-line no-shadow
        const x = event.results[0][0].transcript;


        if (event.results[0].isFinal) {

          setFinalTranscript((prev) => `${prev} ${x}`.trim());


        }
      };
      recognition.onerror = () => {
        toast.error('خطا در ضبط. لطفا میکروفن خود را چک کنید.');
        stopRecognition();
      };
      return recognition;
    }
    return null;

  };
  useEffect(() => {
    stopRecognition();
  }, [finalTranscript]);
  const startRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };
  // توقف ضبط
  const stopRecognition = () => {
    if (recognitionRef.current) {
      console.log(finalTranscript)
      getText(finalTranscript);
      recognitionRef.current.stop();
      setIsRecording(false);
      setFinalTranscript("");

    }
    // if (finalTranscript !== "") {
    //   console.log(finalTranscript)
    //   getText(<p>{finalTranscript}</p>);
    // }
  };
  console.log(finalTranscript)

  return (
    <div>
      <Button className={`defBtn  voiceRecordBtn ${isRecording ? "orangeBtn" : "greenBtn"}`}
              onMouseDown={startRecognition}
              onTouchStart={startRecognition}
        // onMouseUp={stopRecognition}
        onMouseUp={() => {
            setTimeout(stopRecognition, 1000)
        }}
        onTouchEnd={() => {
            setTimeout(stopRecognition, 1000)
        }}
      >
        <div className={`circle ${isRecording ? "active" : ""}`}>

          <Microphone2 size="25" variant="Bold" />
        </div>
        {/*{isRecording ? 'ضبط کنید...' : 'برای ضبط نگه دارید'}*/}
      </Button>



    </div>
  );
};

export default VoiceBox;
