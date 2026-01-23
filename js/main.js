/* =============================================
   MAIN ENTRY POINT
   =============================================
   Initializes React and renders the app
   ============================================= */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    
    root.render(
        <ErrorBoundary>
            <GameProvider>
                <App />
            </GameProvider>
        </ErrorBoundary>
    );
    
    console.log('⚡ Spark Quest loaded!');
});
