import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors = {
	bg: {
		lightYellow: "#FFE7B6",
		yellow: "#f2b43e",
		gray: "#e5e7eb",
		black: "#000000",
		main: "#F4F5F6",
		blue: "#6959EA",
		green: "#357E7F",
		white: "#ffffff",
		lightGray: "#C7C9D8",
	},
	text: {
		black: "#000000",
		gray: "#e5e7eb",
		blue: "#6959EA",
		link: "#0665EF",
	},
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
	...overridenChakraColors,
	...extendedColors,
};
