import {MatchModalRef} from '@components/MatchBottomSheet';
import {createRef} from 'react';
import {Dimensions} from 'react-native';
const {height, width, fontScale, scale} = Dimensions.get('window');

export class AppDims {
  static width: number = width;
  static height: number = height;
  static fontScale: number = fontScale;
  static scale: number = scale;

  static get DESIGN_WIDTH() {
    return 375;
  }

  static get DESIGN_HEIGHT() {
    return 812;
  }
}

/**
 * @param data list data to map list item
 * @param renderItem custom type return
 * @param separatorItem separator type in each item
 * @returns return list renderItem type
 */
export const mapListComponent = <T, U>(
  data: T[],
  renderItem: (item: T, index: number) => U,
  separatorItem?: (item: T, index: number) => U,
): U[] => {
  const components: U[] = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    if (separatorItem && index > 0) {
      components.push(separatorItem(item, index));
    }
    components.push(renderItem(item, index));
  }

  return components;
};

///TODO: Call phone modal
export const matchModalRef = createRef<MatchModalRef>();

export const showMatch: MatchModalRef['show'] = params =>
  matchModalRef.current?.show(params);

export const hideMatch: MatchModalRef['hide'] = () =>
  matchModalRef.current?.hide();
