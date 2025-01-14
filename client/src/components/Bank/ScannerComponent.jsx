import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const ScannerComponent = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="bg-zinc-800 font-mono p-6 rounded-lg border-2 border-zinc-700 shadow-md flex flex-col items-center justify-center h-80 w-[480px]">
      <h2 className="text-xl text-start font-bold text-amber-600 mb-4">Scanner Component</h2>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-[350px] h-40 object-contain mr-4"
        /> */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-white mt-1">click  to Capture and Scan.</p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 mt-2 rounded-md"
            onClick={capture}
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScannerComponent;