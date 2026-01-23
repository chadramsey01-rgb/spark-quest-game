/* =============================================
   BLOCKY AVATAR - Full Character Render
   ============================================= */

function BlockyAvatar({ config, size = "md" }) {
    if (!config) return null;
    
    const sizeClass = {
        xs: "w-full h-full",
        sm: "w-16 h-16",
        md: "w-32 h-32",
        lg: "w-48 h-48"
    }[size];
    
    const skinObj = SKIN_TONES.find(s => s.id === config.skin) || SKIN_TONES[0];
    const hatItem = SHOP_ITEMS.find(i => i.id === config.hat);
    const shirtItem = SHOP_ITEMS.find(i => i.id === config.shirt || i.color === config.shirt);
    
    return (
        <div className={`${sizeClass} relative mx-auto`}>
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                {/* Base body with skin color */}
                <RenderAsset type="base" skinColor={skinObj.color} />
                
                {/* Hair */}
                <RenderAsset type="hair" id={config.hair} />
                
                {/* Shirt */}
                {shirtItem ? (
                    <RenderAsset type="shirt" id={shirtItem.id} color={shirtItem.color} />
                ) : (
                    <RenderAsset type="shirt" color={config.shirt} />
                )}
                
                {/* Glasses */}
                <RenderAsset type="glass" id={config.glasses} />
                
                {/* Hat (rendered last to be on top) */}
                {hatItem && (
                    <RenderAsset type="hat" id={hatItem.id} color={hatItem.color} />
                )}
            </svg>
        </div>
    );
}
