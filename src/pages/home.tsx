import React, { useEffect, useState, useRef } from "react";
import { Router, useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import { Section, SectionsContainer } from "react-fullpage";
import { AnimatePresence, motion as m } from "framer-motion";
import { isPhone } from "lib/common";

let options = {
	sectionClassName: "section",
	anchors: ["one", "two", "three", "four"],
	scrollBar: false,
	navigation: true,
	verticalAlign: false,
	arrowNavigation: true,
};

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		console.log(router);
	}, [router]);
	return (
		<div className="w-full h-full relative bg-[#000]">
			<div className="starfield">
				<div className="static"></div>
				<div className="moving-1"></div>
				<div className="moving-2"></div>
				<div className="moving-3"></div>
			</div>
			<div className="h-[60px] fixed top-0 left-0 flex items-center justify-between w-full z-40">
				<div className="flex h-10 ml-5 items-center">
					<Image src={`/home/logo.svg`} className="mr-5 h-10" alt="" />
					<Image src={`/home/aistar1.png`} className="h-6" alt="" />
				</div>
				<Image
					src={`/home/start.png`}
					className="hover:opacity-70 cursor-pointer ml-[-126px]"
					alt=""
					onClick={() =>
						router.push(isPhone() ? "/mobile/numerology" : "/numerology")
					}
				/>
				<Image
					src={`/home/FAQ.png`}
					alt=""
					className="cursor-pointer hover:opacity-70 mr-10"
					onClick={() =>
						window.open(
							"https://zendaoai.notion.site/FAQ-4fcbb95a7bc84cb18b3c790a2620ccba?pvs=4",
							"_blank"
						)
					}
				/>
			</div>
			<div className="absolute left-0 top-0 w-full h-full z-30 overflow-auto">
				<div className="h-full relative">
					{/* <div className='bg1 w-full h-[100vh] absolute left-0 top-0'></div> */}

					<div className={`h-full flex items-center justify-between bg1`}>
						<Image src={`/home/g1.png`} className="ml-10 h-[80%]" alt="" />
						<div className="h-[70vh] w-[70vh] relative">
							<Image
								src={`/home/r1.png`}
								className="absolute h-full w-full left-0 top-0 rotate-forever1"
								alt=""
							/>
							<Image
								src={`/home/r2.png`}
								className="absolute h-full w-full left-0 top-0 rotate-forever"
								alt=""
							/>
							<Image
								src={`/home/r3.png`}
								className="absolute h-full w-full left-0 top-0 rotate-forever"
								alt=""
							/>
							<Image
								src={`/home/r4.png`}
								className="absolute h-full w-full left-0 top-0 rotate-forever1"
								alt=""
							/>
						</div>
						<Image src={`/home/g2.png`} className="mr-10 h-[80%]" alt="" />
					</div>

					<div className={`h-full`}>
						<div className="h-full w-[80%] mx-auto flex items-center gap-20">
							<div className="flex-1 h-full">
								<Image
									src={`/home/r5.png`}
									className="h-[50%] mx-auto mb-20 mt-10"
									alt=""
								/>
								<Image src={`/home/r6.png`} className="mx-auto" alt="" />
							</div>
							<div className="flex-1 h-full flex items-center relative">
								<Image src={`/home/r7.png`} alt="" />
								<Image
									src={`/home/r8.png`}
									className="absolute left-10 bottom-[30%] cursor-pointer hover:opacity-70"
									alt=""
									onClick={() => router.push("/numerology")}
								/>
							</div>
						</div>
					</div>

					<div className={`h-full flex items-center justify-center`}>
						<Image src={`/home/r9.png`} className="h-[80%]" alt="" />
					</div>
					<div className={`h-full flex items-center justify-center`}>
						<div className="h-[80%] relative">
							<Image src={`/home/r10.png`} className="h-full" alt="" />
							<Image
								src={`/home/r11.png`}
								className="absolute right-10 bottom-20 cursor-pointer hover:opacity-70"
								alt=""
							/>
							{/* <Image src={`/home/r12.png`} className='absolute right-10 bottom-10 cursor-pointer hover:opacity-70' alt="" /> */}
						</div>
					</div>
				</div>
				<div className="h-[60px] overflow-hidden">
					{/* <Image src={`/home/aistar.png`} className="h-10 ml-5" alt="" /> */}
				</div>
			</div>
		</div>
	);
}
