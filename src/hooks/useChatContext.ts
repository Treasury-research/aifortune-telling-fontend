import { useContext } from "react";
import { ChatContext } from "context";

export default function useChatContext() {
  return useContext<any>(ChatContext);
}
