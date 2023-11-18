import React from 'react';
import MovieScreen from './view';

export default function ({route}: any) {
  const data = route.params?.dataMovie || {};
  console.log('data movie screen', data);
  return <MovieScreen data={data} />;
}
