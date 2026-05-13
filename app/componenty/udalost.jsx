// ZADÁNÍ: Komponenta pro zobrazení karty události s vektorovou ikonou, datem a vizuálním odlišením testů
import { Link } from "react-router";

export default function Udalost({ data }) {
  return (
    <Link
      to={`/events/${data.id}`}
      className="group flex items-center bg-white rounded-3xl p-6 shadow-sm border border-gray-50 hover:shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden mb-4">
      {/* ZADÁNÍ: Červený postranní pruh indikující důležitý test (is_test == 1) */}
      {data.is_test == 1 && (
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500" />
      )}

      <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-gray-100 mr-6">
        {/* ZADÁNÍ: Formátování data z DB do podoby DD. MM. */}
        <span className="text-gray-300 font-black text-xs mb-1">
          {data.date
            ? data.date.split("-").reverse().slice(0, 2).join(". ")
            : "??.??"}
        </span>

        {/* ZADÁNÍ: Vykreslení vektorové Google ikony uložené v databázi u daného předmětu */}
        <div className="h-10 flex items-center justify-center my-1">
          <span className="material-symbols-outlined text-3xl text-slate-600">
            {data.ikona}
          </span>
        </div>

        <span className="text-[10px] font-black text-gray-400 uppercase">
          {data.subject_short}
        </span>
      </div>

      <div className="flex-1">
        {/* ZADÁNÍ: Název a stručný popis události s oříznutím textu (line-clamp) */}
        <h3 className="text-lg font-black text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
          {data.title}
        </h3>
        <p className="text-sm text-gray-400 font-medium line-clamp-2 mt-1">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
