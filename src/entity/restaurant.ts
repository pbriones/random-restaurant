import { Coords } from './coords';

export class Restaurant {
  url: string;
  categories: Category[];
  coordinates: Coords;
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: Location;
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: any[];
}

class Category {
  alias: string;
  title: string;
}

class Location {
  origin: string;
  duration: string;
  distance: string;
  destination: string;
}