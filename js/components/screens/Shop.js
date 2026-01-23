/* =============================================
   SHOP - Buy Items & Redeem Rewards
   ============================================= */

function Shop() {
    const { activePlayers, buyItem, redeemReward, parent } = useGame();
    
    const [playerTab, setPlayerTab] = useState(0);
    const [shopMode, setShopMode] = useState('gear');
    const [message, setMessage] = useState(null);
    
    const currentPlayer = activePlayers[playerTab];
    
    if (!currentPlayer) return <div className="p-4 text-center">Loading...</div>;
    
    const handleBuy = async (item) => {
        const result = await buyItem(playerTab, item);
        setMessage(result);
        setTimeout(() => setMessage(null), 2000);
    };
    
    const handleRedeem = async (reward) => {
        if (!window.confirm(`Spend ${reward.cost} Sparks for "${reward.name}"?`)) return;
        const result = await redeemReward(playerTab, reward);
        setMessage(result);
        setTimeout(() => setMessage(null), 2000);
    };
    
    const sortedItems = [...SHOP_ITEMS].sort((a, b) => a.price - b.price);
    
    return (
        <div className="p-4 pb-24 h-full flex flex-col bg-sky-100">
            <div className="flex justify-center mb-4 bg-white p-1 rounded-xl shadow-sm max-w-xs mx-auto">
                <button onClick={() => setShopMode('gear')} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${shopMode === 'gear' ? 'bg-sky-100 text-sky-700' : 'text-slate-400'}`}>🎽 Gear</button>
                <button onClick={() => setShopMode('rewards')} className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase ${shopMode === 'rewards' ? 'bg-sky-100 text-sky-700' : 'text-slate-400'}`}>🎁 Prizes</button>
            </div>
            
            {activePlayers.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
                    {activePlayers.map((player, idx) => (
                        <button key={idx} onClick={() => setPlayerTab(idx)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap ${playerTab === idx ? 'bg-sky-500 text-white shadow-md' : 'bg-white text-slate-400'}`}>
                            <div className="w-6 h-6"><BlockyAvatar config={player.avatar} size="xs" /></div>
                            {player.username}
                        </button>
                    ))}
                </div>
            )}
            
            <div className="text-center mb-6">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-2 rounded-2xl font-black border-b-4 border-yellow-200 text-xl">{currentPlayer.sparks} ⚡</div>
                {message && <div className={`mt-2 text-xs font-bold px-3 py-1 rounded-full inline-block ${message.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{message.msg}</div>}
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {shopMode === 'gear' ? (
                    <div className="grid grid-cols-2 gap-4">
                        {sortedItems.map(item => {
                            const owned = currentPlayer.inventory.includes(item.id);
                            const isLocked = currentPlayer.level < item.minLevel;
                            const canAfford = currentPlayer.sparks >= item.price;
                            const rarity = RARITY_CONFIG[item.rarity];
                            return (
                                <div key={item.id} className={`bg-white p-4 rounded-2xl border-b-4 shadow-sm flex flex-col items-center transition-all ${owned ? 'border-slate-100 opacity-60' : isLocked ? 'border-slate-200 bg-slate-50' : `${rarity.border} hover:-translate-y-1`}`}>
                                    <div className="mb-2"><ItemIcon item={item} isLocked={isLocked} /></div>
                                    <div className="font-bold text-xs text-slate-800 uppercase mb-1 text-center">{item.name}</div>
                                    <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded mb-3 ${isLocked ? 'bg-slate-200 text-slate-500' : `${rarity.bg} ${rarity.color}`}`}>{rarity.label}</span>
                                    {isLocked ? (
                                        <button disabled className="w-full py-2 rounded-lg font-black text-xs uppercase bg-slate-200 text-slate-400 cursor-not-allowed">🔒 Lvl {item.minLevel}</button>
                                    ) : (
                                        <button onClick={() => handleBuy(item)} disabled={owned || !canAfford} className={`w-full py-2 rounded-lg font-black text-xs uppercase ${owned ? 'bg-slate-100 text-slate-400' : canAfford ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300' : 'bg-slate-100 text-slate-400'}`}>{owned ? '✓ Owned' : `${item.price} ⚡`}</button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {parent.customRewards && parent.customRewards.length > 0 ? parent.customRewards.map(reward => {
                            const canAfford = currentPlayer.sparks >= reward.cost;
                            return (
                                <div key={reward.id} className={`bg-white p-4 rounded-2xl shadow-sm border-l-8 flex justify-between items-center ${canAfford ? 'border-purple-400' : 'border-slate-300 opacity-60'}`}>
                                    <div><div className="font-black text-slate-700">{reward.name}</div><div className="text-xs text-purple-500 font-bold">{reward.cost} ⚡ Sparks</div></div>
                                    <button onClick={() => handleRedeem(reward)} disabled={!canAfford} className={`px-4 py-2 rounded-xl font-bold text-xs ${canAfford ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>{canAfford ? 'Redeem' : 'Need More'}</button>
                                </div>
                            );
                        }) : <div className="text-center text-slate-400 py-10"><div className="text-4xl mb-2">🎁</div><p className="font-bold">No prizes yet!</p><p className="text-sm">Ask your parents to add some rewards.</p></div>}
                    </div>
                )}
            </div>
        </div>
    );
}
