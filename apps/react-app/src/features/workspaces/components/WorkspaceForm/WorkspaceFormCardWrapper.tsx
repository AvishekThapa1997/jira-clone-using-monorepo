import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { PropsWithChildren } from 'react';

interface WorkspaceFormCardProps extends PropsWithChildren {
  title: string;
}

const WorkspaceFormCardWrapper = ({
  title,
  children,
}: WorkspaceFormCardProps) => {
  return (
    <Card className='p-4 space-y-2'>
      <CardHeader className='p-0'>{title}</CardHeader>
      <CardContent className='p-0'>{children}</CardContent>
    </Card>
  );
};

export { WorkspaceFormCardWrapper };
