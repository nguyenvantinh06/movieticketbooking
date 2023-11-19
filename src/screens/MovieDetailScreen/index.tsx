import React from 'react';
import MovieDetailScreen from './view';

export default function ({route}: any) {
  const data = route.params?.dataMovie || {};
  console.log('data movie screen', data);
  return <MovieDetailScreen data={data} />;
}
