export interface Job {
  title: string;
  briefDescription: string;
  location: string;
  category: string;
  detailLink: string;
  distribution: boolean;
  postingType: 'Internal' | 'External';
}
