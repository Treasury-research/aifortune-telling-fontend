import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentStyleConfig = {
	baseStyle: {
		borderRadius: "md",
		bg: "white",
		list: {
			border: "solid 1px #C7C9D8",
			borderRadius: "md",
			overflow: "hidden",
		},
		item: {
			height: "35px",
			lineHeight: "35px",
			color: "rgba(0,0,0,.7)",
			_focus: {
				bg: "gray.100",
			},
			_hover: {
				bg: "gray.200",
				color: "#000",
			},
		},
	},
};
