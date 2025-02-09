import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export const ThemeWrapper = ({ children }: PropsWithChildren) => {
  console.log({ defaultSystem });
  return (
    <ChakraProvider value={defaultSystem}>
      <NextThemeProvider
        attribute='class'
        disableTransitionOnChange
        enableSystem={false}
      >
        {children}
      </NextThemeProvider>
    </ChakraProvider>
  );
};
