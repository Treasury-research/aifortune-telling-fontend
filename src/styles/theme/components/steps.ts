import { StepsTheme } from "chakra-ui-steps";

export const Steps = {
	...StepsTheme,
	baseStyle: (props: any) => {
		return {
			...StepsTheme.baseStyle(props),
			stepIconContainer: {
				...StepsTheme.baseStyle(props).stepIconContainer,
        // border:"none",
			},
			stepIcon: {
				width: "5px",
				height: "5px",
			},
		};
	},
};
