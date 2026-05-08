import Link from "next/link";
import { Train, Moon, Sun, Leaf, ArrowLeft, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Route = {
  id: string;
  line_name: string;
  depart: string;
  arrive: string;
  heure_depart: number;
  heure_arrive: number;
  distance: number;
  operateur: string;
  pays: string[];
  frequence: string;
  actif: boolean;
};

function duree(hd: number, ha: number) {
  const diff = ha >= hd ? ha - hd : 24 - hd + ha;
  const h = Math.floor(diff);
  const m = Math.round((diff - h) * 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatHeure(h: number) {
  return `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;
}

function isNuit(hd: number) {
  return hd >= 22 || hd < 6;
}

function co2Economise(distance: number) {
  return Math.round(((255 - 14) / 255) * 100);
}

const demoRoute: Route = {
  id: "1",
  line_name: "Durant",
  depart: "Paul",
  arrive: "Marseille",
  heure_depart: 22,
  heure_arrive: 8,
  distance: 165,
  operateur: "ÖBB Nightjet",
  pays: ["France", "Suisse", "Autriche"],
  frequence: "Quotidienne",
  actif: true,
};

export default function RouteDetail() {
  const route = demoRoute;
  const nuit = isNuit(route.heure_depart);
  const depasse = route.heure_arrive < route.heure_depart;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground w-fit hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux routes
      </Link>

      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-medium">{route.line_name}</h1>
            {nuit ? (
              <Badge className="bg-indigo-950 text-indigo-300 rounded-full gap-1">
                <Moon className="w-3 h-3" /> Nuit
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 rounded-full gap-1">
                <Sun className="w-3 h-3" /> Jour
              </Badge>
            )}
            <Badge
              className={
                route.actif
                  ? "bg-green-100 text-green-700 rounded-full gap-1"
                  : "bg-yellow-100 text-yellow-700 rounded-full gap-1"
              }
            >
              <CircleDot className="w-3 h-3" />
              {route.actif ? "Actif" : "Retardé"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Géré par {route.operateur}</p>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-4">Itinéraire</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-medium">{route.depart}</p>
            <p className="text-sm text-muted-foreground mt-1">{formatHeure(route.heure_depart)}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <span className="text-xs text-muted-foreground mb-2">{duree(route.heure_depart, route.heure_arrive)}</span>
            <div className="w-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border-2 border-muted-foreground shrink-0" />
              <div className="flex-1 h-px bg-border" />
              <Train className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground shrink-0" />
            </div>
            <span className="text-xs text-muted-foreground mt-2">Direct</span>
          </div>

          <div className="text-right">
            <p className="text-2xl font-medium">{route.arrive}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatHeure(route.heure_arrive)}
              {depasse && " +1"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Distance", value: `${route.distance.toLocaleString()} km` },
          { label: "Durée", value: duree(route.heure_depart, route.heure_arrive) },
          { label: "Opérateur", value: route.operateur },
          { label: "Fréquence", value: route.frequence },
        ].map(({ label, value }) => (
          <div key={label} className="bg-muted rounded-md p-4">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-xl font-medium">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-md p-4 flex items-center gap-3">
        <Leaf className="w-5 h-5 text-green-600 shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground mb-1">CO₂ économisé vs avion</p>
          <p className="text-xl font-medium text-green-600">-{co2Economise(route.distance)}%</p>
        </div>
      </div>

      <div className="border rounded-lg p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-3">Pays traversés</p>
        <div className="flex gap-2 flex-wrap">
          {route.pays.map((p) => (
            <span key={p} className="text-sm px-3 py-1 rounded-full border text-foreground">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
