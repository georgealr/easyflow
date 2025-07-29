import { FaPalette, FaTextHeight, FaMagic } from "react-icons/fa";

export default function Inspector({ selectedElement, onUpdate }) {
  if (!selectedElement) return null;
  return (
    <aside className="w-72 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-gray-100 h-[calc(100vh-5rem)] sticky top-20 z-30 font-inter">
      <h2 className="font-bold text-lg mb-2 flex items-center gap-2"><FaMagic /> Inspector</h2>
      <div className="flex flex-col gap-4">
        <label className="font-semibold flex items-center gap-2"><FaTextHeight /> Conținut</label>
        <input
          className="border rounded px-3 py-2"
          value={selectedElement.content || ""}
          onChange={e => onUpdate({ ...selectedElement, content: e.target.value })}
        />
        <label className="font-semibold flex items-center gap-2"><FaPalette /> Culoare text</label>
        <input
          type="color"
          className="w-12 h-8 p-0 border-none"
          value={selectedElement.style?.color || "#222222"}
          onChange={e => onUpdate({ ...selectedElement, style: { ...selectedElement.style, color: e.target.value } })}
        />
        {/* Adaugă mai multe controale după nevoie */}
      </div>
    </aside>
  );
}