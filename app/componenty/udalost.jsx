import { Link } from "react-router";

export default function Udalost({ data }) {
  const ziskejStylPredmetu = (zkratka) => {
    const barvy = {
      WAP: "bg-blue-100 text-blue-700",
      MAT: "bg-red-100 text-red-700",
      CJL: "bg-yellow-100 text-yellow-700",
      EKA: "bg-green-100 text-green-700",
      MUL: "bg-purple-100 text-purple-700",
      ANG: "bg-orange-100 text-orange-700",
    };
    return barvy[zkratka?.toUpperCase()] || "bg-gray-100 text-gray-600";
  };

  const stylKolecka = ziskejStylPredmetu(data.subject_short);

  return (
    <Link
      to={`/events/${data.id}`}
      className="block transition-transform hover:scale-[1.01]">
      <article className="relative p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 overflow-hidden min-h-[90px]">
        {/* ČERVENÝ PROUŽEK PRO TESTY */}
        {(data.is_test == 1 || data.je_test == 1) && (
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 shadow-[2px_0_10px_rgba(239,68,68,0.2)]" />
        )}

        <div className="flex flex-col items-center justify-center min-w-[70px]">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-lg ${stylKolecka}`}>
            {data.subject_short?.toUpperCase()}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 text-xl leading-tight">
              {data.title}
            </h3>
            <time className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-4">
              {data.date}
            </time>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            {data.description}
          </p>
        </div>

        <div className="text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </article>
    </Link>
  );
}
