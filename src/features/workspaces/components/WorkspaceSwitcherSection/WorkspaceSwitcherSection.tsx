import { cn } from '@/shared/util/class';
import { useGetWorkspaces } from '../../hooks';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { useToggle } from '@/shared/hooks/useToggle';

interface WorkspaceSwitcherProps {
  className?: string;
}

export const WorkspaceSwitcherSection = ({
  className,
}: WorkspaceSwitcherProps) => {
  const { toggle, toggleValue } = useToggle();
  const { result, isFetching } = useGetWorkspaces(/*enabled*/ toggleValue);
  return (
    <>
      <div className={cn(className)}>
        <WorkspaceSwitcher
          isFetching={isFetching}
          handleOpenChange={(open) => toggle(open)}
          workspaces={result?.data}
        />
      </div>
    </>
  );
};
