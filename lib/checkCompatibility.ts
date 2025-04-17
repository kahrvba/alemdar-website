// checkCompatibility.ts
export function checkCompatibility(): { needsWarning: boolean; reason: string | null } {
    if (typeof window === 'undefined') return { needsWarning: false, reason: null };

    const ua = window.navigator.userAgent;
    const platform = window.navigator.platform;

    // --- OS Warnings (macOS < 10.14) ---
    const macMatch = ua.match(/Mac OS X (\d+)[_.](\d+)/);
    if (macMatch) {
        const major = parseInt(macMatch[1]);
        const minor = parseInt(macMatch[2]);

        if (major < 10 || (major === 10 && minor <= 3)) {
            return {
                needsWarning: true,
                reason: `You are using macOS ${major}.${minor}, which may cause compatibility issues.`,
            };
        }
    }

    // --- Windows Warnings (Win 7 and 32-bit) ---
    const winMatch = ua.match(/Windows NT (\d+\.\d+)/);
    if (winMatch) {
        const version = parseFloat(winMatch[1]);
        if (version < 6.2) {
            return {
                needsWarning: true,
                reason: `Your Windows version is too old and may not be fully supported.`,
            };
        }
    }

    const isWindows = ua.includes("Windows NT");
    const is32Bit = platform === "Win32" && !ua.includes("WOW64") && !ua.includes("Win64");
    if (isWindows && is32Bit) {
        return {
            needsWarning: true,
            reason: `You are using 32-bit Windows. This app works best on 64-bit systems.`,
        };
    }

    // --- Internet Explorer ---
    if (/MSIE|Trident/.test(ua)) {
        return {
            needsWarning: true,
            reason: "Internet Explorer is not supported. Please use a modern browser.",
        };
    }

    // --- JS Feature Detection ---
    if (
        typeof Promise === 'undefined' ||
        typeof fetch === 'undefined' ||
        typeof Object.assign === 'undefined'
    ) {
        return {
            needsWarning: true,
            reason: "Your browser lacks required features. Please update it.",
        };
    }

    return { needsWarning: false, reason: null };
}
