import { Phone } from "lucide-react";

import { site, whatsappLink } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-.927-2.232-.244-.587-.493-.507-.676-.516-.175-.008-.376-.01-.576-.01-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.227 3.109.15.2 2.12 3.237 5.136 4.54.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.577-.086 1.78-.727 2.03-1.43.251-.702.251-1.304.176-1.43-.076-.125-.276-.2-.577-.35zM12.042 2C6.52 2 2.03 6.49 2.03 12.012c0 1.875.522 3.654 1.455 5.197L2 22l4.945-1.442a9.96 9.96 0 0 0 5.097 1.454h.004c5.52 0 10.01-4.49 10.01-10.012A9.96 9.96 0 0 0 12.042 2zm0 18.283h-.003a8.27 8.27 0 0 1-4.22-1.157l-.303-.18-3.138.915.922-3.056-.197-.313a8.26 8.26 0 0 1-1.268-4.48c0-4.57 3.718-8.288 8.29-8.288 2.215 0 4.298.863 5.864 2.43a8.23 8.23 0 0 1 2.426 5.863c0 4.572-3.718 8.29-8.29 8.29z" />
    </svg>
  );
}

export function StickyActions() {
  return (
    <div className="fixed bottom-3 right-3 z-40 flex flex-col gap-2.5 sm:bottom-6 sm:right-6 sm:gap-3">
      {/* Sticky Call Button with Original Phone Blue Color */}
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.name}`}
        className="group relative grid size-10 sm:size-12 place-items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 animate-call-pulse"
      >
        <Phone className="size-4 sm:size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-sm border border-blue-500/30 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
          Call Now
        </span>
      </a>

      {/* Sticky WhatsApp Button with Official WhatsApp Green Color */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
        className="group relative grid size-10 sm:size-12 place-items-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95 animate-whatsapp-pulse"
      >
        <WhatsAppIcon className="size-5 sm:size-6 transition-transform duration-300 group-hover:scale-110" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900/95 backdrop-blur-sm border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          WhatsApp Enquiry
        </span>
      </a>
    </div>
  );
}
