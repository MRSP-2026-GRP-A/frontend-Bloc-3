// types/route.ts
export type Route = {
  id: number;
  line_name: string;
  depart: string;
  arrive: string;
  heure_depart: number;
  heure_arrive: number;
  operateur: string;
  distance: number;
};
