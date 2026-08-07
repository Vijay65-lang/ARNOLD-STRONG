export type GymContentItem = {
  id: string;
  type: 'photo' | 'news';
  title: string;
  content: string;
  imageUrl?: string;
  date: string;
};
