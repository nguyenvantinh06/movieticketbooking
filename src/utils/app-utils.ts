import {Alert, Linking} from 'react-native';

export const getYoutubeVideoId = (url: string) => {
  const regex = /[?&]v=([^&]+)/;
  const match = url?.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};

export const handleOpenLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export const parseBadge = (number: number) => {
  if (Number.isInteger(number) && number > 99) {
    return '99+';
  } else {
    return number.toString();
  }
};

export const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];

export const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

export const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      reachNine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};
