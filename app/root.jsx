// ZADÁNÍ: Importy knihoven, stylů a komponenty uživatele pro globální rozvržení
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "./app.css";
import Uzivatel from "./componenty/uzivatel";

// ZADÁNÍ: Definice externích odkazů a fontů (Google Fonts)
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// ZADÁNÍ: Hlavní obal aplikace (Layout) zajišťující responzivitu, ikony a češtinu
export function Layout({ children }) {
  return (
    <html lang="cs">
      {" "}
      <head>
        {/* ZADÁNÍ: Import vektorových ikon Google pro zobrazení symbolů předmětů */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {/* ZADÁNÍ: Fixní hlavička s profilem uživatele zobrazená na všech stránkách */}
        <header className="container mx-auto p-4">
          <Uzivatel />
        </header>

        {/* ZADÁNÍ: Hlavní obsahová část s responzivním kontejnerem */}
        <main className="container mx-auto p-4">{children}</main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ZADÁNÍ: Vykreslení aktuální trasy (stránky) do připraveného layoutu
export default function App() {
  return <Outlet />;
}

// ZADÁNÍ: Zpracování a zobrazení chybových stavů (např. 404 Nenalezeno)
export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
