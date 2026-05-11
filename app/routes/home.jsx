import { useState, useEffect } from "react";
import { Link } from "react-router";
import { sql } from "../db.js";
import Udalost from "../componenty/udalost.jsx";
import FiltrPredmetu from "../componenty/filtrPredmetu.jsx";

export default function Home() {
  const [udalosti, setUdalosti] = useState([]);
  const [predmety, setPredmety] = useState([]);
  const [filtr, setFiltr] = useState("Vše");

  useEffect(() => {
    const nactiData = async () => {
      const dotaz = `
        SELECT e.id, e.název AS title, e.popis AS description, e.datum AS date, 
               e.je_test AS is_test, e.zkratka_předmětu AS subject_short
        FROM pzop_event e ORDER BY e.datum ASC`;
      const data = await sql(dotaz);
      if (data) setUdalosti(data);
    };

    const nactiPredmety = async () => {
      const data = await sql(
        "SELECT zkratka FROM pzop_subject ORDER BY zkratka",
      );
      if (data) setPredmety(data);
    };

    nactiData();
    nactiPredmety();
  }, []);

  const filtrovane =
    filtr === "Vše"
      ? udalosti
      : udalosti.filter((u) => u.subject_short === filtr);

  return (
    /* Změnil jsem min-h na auto a ubral p-10, aby to neskákalo */
    <div className="w-full flex items-center justify-center p-4">
      <main className="w-full max-w-[700px] flex flex-col gap-8">
        {/* Tady už NENÍ žádná Eliška, ta se bere z root.jsx */}

        {/* Filtry - vycentrované */}
        <div className="flex justify-center overflow-x-auto pb-2">
          <FiltrPredmetu
            vybrany={filtr}
            onZmena={setFiltr}
            seznam={predmety}
          />
        </div>

        {/* Seznam událostí */}
        <section className="flex flex-col gap-4">
          {filtrovane.length > 0 ? (
            filtrovane.map((u) => (
              <Udalost
                key={u.id}
                data={u}
              />
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 font-medium">
              Žádné události pro tento předmět
            </div>
          )}
        </section>
      </main>

      {/* Plovoucí tlačítko Plus */}
      <Link
        to="/events/new"
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all hover:scale-110 active:scale-95 z-50">
        +
      </Link>
    </div>
  );
}
