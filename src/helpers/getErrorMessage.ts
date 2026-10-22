import axios from "axios";

const FALLBACK = "Something went wrong. Please try again.";

const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        if(!err.response) return "Could not reach the server. Check your connection";

        const data = err.response.data;
        const message = data?.message ?? data?.error;

        if (Array.isArray(message)) return message.join(". ");
        if (typeof message === "string" && message.trim()) return message;

        return FALLBACK;
    }
    if (err instanceof Error && err.message) return err.message;

  return FALLBACK;
};

export default getErrorMessage;