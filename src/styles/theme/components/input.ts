import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
	variants: {
		text: {
			field: {
				width: "100%",
				display: "inline-block",
				border: "1px solid #C7C9D8",
				height: "35px",
				lineHeight: "35px",
				boxSizing: "border-box",
				borderRadius: "3px",
				bg: "white",
			},
		},
	},
	defaultProps: {
		variant: "text",
	},
};
