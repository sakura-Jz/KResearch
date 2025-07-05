// services/ApiKeyService.ts (or wherever the file is located)

class ApiKeyService {
    private userApiKey: string | null = null;
    private readonly hasEnvKey: boolean;

    constructor() {
        // MODIFICATION 1: Use Vite's syntax to access the environment variable.
        // The variable name must start with 'VITE_'.
        const envKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        this.hasEnvKey = !!envKey && envKey.length > 0;
        
        // This part of the logic remains the same. If no environment key is found,
        // it falls back to checking localStorage.
        if (!this.hasEnvKey) {
            try {
                this.userApiKey = localStorage.getItem('gemini_api_key');
            } catch (e) {
                console.warn("Could not access localStorage. API key will not be persisted.");
                this.userApiKey = null;
            }
        }
    }

    public hasKey(): boolean {
        return this.hasEnvKey || !!this.userApiKey;
    }

    public isEnvKey(): boolean {
        return this.hasEnvKey;
    }

    public getApiKey(): string | undefined {
        if (this.hasEnvKey) {
            // MODIFICATION 2: Return the key from Vite's environment variables.
            return import.meta.env.VITE_GEMINI_API_KEY;
        }
        // This fallback logic remains the same.
        return this.userApiKey || undefined;
    }

    public setApiKey(key: string): void {
        // This logic is perfect and doesn't need to change. It correctly
        // prevents a user from overwriting the hardcoded environment key.
        if (!this.hasEnvKey) {
            const trimmedKey = key.trim();
            this.userApiKey = trimmedKey;
            try {
                if (trimmedKey) {
                    localStorage.setItem('gemini_api_key', trimmedKey);
                } else {
                    localStorage.removeItem('gemini_api_key');
                }
            } catch (e) {
                 console.warn("Could not access localStorage. API key will not be persisted.");
            }
        }
    }
}

export const apiKeyService = new ApiKeyService();
