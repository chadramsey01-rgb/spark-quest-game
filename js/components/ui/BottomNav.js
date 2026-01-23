/* =============================================
   BOTTOM NAV - Game Navigation Dock
   ============================================= */

function BottomNav({ currentView, onNavigate }) {
    const navItems = [
        { id: 'home', icon: '🏠', label: 'Quests' },
        { id: 'shop', icon: '🛒', label: 'Shop' },
        { id: 'dash', icon: '👤', label: 'Profile' }
    ];
    
    return (
        <nav 
            className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 p-2 flex justify-around pb-6 sm:pb-2 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
            role="navigation"
            aria-label="Main navigation"
        >
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`p-3 text-3xl transition-all duration-200 touch-target ${
                        currentView === item.id 
                            ? 'grayscale-0 -translate-y-2 scale-110' 
                            : 'grayscale opacity-50 hover:opacity-75'
                    }`}
                    aria-label={item.label}
                    aria-current={currentView === item.id ? 'page' : undefined}
                >
                    {item.icon}
                </button>
            ))}
        </nav>
    );
}
