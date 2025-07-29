import { FaDesktop, FaMobileAlt } from "react-icons/fa";

export default function DeviceSwitch({ deviceView, setDeviceView }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <button
        className={`p-2 rounded-lg ${deviceView === "desktop" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
        onClick={() => setDeviceView("desktop")}
      >
        <FaDesktop />
      </button>
      <button
        className={`p-2 rounded-lg ${deviceView === "mobile" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
        onClick={() => setDeviceView("mobile")}
      >
        <FaMobileAlt />
      </button>
    </div>
  );
}