import {getSize} from 'src/hooks/use-resize-hoc';
import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const dimen = Dimensions.get('screen');
export const deviceWidth =
  dimen.width > dimen.height ? dimen.height : dimen.width;
export const deviceHeight =
  dimen.height > dimen.width ? dimen.height : dimen.width;

export enum SCENE_NAME {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  ROOT = 'ROOT',
  HOME_TAB = 'HOME_TAB',
  ON_BOARDING = 'ON_BOARDING',
  PROFILE_TAB = 'PROFILE_TAB',
  MOVIE_DETAIL_SCREEN = 'MOVIE_DETAIL_SCREEN',
  PERSON_SCREEN = 'PERSON_SCREEN',
  SEARCH_SCREEN = 'SEARCH_SCREEN',
  TICKET_SCREEN = 'TICKET_SCREEN',
  SEAT_BOOKING_SCREEN = 'SEAT_BOOKING_SCREEN',
  TICKET_DETAIL_SCREEN = 'TICKET_DETAIL_SCREEN',
}

export const REGEX_DATE_SHORT =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/gm;

export const isIphoneWithDynamicIsland = DeviceInfo.hasDynamicIsland();

export const hitSlop = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

export const DEFAULT_AVATAR =
  'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';

export const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
