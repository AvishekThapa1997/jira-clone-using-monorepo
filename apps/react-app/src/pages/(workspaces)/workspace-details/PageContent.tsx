import React from 'react';
import { useParams } from 'react-router';

const PageContent = () => {
  const { workspaceId } = useParams();
  return <div>PageContent - {workspaceId}</div>;
};

export { PageContent };
