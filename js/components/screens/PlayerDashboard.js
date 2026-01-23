/* =============================================
   PLAYER DASHBOARD - Profile, Inventory & History
   ============================================= */

function PlayerDashboard() {
    const { activePlayers, equipItem, editAvatar } = useGame();
    
    const [playerTab, setPlayerTab] = useState(0);
    const [subTab, setSubTab] = useState('inventory');
    
    const currentPlayer = activePlayers[playerTab];
    
    if (!currentPlayer) return <div className="p-4 text-center">Loading...</div>;
    
    const ownedItems = SHOP_ITEMS.filter(item => currentPlayer.inventory.includes(item.id));
    
    const isItemEquipped = (item) => {
        const avatar = currentPlayer.avatar;
        return avatar.hat === item.id || 
               avatar.glasses === item.id || 
               avatar.shirt === item.id || 
               avatar.shirt === item.color;
    };
    
    return (
        <div className="p-4 pb-24 h-full flex flex-col bg-sky-100">
            {/* Player Tabs (Multi-player) */}
            {activePlayers.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {activePlayers.map((player, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPlayerTab(idx)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                                playerTab === idx
                                    ? 'bg-sky-500 text-white shadow-md'
                                    : 'bg-white text-slate-400'
                            }`}
                        >
                            <div className="w-6 h-6">
                                <BlockyAvatar config={player.avatar} size="xs" />
                            </div>
                            {player.username}
                        </button>
                    ))}
                </div>
            )}
            
            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-4 shadow-lg border-b-4 border-slate-100 mb-4 flex items-center gap-4 relative">
                {/* Avatar */}
                <div className="bg-sky-50 rounded-2xl border-2 border-sky-100 w-16 h-16 relative">
                    <PrestigeFrame borderId={currentPlayer.avatar.border || 'border_1'}>
                        <BlockyAvatar config={currentPlayer.avatar} size="xs" />
                    </PrestigeFrame>
                </div>
                
                {/* Info */}
                <div>
                    <h2 className="text-xl font-black text-slate-800">
                        {currentPlayer.username}
                    </h2>
                    <div className="flex gap-2 mt-1">
                        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
                            Lvl {currentPlayer.level}
                        </span>
                        <span className="text-xs font-bold bg-yellow-100 px-2 py-1 rounded text-yellow-700">
                            ⚡ {currentPlayer.sparks}
                        </span>
                    </div>
                    
                    {/* XP Progress Bar */}
                    <div className="mt-2 w-32">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-sky-500 transition-all duration-500"
                                style={{ width: `${LEVEL_CONFIG.getProgress(currentPlayer.xp)}%` }}
                            />
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                            {LEVEL_CONFIG.getXpToNext(currentPlayer.xp)} XP to next level
                        </div>
                    </div>
                </div>
                
                {/* Edit Button */}
                <button
                    onClick={() => editAvatar(playerTab)}
                    className="absolute top-4 right-4 text-xs font-bold text-sky-500 bg-sky-50 px-3 py-1 rounded-full hover:bg-sky-100 transition-colors"
                >
                    Edit ✏️
                </button>
            </div>
            
            {/* Sub-tabs */}
            <div className="flex bg-white p-1 rounded-xl mb-4 shadow-sm">
                <button
                    onClick={() => setSubTab('inventory')}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${
                        subTab === 'inventory'
                            ? 'bg-sky-100 text-sky-700'
                            : 'text-slate-400'
                    }`}
                >
                    🎒 Inventory
                </button>
                <button
                    onClick={() => setSubTab('history')}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${
                        subTab === 'history'
                            ? 'bg-sky-100 text-sky-700'
                            : 'text-slate-400'
                    }`}
                >
                    📜 Quest Log
                </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* INVENTORY */}
                {subTab === 'inventory' && (
                    ownedItems.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {ownedItems.map(item => {
                                const equipped = isItemEquipped(item);
                                const rarity = RARITY_CONFIG[item.rarity];
                                
                                return (
                                    <div
                                        key={item.id}
                                        className={`bg-white p-4 rounded-xl border-2 flex flex-col items-center shadow-sm transition-all ${
                                            equipped
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-slate-100 hover:border-slate-200'
                                        }`}
                                    >
                                        <div className="mb-2">
                                            <ItemIcon item={item} />
                                        </div>
                                        
                                        <div className="text-xs font-bold text-slate-700 uppercase mb-1">
                                            {item.name}
                                        </div>
                                        
                                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded mb-3 ${rarity.bg} ${rarity.color}`}>
                                            {rarity.label}
                                        </span>
                                        
                                        <button
                                            onClick={() => equipItem(playerTab, item)}
                                            className={`px-4 py-2 w-full rounded-lg text-[10px] font-black uppercase transition-all ${
                                                equipped
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                            }`}
                                        >
                                            {equipped ? 'Take Off' : 'Wear'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 py-10">
                            <div className="text-4xl mb-2">🎒</div>
                            <p className="font-bold">Backpack is empty!</p>
                            <p className="text-sm">Visit the shop to buy gear.</p>
                        </div>
                    )
                )}
                
                {/* QUEST HISTORY */}
                {subTab === 'history' && (
                    currentPlayer.history && currentPlayer.history.length > 0 ? (
                        <div className="space-y-3">
                            {currentPlayer.history.map((quest, idx) => {
                                const catStyle = CAT_STYLES[quest.category] || CAT_STYLES.terra;
                                const diffConfig = DIFFICULTY_CONFIG[quest.difficulty] || DIFFICULTY_CONFIG.Easy;
                                
                                return (
                                    <div
                                        key={idx}
                                        className={`bg-white p-3 rounded-xl border-l-4 shadow-sm flex items-center gap-3 ${
                                            quest.category === 'blaze' ? 'border-red-400' :
                                            quest.category === 'flow' ? 'border-blue-400' :
                                            quest.category === 'breeze' ? 'border-purple-400' :
                                            'border-green-400'
                                        }`}
                                    >
                                        <div className="text-2xl">{catStyle.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-slate-700 truncate">
                                                {quest.description}
                                            </div>
                                            <div className="flex gap-2 mt-1">
                                                <span className={`text-[10px] font-bold px-1.5 rounded ${diffConfig.bg} ${diffConfig.text}`}>
                                                    {quest.difficulty}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                    +{quest.sparks_reward} ⚡
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 py-10">
                            <div className="text-4xl mb-2">📜</div>
                            <p className="font-bold">No quests completed yet!</p>
                            <p className="text-sm">Spin for your first adventure.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
