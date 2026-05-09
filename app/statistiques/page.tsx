"use client";

// Données mockées — à remplacer par un fetch sur /stats/volumes
const MOCK_STATS = {
  total: 142,
  jour: 89,
  nuit: 53,
  parOperateur: [
    { operateur: "SNCF", total: 48, jour: 35, nuit: 13 },
    { operateur: "ÖBB Nightjet", total: 31, jour: 4, nuit: 27 },
    { operateur: "DB", total: 29, jour: 20, nuit: 9 },
    { operateur: "Trenitalia", total: 22, jour: 18, nuit: 4 },
    { operateur: "Autres", total: 12, jour: 12, nuit: 0 },
  ],
  parMois: [
    { mois: "Jan", trajets: 10 },
    { mois: "Fév", trajets: 14 },
    { mois: "Mar", trajets: 18 },
    { mois: "Avr", trajets: 22 },
    { mois: "Mai", trajets: 19 },
    { mois: "Juin", trajets: 25 },
    { mois: "Juil", trajets: 30 },
    { mois: "Août", trajets: 28 },
    { mois: "Sep", trajets: 20 },
    { mois: "Oct", trajets: 15 },
    { mois: "Nov", trajets: 11 },
    { mois: "Déc", trajets: 13 },
  ],
};

// Graphique en anneau SVG simple (sans lib externe)
function DonutChart({ jour, nuit }: { jour: number; nuit: number }) {
  const total = jour + nuit;
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circ = 2 * Math.PI * r;
  const jourFrac = jour / total;
  const nuitFrac = nuit / total;
  const jourDash = circ * jourFrac;
  const nuitDash = circ * nuitFrac;
  // offset : on commence à -90° (top)
  const nuitOffset = circ * 0.25;
  const jourOffset = circ * 0.25 - jourDash;

  return (
    <svg
      viewBox="0 0 160 160"
      className="w-40 h-40"
      aria-label={`Répartition : ${jour} trains de jour, ${nuit} trains de nuit`}
      role="img"
    >
      {/* Arc nuit */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#4338ca"
        strokeWidth="24"
        strokeDasharray={`${nuitDash} ${circ - nuitDash}`}
        strokeDashoffset={nuitOffset}
        strokeLinecap="butt"
      />
      {/* Arc jour */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f97316"
        strokeWidth="24"
        strokeDasharray={`${jourDash} ${circ - jourDash}`}
        strokeDashoffset={jourOffset}
        strokeLinecap="butt"
      />
      <text x={cx} y={cy - 8} textAnchor="middle" className="text-xl font-bold" fontSize="22" fill="currentColor">
        {total}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="#6b7280">
        trajets
      </text>
    </svg>
  );
}

// Barre horizontale pour les opérateurs
function BarRow({ label, jour, nuit, max }: { label: string; jour: number; nuit: number; max: number }) {
  const total = jour + nuit;
  const jourW = (jour / max) * 100;
  const nuitW = (nuit / max) * 100;
  return (
    <div className="flex items-center gap-3" role="row">
      <span className="w-28 text-sm text-slate-600 shrink-0 truncate" title={label}>
        {label}
      </span>
      <div className="flex-1 flex flex-col gap-1">
        <div
          className="flex h-2 rounded-full overflow-hidden bg-slate-100 gap-0.5"
          aria-label={`${label} : ${jour} jour, ${nuit} nuit`}
        >
          <div className="bg-orange-400 rounded-full" style={{ width: `${jourW}%` }} />
          <div className="bg-indigo-600 rounded-full" style={{ width: `${nuitW}%` }} />
        </div>
      </div>
      <span className="w-8 text-sm text-right text-slate-700 font-medium">{total}</span>
    </div>
  );
}

// Graphique barres verticales pour l'évolution mensuelle
function MonthlyChart({ data }: { data: { mois: string; trajets: number }[] }) {
  const max = Math.max(...data.map((d) => d.trajets));
  return (
    <div className="flex items-end gap-2 h-32" role="img" aria-label="Évolution mensuelle du nombre de trajets">
      {data.map(({ mois, trajets }) => (
        <div key={mois} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs text-slate-500">{trajets}</span>
          <div
            className="w-full bg-blue-500 rounded-t-sm"
            style={{ height: `${(trajets / max) * 100}%` }}
            title={`${mois} : ${trajets} trajets`}
          />
          <span className="text-xs text-slate-500">{mois}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatistiquesPage() {
  const stats = MOCK_STATS;
  const maxOp = Math.max(...stats.parOperateur.map((o) => o.total));
  const pctJour = Math.round((stats.jour / stats.total) * 100);
  const pctNuit = Math.round((stats.nuit / stats.total) * 100);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Statistiques ferroviaires</h1>
        <p className="text-sm text-slate-500 mt-1">
          Indicateurs clés sur les dessertes européennes — données illustratives, connexion API à venir.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total trajets", value: stats.total, color: "text-slate-900" },
          { label: "Trains de jour", value: `${stats.jour} (${pctJour}%)`, color: "text-orange-600" },
          { label: "Trains de nuit", value: `${stats.nuit} (${pctNuit}%)`, color: "text-indigo-600" },
          { label: "Opérateurs", value: stats.parOperateur.length, color: "text-slate-900" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-1 shadow-sm">
            <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Répartition jour/nuit + volumes opérateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut */}
        <section
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
          aria-labelledby="chart-repartition"
        >
          <h2 id="chart-repartition" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Répartition jour / nuit
          </h2>
          <div className="flex items-center gap-8">
            <DonutChart jour={stats.jour} nuit={stats.nuit} />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
                <span className="text-sm text-slate-600">Jour</span>
                <span className="ml-auto font-semibold text-orange-600">{stats.jour}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" aria-hidden="true" />
                <span className="text-sm text-slate-600">Nuit</span>
                <span className="ml-auto font-semibold text-indigo-600">{stats.nuit}</span>
              </div>
              <div className="border-t pt-3 flex items-center gap-2">
                <span className="text-sm text-slate-500">Total</span>
                <span className="ml-auto font-bold">{stats.total}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Barres opérateurs */}
        <section
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
          aria-labelledby="chart-operateurs"
        >
          <h2 id="chart-operateurs" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Volumes par opérateur
          </h2>
          <div className="flex flex-col gap-3" role="table" aria-label="Trajets par opérateur">
            <div className="flex items-center gap-3 mb-1" role="row">
              <span className="w-28 text-xs text-slate-400">Opérateur</span>
              <div className="flex-1 flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full inline-block" />
                  Jour
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full inline-block" />
                  Nuit
                </span>
              </div>
              <span className="w-8 text-xs text-slate-400 text-right">Total</span>
            </div>
            {stats.parOperateur.map((op) => (
              <BarRow key={op.operateur} label={op.operateur} jour={op.jour} nuit={op.nuit} max={maxOp} />
            ))}
          </div>
        </section>
      </div>

      {/* Évolution mensuelle */}
      <section
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
        aria-labelledby="chart-mensuel"
      >
        <h2 id="chart-mensuel" className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Évolution mensuelle du nombre de trajets
        </h2>
        <MonthlyChart data={stats.parMois} />
      </section>
    </div>
  );
}
