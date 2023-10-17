import {MatchModalRef} from '@components/MatchBottomSheet';
import {createRef} from 'react';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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

export const cityList = [
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Thành phố Hồ Chí Minh',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];

export const createNewMatchUser = (id: string) => {
  firestore()
    .collection('user-match')
    .doc(id)
    .set({
      waiting: [],
      matched: [],
    })
    .then(() => console.log('created'));
};

export const getUniqueId = (firstId: string, secondId: string) => {
  const compareValue = firstId.localeCompare(secondId);

  if (compareValue >= 0) {
    return `${firstId}-${secondId}`;
  } else {
    return `${secondId}-${firstId}`;
  }
};
