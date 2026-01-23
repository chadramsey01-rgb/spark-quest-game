/* =============================================
   APP - Main Application Component
   ============================================= */

function App() {
    const {
        parent,
        activePlayers,
        isCreating,
        exitGame,
        levelUpQueue,
        closeLevelUp,
        loading
    } = useGame();
    
    const [view, setView] = useState('landing');
    const [gameView, setGameView] = useState('home');
    const [showManager, setShowManager] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    
    // Auto-switch to game view when logged in
    useEffect(() => {
        if (parent) setView('game');
    }, [parent]);
    
    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-sky-400 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="text-6xl mb-4 animate-bounce">⚡</div>
                    <div className="font-black text-2xl animate-pulse">LOADING...</div>
                </div>
            </div>
        );
    }
    
    // Landing page
    if (view === 'landing') {
        return <LandingPage onStart={() => setView('auth')} />;
    }
    
    // Auth screen
    if (view === 'auth') {
        return <AuthScreen />;
    }
    
    // Admin dashboard
    if (showAdmin) {
        return <AdminDashboard onBack={() => setShowAdmin(false)} />;
    }
    
    // Parent manager (chores/rewards)
    if (showManager) {
        return <ParentManager onBack={() => setShowManager(false)} />;
    }
    
    // Avatar creator/editor
    if (isCreating) {
        return <AvatarCreator />;
    }
    
    // Parent dashboard (no active game)
    if (activePlayers.length === 0) {
        return (
            <>
                <ParentDashboard />
                
                {/* Admin button (only for support email) */}
                {parent && parent.email === SUPPORT_EMAIL && (
                    <button
                        onClick={() => setShowAdmin(true)}
                        className="fixed bottom-4 left-4 bg-slate-800 text-white px-3 py-1 rounded text-xs opacity-50 hover:opacity-100 transition-opacity"
                    >
                        Admin
                    </button>
                )}
                
                {/* Manager button */}
                {parent && parent.children && parent.children.length > 0 && (
                    <button
                        onClick={() => setShowManager(true)}
                        className="fixed bottom-4 right-4 bg-sky-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-sky-600 transition-colors"
                    >
                        ⚙️ Manage
                    </button>
                )}
            </>
        );
    }
    
    // Current level-up celebration
    const currentLevelUp = levelUpQueue[0];
    
    // Main game view
    return (
        <div className="max-w-md mx-auto bg-sky-100 min-h-screen shadow-2xl relative border-x border-slate-200">
            {/* Level Up Modal */}
            {currentLevelUp && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl border-4 border-yellow-200 animate-bounce-in">
                        <div className="text-6xl mb-2">⭐</div>
                        <h2 className="text-4xl font-black text-white drop-shadow-md mb-2 uppercase italic">
                            Level Up!
                        </h2>
                        <p className="text-white font-bold text-lg mb-2">
                            {activePlayers[currentLevelUp.playerIdx]?.username}
                        </p>
                        <p className="text-yellow-900 font-black text-3xl mb-6">
                            Level {currentLevelUp.level}
                        </p>
                        <div className="bg-white/30 rounded-xl p-3 mb-6">
                            <p className="text-yellow-900 font-bold text-sm">
                                🎁 Bonus: +{LEVEL_CONFIG.levelUpBonus} Sparks!
                            </p>
                        </div>
                        <button
                            onClick={closeLevelUp}
                            className="w-full py-4 bg-white text-yellow-600 font-black rounded-xl text-xl shadow-lg border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 uppercase"
                        >
                            Awesome!
                        </button>
                    </div>
                </div>
            )}
            
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-sky-100 flex justify-between items-center shadow-sm">
                <button
                    onClick={exitGame}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                    ← Back
                </button>
                <div className="font-black text-sky-900 uppercase text-xs tracking-wider">
                    {activePlayers.length > 1
                        ? `${activePlayers.length} Players`
                        : activePlayers[0]?.username
                    }
                </div>
                <div className="w-8" /> {/* Spacer for centering */}
            </header>
            
            {/* Main Content */}
            <main className="min-h-[80vh]">
                {gameView === 'home' && <SparkSpinner />}
                {gameView === 'shop' && <Shop />}
                {gameView === 'dash' && <PlayerDashboard />}
            </main>
            
            {/* Bottom Navigation */}
            <BottomNav currentView={gameView} onNavigate={setGameView} />
        </div>
    );
}
