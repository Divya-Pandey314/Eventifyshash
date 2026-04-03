import { MessageSquare, Search, Edit } from 'lucide-react';

export default function Messaging() {
  return (
    <div className="flex justify-center h-[calc(100vh-140px)]">
      <div className="card w-full max-w-[900px] flex overflow-hidden">
         {/* Conversations List */}
         <div className="w-[300px] border-r border-[var(--linkedin-border)] flex flex-col bg-white">
            <div className="p-3 border-b border-[var(--linkedin-border)] flex justify-between items-center">
               <h2 className="font-semibold text-base text-[var(--linkedin-text-primary)]">Messaging</h2>
               <div className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer text-[var(--linkedin-text-secondary)]">
                 <Edit size={18} />
               </div>
            </div>
            <div className="p-2 border-b border-[var(--linkedin-border)] bg-slate-50">
               <div className="relative">
                 <Search size={14} className="absolute left-2.5 top-2.5 text-[var(--linkedin-text-tertiary)]" />
                 <input type="text" placeholder="Search messages" className="w-full bg-[#eef3f8] rounded-md text-xs py-2 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] border border-transparent" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="p-10 text-center flex flex-col items-center opacity-60">
                 <MessageSquare size={32} className="text-[var(--linkedin-text-tertiary)] mb-2" />
                 <p className="text-xs font-semibold text-[var(--linkedin-text-secondary)]">No active conversations</p>
               </div>
            </div>
         </div>
         
         {/* Conversation Thread */}
         <div className="flex-1 flex flex-col bg-slate-50/50">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
               <div className="bg-slate-100 p-5 rounded-full text-slate-400 mb-4">
                  <MessageSquare size={48} />
               </div>
               <h2 className="text-xl font-semibold text-[var(--linkedin-text-primary)] mb-2">Networking made easy</h2>
               <p className="text-sm text-[var(--linkedin-text-secondary)] max-w-sm">
                  Send a message to a connection to learn more about an event, find teammates for a hackathon, or seek career advice.
               </p>
               <button className="btn-primary mt-6 text-sm px-5 py-1.5">New message</button>
            </div>
         </div>
      </div>
    </div>
  );
}
