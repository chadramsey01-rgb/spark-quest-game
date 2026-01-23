/* =============================================
   LANDING PAGE - Welcome Screen
   ============================================= */

function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-6 text-center">
            {/* Logo & Title */}
            <div className="mb-8 animate-bounce-in">
                <div className="w-32 h-32 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-200">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-lg">
                        <path d="M 55 5 L 20 60 L 50 60 L 40 95 L 85 35 L 55 35 Z" fill="#fff" />
                    </svg>
                </div>
                <h1 className="text-5xl font-black text-sky-900 mb-2">Spark Quest</h1>
                <p className="text-xl font-bold text-sky-700">Adventure awaits!</p>
            </div>
            
            {/* Preview Card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full border-b-8 border-slate-200 mb-8">
                {/* Avatar Previews */}
                <div className="flex justify-center gap-4 mb-6">
                    <div className="w-20 h-20">
                        <BlockyAvatar 
                            config={{
                                skin: 'skin_fair', 
                                hair: 'hair_black_spiky', 
                                shirt: '#3b82f6', 
                                hat: 'hat_cap_red'
                            }} 
                            size="full" 
                        />
                    </div>
                    <div className="w-20 h-20">
                        <BlockyAvatar 
                            config={{
                                skin: 'skin_dark', 
                                hair: 'hair_blonde_ponytail', 
                                shirt: '#a855f7', 
                                hat: 'hat_crown'
                            }} 
                            size="full" 
                        />
                    </div>
                    <div className="w-20 h-20">
                        <BlockyAvatar 
                            config={{
                                skin: 'skin_tan', 
                                hair: 'hair_brown_messy', 
                                shirt: '#22c55e', 
                                glasses: 'glass_nerd'
                            }} 
                            size="full" 
                        />
                    </div>
                </div>
                
                <p className="text-slate-600 font-bold mb-4">
                    Turn daily chores and exercises into an epic RPG adventure! 
                    Create your hero, complete quests, and unlock cool rewards.
                </p>
                
                {/* CTA Button */}
                <button 
                    onClick={onStart} 
                    className="w-full py-4 bg-green-500 hover:bg-green-400 text-white font-black rounded-xl text-xl shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all uppercase"
                >
                    Play Now
                </button>
            </div>
            
            {/* Footer */}
            <p className="text-xs text-slate-400 font-bold">
                Made with ⚡ for awesome kids
            </p>
        </div>
    );
}
