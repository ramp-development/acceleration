export interface Job {
  // id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  applyLink: string;
}

const enum Country {
  Electronics = 'electronics',
  Jewelery = 'jewelery',
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

interface Department {
  rate: number;
  count: number;
}
