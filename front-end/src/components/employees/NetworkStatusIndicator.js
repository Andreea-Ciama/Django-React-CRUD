import React from 'react';

const useNavigatorOnLine = () => {
    const [isOnline, setIsOnline] = React.useState(navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

const NetworkStatusIndicator = () => {
    const isOnline = useNavigatorOnLine();

    return (
        <div className="network-status-indicator">
            {isOnline ? 'Online' : 'Offline'}
        </div>
    );
};

export default NetworkStatusIndicator;
