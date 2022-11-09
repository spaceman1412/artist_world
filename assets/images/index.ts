export const images = {
  girl: require('./girl.png'),
  placeholder: require('./placeholder.jpg'),
  camera: require('./camera.svg'),
  delete: require('./delete.png'),
  dropdown: require('./down-arrow.png'),
  close: require('./close.png'),
  search: require('./search.png'),

};

export type ImageTypes = keyof typeof images;
