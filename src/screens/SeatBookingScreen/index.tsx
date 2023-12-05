import React from 'react';
import SeatBookingScreen from './view';

export default function ({route}: any) {
  const dataMovie = route.params?.dataMovie || {};
  return <SeatBookingScreen dataMovie={dataMovie} />;
}
