import uuid from 'uuid';

export interface IMenuItem {
  id: string;
  text: string;
}

export const menu: IMenuItem[] = [
  {
    id: uuid.v4(),
    text: 'Главная',
  },
  {
    id: uuid.v4(),
    text: 'Написать жалобу',
  },
  {
    id: uuid.v4(),
    text: 'Образцы',
  },
  {
    id: uuid.v4(),
    text: 'Категории',
  },
  {
    id: uuid.v4(),
    text: 'Консультация',
  },
  {
    id: uuid.v4(),
    text: 'Контакты',
  },
];
