// components/ViolationManager.tsx
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ViolationManagerProps {
  onMaxViolationsReached: () => void;
}

export const ViolationManager: React.FC<ViolationManagerProps> = ({
  onMaxViolationsReached,
}) => {
  const [violations, setViolations] = useState({
    multipleFaces: 0,
    tabSwitch: 0,
    screenRecording: 0,
  });

  const LIMITS = {
    multipleFaces: 5,
    tabSwitch: 5,
    screenRecording: 3,
  };

  const handleViolation = (type: keyof typeof violations) => {
    setViolations(prev => {
      const newCount = prev[type] + 1;
      const remaining = LIMITS[type] - newCount;

      if (remaining > 0) {
        toast.warning(
          <div className="flex flex-col">
            <span className="font-bold text-red-500">
              {type === 'multipleFaces' 
                ? 'Multiple faces detected!'
                : type === 'tabSwitch'
                ? 'Tab switch detected!'
                : 'Screen recording attempted!'}
            </span>
            <span className="text-sm">
              {remaining} warnings remaining
            </span>
          </div>
        );
      }

      if (newCount >= LIMITS[type]) {
        onMaxViolationsReached();
      }

      return { ...prev, [type]: newCount };
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('tabSwitch');
      }
    };

    const handleScreenCapture = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'p' || e.key === 's' || e.key === 'c')
      ) {
        e.preventDefault();
        handleViolation('screenRecording');
      }
    };

    const handlePrintScreen = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        handleViolation('screenRecording');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleScreenCapture);
    document.addEventListener('keyup', handlePrintScreen);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleScreenCapture);
      document.removeEventListener('keyup', handlePrintScreen);
    };
  }, []);

  return null;
};