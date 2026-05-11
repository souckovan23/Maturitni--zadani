import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { sql } from "../db.js";

export default function DetailUdalosti() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [udalost, setUdalost] = useState(null);

  useEffect(() => {
    const nactiDetail = async () => {
      const dotaz = `
        SELECT e.*, s.název as predmet_nazev 
        FROM pzop_event e
        LEFT JOIN pzop_subject s ON e.zkratka_předmětu = s.zkratka
        WHERE e.id = ${id}
      `;
      const data = await sql(dotaz);
      if (data && data.length > 0) {
        setUdalost(data[0]);
      }
    };
    nactiDetail();
  }, [id]);

  const smazatUdalost = async () => {
    if (confirm("Opravdu chceš tuto událost smazat?")) {
      await sql(`DELETE FROM pzop_event WHERE id = ${id}`);
      navigate("/");
    }
  };

  if (!udalost) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">
        Načítám detaily události...
      </div>
    );
  }

  return (
    /* flex items-center justify-center zajistí vycentrování na střed */
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Barevný proužek nahoře podle typu (test/úkol) */}
        <div
          className={`h-2 ${udalost.je_test == 1 ? "bg-red-500" : "bg-blue-500"}`}
        />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest">
              {udalost.zkratka_předmětu} — {udalost.predmet_nazev}
            </span>
            <time className="text-sm font-bold text-gray-300">
              {udalost.datum}
            </time>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
            {udalost.název}
          </h1>

          <div className="bg-gray-50/50 rounded-2xl p-6 mb-10 border border-gray-100">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Popis události
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              {udalost.popis || "Tato událost nemá žádný detailní popis."}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl text-center transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
              Zpět na přehled
            </Link>

            <button
              onClick={smazatUdalost}
              className="px-8 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100">
              Smazat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
