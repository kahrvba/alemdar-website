'use client';
import { useEffect, useState } from 'react';
import { checkCompatibility } from '../lib/checkCompatibility';

export default function SystemCheck() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const { needsWarning, reason } = checkCompatibility();
        if (needsWarning && reason) {
            setMessage(reason);
        }
    }, []);

    if (!message) return null;

    return (
        <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black p-4 z-50 text-center">
            <p className="font-bold">⚠️ Compatibility Warning</p>
            <p>{message}</p>
        </div>
    );
}
