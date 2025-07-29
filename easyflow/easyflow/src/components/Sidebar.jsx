import { FaFont, FaImage, FaRegSquare, FaRegDotCircle } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

const elements = [
  { type: "text", label: "Text", icon: <FaFont /> },
  { type: "image", label: "Imagine", icon: <FaImage /> },
  { type: "button", label: "Buton", icon: <FaRegSquare /> },
  { type: "section", label: "Secțiune", icon: <FaRegDotCircle /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-gray-100 h-[calc(100vh-5rem)] sticky top-20 z-30 font-inter">
      <h2 className="font-bold text-lg mb-2">Elemente</h2>
      <div className="flex flex-col gap-4">
        {elements.map((el, idx) => (
          <div
            key={el.type}
            className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-3 rounded-lg font-medium cursor-grab shadow transition"
            draggable
            onDragStart={e => e.dataTransfer.setData("elementType", el.type)}
          >
            {el.icon}
            {el.label}
          </div>
        ))}
      </div>
    </aside>
  );
}