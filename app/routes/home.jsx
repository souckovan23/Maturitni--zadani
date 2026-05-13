// ZADÁNÍ: Hlavní stránka s filtrací, SQL JOINem a kulatým tlačítkem v pravém horním rohu obrazovky
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { sql } from "../db.js";
import Udalost from "../componenty/udalost.jsx";
import FiltrPredmetu from "../componenty/filtrPredmetu.jsx";

export default function Home() {
  const [udalosti, setUdalosti] = useState([]);
  const [predmety, setPredmety] = useState([]);
  const [filtr, setFiltr] = useState("Vše");
  const [limit, setLimit] = useState(4); // ZADÁNÍ: Výchozí počet zobrazených událostí

  useEffect(() => {
    // ZADÁNÍ: Načtení dat z DB včetně ikon předmětů přes LEFT JOIN
    const nactiData = async () => {
      const dotaz = `
        SELECT e.id, e.název AS title, e.popis AS description, e.datum AS date, 
               e.je_test AS is_test, e.zkratka_předmětu AS subject_short, s.ikona
        FROM pzop_event e 
        LEFT JOIN pzop_subject s ON e.zkratka_předmětu = s.zkratka
        ORDER BY e.datum ASC`;
      const data = await sql(dotaz);
      if (data) setUdalosti(data);
    };

    const nactiPredmety = async () => {
      const data = await sql("SELECT * FROM pzop_subject ORDER BY zkratka");
      if (data) setPredmety(data);
    };

    nactiData();
    nactiPredmety();
  }, []);

  // ZADÁNÍ: Filtrace událostí podle vybrané kategorie/předmětu
  const filtrovane =
    filtr === "Vše"
      ? udalosti
      : udalosti.filter((u) => u.subject_short === filtr);

  // ZADÁNÍ: Omezení pole událostí na aktuální limit pro zobrazení
  const zobrazeneUdalosti = filtrovane.slice(0, limit);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ZADÁNÍ: Tlačítko plus fixované v pravém horním rohu obrazovky */}
      <Link
        to="/events/new"
        className="fixed top-24 right-4 md:right-10 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xl shadow-blue-200 transition-all active:scale-95 z-50">
        +
      </Link>

      <main className="w-full max-w-[700px] flex flex-col gap-8">
        <div className="flex justify-center overflow-x-auto pb-2">
          {/* ZADÁNÍ: Komponenta filtru, která mění kategorii a resetuje limit */}
          <FiltrPredmetu
            vybrany={filtr}
            onZmena={(f) => {
              setFiltr(f);
              setLimit(4);
            }}
            seznam={predmety}
          />
        </div>

        <section className="flex flex-col gap-4">
          {zobrazeneUdalosti.length > 0 ? (
            zobrazeneUdalosti.map((u) => (
              <Udalost
                key={u.id}
                data={u}
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 font-medium">
              Žádné události
            </div>
          )}

          {/* ZADÁNÍ: Tlačítko pro zobrazení všech událostí při překročení limitu 4 */}
          {filtrovane.length > limit && (
            <button
              onClick={() => setLimit(udalosti.length)}
              className="mt-4 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl transition-all">
              Zobrazit více událostí
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
