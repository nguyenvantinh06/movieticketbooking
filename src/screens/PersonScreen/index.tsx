import React from 'react';
import PersonScreen from './view';

export default function ({route}: any) {
  const data = route.params?.dataPerson || [];
  return <PersonScreen data={data} />;
}
