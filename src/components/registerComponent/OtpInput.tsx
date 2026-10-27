import { useEffect, useRef } from "react"

interface OtpInputProps {
    value: string[];
    onChange: (value: string[]) => void
}

const OtpInput = ({value, onChange}: OtpInputProps) => {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(()=>{ refs.current[0]?.focus() },[])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
        if (e.key === "Backspace" && !value[i]) {
            refs.current[i - 1]?.focus();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const digit = e.target.value.slice(-1);   
        if(digit && !/^\d$/.test(digit)) return;
        const next = [...value];
        next[i] = digit;
        onChange(next);
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const digit = e.clipboardData.getData("text").replace(/\D/g, "").slice(0,6).split("");

        if(!digit.length) return;

        const next = [...value];
        digit.forEach((data, i) => next[i] = data);
        onChange(digit);
    }

    return (
        <div
        className="flex items-center justify-center gap-2 sm:gap-3 mb-6"
        onPaste={handlePaste}
        >
        {value.map((digit, index) => (
            <input
            key={index}
            ref={(el) => { refs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-extrabold text-brand-dark bg-brand-light border border-brand-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-rust focus:border-brand-rust transition duration-200"
            />
        ))}
        </div>
    )
}

export default OtpInput;