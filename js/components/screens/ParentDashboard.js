/* =============================================
   PARENT DASHBOARD - Child Selection & Management
   ============================================= */

function ParentDashboard() {
    const { parent, logoutParent, initAddChild, startGame, deleteChild } = useGame();
    
    const [newName, setNewName] = useState("");
    const [newDob, setNewDob] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [selected, setSelected] = useState([]);
    const [showDelete, setShowDelete] = useState(null);
    
    const toggleSelect = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(n => n !== name));
        } else {
            setSelected([...selected, name]);
        }
    };
    
    const handleAddChild = (e) => {
        e.preventDefault();
        if (newName && newDob) {
            initAddChild(newName, newDob);
            setShowAdd(false);
            setNewName("");
            setNewDob("");
        }
    };
    
    const handleDelete = async (childName) => {
        await deleteChild(childName);
        setShowDelete(null);
        setSelected(selected.filter(n => n !== childName));
    };
    
    return (
        <div className="min-h-screen bg-sky-100 flex flex-col items-center p-6 text-slate-800">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-sky-900">Family Hub</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase truncate max-w-[200px]">
                            {parent.email}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={logoutParent}
                            className="text-xs font-bold text-red-400 bg-white px-3 py-2 rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                
                {/* Empty State */}
                {(!parent.children || parent.children.length === 0) && !showAdd && (
                    <div className="text-center py-10 opacity-50">
                        <div className="text-6xl mb-4">👋</div>
                        <p className="font-bold text-lg mb-2">Welcome to Spark Quest!</p>
                        <p className="text-sm">Add a child to get started.</p>
                    </div>
                )}
                
                {/* Children Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {parent.children && parent.children.map((child) => (
                        <div key={child.name} className="relative">
                            <button
                                onClick={() => toggleSelect(child.name)}
                                className={`w-full p-4 rounded-3xl shadow-md border-b-4 transition-all flex flex-col items-center relative ${
                                    selected.includes(child.name)
                                        ? 'bg-sky-500 border-sky-700 text-white scale-105'
                                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <span className="font-black text-lg">{child.name}</span>
                                {child.dob && (
                                    <span className="text-xs opacity-60 mt-1">
                                        Age {calculateAge(child.dob)}
                                    </span>
                                )}
                                {selected.includes(child.name) && (
                                    <div className="absolute top-2 right-2 text-xl">✅</div>
                                )}
                            </button>
                            
                            {/* Delete button (long press alternative) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowDelete(child.name); }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 text-white rounded-full text-xs font-bold hover:bg-red-500 transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    
                    {/* Add Child Button */}
                    {!showAdd && (
                        <button
                            onClick={() => setShowAdd(true)}
                            className="bg-slate-200 p-6 rounded-3xl border-4 border-dashed border-slate-300 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                            <span className="text-3xl mb-1">+</span>
                            <span className="font-bold text-xs uppercase">Add Child</span>
                        </button>
                    )}
                </div>
                
                {/* Add Child Form */}
                {showAdd && (
                    <form 
                        onSubmit={handleAddChild}
                        className="bg-white p-6 rounded-3xl shadow-xl animate-bounce-in border-4 border-sky-100 mb-6"
                    >
                        <h3 className="font-black text-lg mb-4 text-center">New Adventurer</h3>
                        
                        <div className="space-y-3 mb-4">
                            <input
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="Child's Name"
                                className="w-full p-3 rounded-xl bg-slate-100 font-bold"
                                required
                            />
                            <div>
                                <label className="text-xs font-bold text-slate-400 mb-1 block">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={newDob}
                                    onChange={e => setNewDob(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-slate-100 font-bold"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => { setShowAdd(false); setNewName(""); setNewDob(""); }}
                                className="flex-1 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-sky-500 text-white font-black rounded-xl shadow-md"
                            >
                                Next →
                            </button>
                        </div>
                    </form>
                )}
                
                {/* Start Game Button */}
                {selected.length > 0 && (
                    <div className="fixed bottom-6 left-0 w-full px-6 flex justify-center animate-bounce-in">
                        <button
                            onClick={() => startGame(selected)}
                            className="w-full max-w-md py-4 bg-green-500 text-white font-black rounded-2xl text-xl shadow-xl border-b-8 border-green-700 uppercase active:border-b-0 active:translate-y-2 transition-all"
                        >
                            {selected.length === 1 ? 'Start Adventure' : `Start with ${selected.length} Players`}
                        </button>
                    </div>
                )}
                
                {/* Delete Confirmation Modal */}
                {showDelete && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                        <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-bounce-in">
                            <h3 className="font-black text-lg mb-2 text-center">Delete {showDelete}?</h3>
                            <p className="text-sm text-slate-500 text-center mb-4">
                                This will remove all their progress, sparks, and items. This cannot be undone.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowDelete(null)}
                                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(showDelete)}
                                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
