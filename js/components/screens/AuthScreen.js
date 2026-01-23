/* =============================================
   AUTH SCREEN - Login / Register / Reset
   ============================================= */

function AuthScreen() {
    const { loginParent, registerParent, resetPassword } = useGame();
    
    const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setIsLoading(true);
        
        // Password reset flow
        if (view === 'forgot') {
            if (!email) {
                setMsg("Please enter your email");
                setIsLoading(false);
                return;
            }
            
            const res = await resetPassword(email);
            if (res.success) {
                setMsg("Check your email for reset link!");
                setTimeout(() => setView('login'), 3000);
            } else {
                setMsg(res.msg);
            }
            setIsLoading(false);
            return;
        }
        
        // Login / Register flow
        if (!email || !password) {
            setMsg("Please fill in all fields");
            setIsLoading(false);
            return;
        }
        
        if (password.length < 6) {
            setMsg("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }
        
        const res = view === 'register' 
            ? await registerParent(email, password)
            : await loginParent(email, password);
        
        if (!res.success) {
            setMsg(res.msg);
        }
        setIsLoading(false);
    };
    
    return (
        <div className="min-h-screen bg-sky-400 flex flex-col items-center justify-center p-6 text-white">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-full max-w-sm border border-white/20 shadow-xl">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg viewBox="0 0 100 100" className="w-10 h-10">
                            <path d="M 55 5 L 20 60 L 50 60 L 40 95 L 85 35 L 55 35 Z" fill="#fff" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black">Spark Quest</h1>
                    <p className="text-sm font-bold opacity-80">
                        {view === 'login' && 'Welcome back!'}
                        {view === 'register' && 'Create your account'}
                        {view === 'forgot' && 'Reset your password'}
                    </p>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Parent Email"
                            className="w-full p-4 rounded-xl text-sky-900 font-bold placeholder-sky-300"
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>
                    
                    {view !== 'forgot' && (
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full p-4 rounded-xl text-sky-900 font-bold placeholder-sky-300"
                                autoComplete={view === 'register' ? 'new-password' : 'current-password'}
                                disabled={isLoading}
                            />
                        </div>
                    )}
                    
                    {/* Message Display */}
                    {msg && (
                        <div className={`text-sm font-bold text-center p-3 rounded-xl ${
                            msg.includes('Check') || msg.includes('success') 
                                ? 'bg-green-500/30' 
                                : 'bg-red-500/30'
                        }`}>
                            {msg}
                        </div>
                    )}
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-yellow-400 text-yellow-900 font-black rounded-xl uppercase shadow-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Loading...' : (
                            view === 'register' ? 'Create Account' :
                            view === 'forgot' ? 'Send Reset Link' :
                            'Enter'
                        )}
                    </button>
                </form>
                
                {/* Navigation Links */}
                <div className="mt-6 flex flex-col gap-2 text-center text-sm font-bold">
                    {view === 'login' && (
                        <>
                            <button 
                                onClick={() => { setView('register'); setMsg(''); }}
                                className="hover:underline"
                            >
                                Need an account? Register
                            </button>
                            <button 
                                onClick={() => { setView('forgot'); setMsg(''); }}
                                className="hover:underline opacity-80"
                            >
                                Forgot Password?
                            </button>
                        </>
                    )}
                    
                    {view !== 'login' && (
                        <button 
                            onClick={() => { setView('login'); setMsg(''); }}
                            className="hover:underline"
                        >
                            ← Back to Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
