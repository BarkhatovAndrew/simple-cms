export interface IMenuItem {
  id: number;
  text: string;
  url: string;
}

export const menu: IMenuItem[] = [
  {
    id: 1,
    text: 'Главная',
    url: '/',
  },
  {
    id: 2,
    text: 'Написать жалобу',
    url: '/write',
  },
  {
    id: 3,
    text: 'Образцы',
    url: '/all',
  },
  {
    id: 4,
    text: 'Категории',
    url: '/categories',
  },
  {
    id: 5,
    text: 'Консультация',
    url: '/yurist',
  },
  {
    id: 6,
    text: 'Контакты',
    url: '/contacts',
  },
];
