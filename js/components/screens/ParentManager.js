/* =============================================
   PARENT MANAGER - Chores & Rewards Management
   ============================================= */

function ParentManager({ onBack }) {
    const { parent, addChoreToChild, deleteChoreFromChild, addCustomReward, deleteCustomReward } = useGame();
    
    const [tab, setTab] = useState('chores');
    const [selectedKid, setSelectedKid] = useState(parent.children[0]?.name || "");
    const [newChore, setNewChore] = useState("");
    const [newPoints, setNewPoints] = useState(10);
    const [newReward, setNewReward] = useState("");
    const [newCost, setNewCost] = useState(100);
    const [choresList, setChoresList] = useState([]);
    
    // Load chores for selected kid
    useEffect(() => {
        if (!selectedKid) return;
        
        db.collection('parents').doc(parent.email)
            .collection('kids').doc(selectedKid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    setChoresList(doc.data().chores || []);
                }
            });
    }, [selectedKid, parent.email]);
    
    const handleAddChore = async () => {
        if (!newChore.trim()) return;
        
        await addChoreToChild(selectedKid, newChore, newPoints);
        setNewChore("");
        
        // Refresh chores list
        const doc = await db.collection('parents').doc(parent.email)
            .collection('kids').doc(selectedKid)
            .get();
        setChoresList(doc.data().chores || []);
    };
    
    const handleDeleteChore = async (chore) => {
        await deleteChoreFromChild(selectedKid, chore);
        setChoresList(choresList.filter(c => c.id !== chore.id));
    };
    
    const handleAddReward = async () => {
        if (!newReward.trim()) return;
        await addCustomReward(newReward, newCost);
        setNewReward("");
    };
    
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-sky-500 p-4 flex justify-between items-center text-white">
                    <h2 className="font-black text-lg">Parent Controls</h2>
                    <button 
                        onClick={onBack}
                        className="bg-sky-600 px-3 py-1 rounded text-xs font-bold hover:bg-sky-700 transition-colors"
                    >
                        Done
                    </button>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setTab('chores')}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${
                            tab === 'chores' 
                                ? 'text-sky-600 border-b-4 border-sky-500' 
                                : 'text-slate-400'
                        }`}
                    >
                        📋 Chores
                    </button>
                    <button
                        onClick={() => setTab('rewards')}
                        className={`flex-1 py-3 font-bold text-sm transition-colors ${
                            tab === 'rewards' 
                                ? 'text-sky-600 border-b-4 border-sky-500' 
                                : 'text-slate-400'
                        }`}
                    >
                        🎁 Rewards
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                    {tab === 'chores' ? (
                        <>
                            {/* Kid Selector */}
                            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                                {parent.children.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedKid(c.name)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                                            selectedKid === c.name
                                                ? 'bg-sky-500 text-white'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Add Chore Form */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    value={newChore}
                                    onChange={e => setNewChore(e.target.value)}
                                    placeholder="New task..."
                                    className="flex-1 p-2 border rounded-lg text-sm"
                                    onKeyPress={e => e.key === 'Enter' && handleAddChore()}
                                />
                                <input
                                    type="number"
                                    value={newPoints}
                                    onChange={e => setNewPoints(e.target.value)}
                                    className="w-16 p-2 border rounded-lg text-sm text-center"
                                    min="1"
                                    max="100"
                                />
                                <button
                                    onClick={handleAddChore}
                                    className="bg-green-500 text-white px-4 rounded-lg font-bold hover:bg-green-600 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            
                            {/* Chores List */}
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {choresList.length > 0 ? choresList.map(chore => (
                                    <div 
                                        key={chore.id}
                                        className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border"
                                    >
                                        <div>
                                            <div className="font-bold text-sm">{chore.text}</div>
                                            <div className="text-xs text-green-600 font-bold">
                                                +{chore.points} XP
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteChore(chore)}
                                            className="text-red-400 text-xs font-bold hover:text-red-600 px-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-slate-400 text-sm">
                                        No tasks yet. Add one above!
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Add Reward Form */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    value={newReward}
                                    onChange={e => setNewReward(e.target.value)}
                                    placeholder="Prize name..."
                                    className="flex-1 p-2 border rounded-lg text-sm"
                                    onKeyPress={e => e.key === 'Enter' && handleAddReward()}
                                />
                                <input
                                    type="number"
                                    value={newCost}
                                    onChange={e => setNewCost(e.target.value)}
                                    className="w-20 p-2 border rounded-lg text-sm text-center"
                                    min="10"
                                />
                                <button
                                    onClick={handleAddReward}
                                    className="bg-green-500 text-white px-4 rounded-lg font-bold hover:bg-green-600 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            
                            {/* Info Box */}
                            <div className="bg-purple-50 p-4 rounded-xl mb-4 border border-purple-100">
                                <p className="text-xs text-purple-700 font-bold">
                                    💡 Rewards are prizes kids can buy with their Sparks. 
                                    Examples: Extra screen time, Pick dinner, Stay up late!
                                </p>
                            </div>
                            
                            {/* Rewards List */}
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {parent.customRewards && parent.customRewards.length > 0 ? 
                                    parent.customRewards.map(reward => (
                                        <div 
                                            key={reward.id}
                                            className="flex justify-between items-center bg-yellow-50 p-3 rounded-xl border border-yellow-100"
                                        >
                                            <div>
                                                <div className="font-bold text-sm">{reward.name}</div>
                                                <div className="text-xs text-yellow-600 font-bold">
                                                    {reward.cost} ⚡ Sparks
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteCustomReward(reward)}
                                                className="text-red-400 text-xs font-bold hover:text-red-600 px-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8 text-slate-400 text-sm">
                                            No rewards yet. Add one above!
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
