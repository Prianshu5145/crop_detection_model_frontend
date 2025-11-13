import { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";

export default function Detector({ t }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [streaming, setStreaming] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    return () => stopVideoStream();
  }, []);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch {
      alert("Camera not available. Try Upload Photo.");
    }
  };

  const stopVideoStream = () => {
    const video = videoRef.current;
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop());
    }
    setStreaming(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const w = video.videoWidth || 320;
    const h = video.videoHeight || 240;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    const dataURL = canvas.toDataURL("image/png");
    setImageURL(dataURL);
    stopVideoStream();
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageURL(reader.result);
    reader.readAsDataURL(file);
  };

  const analyzeBackend = async () => {
    if (!imageURL) return;

    try {
      setLoading(true);
      setResponseData(null);

      const blob = await fetch(imageURL).then((r) => r.blob());
      const formData = new FormData();
      formData.append("image", blob, "photo.png");

      const res = await axios.post(
        "https://cropdetectimodelbackend-production.up.railway.app/api/detect/crop",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponseData(res.data);
      window.scrollTo({ top: 600, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const closeResult = () => setResponseData(null);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold">{t.detect || "Detect"}</h1>

      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* LEFT SIDE */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">

              {!streaming ? (
                <PrimaryButton onClick={startVideoStream}>Start Camera</PrimaryButton>
              ) : (
                <PrimaryButton onClick={captureImage}>Capture</PrimaryButton>
              )}

              {streaming && (
                <PrimaryButton onClick={stopVideoStream}>Stop</PrimaryButton>
              )}

              <label className="rounded-xl px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold shadow cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                Upload Photo
              </label>

              {imageURL && (
                <PrimaryButton onClick={analyzeBackend}>
                  {loading ? "Analyzing..." : "Analyze"}
                </PrimaryButton>
              )}
            </div>

            <video ref={videoRef} className="w-full rounded-xl border" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* RIGHT SIDE RESULTS */}
          <div className="flex-1 space-y-4">
            {imageURL && (
              <Card>
                <div className="font-semibold mb-2">Preview</div>
                <img src={imageURL} className="w-full rounded-xl border" />
              </Card>
            )}

            {responseData && (
              <div className="bg-white shadow-xl border rounded-xl p-5 space-y-5">

                {/* CLOSE BTN */}
                <button
                  onClick={closeResult}
                  className="text-red-600 font-semibold text-sm float-right"
                >
                  ✖ Close
                </button>

                {/* MAIN HEADER */}
                <h2 className="text-2xl font-bold text-green-700">
                  {responseData.detected.diseaseName}
                </h2>

                {/* Confidence */}
                <p className="text-gray-600 font-medium">
                  Confidence:{" "}
                  <span className="text-blue-600 font-bold">
                    {responseData.detected.confidence.toFixed(2)}%
                  </span>
                </p>

                {/* Uploaded Image */}
                <img
                  src={responseData.imageUrl}
                  className="w-full rounded-lg border shadow"
                />

                {/* DETAILS SECTIONS */}
                <div className="space-y-4">
                  <Section title="Cause" color="red" items={responseData.diseaseInfo.cause} />
                  <Section title="Symptoms" color="yellow" items={responseData.diseaseInfo.symptoms} />
                  <Section title="Prevention" color="blue" items={responseData.diseaseInfo.prevention} />
                  <Section title="Treatment" color="green" items={responseData.diseaseInfo.treatment} />
                </div>

                {/* ⚠️ WARNING SECTION */}
                <div className="mt-5 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                  <p className="text-yellow-800 font-semibold">
                    ⚠️ Important Warning
                  </p>
                  <p className="text-yellow-700 text-sm mt-1 leading-relaxed">
                    यह सिर्फ एक AI आधारित प्रारंभिक सुझाव है। कृपया किसी कृषि विशेषज्ञ, 
                    KVK या कृषि अधिकारी से सलाह ज़रूर लें।  
                    अधिक उपयोग न करें — गलत परिणाम आने पर विशेषज्ञ की सलाह ही अंतिम है।
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Section({ title, items, color }) {
  return (
    <div>
      <h3 className={`text-lg font-semibold text-${color}-600`}>{title}</h3>
      <ul className="list-disc ml-5 mt-1 text-gray-700 text-sm space-y-1">
        {items?.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}
