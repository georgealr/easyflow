import { useRef } from "react";

export default function Canvas({ elements, onDrop, selectedId, setSelectedId }) {
  const canvasRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("elementType");
    if (type) onDrop(type, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  return (
    <main
      ref={canvasRef}
      className="flex-1 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div
        className="relative bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl shadow-2xl border-4 border-gray-200 w-[900px] h-[600px] overflow-auto transition-all"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-semibold text-lg pointer-events-none">
            Trage elemente aici pentru a începe!
          </div>
        )}
        {elements.map(el => (
          <div
            key={el.id}
            className={`absolute cursor-pointer transition-all duration-200 ${selectedId === el.id ? "ring-4 ring-blue-400 z-10" : "ring-0"}`}
            style={{
              left: el.x,
              top: el.y,
              width: el.width,
              height: el.height,
              ...el.style,
            }}
            onClick={() => setSelectedId(el.id)}
          >
            {/* Render element content here */}
            {el.type === "text" && (
              <div className="p-2 text-lg font-semibold">{el.content || "Text nou"}</div>
            )}
            {el.type === "image" && (
              <img src={el.src || "https://placehold.co/200x100"} alt="" className="w-full h-full object-cover rounded" />
            )}
            {el.type === "button" && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">{el.content || "Buton"}</button>
            )}
            {el.type === "section" && (
              <div className="bg-white/80 border border-gray-300 rounded-lg h-full w-full flex items-center justify-center text-gray-500">Secțiune</div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}