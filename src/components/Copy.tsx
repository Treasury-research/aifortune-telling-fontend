import { CopyIcon } from "@chakra-ui/icons";
import {
  useBoolean,
  Icon,
  Tooltip,
  useClipboard,
  HStack,
} from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";

export const Copy = ({
  text,
  boxSize,
  color,
  mt,
}: {
  mt?: string;
  text: string;
  boxSize?: number;
  color?: string;
}) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard(text);
  const [isMouseOver, setIsMouseOver] = useBoolean(false);

  return (
    <Tooltip
      placement="top"
      fontSize="xs"
      isOpen={hasCopied || isMouseOver}
      label={hasCopied ? "Copied!" : "Copy"}
      hasArrow
    >
      <HStack
        ml={1}
        mt={mt ? mt : ""}
        onMouseOver={setIsMouseOver.on}
        onMouseLeave={setIsMouseOver.off}
        cursor="pointer"
      >
        <Icon
          as={BiCopy}
          color={color || "bg.green"}
          boxSize={boxSize || 4}
          onClick={() => {
            setValue(text);
            onCopy();
          }}
        />
      </HStack>

      {/* <Image
				w="15px"
				ml={1}
				src="/images/account/copy.png"
				className="cursor-pointer hover:opacity-70"
				alt=""
			/> */}
    </Tooltip>
  );
};
