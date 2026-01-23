/* =============================================
   ADMIN DASHBOARD - Analytics & Monitoring
   ============================================= */

function AdminDashboard({ onBack }) {
    const [stats, setStats] = useState({ users: 0, quests: 0, active7: 0 });
    const [logs, setLogs] = useState([]);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);
    
    useEffect(() => {
        // Fetch stats
        db.collection('parents').get().then(snap => {
            setStats(s => ({ ...s, users: snap.size }));
        });
        
        db.collection('activities').get().then(snap => {
            setStats(s => ({ ...s, quests: snap.size }));
        });
        
        // 7-day active users
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        db.collection('activities')
            .where('timestamp', '>=', sevenDaysAgo)
            .get()
            .then(snap => {
                const uniqueUsers = new Set();
                snap.forEach(doc => {
                    if (doc.data().userId) uniqueUsers.add(doc.data().userId);
                });
                setStats(s => ({ ...s, active7: uniqueUsers.size }));
            });
        
        // Real-time activity feed
        const unsub = db.collection('activities')
            .orderBy('timestamp', 'desc')
            .limit(10)
            .onSnapshot(snap => {
                setLogs(snap.docs.map(d => d.data()));
            });
        
        return unsub;
    }, []);
    
    // Initialize chart
    useEffect(() => {
        if (chartRef.current && typeof Chart !== 'undefined') {
            if (chartInstance.current) chartInstance.current.destroy();
            
            chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Activity',
                        data: [5, 10, 8, 15, 12, 20, 18],
                        borderColor: '#7c3aed',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8888a0' } },
                        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8888a0' } }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, []);
    
    return (
        <div className="dashboard-container">
            <div className="dash-content">
                {/* Header */}
                <header className="flex justify-between items-center mb-8 pb-6 border-b border-[#2a2a3a]">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-[#ff6b35] to-[#ff8f65] rounded-xl flex items-center justify-center text-2xl">
                            ⚡
                        </div>
                        <div className="text-2xl font-bold tracking-tight">
                            Spark<span className="gradient-text">Quest</span> Analytics
                        </div>
                    </div>
                    <button 
                        onClick={onBack}
                        className="bg-[#1a1a25] border border-[#2a2a3a] text-[#8888a0] px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider hover:bg-[#2a2a3a] transition-colors"
                    >
                        Exit
                    </button>
                </header>
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <div className="kpi-card" data-accent="spark">
                        <div className="flex justify-between items-start mb-4">
                            <span className="kpi-label">Total Parents</span>
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-lg">
                                👥
                            </div>
                        </div>
                        <div className="kpi-value">{stats.users}</div>
                    </div>
                    
                    <div className="kpi-card" data-accent="success">
                        <div className="flex justify-between items-start mb-4">
                            <span className="kpi-label">Total Activities</span>
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-lg">
                                ✓
                            </div>
                        </div>
                        <div className="kpi-value">{stats.quests}</div>
                    </div>
                    
                    <div className="kpi-card" data-accent="purple">
                        <div className="flex justify-between items-start mb-4">
                            <span className="kpi-label">7-Day Active</span>
                            <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center text-lg">
                                📅
                            </div>
                        </div>
                        <div className="kpi-value">{stats.active7}</div>
                    </div>
                </div>
                
                {/* Charts & Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Activity Chart */}
                    <div className="chart-card lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-6">Weekly Overview</h3>
                        <div className="chart-container">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                    
                    {/* Live Feed */}
                    <div className="chart-card">
                        <h3 className="text-lg font-semibold mb-5">🔥 Live Feed</h3>
                        <div className="space-y-0">
                            {logs.map((log, i) => (
                                <div key={i} className="activity-item">
                                    <div className={`activity-icon ${
                                        log.type === 'quest' 
                                            ? 'bg-[#7c3aed]/20 text-[#7c3aed]' 
                                            : log.type === 'chore'
                                                ? 'bg-[#10b981]/20 text-[#10b981]'
                                                : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                                    }`}>
                                        {log.type === 'quest' ? '🎯' : log.type === 'chore' ? '🧹' : '👤'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="activity-text truncate">
                                            <span className="font-bold">{log.type?.toUpperCase()}</span>
                                            {' by '}
                                            {log.userId?.split('@')[0]}
                                        </div>
                                        <div className="activity-time">
                                            {log.timestamp 
                                                ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString()
                                                : 'Just now'
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {logs.length === 0 && (
                                <div className="text-center py-8 text-[#8888a0] text-sm">
                                    No activity yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
