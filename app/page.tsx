import RouteFilters from "@/app/components/RoutesFilter";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <b>Routes Européennes</b>
          <p>Surveiller et suivre les liaisons ferroviaires internationales.</p>
        </div>
        <p>barre de recherche + filtre</p>
      </div>
      <div className="flex gap-4">
        <RouteFilters></RouteFilters>
      </div>
      <div>
        <p>affichage des données</p>
      </div>
    </div>
  );
}
