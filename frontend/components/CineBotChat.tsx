"use client";

import { useState, useRef, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { MdOutlinePerson, MdOutlineSmartToy, MdOutlineRestartAlt } from "react-icons/md";

interface Message {
    id: number;
    sender: "bot" | "user";
    text: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        sender: "bot",
        text: "Vanakkam! 🙏 I'm CineBot.\nI can help you find the latest Tamil movies released in 2025, check showtimes, and book tickets instantly.\nTry asking: \"What's playing in Chennai this weekend?\" or \"Book tickets for Thalaivar's new movie\".",
    },
];

export default function CineBotChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Scroll to bottom on new message
    useEffect(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
        };
        setMessages([...messages, newMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                sender: "bot",
                text: `You asked: "${input}". CineBot is working on it...`,
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);

        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="flex flex-col w-[400px] h-[500px] bg-surface-dark/95 backdrop-blur-sm border border-[#392828] rounded-2xl shadow-2xl overflow-hidden mb-2">
                    {/* Header */}
                    <div className="bg-surface-dark px-4 py-3 border-b border-[#392828] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                                <MdOutlineSmartToy size={24} />
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-sm mb-1">
                                    CineBot{" "}
                                    <span className="text-primary text-xs ml-1 border border-primary/30 bg-primary/10 px-1 py-0.5 rounded-full">
                                        BETA
                                    </span>
                                </h1>
                                <p className="text-text-secondary text-[10px]">
                                    Find movies, check timings, and book instantly
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1 text-text-secondary hover:text-white hover:bg-[#392828] rounded transition-colors"
                                title="Clear Chat"
                                onClick={() => setMessages(initialMessages)}
                            >
                                <MdOutlineRestartAlt size={20} />
                            </button>
                            <button
                                className="p-1 text-text-secondary hover:text-white hover:bg-[#392828] rounded transition-colors"
                                title="Close"
                                onClick={() => setIsOpen(false)}
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                        className="flex-1 overflow-y-auto p-3 space-y-3 scroll-smooth scrollbar-none"
                        ref={chatContainerRef}
                    >
                        <div className="flex justify-center">
                            <span className="text-[10px] text-text-secondary bg-[#392828]/50 px-2 py-0.5 rounded-full">Today</span>
                        </div>

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                            >
                                <div
                                    className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 text-sm ${msg.sender === "bot"
                                        ? "bg-primary/10 border border-primary/30 text-primary"
                                        : "bg-gray-700 text-white"
                                        }`}
                                >
                                    {msg.sender === "bot" ? <MdOutlineSmartToy /> : <MdOutlinePerson />}
                                </div>
                                <div
                                    className={`p-3 rounded-2xl text-sm ${msg.sender === "bot"
                                        ? "bg-[#392828] text-gray-100 rounded-tl-none border-[#392828]"
                                        : "bg-primary text-white rounded-tr-none"
                                        }`}
                                >
                                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-surface-dark border-t border-[#392828] flex-shrink-0">
                        <div className="relative flex items-center gap-2 bg-[#181111] border border-[#392828] rounded-xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <button className="p-2 text-text-secondary hover:text-white rounded-lg transition-colors">
                                <IoIosAddCircleOutline className="text-[18px]" />
                            </button>
                            <textarea
                                className="w-full bg-transparent border-none text-white placeholder-text-secondary focus:ring-0 focus:outline-none resize-none py-2 px-1 text-sm leading-relaxed max-h-24 overflow-hidden rounded-lg"
                                placeholder="Ask about movies, showtimes ..."
                                rows={1}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = e.target.scrollHeight + "px";
                                }}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
                                }
                            />
                            <button
                                onClick={handleSend}
                                className="p-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
                            >
                                <AiOutlineSend className="text-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating SmartToy Icon */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary w-14 h-14 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center transition-colors"
                    title="Open CineBot"
                >
                    <MdOutlineSmartToy size={28} />
                </button>
            )}
        </div>
    );
}