export default function FiltrPredmetu({ vybrany, onZmena, seznam = [] }) {
  // Vytvoříme pole: nejdřív "Vše" a pak zkratky z databáze
  const moznosti = ["Vše", ...seznam.map((p) => p.zkratka)];

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {moznosti.map((predmet) => (
        <button
          key={predmet}
          onClick={() => onZmena(predmet)}
          className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all border ${
            vybrany === predmet
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
          }`}>
          {predmet}
        </button>
      ))}
    </div>
  );
}
