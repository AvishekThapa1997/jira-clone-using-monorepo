import React from 'react';

interface RenderListProps<Data> {
  data: Data[];
  render: (data: Data) => React.ReactNode;
}

const RenderList = <Data,>({ data, render }: RenderListProps<Data>) => {
  return data.map(render);
};

export { RenderList };
