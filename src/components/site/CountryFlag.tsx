export interface CountryCodeItem {
  code: string;
  country: string;
  name: string;
}

export const COUNTRY_CODES: CountryCodeItem[] = [
  { code: "+91", country: "IN", name: "India" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+971", country: "AE", name: "UAE" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+65", country: "SG", name: "Singapore" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+966", country: "SA", name: "Saudi Arabia" },
];

export function CountryFlag({
  country,
  className = "w-5 h-3.5 rounded-[3px] shrink-0 shadow-xs object-cover border border-slate-200/60",
}: {
  country: string;
  className?: string;
}) {
  switch (country) {
    case "IN":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#FF9933" d="M0 0h640v160H0z" />
          <path fill="#FFFFFF" d="M0 160h640v160H0z" />
          <path fill="#128807" d="M0 320h640v160H0z" />
          <g transform="translate(320 240)">
            <circle r="46" fill="none" stroke="#000080" strokeWidth="6" />
            <circle r="10" fill="#000080" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-46"
                stroke="#000080"
                strokeWidth="2.5"
                transform={`rotate(${i * 15})`}
              />
            ))}
          </g>
        </svg>
      );
    case "US":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <g fill="#b22234">
            <rect width="640" height="480" fill="#fff" />
            <rect y="0" width="640" height="37" />
            <rect y="74" width="640" height="37" />
            <rect y="148" width="640" height="37" />
            <rect y="222" width="640" height="37" />
            <rect y="296" width="640" height="37" />
            <rect y="370" width="640" height="37" />
            <rect y="443" width="640" height="37" />
          </g>
          <rect width="256" height="259" fill="#3c3b6e" />
          <g fill="#fff">
            <circle cx="35" cy="30" r="7" />
            <circle cx="85" cy="30" r="7" />
            <circle cx="135" cy="30" r="7" />
            <circle cx="185" cy="30" r="7" />
            <circle cx="230" cy="30" r="7" />
            <circle cx="60" cy="68" r="7" />
            <circle cx="110" cy="68" r="7" />
            <circle cx="160" cy="68" r="7" />
            <circle cx="210" cy="68" r="7" />
            <circle cx="35" cy="106" r="7" />
            <circle cx="85" cy="106" r="7" />
            <circle cx="135" cy="106" r="7" />
            <circle cx="185" cy="106" r="7" />
            <circle cx="230" cy="106" r="7" />
            <circle cx="60" cy="144" r="7" />
            <circle cx="110" cy="144" r="7" />
            <circle cx="160" cy="144" r="7" />
            <circle cx="210" cy="144" r="7" />
            <circle cx="35" cy="182" r="7" />
            <circle cx="85" cy="182" r="7" />
            <circle cx="135" cy="182" r="7" />
            <circle cx="185" cy="182" r="7" />
            <circle cx="230" cy="182" r="7" />
            <circle cx="60" cy="220" r="7" />
            <circle cx="110" cy="220" r="7" />
            <circle cx="160" cy="220" r="7" />
            <circle cx="210" cy="220" r="7" />
          </g>
        </svg>
      );
    case "GB":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path fill="#fff" d="m0 0 640 480m0-480L0 480" stroke="#fff" strokeWidth="60" />
          <path fill="#c8102e" d="m0 0 640 480m0-480L0 480" stroke="#c8102e" strokeWidth="36" />
          <path fill="#fff" d="M270 0h100v480H270zM0 190h640v100H0z" />
          <path fill="#c8102e" d="M290 0h60v480h-60zM0 210h640v60H0z" />
        </svg>
      );
    case "AE":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#00732f" d="M0 0h640v160H0z" />
          <path fill="#fff" d="M0 160h640v160H0z" />
          <path fill="#000" d="M0 320h640v160H0z" />
          <path fill="#f00" d="M0 0h160v480H0z" />
        </svg>
      );
    case "CA":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#f00" d="M0 0h160v480H0zm480 0h160v480H480z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          <path
            fill="#f00"
            d="m320 120 16 48 40-16-16 40 48 16-36 28 8 52-44-24-16 56-16-56-44 24 8-52-36-28 48-16-16-40 40 16z"
          />
        </svg>
      );
    case "AU":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#00008b" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M0 0h320v240H0z" />
          <path fill="#cc0000" d="M130 0h60v240h-60zM0 90h320v60H0z" />
          <circle cx="480" cy="140" r="14" fill="#fff" />
          <circle cx="440" cy="240" r="14" fill="#fff" />
          <circle cx="520" cy="260" r="14" fill="#fff" />
          <circle cx="480" cy="340" r="14" fill="#fff" />
          <circle cx="160" cy="360" r="28" fill="#fff" />
        </svg>
      );
    case "SG":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#ed2939" d="M0 0h640v240H0z" />
          <path fill="#fff" d="M0 240h640v240H0z" />
          <g fill="#fff" transform="translate(100 120)">
            <circle cx="0" cy="0" r="60" />
            <circle cx="20" cy="0" r="50" fill="#ed2939" />
            <circle cx="25" cy="-25" r="8" />
            <circle cx="45" cy="-10" r="8" />
            <circle cx="45" cy="15" r="8" />
            <circle cx="25" cy="30" r="8" />
            <circle cx="10" cy="5" r="8" />
          </g>
        </svg>
      );
    case "DE":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#000" d="M0 0h640v160H0z" />
          <path fill="#d00" d="M0 160h640v160H0z" />
          <path fill="#ffce00" d="M0 320h640v160H0z" />
        </svg>
      );
    case "SA":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#006c35" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M180 320h280v15H180z" />
        </svg>
      );
    default:
      return null;
  }
}
