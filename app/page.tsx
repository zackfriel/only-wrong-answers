"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Send,
  Bot,
  User,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Sun,
  Moon,
} from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const [isExpanded, setIsExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setIsExpanded(true);
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      setIsExpanded(true);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-200 ${
        darkMode ? "bg-gray-900 text-white" : "bg-yellow-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-3xl rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "h-[70vh]" : "h-auto"
        } ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div
          className={`p-4 flex justify-between items-center border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold multicolor-text">
              Ask me a question
            </h1>
            <p className="font-bold">I give better responses to simple questions</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              GPT-4o mini
            </span>
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full ${
                darkMode
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-800"
                } transition-colors`}
              >
                {isExpanded ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
              </button>
            )}
          </div>
        </div>
        <div
          className={`p-2 border-b flex items-center gap-2 ${
            darkMode ? "bg-red-900 border-red-800" : "bg-red-100 border-red-200"
          }`}
        >
          <AlertTriangle className="text-red-500" size={20} />
          <p
            className={`text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}
          >
            Warning: This chatbot is configured to provide incorrect
            information. Do not rely on its answers.
          </p>
        </div>
        {isExpanded && (
          <div
            className={`h-[calc(70vh-8rem)] overflow-y-auto p-4 space-y-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-2 max-w-[80%] p-3 rounded-2xl ${
                    m.role === "user"
                      ? darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-400 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-purple-200 text-black"
                  }`}
                >
                  {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                  <p className="text-lg">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-2xl flex items-center gap-2 ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-purple-200 text-black"
                  }`}
                >
                  <Bot size={20} />
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div
          className={`border-t p-4 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <form onSubmit={onSubmit} className="flex space-x-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className={`flex-grow p-2 border-2 rounded-xl focus:outline-none focus:ring-2 text-lg ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-purple-500"
                  : "bg-yellow-50 text-black border-blue-300 focus:ring-purple-400"
              }`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-xl focus:outline-none focus:ring-2 transition-colors duration-200 ${
                darkMode
                  ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-purple-500 disabled:bg-blue-400"
                  : "bg-blue-400 text-white hover:bg-blue-500 focus:ring-purple-400 disabled:bg-blue-200"
              } disabled:cursor-not-allowed`}
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
