// ZADÁNÍ: Komponenta pro editaci existujících událostí s podporou SQL UPDATE a DELETE
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { sql } from "../db.js";

export default function EditaceUdalosti() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    název: "",
    datum: "",
    zkratka_předmětu: "",
    popis: "",
    je_test: 0,
  });
  const [predmety, setPredmety] = useState([]);

  // ZADÁNÍ: Načtení stávajících dat události podle ID a seznamu předmětů pro výběr
  useEffect(() => {
    const nactiData = async () => {
      const uData = await sql(`SELECT * FROM pzop_event WHERE id = ${id}`);
      if (uData && uData[0]) setForm(uData[0]);

      const pData = await sql("SELECT zkratka FROM pzop_subject");
      if (pData) setPredmety(pData);
    };
    nactiData();
  }, [id]);

  // ZADÁNÍ: Uložení upravených dat do databáze pomocí příkazu UPDATE
  const ulozitZmeny = async (e) => {
    e.preventDefault();
    await sql(`
      UPDATE pzop_event SET 
      název = '${form.název}', datum = '${form.datum}', 
      zkratka_předmětu = '${form.zkratka_předmětu}', popis = '${form.popis}', 
      je_test = ${form.je_test} 
      WHERE id = ${id}
    `);
    navigate("/");
  };

  // ZADÁNÍ: Odstranění události z databáze po potvrzení uživatelem
  const smazat = async () => {
    if (confirm("Smazat událost?")) {
      await sql(`DELETE FROM pzop_event WHERE id = ${id}`);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={ulozitZmeny}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-black mb-8 text-center">
          Upravit událost
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-4 bg-gray-50 rounded-xl border"
            value={form.název}
            onChange={(e) => setForm({ ...form, název: e.target.value })}
            placeholder="Název"
            required
          />
          <input
            type="date"
            className="w-full p-4 bg-gray-50 rounded-xl border"
            value={form.datum}
            onChange={(e) => setForm({ ...form, datum: e.target.value })}
            required
          />

          <select
            className="w-full p-4 bg-gray-50 rounded-xl border"
            value={form.zkratka_předmětu}
            onChange={(e) =>
              setForm({ ...form, zkratka_předmětu: e.target.value })
            }>
            {predmety.map((p) => (
              <option
                key={p.zkratka}
                value={p.zkratka}>
                {p.zkratka}
              </option>
            ))}
          </select>

          <textarea
            className="w-full p-4 bg-gray-50 rounded-xl border h-32"
            value={form.popis}
            onChange={(e) => setForm({ ...form, popis: e.target.value })}
            placeholder="Popis"
          />

          {/* ZADÁNÍ: Přepínač pro vizuální odlišení testu v seznamu */}
          <label className="flex items-center gap-3 p-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.je_test == 1}
              onChange={(e) =>
                setForm({ ...form, je_test: e.target.checked ? 1 : 0 })
              }
              className="w-5 h-5"
            />
            <span className="font-bold text-gray-600">Označit jako test</span>
          </label>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
            Uložit změny
          </button>
          <button
            type="button"
            onClick={smazat}
            className="px-8 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
            Smazat
          </button>
        </div>
      </form>
    </div>
  );
}
