/* =============================================
   ERROR BOUNDARY - Crash Handler
   ============================================= */

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error("🚨 Game Crash:", error, errorInfo);
        this.setState({ errorInfo });
        
        // Could log to analytics here
        // analytics.logError(error, errorInfo);
    }
    
    handleRestart = () => {
        window.location.reload();
    };
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50 text-red-900 text-center">
                    <div className="text-6xl mb-4">😵</div>
                    <h1 className="text-3xl font-black mb-2">OOPS!</h1>
                    <p className="font-bold mb-4 text-lg">
                        Something went wrong.
                    </p>
                    
                    {/* Error Details (collapsed by default) */}
                    <details className="mb-6 w-full max-w-sm">
                        <summary className="text-sm cursor-pointer text-red-600 hover:underline">
                            Show error details
                        </summary>
                        <pre className="bg-red-100 p-4 rounded-xl text-left text-xs mt-2 overflow-auto max-h-40">
                            {this.state.error && this.state.error.toString()}
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </details>
                    
                    <button
                        onClick={this.handleRestart}
                        className="bg-red-500 text-white px-8 py-4 rounded-xl font-black uppercase shadow-lg hover:bg-red-600 transition-colors"
                    >
                        Restart Game
                    </button>
                    
                    <p className="mt-6 text-xs text-red-400">
                        If this keeps happening, please contact support.
                    </p>
                </div>
            );
        }
        
        return this.props.children;
    }
}
