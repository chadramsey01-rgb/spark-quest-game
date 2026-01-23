/* =============================================
   ITEM ICON - Shop Item Preview
   ============================================= */

function ItemIcon({ item, isLocked }) {
    if (!item) return <div className="text-4xl">📦</div>;
    
    const style = isLocked ? { filter: 'brightness(0) opacity(0.3)' } : {};
    
    return (
        <div className="w-12 h-12 relative" style={style}>
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                <RenderAsset type="shirt" id={item.id} color={item.color} />
                <RenderAsset type="hat" id={item.id} color={item.color} />
                <RenderAsset type="glass" id={item.id} />
            </svg>
        </div>
    );
}
