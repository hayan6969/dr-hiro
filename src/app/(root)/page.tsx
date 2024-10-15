"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Moon, Send, Sun, Trash2, X } from 'lucide-react'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

type AvatarMetadata = {
  imageUrl: string;
  mood: 'neutral' | 'happy' | 'thinking';
};

const avatarImages: AvatarMetadata[] = [
  { 
    imageUrl: "https://images.unsplash.com/photo-1667745009296-fae4f97bdf7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3J5cHRvJTIwYWl8ZW58MHx8MHx8fDA%3D",
    mood: 'neutral'
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1640143662254-689f48d1ac99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNyeXB0byUyMGFpfGVufDB8fDB8fHww",
    mood: 'happy'
  },
  { 
    imageUrl: "https://images.unsplash.com/photo-1659710173823-b4362e0ab9c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNyeXB0byUyMGFpfGVufDB8fDB8fHww",
    mood: 'thinking'
  }
];

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState('gpt')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState<AvatarMetadata>(avatarImages[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const avatarRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    if (isAnimating && avatarRef.current) {
      avatarRef.current.addEventListener('animationend', () => setIsAnimating(false), { once: true })
    }
  }, [isAnimating])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
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
        const newIndex = (avatarImages.findIndex(avatar => avatar.imageUrl === currentAvatar.imageUrl) + 1) % avatarImages.length
        setCurrentAvatar(avatarImages[newIndex])
        setIsAnimating(true)
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
        <div className="flex-grow overflow-hidden">
          <div className="p-4">
          <img 
  ref={avatarRef}
  src={currentAvatar.imageUrl} 
  alt="DR HIRO Avatar" 
  className={`w-40 h-40 mx-auto rounded-full border-4 ${moodStyles[currentAvatar.mood]} ${isAnimating ? 'avatar-change' : ''} shadow-lg hidden sm:block`}
 />

          </div>
          <ScrollArea className="h-[calc(100vh-13rem)] px-4">
            <div className="mb-6">
              <h2 className="font-bold mb-2 text-lg">About DR HIRO</h2>
              <p className="text-sm opacity-80">DR HIRO is your expert cryptocurrency assistant, providing up-to-date information on prices, trends, and news.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="model-select" className="block text-sm font-medium mb-2">Choose a model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select" className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt">GPT</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-bold mb-3 text-lg">Tips for using Dr. Hiro</h3>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>For live data, ask about current prices or market caps.</li>
                <li>For historical data, specify a date in your query.</li>
                <li>For news, mention 'news' or 'latest updates' in your query.</li>
                <li>For general information, ask about concepts, technologies, or history.</li>
              </ul>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
      <header className={`flex flex-wrap justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700 bg-[#1E1E1E]' : 'border-gray-200 bg-white'}`}>
  <div className="flex items-center mb-2 md:mb-0">
    {!isSidebarOpen && (
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 hover:bg-gray-700 hover:text-gray-100">
        <ChevronRight className="h-4 w-4" />
      </Button>
    )}
    <h1 className={`text-lg sm:text-xl font-bold`}>DR HIRO - Your Cryptocurrency Chatbot 🤖</h1>
  </div>
  <div className="flex justify-between w-full items-center ">
  <Button variant="destructive" size="sm" onClick={() => setMessages([])} className="bg-red-600 hover:bg-red-700">
      <Trash2 className="h-4 w-4 mr-2" /> Clear Chat
    </Button>
    <Button variant="outline" size="icon" onClick={toggleDarkMode} className={isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}>
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
    
  </div>
</header>

        <main className={`flex-1 overflow-auto p-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${
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
              <div className={`inline-block p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} shadow-md`}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </main>
        <footer className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-[#1E1E1E]' : 'border-gray-200 bg-white'}`}>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="What would you like to know about cryptocurrencies?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            />
            <Button type="submit" className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}>
              <Send className="h-4 w-4 mr-2" /> Send
            </Button>
          </form>
        </footer>
      </div>
    </div>
  )
}



//Documentation

//To integrate this component with real API calls and message responses:

//1) 1. Replace the simulated API call in `handleSendMessage` with your actual API call:
//      try {
//   const response = await fetch('YOUR_API_ENDPOINT', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ message: message }),
//   });
//   const data = await response.json();
//   const botReply: Message = { id: Date.now(), text: data.reply, sender: 'bot' };
//   setMessages(prev => [...prev, botReply]);
// } catch (error) {
//   console.error('Error fetching bot response:', error);
//   // Handle error (e.g., show error message to user)
// }

//2) If you need to load initial messages or conversation history, you can add another `useEffect` hook:

// useEffect(() => {
//     async function loadInitialMessages() {
//       try {
//         const response = await fetch('YOUR_HISTORY_API_ENDPOINT');
//         const data = await response.json();
//         setMessages(data.messages);
//       } catch (error) {
//         console.error('Error loading message history:', error);
//         // Handle error
//       }
//     }
//     loadInitialMessages();
//   }, []);

//3) For real-time updates, you will implement a WebSocket connection or use a polling mechanism within a `useEffect` hook.


//To replace the avatar with real-time metadata from API responses, you would need to do the following:

//1) Update the API Response Type:Define a type for your API response that includes metadata for the avatar:

// type ApiResponse = {
//     reply: string;
//     avatarMetadata: {
//       imageUrl: string;
//       mood: string;
//     };
//   };

//2) Update the `handleSendMessage` Function:Replace the simulated API call with a real one and use the returned metadata:

// try {
//     const response = await fetch('YOUR_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: message }),
//     });
//     const data: ApiResponse = await response.json();
    
//     const botReply: Message = { id: Date.now(), text: data.reply, sender: 'bot' };
//     setMessages(prev => [...prev, botReply]);
    
//     // Update avatar based on API response
//     setCurrentAvatar(data.avatarMetadata.imageUrl);
    
//     // You could also use the mood to apply different styles or animations
//     // For example: setCurrentMood(data.avatarMetadata.mood);
//   } catch (error) {
//     console.error('Error fetching bot response:', error);
//     // Handle error (e.g., show error message to user)
//   }


