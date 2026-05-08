"use client";
import RouteFilters from "@/app/components/RoutesFilter";
import RoutesTable from "@/app/components/RoutesTable";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      line_name: "Durant",
      depart: "Paul",
      arrive: "Marseille",
      heure_depart: 22,
      heure_arrive: 8,
      operateur: "ÖBB Nightjet",
      distance: 165,
    },
    {
      id: 2,
      line_name: "Durant",
      depart: "Paul",
      arrive: "Marseille",
      heure_depart: 8,
      heure_arrive: 22,
      operateur: "ÖBB JOUR",
      distance: 999,
    },
    {
      id: 3,
      line_name: "Durant",
      depart: "Paul",
      arrive: "Marseille",
      heure_depart: 20,
      heure_arrive: 14,
      operateur: "ÖBB VLADIMIR",
      distance: 667,
    },
  ]);
  const [filter, setFilter] = useState("");

  const filteredRoutes = routes.filter(
    (route) =>
      route.line_name.toLowerCase().includes(filter.toLowerCase()) ||
      route.depart.toLowerCase().includes(filter.toLowerCase()) ||
      route.arrive.toLowerCase().includes(filter.toLowerCase()) ||
      route.operateur.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-7 ">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <b>Routes Européennes</b>
          <p>Surveiller et suivre les liaisons ferroviaires internationales.</p>
        </div>
        <div className="flex flew-row justify-around">
          <Input placeholder="Nom d'une gare..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-4">
        <RouteFilters></RouteFilters>
      </div>
      <div>
        <RoutesTable routes={filteredRoutes}></RoutesTable>
      </div>
    </div>
  );
}
