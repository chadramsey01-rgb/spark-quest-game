/* =============================================
   RENDER ASSET - SVG Avatar Parts
   ============================================= */

function RenderAsset({ type, id, color, skinColor }) {
    const sColor = skinColor || '#ffe0bd';
    const iColor = color || '#333';
    const stroke = "#1e293b";
    const strokeW = "4";

    // BASE BODY
    if (type === 'base') {
        return (
            <g>
                <rect x="70" y="140" width="25" height="40" rx="8" fill={sColor} stroke={stroke} strokeWidth={strokeW} />
                <rect x="105" y="140" width="25" height="40" rx="8" fill={sColor} stroke={stroke} strokeWidth={strokeW} />
                <rect x="60" y="100" width="80" height="50" rx="12" fill={sColor} stroke={stroke} strokeWidth={strokeW} />
                <rect x="45" y="25" width="110" height="90" rx="20" fill={sColor} stroke={stroke} strokeWidth={strokeW} />
                <circle cx="85" cy="80" r="6" fill="#1e293b" />
                <circle cx="115" cy="80" r="6" fill="#1e293b" />
                <circle cx="83" cy="78" r="2" fill="#fff" opacity="0.6" />
                <circle cx="113" cy="78" r="2" fill="#fff" opacity="0.6" />
                <path d="M 90 100 Q 100 110 110 100" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" />
            </g>
        );
    }

    // HAIR STYLES
    if (id === 'hair_brown_messy') return <path d="M 35 30 C 35 5, 165 5, 165 30 C 165 60, 170 85, 170 95 L 155 95 L 155 30 L 45 30 L 45 95 L 30 95 C 30 85, 35 60, 35 30 Z" fill="#563625" stroke={stroke} strokeWidth={strokeW} />;
    if (id === 'hair_blonde_ponytail') return <g><path d="M 45 25 C 45 5, 155 5, 155 25 C 155 55, 155 80, 155 80 L 45 80 C 45 80, 45 55, 45 25 Z" fill="#ecc94b" stroke={stroke} strokeWidth={strokeW} /><circle cx="160" cy="40" r="20" fill="#ecc94b" stroke={stroke} strokeWidth={strokeW} /></g>;
    if (id === 'hair_black_spiky') return <path d="M 40 30 L 30 10 L 55 20 L 75 5 L 100 15 L 125 5 L 145 20 L 170 10 L 160 30 C 160 60, 150 80, 150 80 L 50 80 C 50 80, 40 60, 40 30 Z" fill="#2d3748" stroke={stroke} strokeWidth={strokeW} />;
    if (id === 'hair_red_bob') return <path d="M 40 35 C 40 10, 160 10, 160 35 C 160 65, 170 100, 170 110 L 140 110 L 140 35 L 60 35 L 60 110 L 30 110 C 30 100, 40 65, 40 35 Z" fill="#e53e3e" stroke={stroke} strokeWidth={strokeW} />;

    // SHIRTS
    if (type === 'shirt') {
        const path = "M 55 100 L 35 115 L 45 130 L 60 120 L 60 155 L 140 155 L 140 120 L 155 130 L 165 115 L 145 100 Q 100 110 55 100 Z";
        if (id === 'shirt_ninja') return <g><path d={path} fill="#1e293b" stroke={stroke} strokeWidth={strokeW} /><path d="M 90 120 L 110 120 L 100 140 Z" fill="#ef4444" /></g>;
        if (id === 'shirt_gold_armor') return <g><path d="M 50 95 L 30 110 L 40 130 L 60 115 L 60 160 L 140 160 L 140 115 L 160 130 L 170 110 L 150 95 Q 100 105 50 95 Z" fill="#fbbf24" stroke="#b45309" strokeWidth={strokeW} /><rect x="85" y="115" width="30" height="35" rx="5" fill="#f59e0b" /></g>;
        if (id === 'shirt_stripe') return <g><path d={path} fill="#fff" stroke={stroke} strokeWidth={strokeW} /><path d="M 60 120 H 140 M 60 135 H 140 M 60 150 H 140" stroke="#ef4444" strokeWidth="3" /></g>;
        if (id === 'shirt_super') return <g><path d={path} fill="#3b82f6" stroke={stroke} strokeWidth={strokeW} /><path d="M 85 115 L 100 135 L 115 115 L 108 115 L 108 145 L 92 145 L 92 115 Z" fill="#fbbf24" /></g>;
        return <path d={path} fill={iColor} stroke={stroke} strokeWidth={strokeW} />;
    }

    // HATS
    if (id && id.includes('cap')) return <g><path d="M 45 40 C 45 20, 155 20, 155 40 L 155 55 L 45 55 Z" fill={iColor} stroke={stroke} strokeWidth={strokeW} /><rect x="40" y="50" width="120" height="12" rx="6" fill={iColor} stroke={stroke} strokeWidth={strokeW} /><path d="M 160 50 L 190 55 L 160 60 Z" fill={iColor} stroke={stroke} strokeWidth={strokeW} /></g>;
    if (id === 'hat_beanie') return <g><path d="M 40 45 C 40 10, 160 10, 160 45 L 160 65 L 40 65 Z" fill={iColor} stroke={stroke} strokeWidth={strokeW} /><rect x="35" y="60" width="130" height="20" rx="10" fill={iColor} stroke={stroke} strokeWidth={strokeW} /></g>;
    if (id === 'hat_crown') return <g><path d="M 40 60 L 40 20 L 70 40 L 100 10 L 130 40 L 160 20 L 160 60 Z" fill="#fbbf24" stroke="#b45309" strokeWidth={strokeW} /></g>;
    if (id === 'hat_wizard') return <g><path d="M 100 -30 L 50 70 L 150 70 Z" fill="#4c1d95" stroke={stroke} strokeWidth={strokeW} /><ellipse cx="100" cy="65" rx="55" ry="12" fill="#4c1d95" stroke={stroke} strokeWidth={strokeW} /><circle cx="100" cy="0" r="8" fill="#fbbf24" /></g>;
    if (id === 'hat_viking') return <g><ellipse cx="100" cy="55" rx="60" ry="25" fill="#94a3b8" stroke={stroke} strokeWidth={strokeW} /><path d="M 45 45 C 30 20, 30 -10, 45 -20" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" /><path d="M 155 45 C 170 20, 170 -10, 155 -20" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" /></g>;
    if (id === 'hat_pirate') return <g><ellipse cx="100" cy="55" rx="55" ry="15" fill="#1e293b" stroke={stroke} strokeWidth={strokeW} /><path d="M 50 55 Q 50 10, 100 5 Q 150 10, 150 55" fill="#1e293b" stroke={stroke} strokeWidth={strokeW} /><circle cx="100" cy="35" r="12" fill="#fbbf24" /></g>;
    if (id === 'hat_cowboy') return <g><ellipse cx="100" cy="60" rx="70" ry="15" fill="#78350f" stroke={stroke} strokeWidth={strokeW} /><path d="M 55 60 Q 55 25, 100 20 Q 145 25, 145 60" fill="#92400e" stroke={stroke} strokeWidth={strokeW} /></g>;
    if (id === 'hat_headphones') return <g><path d="M 35 70 Q 35 20, 100 15 Q 165 20, 165 70" fill="none" stroke="#1e293b" strokeWidth="8" /><ellipse cx="40" cy="75" rx="15" ry="20" fill="#ef4444" stroke={stroke} strokeWidth="3" /><ellipse cx="160" cy="75" rx="15" ry="20" fill="#ef4444" stroke={stroke} strokeWidth="3" /></g>;
    if (id === 'hat_top') return <g><rect x="55" y="10" width="90" height="50" rx="5" fill="#1e293b" stroke={stroke} strokeWidth={strokeW} /><ellipse cx="100" cy="60" rx="60" ry="12" fill="#1e293b" stroke={stroke} strokeWidth={strokeW} /><rect x="60" y="45" width="80" height="8" fill="#94a3b8" /></g>;

    // GLASSES
    if (id === 'glass_nerd') return <g stroke="black" strokeWidth="4" fill="none"><circle cx="75" cy="80" r="20"/><circle cx="125" cy="80" r="20"/><line x1="95" y1="80" x2="105" y2="80" /></g>;
    if (id === 'glass_shades') return <path d="M 50 70 L 95 70 L 100 80 L 105 70 L 150 70 L 160 90 L 140 95 L 105 90 L 95 90 L 60 95 L 40 90 Z" fill="#1e293b" stroke={stroke} strokeWidth="3" />;
    if (id === 'glass_monocle') return <g><circle cx="125" cy="80" r="18" fill="none" stroke="#fbbf24" strokeWidth="3" /><line x1="125" y1="98" x2="125" y2="130" stroke="#fbbf24" strokeWidth="2" /></g>;
    if (id === 'glass_star') return <g><path d="M 75 70 L 80 80 L 70 85 L 80 85 L 75 95 L 80 85 L 90 85 L 80 80 Z" fill="#fbbf24" /><path d="M 125 70 L 130 80 L 120 85 L 130 85 L 125 95 L 130 85 L 140 85 L 130 80 Z" fill="#fbbf24" /></g>;
    if (id === 'glass_cyber') return <g><defs><linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="50%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs><path d="M 45 75 L 155 75 L 160 90 L 40 90 Z" fill="url(#cyberGrad)" stroke="#1e293b" strokeWidth="2" /></g>;

    return null;
}
