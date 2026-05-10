"use client";
import RouteFilters from "@/app/components/RoutesFilter";
import RoutesTable from "@/app/components/RoutesTable";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Trip } from "@/app/types/routes";
import { isNightTrain } from "@/app/lib/utils";

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [dayNightFilter, setDayNightFilter] = useState("all");

  useEffect(() => {
    const apiUrl = process.env.API_URL ?? "http://localhost:8000";

    fetch(`${apiUrl}/api/trajets/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur API ${res.status}`);
        return res.json();
      })
      .then((trips: Trip[]) => {
        setTrips(trips);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTrips = trips.filter((trip) => {
    // Filtre texte
    const matchesSearch =
      trip.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.origin.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (trip.agency_name ?? "").toLowerCase().includes(searchFilter.toLowerCase());

    // Filtre jour/nuit
    if (dayNightFilter === "day") {
      return matchesSearch && !isNightTrain(trip.departure_time);
    }
    if (dayNightFilter === "night") {
      return matchesSearch && isNightTrain(trip.departure_time);
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-8 sm:px-10 lg:px-16 py-8 flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <b>Routes Européennes</b>
          <p>Surveiller et suivre les liaisons ferroviaires internationales.</p>
        </div>
        <div className="flex flew-row justify-around">
          <Input
            placeholder="Gare,Trajet,Operateur..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <RouteFilters onFilterChange={setDayNightFilter}></RouteFilters>
      </div>
      <div>
        {loading && <p className="text-slate-500">Chargement des trajets...</p>}
        {error && <p className="text-red-600">Erreur : {error}</p>}
        {!loading && !error && <RoutesTable routes={filteredTrips}></RoutesTable>}
      </div>
    </div>
  );
}
