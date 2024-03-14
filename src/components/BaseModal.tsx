import {
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Box,
  Text,
} from "@chakra-ui/react";
import type React from "react";

export type BaseModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  isCentered?: boolean;
  children?: React.ReactElement | React.ReactElement[];
  maxW?: number | string;
  title?: string | React.ReactElement;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactElement | React.ReactElement[];
  size?: any;
  hiddenClose?: boolean;
};

export const BaseModal: React.FC<BaseModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    maxW,
    children,
    isCentered,
    title,
    closeOnOverlayClick = true,
    footer,
    size,
    hiddenClose = false,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      isCentered={isCentered !== undefined ? isCentered : true}
      motionPreset="slideInBottom"
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      size={size}
    >
      <ModalOverlay />
      <ModalContent
        className="base-modal"
        borderRadius="md"
        bg="bg.white"
        color="text.black"
        py="10px"
        px="0px"
      >
        {title ? (
          <ModalHeader
            pt={4}
            maxW="calc(100% - 60px)"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize="md"
            fontWeight="semibold"
            pb={1}
          >
            <span>{title}</span>
          </ModalHeader>
        ) : null}
        {!hiddenClose && (
          <ModalCloseButton
            color="text.black"
            borderRadius="0"
            mr="5px"
            mt="10px"
            w="20px"
            h="20px"
            fontSize="12px"
          />
        )}

        <ModalBody>{children}</ModalBody>
        {footer ? footer : null}
      </ModalContent>
    </Modal>
  );
};
