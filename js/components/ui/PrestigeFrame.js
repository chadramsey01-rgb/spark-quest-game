/* =============================================
   PRESTIGE FRAME - Level-based Avatar Border
   ============================================= */

function PrestigeFrame({ borderId, children }) {
    const config = BORDER_CONFIG.find(b => b.id === borderId) || BORDER_CONFIG[0];
    
    const renderBorder = () => {
        const defs = (
            <defs>
                <linearGradient id="gradSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="50%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#fde047" />
                </linearGradient>
                <linearGradient id="gradDiamond" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
            </defs>
        );
        
        // Diamond frame (level 50+)
        if (config.id === 'border_50') {
            return (
                <g>
                    {defs}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradDiamond)" strokeWidth="8" />
                    {/* Sparkle effects */}
                    <circle cx="20" cy="20" r="3" fill="#60a5fa" className="animate-pulse" />
                    <circle cx="80" cy="15" r="2" fill="#93c5fd" className="animate-pulse" />
                    <circle cx="85" cy="75" r="3" fill="#60a5fa" className="animate-pulse" />
                </g>
            );
        }
        
        // Gold frame (level 20+)
        if (config.id === 'border_20') {
            return (
                <g>
                    {defs}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradGold)" strokeWidth="8" />
                </g>
            );
        }
        
        // Silver frame (level 10+)
        if (config.id === 'border_10') {
            return (
                <g>
                    {defs}
                    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradSilver)" strokeWidth="6" />
                </g>
            );
        }
        
        // Bronze frame (level 5+)
        if (config.id === 'border_5') {
            return (
                <circle cx="50" cy="50" r="46" fill="none" stroke="#b45309" strokeWidth="5" />
            );
        }
        
        // Default rookie frame
        return (
            <circle cx="50" cy="50" r="46" fill="none" stroke="#cbd5e1" strokeWidth="4" />
        );
    };
    
    return (
        <div className="relative w-full h-full">
            {/* Avatar content */}
            <div className="absolute inset-0 z-0 p-3">
                {children}
            </div>
            
            {/* Frame overlay */}
            <svg 
                viewBox="0 0 100 100" 
                className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            >
                {renderBorder()}
            </svg>
        </div>
    );
}
