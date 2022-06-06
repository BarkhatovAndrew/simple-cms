export const validateComments = (name: string, text: string): string => {
  if (!name) {
    return 'Введите имя';
  }
  if (!text) {
    return 'Введите текст';
  }
  if (name.length < 3 || name.length > 20) {
    return 'Некорректная длинна имени';
  }
  if (text.length < 3) {
    return 'Слишком короткое сообщение';
  }
  if (text.length > 500) {
    return 'Слишком длинное сообщение';
  }
  return 'Сообщение отправлено';
};
