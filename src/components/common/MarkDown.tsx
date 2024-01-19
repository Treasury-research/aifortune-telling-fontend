import React from "react";
import dynamic from "next/dynamic";
import { Flex } from "@chakra-ui/react";
import { BarLoader } from "react-spinners";

const MDPreview = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  {
    ssr: false,
    loading: () => (
      <Flex h="20px" alignItems="center" justify="center">
        <BarLoader color="#0000003d" width="60px" />
      </Flex>
    ),
  }
);

export const Markdown = ({ value }: any) => {
  return (
    <div data-color-mode="light">
      <div className="wmde-markdown-var"> </div>
      <MDPreview
        source={(value && value.trim()) || ""}
        className="md-preview"
        linkTarget="_blank"
        previewOptions={{
          breaks: true,
        }}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
    </div>
  );
};
