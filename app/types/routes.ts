// types/route.ts
export type Trip = {
  id_trip: number;
  name: string;
  origin: string;
  destination: string;
  departure_time: string | null;
  arrival_time: string | null;
  duration: number;
  distance: number;
  emission: string;
  id_agency: number;
  agency_name?: string;
};

export type Stop = {
  stop_sequence: number;
  station_name: string;
  city: string | null;
  arrival_time: string | null;
  departure_time: string | null;
  latitude: number;
  longitude: number;
};

export type Agency = {
  id_agency: number;
  code: string;
  name: string;
};

export type TripDetail = {
  trip: Trip;
  agency: Agency;
  is_night_train: boolean;
  stops: Stop[];
};
