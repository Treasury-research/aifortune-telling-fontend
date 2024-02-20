import React, { useEffect } from "react";
import {
	Image,
	Skeleton,
	Radio,
	RadioGroup,
	Stack,
	Button,
	Icon,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { Markdown } from "./MarkDown";

export default function ChatLeft(props: any) {
	const router = useRouter();
	const { item } = props;
	return (
		<div className="flex gap-5 items-start mb-5">
			<Image
				className="shrink-0 h-[48px] rounded-[50%]"
				src={`/images/logo.png`}
				alt=""
			/>
			<div className="p-5 bg-[#fff] rounded-[6px] overflow-auto">
				{item.loading ? (
					<>
						<Skeleton
							height="16px"
							mb={2}
							w={"400px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
						<Skeleton
							height="16px"
							mb={2}
							w={"380px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
						<Skeleton
							height="16px"
							w={"360px"}
							startColor="#F3F3F3"
							endColor="#DFDFDF"
							borderRadius={"8px"}
						/>
					</>
				) : (
					<>
						{item.source == "form" || item.source == "jqpp" || !item.source ? (
							<div className="max-w-[calc(100vw-900px)]">
								<pre
									className={`pre-item`}
									dangerouslySetInnerHTML={{ __html: item.content }}
								></pre>
							</div>
						) : (
							// <div className='max-w-[calc(100vw-900px)]'>
							//     {item.content}
							// </div>
							<div className="max-w-[calc(100vw-900px)]">{item.content}</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
