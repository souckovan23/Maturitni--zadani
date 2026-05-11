import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { sql } from "../db";

export default function NovaUdalost() {
  const navigate = useNavigate();
  const [predmety, setPredmety] = useState([]);
  const [form, setForm] = useState({
    nazev: "",
    popis: "",
    datum: "",
    predmet: "WAP",
    test: 0,
  });

  useEffect(() => {
    const nacti = async () => {
      const data = await sql("SELECT zkratka FROM pzop_subject");
      if (data) setPredmety(data);
    };
    nacti();
  }, []);

  const odeslat = async (e) => {
    e.preventDefault();
    const dotaz = `INSERT INTO pzop_event (název, popis, datum, zkratka_předmětu, je_test) 
                   VALUES ('${form.nazev}', '${form.popis}', '${form.datum}', '${form.predmet}', ${form.test})`;
    await sql(dotaz);
    navigate("/");
  };

  const inputStyle =
    "w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Nová událost
          </h1>
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-600">
            ✕
          </Link>
        </div>

        <form
          onSubmit={odeslat}
          className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
              Název události
            </label>
            <input
              type="text"
              className={inputStyle}
              placeholder="Např. Test z MAT"
              onChange={(e) => setForm({ ...form, nazev: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
              Popis
            </label>
            <textarea
              className={inputStyle}
              rows="3"
              placeholder="Co se bude dít?"
              onChange={(e) => setForm({ ...form, popis: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
                Datum
              </label>
              <input
                type="date"
                className={inputStyle}
                onChange={(e) => setForm({ ...form, datum: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-1 block">
                Předmět
              </label>
              <select
                className={inputStyle}
                onChange={(e) => setForm({ ...form, predmet: e.target.value })}>
                {predmety.map((p) => (
                  <option
                    key={p.zkratka}
                    value={p.zkratka}>
                    {p.zkratka}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-red-50 transition-colors group">
            <input
              type="checkbox"
              className="w-5 h-5 rounded-md border-gray-300 text-red-500 focus:ring-red-200"
              onChange={(e) =>
                setForm({ ...form, test: e.target.checked ? 1 : 0 })
              }
            />
            <span className="font-bold text-gray-700 group-hover:text-red-600">
              Označit jako důležitý test
            </span>
          </label>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
            Uložit událost
          </button>
        </form>
      </div>
    </div>
  );
}
