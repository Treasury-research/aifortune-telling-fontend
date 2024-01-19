import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    color: "white",
  },
  variants: {
    bluePrimary: {
      bg: "#7A61DE",
      color: "bg.white",
      borderRadius: "4px",
      fontWeight: "400",
      _hover: {
        opacity: 0.8,
        bg: "#7A61DE",
      },
      _disabled: {
        bg: "#7A61DE",
        opacity: 0.4,
        color: "whiteAlpha.600",
        _hover: {
          opacity: 0.5,
          bg: "#7A61DE!",
        },
      },
      _active: {
        bg: "#7A61DE",
      },
    },
    blackPrimary: {
      bg: "#487C7E",
      color: "bg.white",
      borderRadius: "4px",
      fontWeight: "400",
      _hover: {
        opacity: 0.8,
        transform: "scale(1.01)",
        bg: "#487C7E",
      },
      _disabled: {
        bg: "gray.500",
        opacity: 0.7,
        color: "#fff",
        _hover: {
          opacity: 0.7,
          bg: "gray.600!",
        },
      },
      _active: {
        bg: "#487C7E",
      },
      _loading: {
        bg: "#487C7E",
        color: "#fff",
        _hover: {
          bg: "#121212!",
        },
      },
    },
    whitePrimary: {
      bg: "#fff",
      color: "#000",
      borderRadius: "4px",
      fontWeight: "400",
      borderWidth: "1px",
      borderColor: "gray.600",
      _hover: {
        opacity: 0.9,
        transform: "scale(1.01)",
        bg: "black",
        color: "#FFF",
      },
      _disabled: {
        bg: "#fff",
        opacity: 0.4,
        color: "blackAlpha.600",
        _hover: {
          opacity: 0.5,
          bg: "#000!",
        },
      },
      _active: {
        bg: "#fff",
      },
    },
    yellowPrimary: {
      bg: "bg.yellow",
      color: "#fff",
      borderRadius: "4px",
      fontWeight: "400",
      borderWidth: "0px",
      borderColor: "#000",
      opacity: 0.9,
      _hover: {
        opacity: 0.8,
        bg: "bg.yellow",
      },
      _disabled: {
        bg: "gray.500",
        opacity: 0.7,
        color: "#fff",
        _hover: {
          bg: "gray.500!",
        },
      },
      _active: {
        opacity: 0.8,
        bg: "bg.yellow",
        color: "#FFF",
      },
      _loading: {
        bg: "bg.yellow",
        color: "#fff",
      },
    },
  },
};
