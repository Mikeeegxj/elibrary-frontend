'use client'
import dynamic from 'next/dynamic';
import theme from './theme';
import { Spinner, Flex, Box } from '@chakra-ui/react';

const ChakraProvider = dynamic(() => import('@chakra-ui/react').then((mod) => mod.ChakraProvider), {
  loading: () => (
    <Flex height="100vh" width={"100%"} alignItems="center" justifyContent="center">
		<Box width={"50px"} height={"50px"}>
			<Spinner height={"100%"} width={"100%"} />
		</Box>
    </Flex>
  ),
});

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}