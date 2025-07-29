export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="logo" className="h-6" />
          <span className="font-bold text-blue-600">EasyFlow</span>
        </div>
        <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EasyFlow. Toate drepturile rezervate.</div>
      </div>
    </footer>
  );
}