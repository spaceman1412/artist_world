export const images = {
  girl: require('./girl.png'),
  placeholder: require('./placeholder.jpg'),
  camera: require('./camera.svg'),
  delete: require('./delete.png'),
  nextArrow: require('./next.png'),

};

export type ImageTypes = keyof typeof images;
