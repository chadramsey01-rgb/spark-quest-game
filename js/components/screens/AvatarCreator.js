/* =============================================
   AVATAR CREATOR - Character Customization
   ============================================= */

function AvatarCreator() {
    const { pendingChild, saveEditedAvatar, completeAddChild } = useGame();
    
    const isNew = !!pendingChild && !pendingChild.history; // New child has no history
    
    const defaultAvatar = {
        base: 'boy',
        skin: 'skin_fair',
        hair: 'hair_brown_messy',
        shirt: null,
        hat: null,
        glasses: null,
        border: 'border_1'
    };
    
    const [config, setConfig] = useState(
        (pendingChild?.avatar) ? pendingChild.avatar : defaultAvatar
    );
    const [step, setStep] = useState(0);
    
    const steps = ['Skin', 'Hair', 'Frame'];
    
    if (!pendingChild) {
        return (
            <div className="min-h-screen bg-sky-200 flex items-center justify-center p-4">
                <div className="font-bold text-slate-500">Loading editor...</div>
            </div>
        );
    }
    
    const handleSave = () => {
        if (isNew) {
            completeAddChild(config);
        } else {
            saveEditedAvatar(config);
        }
    };
    
    return (
        <div className="min-h-screen bg-sky-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-b-8 border-sky-300">
                {/* Title */}
                <h2 className="text-2xl font-black text-center mb-2 text-sky-800 uppercase tracking-wider">
                    {isNew ? 'Create Hero' : 'Edit Look'}
                </h2>
                <p className="text-center text-sm text-slate-500 mb-6">
                    {pendingChild.username}
                </p>
                
                {/* Avatar Preview */}
                <div className="bg-sky-50 rounded-2xl p-6 mb-6 flex justify-center border-2 border-sky-100 w-48 h-48 mx-auto relative">
                    <PrestigeFrame borderId={config.border || 'border_1'}>
                        <BlockyAvatar config={config} size="full" />
                    </PrestigeFrame>
                </div>
                
                {/* Step Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    {steps.map((label, idx) => (
                        <button
                            key={idx}
                            onClick={() => setStep(idx)}
                            className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${
                                step === idx 
                                    ? 'bg-white shadow text-sky-600' 
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                
                {/* Step Content */}
                <div className="h-24 flex items-center justify-center">
                    {/* Skin Tones */}
                    {step === 0 && (
                        <div className="flex gap-3 justify-center">
                            {SKIN_TONES.map(skin => (
                                <button
                                    key={skin.id}
                                    onClick={() => setConfig({ ...config, skin: skin.id })}
                                    className={`w-12 h-12 rounded-xl shadow-md border-4 transition-all hover:scale-105 ${
                                        config.skin === skin.id 
                                            ? 'border-sky-500 scale-110' 
                                            : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: skin.color }}
                                    title={skin.name}
                                />
                            ))}
                        </div>
                    )}
                    
                    {/* Hair Styles */}
                    {step === 1 && (
                        <div className="flex gap-3 justify-center overflow-x-auto px-2">
                            {HAIR_STYLES.map(hair => (
                                <button
                                    key={hair.id}
                                    onClick={() => setConfig({ ...config, hair: hair.id })}
                                    className={`w-14 h-14 rounded-xl border-4 transition-all flex-shrink-0 overflow-hidden relative bg-white hover:scale-105 ${
                                        config.hair === hair.id 
                                            ? 'border-sky-500 scale-110' 
                                            : 'border-slate-200'
                                    }`}
                                    title={hair.name}
                                >
                                    <div className="w-full h-full transform scale-150 translate-y-2">
                                        <svg viewBox="0 0 200 200">
                                            <RenderAsset type="hair" id={hair.id} />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                    
                    {/* Border Frames */}
                    {step === 2 && (
                        <div className="flex gap-3 justify-center overflow-x-auto px-2">
                            {BORDER_CONFIG.map(border => {
                                const locked = isNew && border.minLevel > 1;
                                
                                return (
                                    <button
                                        key={border.id}
                                        disabled={locked}
                                        onClick={() => setConfig({ ...config, border: border.id })}
                                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center relative flex-shrink-0 transition-all ${
                                            config.border === border.id 
                                                ? 'border-sky-500 scale-110' 
                                                : 'border-slate-200'
                                        } ${locked ? 'opacity-40 grayscale cursor-not-allowed' : 'bg-white hover:scale-105'}`}
                                        title={`${border.name} (Level ${border.minLevel}+)`}
                                    >
                                        <div 
                                            className="w-8 h-8 rounded-full"
                                            style={{ border: `3px solid ${border.color}` }}
                                        />
                                        {locked && (
                                            <div className="absolute -bottom-2 text-[8px] font-black bg-slate-700 text-white px-1.5 rounded">
                                                Lvl {border.minLevel}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full mt-6 py-4 bg-yellow-400 hover:bg-yellow-300 border-b-4 border-yellow-500 text-yellow-900 font-black rounded-xl text-lg shadow-lg active:border-b-0 active:translate-y-1 transition-all uppercase"
                >
                    {isNew ? 'Save & Play' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
