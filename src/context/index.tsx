import React, { createContext, useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useBoolean, useDisclosure } from "@chakra-ui/react";
import api, { baseURL } from "api";
import { useRouter } from "next/router";
import { useChatStore } from "store/chatStore";
import { userInfoStore } from "store/userInfoStore";
import { getSection, isPhone as isMobile } from "lib/common";

export const ChatContext = createContext({});

export default function ChatProvider({ children }: any) {
	const router = useRouter();
	const { lang } = useChatStore();

	const {
		setTotalCoupon,
		setDailyAdd,
		addChat,
		activeChatId,
		getActiveChat,
		getActiveChatMessages,
		setActiveChatId,
		removeMessage,
		addMessage,
		updateMessage,
		getAllChatList,
		getChatList,
		getFirstChatByType,
		removeChat,
		updateChat,
		getMessage,
		getChat,
		chatById,
		channel,
		setChannel,
	} = useChatStore();

	const {
		name,
		birthDay,
		setName,
		setSex,
		setBirthDay,
		account,
		userConverId,
		userId,
		userKey,
		setUserKey,
		setUserId,
		setAssets,
	} = userInfoStore();

	// console.log("userKey", userKey);

	const [section, setSection] = useState<string | null>();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [input, setInput] = useState("");
	const [isDone, setIsDone] = useState(true);
	const [showNav, setShowNav] = useBoolean(false);
	const [isPhone, setIsPhone] = useBoolean(false);

	let activeChat: any = getActiveChat();
	const activeMessages: any = getActiveChatMessages();
	const chatList: any = getAllChatList()
		.filter((item: any) => item.section === section)
		.sort((a: any, b: any) => {
			if (a.createTime > b.createTime) {
				return -1;
			}

			return 1;
		});

	const [allChatList, setAllChatList] = useState(chatList);

	useEffect(() => {
		if (router.query.id) {
			if (getChat(router.query.id)) {
				setActiveChatId(router.query.id);
			}
		}
		if (router.pathname) {
			const sec = getSection();
			setSection(sec);
		}
		onScroll(600);
	}, [router]);

	useEffect(() => {
		const chatList: any = getAllChatList()
			.filter((item: any) => item.section === section)
			.sort((a: any, b: any) => {
				if (a.createTime > b.createTime) {
					return -1;
				}

				return 1;
			});

		setAllChatList(chatList);
	}, [section, chatById, activeChatId]);

	useEffect(() => {
		const isphone = isMobile();
		isphone ? setIsPhone.on() : setIsPhone.off();
	}, [router]);

	const openNav = async () => {
		setShowNav.on();
	};

	const closeNav = async () => {
		setShowNav.off();
	};

	const getAssets = async () => {
		const res: any = await api.post(`/api/assets_select`, {
			user_id: userKey,
		});
		if (res && res.length > 0 && res[0].data) {
			setAssets(res[0].data);
		}
	};

	const setActiveChatById = (id: string) => {
		setActiveChatId(id);
		const newURL = location.href.replace(/(\?|&)id=[^&]*/, "$1id=" + id);
		history.replaceState({}, document.title, newURL);
	};

	const onScroll = (timer: number) => {
		setTimeout(() => {
			const chatContent = document.getElementById("chat-content");
			chatContent && chatContent?.scrollTo({ top: 50000, behavior: "smooth" });
		}, timer);
	};

	const isJSONString = (str: string) => {
		try {
			JSON.parse(str);
			return true;
		} catch (error) {
			console.log("error", error);
			return false;
		}
	};

	const submitQuestion = async (
		type: "chat" | "form" | "jqpp",
		paload: any
	) => {
		const id = uuidv4();
		if (section == "numerology") {
			handleNumer(type, paload, id);
		} else {
			handleAsset(type, paload, id);
		}
		handleRecommdend(type, paload, id);
	};

	const handleRecommdend = async (
		type: "chat" | "form" | "jqpp",
		paload: any,
		id: string
	) => {
		const res: any = await api.post(`${baseURL}/api/question_rec`, {
			conversation_id: activeChat.id,
			...paload,
			user_id: userKey,
			matcher_type: section == "assets" ? 2 : type === "form" ? 1 : 0,
		});

		// console.log(res);
		if (res && res.length > 0 && res[0].data && res[0].data.length > 0) {
			updateMessage(activeChatId, id, {
				recommends: res[0].data || [],
			});
		}
	};

	const handleAsset = async (
		type: "chat" | "form" | "jqpp",
		paload: any,
		id: string
	) => {
		// const id = uuidv4();
		// onScroll(400);

		const onChunkedResponseError = (err: any) => {
			setIsDone(true);
			updateMessage(activeChatId, id, {
				content: lang === "CN" ? "消息请求失败!" : "Message error",
				loading: false,
				error: true,
			});
		};

		const processChunkedResponse = (response: any) => {
			return new Promise((resolve, reject) => {
				var reader = response.body.getReader();
				var decoder = new TextDecoder();
				let sourceChunk = "";

				return readChunk();

				async function readChunk() {
					onScroll(400);
					return reader.read().then(appendChunks);
				}

				function appendChunks(result: any) {
					let chunk: any = decoder.decode(result.value || new Uint8Array(), {
						stream: !result.done,
					});

					sourceChunk += chunk;

					console.log("sourceChunk", sourceChunk);
					updateMessage(activeChatId, id, {
						content: sourceChunk,
						loading: false,
					});

					// console.log("chunk1", chunk);
					if (result.done) {
						setIsDone(true);
					} else {
						return readChunk();
					}
				}
			});
		};
		// let body :any;
		let url: any;
		let params: any;

		if (type == "form") {
			url = "/api/baziMatch";
			params = {
				...paload,
				user_id: userKey,
				conversation_id: activeChat.id,
				matcher_type: 2,
				account: account || null,
			};
		} else if (type == "chat") {
			url = "/api/chat_bazi_match";
			params = {
				...paload,
				user_id: userKey,
				conversation_id: activeChat.id,
				matcher_type: 2,
			};
		} else {
			url = "/api/get_bazi_info";
			params = {
				user_id: userKey,
				conversation_id: activeChat.id,
			};
		}
		addMessage(activeChatId, [
			{
				id,
				content: "",
				type: "answer",
				loading: true,
				source: type,
			},
		]);

		onScroll(400);

		setIsDone(false);
		await fetch(`${baseURL}${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...params,
			}),
		})
			.then(processChunkedResponse)
			.then((respones: any) => {
				if (respones.done) {
					console.log("respones", respones);
				}
			})
			.catch(onChunkedResponseError);
	};

	const handleNumer = async (
		type: "chat" | "form" | "jqpp",
		paload: any,
		id: string
	) => {
		// const id = uuidv4();
		const onChunkedResponseError = (err: any) => {
			// console.error(err);
			setIsDone(true);
			updateMessage(activeChatId, id, {
				content: lang === "CN" ? "消息请求失败!" : "Message error",
				loading: false,
				error: true,
			});
		};

		const processChunkedResponse = (response: any) => {
			return new Promise((resolve, reject) => {
				var reader = response.body.getReader();
				var decoder = new TextDecoder();
				let sourceChunk = "";

				return readChunk();

				async function readChunk() {
					onScroll(400);
					return reader.read().then(appendChunks);
				}

				function appendChunks(result: any) {
					let chunk: any = decoder.decode(result.value || new Uint8Array(), {
						stream: !result.done,
					});

					let str: any = chunk.match(/<chunk>([\s\S]*?)<\/chunk>/g);
					if (str && Array.isArray(str) && str.length > 0) {
						let chunk1: any = str.map((t: string) =>
							t.replace(/<\/?chunk>/g, "")
						);
						for (let i = 0; i < chunk1.length; i++) {
							if (isJSONString(chunk1[i])) {
								let user = JSON.parse(chunk1[i]);
								if (user?.user_key) {
									setUserKey(user.user_key);
								}
								chunk.replace(chunk1[i], "");
							}
						}
					}
					const regex = /<chunk>.*?<\/chunk>/g;

					chunk = chunk.replace(regex, "");

					// chunk.replace(/<\/?chunk>/g, "")

					sourceChunk += chunk;

					console.log("sourceChunk", sourceChunk);

					updateMessage(activeChatId, id, {
						content: sourceChunk,
						loading: false,
					});

					// console.log("chunk1", chunk);
					if (result.done) {
						setIsDone(true);
					} else {
						return readChunk();
					}
				}
			});
		};
		// let body :any;
		let url: any;
		let params: any;
		let source: any;
		if (type == "form") {
			// 已经填入个人信息，走八字匹配接口
			if (userConverId) {
				url = "/api/baziMatch";
				params = {
					...paload,
					user_id: userKey,
					account: account || null,
					name: activeChat.messages[1].name,
					conversation_id: activeChat.id,
					matcher_type: 1,
					day: paload.day ? Number(paload.day).toString() : "",
					month: paload.month ? Number(paload.month).toString() : "",
				};
			} else {
				url = "/api/baziAnalysis";
				params = {
					...paload,
					user_id: userKey,
					account: account || null,
					name: activeChat.messages[1].name,
					conversation_id: activeChat.id,
					day: paload.day ? Number(paload.day).toString() : "",
					month: paload.month ? Number(paload.month).toString() : "",
				};
			}
		} else if (type == "chat") {
			// 个人聊天
			if (userConverId == activeChat.id) {
				url = "/api/chat_bazi";
			} else {
				// 八字聊天
				url = "/api/chat_bazi_match";
			}
			params = {
				...paload,
				user_id: userKey,
				conversation_id: activeChat.id,
				matcher_type: 1,
			};
		} else {
			url = "/api/get_bazi_info";
			params = {
				user_id: userKey,
				conversation_id: activeChat.id,
			};
		}

		addMessage(activeChatId, [
			{
				id,
				content: "",
				type: "answer",
				loading: true,
				source: type,
			},
		]);

		onScroll(400);

		setIsDone(false);
		await fetch(`${baseURL}${url}`, {
			method: "POST",
			headers: {
				Lang: lang === "CN" ? "Cn" : "En",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...params,
			}),
		})
			.then(processChunkedResponse)
			.then((respones: any) => {
				if (respones.done) {
					console.log(respones);
				}
			})
			.catch(onChunkedResponseError);
	};

	return (
		<ChatContext.Provider
			value={{
				isOpen,
				input,
				isPhone,
				activeChatId,
				activeChat,
				activeMessages,

				removeMessage,
				allChatList,
				getChatList,
				section,
				getChat,
				addChat,
				removeChat,
				updateChat,
				updateMessage,
				isDone,
				addMessage,
				showNav,
				setShowNav,
				setActiveChatById,
				openNav,
				onOpen,
				closeNav,
				setInput,
				onClose,
				getAssets,
				submitQuestion,
				setSection,
				setIsDone,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}
