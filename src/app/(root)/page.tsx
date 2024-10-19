'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Moon, Send, Sun, Trash2, X } from 'lucide-react'
// import Image from 'next/image'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

// type AvatarMetadata = {
//   imageUrl: string;
//   mood: 'neutral' | 'happy' | 'thinking';
// };

// const avatarImages: AvatarMetadata[] = [
//   { 
//     imageUrl: "https://images.unsplash.com/photo-1667745009296-fae4f97bdf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3J5cHRvJTIwYWl8ZW58MHx8MHx8fDA%3D",
//     mood: 'neutral'
//   },
//   { 
//     imageUrl: "https://images.unsplash.com/photo-1640143662254-689f48d1ac99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNyeXB0byUyMGFpfGVufDB8fDB8fHww",
//     mood: 'happy'
//   },
//   { 
//     imageUrl: "https://images.unsplash.com/photo-1659710173823-b4362e0ab9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyeXB0byUyMGFpfGVufDB8fDB8fHww",
//     mood: 'thinking'
//   }
// ];

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState('gpt')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([]) //holding the chat messages
  const [isTyping, setIsTyping] = useState(false)
  // const [currentAvatar, setCurrentAvatar] = useState<AvatarMetadata>(avatarImages[0])
  // const [isAnimating, setIsAnimating] = useState(false)
  // const avatarRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])  // Run only once on component mount to set initial dark mode state based on user's system preference

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode]) // Update the HTML element class based on dark mode state to apply global styles 

  // useEffect(() => {
  //   if (isAnimating && avatarRef.current) {
  //     avatarRef.current.addEventListener('animationend', () => setIsAnimating(false), { once: true })
  //   }
  // }, [isAnimating])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode) // Toggle dark mode state when the button is clicked
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen) // Toggle sidebar state when the button is clicked

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) { // Check if the message is not empty, trim is used to remove leading and trailing whitespaces
      const newMessage: Message = { id: Date.now(), text: message, sender: 'user' }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
      setIsTyping(true)
      
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        const botReply: Message = { id: Date.now(), text: "This is a dummy reply from DR HIRO.", sender: 'bot' }
        setMessages(prev => [...prev, botReply])
        
        // Change avatar image
        // const newIndex = (avatarImages.findIndex(avatar => avatar.imageUrl === currentAvatar.imageUrl) + 1) % avatarImages.length
        // setCurrentAvatar(avatarImages[newIndex])
        // setIsAnimating(true)
      } catch (error) {
        console.error('Error fetching bot response:', error)
      } finally {
        setIsTyping(false)
      }
    }
  }

  const moodStyles = {
    neutral: 'border-gray-400',
    happy: 'border-green-400',
    thinking: 'border-blue-400',
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden ${isDarkMode ? 'bg-[#121212] text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <style jsx global>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); } 
          25% { transform: translateY(-3px); }
          75% { transform: translateY(3px); }
        }
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin: 0 2px;
          background-color: currentColor;
          animation: wave 1.3s linear infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: -1.1s; }
        .typing-dot:nth-child(3) { animation-delay: -0.9s; }
        @keyframes avatarChange {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .avatar-change {
          animation: avatarChange 0.5s ease-out;
        }
      `}</style> 
      <div className={`${isSidebarOpen ? 'w-64 sm:w-72 md:w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full ${isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="font-bold text-lg">DR HIRO</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-gray-700 hover:text-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <div className="mb-4 sm:mb-6">
              <h2 className="font-bold mb-2 text-base sm:text-lg">About DR HIRO</h2>
              <p className="text-xs sm:text-sm opacity-80">DR HIRO is your expert cryptocurrency assistant, providing up-to-date information on prices, trends, and news.</p>
            </div>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="model-select" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Choose a model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select" className={`w-full text-xs sm:text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt">GPT</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Accordion type="single" collapsible className="w-full mb-4 sm:mb-6">
              <AccordionItem value="tips">
                <AccordionTrigger className="text-sm sm:text-base font-bold">Tips for using Dr. Hiro</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2 list-disc list-inside">
                    <li>For live data, ask about current prices or market caps.</li>
                    <li>For historical data, specify a date in your query.</li>
                    <li>For news, mention 'news' or 'latest updates' in your query.</li>
                    <li>For general information, ask about concepts, technologies, or history.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-auto">
            <div className="mb-4 hidden sm:block">
              <div 
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
              />
              {/* Avatar goes in here */}
              <p className="text-center mt-2 text-xs sm:text-sm font-medium">DR HIRO</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => setMessages([])} className="w-full text-xs sm:text-sm bg-red-600 hover:bg-red-700">
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Clear Chat
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <header className={`flex flex-wrap justify-between items-center p-2 sm:p-4 border-b ${isDarkMode ? 'border-gray-700 bg-[#1E1E1E]' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center mb-2 md:mb-0">
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 hover:bg-gray-700 hover:text-gray-100">
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            <h1 className={`text-base sm:text-lg md:text-xl font-bold`}>DR HIRO - Your Cryptocurrency Chatbot 🤖</h1>
          </div>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className={isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}>
            {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </header>
        <main className={`flex-1 overflow-auto p-2 sm:p-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-2 sm:mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                msg.sender === 'user' 
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900' 
                  : isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
              } shadow-md`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <div className={`inline-block p-2 sm:p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} shadow-md`}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </main>
        <footer className={`p-2 sm:p-4 border-t ${isDarkMode ? 'border-gray-700 bg-[#1E1E1E]' : 'border-gray-200 bg-white'}`}>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="What would you like to know about cryptocurrencies?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`flex-1 text-xs sm:text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            />
            <Button type="submit" className={`text-xs sm:text-sm ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
              <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Send
            </Button>
          </form>
        </footer>
      </div>
    </div>
  )
}