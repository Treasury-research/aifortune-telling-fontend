import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import * as components from "./components";
import { config } from "./config";
import { fonts } from "./fonts";

const customTheme = extendTheme({
	fonts,
	colors,
	config,
	components: {
		...components,
	},
	styles: {
		global: (props: { colorMode: string }) => ({
			body: {
				bg: props.colorMode === "light" ? "#fff" : "#000",
			},
		}),
	},
});

export default customTheme;
