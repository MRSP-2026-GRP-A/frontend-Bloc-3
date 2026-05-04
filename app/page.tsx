import RouteFilters from "@/app/components/RoutesFilter";
import RoutesTable from "./components/RoutesTable";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <b>Routes Européennes</b>
          <p>Surveiller et suivre les liaisons ferroviaires internationales.</p>
        </div>
        <div className="flex flew-row justify-around">
          <Input placeholder="Nom d'une gare..."></Input>
          <p>filtre</p>
        </div>
      </div>
      <div className="flex gap-4">
        <RouteFilters></RouteFilters>
      </div>
      <div>
        <RoutesTable></RoutesTable>
      </div>
    </div>
  );
}
