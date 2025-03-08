
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Microphone2 } from 'iconsax-react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'fa-IR';

const VoiceBox2 = ({ getText }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    requestMicrophonePermission(); // درخواست مجوز میکروفن
    handleListen();
  }, [isListening]);

  const requestMicrophonePermission = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // درخواست دسترسی به میکروفن
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            console.log(stream)
            console.log("Microphone permission granted");
          })
          .catch((err) => {
            console.error("Microphone permission denied", err);
            alert("برای استفاده از میکروفن، لطفاً اجازه دسترسی را بدهید.");
          });
    } else {
      console.error("Your browser doesn't support microphone access.");
    }
  };

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue...');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event) => {
      console.log(event);

      if (!event.results[0].isFinal) {
        const transcript = Array.from(event.results)
            .map((x) => {
              return x[0];
            })
            .map((result) => {
              return result.transcript;
            })
            .join('');
        getText(transcript);
      }
    };

    mic.onerror = (event) => {
      console.log(event.error);
    };
  };

  const handleTouchStart = () => {
    setIsListening(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsListening(false);
    }, 1000);
  };

  return (
      <Button
          className={`defBtn px-2 voiceRecordBtn ${isListening ? 'orangeBtn' : 'greenBtn'}`}
          onMouseDown={() => setIsListening(true)}
          onTouchStart={handleTouchStart}
          onMouseUp={() => {
            setTimeout(() => {
              setIsListening(false);
            }, 1000);
          }}
          onTouchEnd={handleTouchEnd}>
        <div className={`d-flex justify-content-center align-items-center gap-2 circle ${isListening ? 'active' : ''}`}>
          <Microphone2 size="25" variant="Bold" />
        </div>
      </Button>
  );
};

export default VoiceBox2;



// import React, { useEffect, useState } from 'react';
// import { Button } from 'antd';
// import { Microphone2 } from 'iconsax-react';
//
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();
//
// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = 'fa-IR';
//
//
// const VoiceBox2 = ({ getText }) => {
//   const [isListening, setIsListening] = useState(false);
//   // const [note, setNote] = useState("");
//
//   useEffect(() => {
//     handleListen();
//   }, [isListening]);
//
//   const handleListen = () => {
//     if (isListening) {
//       mic.start();
//       mic.onend = () => {
//         console.log('continue..');
//         mic.start();
//       };
//     } else {
//       mic.stop();
//       mic.onend = () => {
//         console.log('Stopped Mic on Click');
//       };
//     }
//     mic.onstart = () => {
//       console.log('Mics on');
//     };
//
//     mic.onresult = (event) => {
//       console.log(event);
//
//       if (!event.results[0].isFinal) {
//         const transcript = Array.from(event.results)
//           .map((x) => {
//             return x[0];
//
//           })
//           .map((result) => {
//
//             return result.transcript;
//           })
//           .join('');
//         // setNote(transcript);
//         getText(transcript);
//       }
//       // eslint-disable-next-line no-shadow
//       mic.onerror = (event) => {
//         console.log(event.error);
//       };
//     };
//   };
//
//   return (<Button
//       className={`defBtn px-2 voiceRecordBtn ${isListening ? 'orangeBtn' : 'greenBtn'}`}
//       onMouseDown={() => {
//         setIsListening(true);
//       }}
//       onTouchStart={() => {
//         setIsListening(true);
//       }}
//       onMouseUp={() => {
//         setTimeout(() => {
//           setIsListening(false);
//         }, 1000);
//
//       }}
//       onTouchEnd={() => {
//         setTimeout(() => {
//           setIsListening(false);
//         }, 1000);
//
//       }}>
//       <div className={`d-flex justify-content-center align-items-center gap-2 circle ${isListening ? 'active' : ''}`}>
//         <Microphone2 size="25" variant="Bold" />
//        </div>
//     </Button>);
// };
//
// export default VoiceBox2;
