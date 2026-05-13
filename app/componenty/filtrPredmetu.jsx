// ZADÁNÍ: Komponenta pro přepínání filtrů mezi předměty včetně zobrazení jejich ikon z databáze
export default function FiltrPredmetu({ vybrany, onZmena, seznam }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
      {/* ZADÁNÍ: Fixní tlačítko pro zrušení filtru a zobrazení všech událostí */}
      <button
        onClick={() => onZmena("Vše")}
        className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
          vybrany === "Vše"
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
        }`}>
        Vše
      </button>

      {/* ZADÁNÍ: Dynamické generování tlačítek pro každý předmět s jeho unikátní vektorovou ikonou */}
      {seznam.map((p) => (
        <button
          key={p.zkratka}
          onClick={() => onZmena(p.zkratka)}
          className={`px-4 py-2 rounded-full font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            vybrany === p.zkratka
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
          }`}>
          {/* ZADÁNÍ: Vektorová ikona předmětu vykreslená pomocí názvu uloženého v databázi */}
          <span className="material-symbols-outlined text-xl">{p.ikona}</span>
          {p.zkratka}
        </button>
      ))}
    </div>
  );
}
