"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, Bot, User, Maximize2, Minimize2, AlertTriangle } from "lucide-react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      setIsTyping(true)
      setIsExpanded(true)
      handleSubmit(e)
      setIsTyping(false)
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      setIsExpanded(true)
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-black p-4">
      <div
        className={`w-full max-w-3xl bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "h-[70vh]" : "h-auto"}`}
      >
        <div className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-3xl font-bold multicolor-text">Ask me a question</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">GPT-3.5-turbo</span>
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isExpanded ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
              </button>
            )}
          </div>
        </div>
        <div className="bg-red-100 p-2 border-b border-red-200 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={20} />
          <p className="text-sm text-red-700">
            Warning: This chatbot is configured to provide incorrect information. Do not rely on its answers.
          </p>
        </div>
        {isExpanded && (
          <div className="h-[calc(70vh-8rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-center gap-2 max-w-[80%] p-3 rounded-2xl ${
                    m.role === "user" ? "bg-blue-400 text-white" : "bg-purple-200 text-black"
                  }`}
                >
                  {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                  <p className="text-lg">{m.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-purple-200 text-black p-3 rounded-2xl flex items-center gap-2">
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
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className="flex-grow p-2 bg-yellow-50 text-black border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-blue-400 text-white p-2 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-blue-200 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

