/* =============================================
   SPARK SPINNER - Quest Generation & Chores
   ============================================= */

function SparkSpinner() {
    const { activePlayers, completeQuest, completeChore } = useGame();
    
    const [spinning, setSpinning] = useState(false);
    const [quests, setQuests] = useState(null);
    const [mode, setMode] = useState('quests');
    
    const spin = () => {
        if (spinning) return;
        
        setSpinning(true);
        setQuests(null);
        
        setTimeout(() => {
            // Generate age-appropriate quests for each player
            const newQuests = activePlayers.map(player => {
                const age = calculateAge(player.dob);
                return generateQuest(age);
            });
            
            setQuests(newQuests);
            setSpinning(false);
        }, 1500);
    };
    
    const handleQuestComplete = (playerIndex, quest) => {
        completeQuest(playerIndex, quest);
        
        // Remove completed quest from display
        const updatedQuests = [...quests];
        updatedQuests[playerIndex] = null;
        setQuests(updatedQuests);
    };
    
    const handleChoreComplete = (playerIndex, chore) => {
        completeChore(playerIndex, chore);
    };
    
    // Check if all quests are complete
    const allQuestsComplete = quests && quests.every(q => q === null);
    
    return (
        <div className="h-full flex flex-col p-4 overflow-y-auto pb-24 bg-sky-100">
            {/* Mode Toggle */}
            <div className="flex justify-center gap-4 mb-6 max-w-sm mx-auto">
                <button
                    onClick={() => setMode('quests')}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase shadow-md transition-all ${
                        mode === 'quests'
                            ? 'bg-sky-500 text-white'
                            : 'bg-white text-slate-400'
                    }`}
                >
                    🎲 Adventure
                </button>
                <button
                    onClick={() => setMode('tasks')}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase shadow-md transition-all ${
                        mode === 'tasks'
                            ? 'bg-sky-500 text-white'
                            : 'bg-white text-slate-400'
                    }`}
                >
                    📋 My Chores
                </button>
            </div>
            
            {/* CHORES MODE */}
            {mode === 'tasks' && (
                <div className="max-w-md mx-auto w-full space-y-4">
                    {activePlayers.map((player, playerIndex) => {
                        const today = new Date().toDateString();
                        const pendingChores = (player.chores || []).filter(
                            c => c.lastCompleted !== today
                        );
                        
                        return (
                            <div 
                                key={playerIndex}
                                className="bg-white p-4 rounded-2xl shadow-lg border-b-4 border-slate-100"
                            >
                                {/* Player Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10">
                                        <BlockyAvatar config={player.avatar} size="xs" />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-700">
                                            {player.username}'s Tasks
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {pendingChores.length} remaining today
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Chores List */}
                                <div className="space-y-2">
                                    {pendingChores.map(chore => (
                                        <button
                                            key={chore.id}
                                            onClick={() => handleChoreComplete(playerIndex, chore)}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center hover:bg-green-50 hover:border-green-200 transition-colors group"
                                        >
                                            <span className="font-bold text-sm text-slate-600 group-hover:text-green-700">
                                                {chore.text}
                                            </span>
                                            <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs font-bold text-green-600 group-hover:bg-green-100">
                                                +{chore.points} XP
                                            </span>
                                        </button>
                                    ))}
                                    
                                    {pendingChores.length === 0 && (
                                        <div className="text-center py-6 text-slate-400 text-sm font-bold">
                                            🎉 All tasks done for today!
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {/* QUEST MODE */}
            {mode === 'quests' && (
                <>
                    {/* Spin Button (Initial State) */}
                    {(!quests || allQuestsComplete) && !spinning && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <button
                                onClick={spin}
                                className="w-full max-w-xs py-6 bg-yellow-400 text-yellow-900 font-black rounded-3xl text-2xl shadow-xl border-b-8 border-yellow-500 active:border-b-0 active:translate-y-2 uppercase tracking-wider animate-bounce-in hover:bg-yellow-300 transition-colors"
                            >
                                {allQuestsComplete ? 'Spin Again!' : 'Spin For Quests'}
                            </button>
                            
                            <p className="mt-4 text-sm text-slate-500 font-bold">
                                {activePlayers.length > 1 
                                    ? `${activePlayers.length} players will get quests!`
                                    : 'Tap to discover your quest!'
                                }
                            </p>
                        </div>
                    )}
                    
                    {/* Spinning Animation */}
                    {spinning && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="text-7xl animate-spin mb-4">🎲</div>
                            <p className="font-black text-sky-800 animate-pulse text-lg">
                                Generating Quests...
                            </p>
                        </div>
                    )}
                    
                    {/* Quest Cards */}
                    {quests && !allQuestsComplete && (
                        <div className={`grid gap-4 w-full max-w-4xl mx-auto ${
                            activePlayers.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                        }`}>
                            {quests.map((quest, playerIndex) => {
                                if (!quest) return null;
                                
                                const player = activePlayers[playerIndex];
                                const diffConfig = DIFFICULTY_CONFIG[quest.difficulty];
                                const catStyle = CAT_STYLES[quest.category];
                                
                                return (
                                    <div
                                        key={playerIndex}
                                        className="bg-white rounded-3xl p-4 shadow-xl border-4 border-slate-100 flex flex-col relative animate-bounce-in"
                                    >
                                        {/* Player Info (Multi-player) */}
                                        {activePlayers.length > 1 && (
                                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                                                <div className="w-8 h-8">
                                                    <BlockyAvatar config={player.avatar} size="xs" />
                                                </div>
                                                <span className="font-black text-sm text-slate-700">
                                                    {player.username}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Category & Difficulty */}
                                        <div className="flex gap-2 mb-3">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}>
                                                {catStyle.icon} {catStyle.name}
                                            </span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${diffConfig.bg} ${diffConfig.text}`}>
                                                {diffConfig.icon} {quest.difficulty}
                                            </span>
                                        </div>
                                        
                                        {/* Quest Description */}
                                        <p className="text-base font-bold text-slate-700 mb-4 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 flex-1">
                                            {quest.description}
                                        </p>
                                        
                                        {/* Complete Button */}
                                        <button
                                            onClick={() => handleQuestComplete(playerIndex, quest)}
                                            className="w-full py-4 bg-green-500 text-white font-black rounded-xl shadow-md border-b-4 border-green-700 active:border-b-0 active:translate-y-1 text-sm uppercase hover:bg-green-400 transition-colors"
                                        >
                                            ✓ Done! (+{quest.sparks_reward} ⚡)
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
