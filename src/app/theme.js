import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useColorModeValue } from "@chakra-ui/react";
const styles = {
	global: (props) => ({
	  body: {
		color: mode("#000000", "whiteAlpha.900")(props),
		bg: mode("#FFF", "#141214")(props),
		lineHeight: "normal",
	  },
	}),
  };


const theme = extendTheme({
	config: {
		initialColorMode: "light",
		useSystemColorMode: false,
	},
	styles,
});

export default theme;