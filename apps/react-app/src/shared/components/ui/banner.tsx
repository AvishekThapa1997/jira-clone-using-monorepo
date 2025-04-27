import { cva, type VariantProps } from 'class-variance-authority';
import { Box } from './box';
import { Text } from './text';
import { cn } from '@jira-clone/core/utils';
import { MdError, MdOutlineWarning, MdCheckCircle } from 'react-icons/md';
import React, { useContext } from 'react';
import { type IconType } from 'react-icons/lib';

const bannerVariants = cva(
  'rounded-md  flex items-center gap-2 font-bold shadow-sm p-4',
  {
    variants: {
      type: {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        warn: 'bg-yellow-100 text-yellow-800',
      },
    },
    defaultVariants: {
      type: 'error',
    },
  },
);

type BannerProps = {
  type?: 'success' | 'error' | 'warn';
  text: string;
} & VariantProps<typeof bannerVariants>;

const bannerIcons: Record<BannerProps['type'], IconType> = {
  success: MdCheckCircle,
  error: MdError,
  warn: MdOutlineWarning,
};

type BannerText = {
  text: string;
};
const BannerContext = React.createContext<BannerProps | null>(null);

const useBanner = () => {
  const result = useContext(BannerContext);
  if (!result) {
    throw new Error('useBanner must be used with BannerContext');
  }
  return result;
};

export const Banner = ({ type = 'success', text }: BannerProps) => {
  return (
    <BannerContext.Provider
      value={{
        text,
        type,
      }}
    >
      <Box className={cn(bannerVariants({ type }))}>
        <BannerIcon />
        <BannerText />
      </Box>
    </BannerContext.Provider>
  );
};

export const BannerText = () => {
  const { text } = useBanner();
  return <Text>{text}</Text>;
};

BannerText.displayName = 'BannerText';

export const BannerIcon = () => {
  const { type } = useBanner();
  const Icon = bannerIcons[type];
  return <Icon size={18} />;
};

BannerIcon.displayName = 'BannerIcon';
