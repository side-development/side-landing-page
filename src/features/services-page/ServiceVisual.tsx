import { useId } from "react";
import type { ServiceId, ServicesLocale } from "./services-page-content";
import styles from "./service-visual.module.css";

const visualCopy = {
  "pt-BR": {
    web: ["Ideias que", "ganham presença."], webLabel: "FEITO PARA SER LEMBRADO", webNote: "Design com intenção.",
    identity: "UMA MARCA. MUITAS EXPRESSÕES.", identityNote: "Forma. Cor. Personalidade.",
    overview: "Visão geral", flow: "Fluxo de trabalho", software: "Tudo no lugar.", assistant: "IA",
    chatLabel: "CONTEXTO EM CADA CONVERSA", customer: "VOCÊ", question: ["Quero tirar minha ideia do papel.", "Por onde começamos?"], answer: ["Claro. Vamos encontrar", "o próximo passo juntos."], conversation: "Conversa", team: "Equipe",
    custom: "ONDE O PRONTO NÃO ENCAIXA.", customTitle: "Sob medida.", tools: "Suas ferramentas", workflow: "Seu fluxo", customNote: "O encaixe é nosso.",
  },
  en: {
    web: ["Ideas that", "make an impression."], webLabel: "BUILT TO BE REMEMBERED", webNote: "Design with intention.",
    identity: "ONE BRAND. MANY EXPRESSIONS.", identityNote: "Form. Color. Character.",
    overview: "Overview", flow: "Workflow", software: "Everything in place.", assistant: "AI",
    chatLabel: "CONTEXT IN EVERY CONVERSATION", customer: "YOU", question: ["I'd like to bring an idea to life.", "Where do we start?"], answer: ["Of course. Let's find", "the next step together."], conversation: "Conversation", team: "Team",
    custom: "WHEN OFF-THE-SHELF DOESN'T FIT.", customTitle: "Made to fit.", tools: "Your tools", workflow: "Your workflow", customNote: "We make the connection.",
  },
} as const;

/** Small editorial compositions recall the Home's five materials without running its demos. */
export function ServiceVisual({ service, locale, active }: { service: ServiceId; locale: ServicesLocale; active: boolean }) {
  const id = useId();
  const c = visualCopy[locale];
  return <div className={styles.visual} data-service-art={service} data-active={active} aria-hidden="true">
    <svg viewBox="0 0 580 330" fill="none" focusable="false">
      <defs>
        <linearGradient id={`${id}-wash`} x1="50" y1="0" x2="500" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#eeebfa" /><stop offset=".5" stopColor="#f7f6fb" /><stop offset="1" stopColor="#e5def7" /></linearGradient>
        <linearGradient id={`${id}-purple`} x1="350" y1="10" x2="510" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#8467ec" /><stop offset="1" stopColor="#3919bd" /></linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="105" x2="0" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#7856df" stopOpacity=".24" /><stop offset="1" stopColor="#7856df" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-ink`} x1="55" y1="126" x2="191" y2="235" gradientUnits="userSpaceOnUse"><stop stopColor="#48404d" /><stop offset=".4" stopColor="#221d28" /><stop offset="1" stopColor="#111015" /></linearGradient>
        <linearGradient id={`${id}-adapter`} x1="190" y1="131" x2="331" y2="237" gradientUnits="userSpaceOnUse"><stop stopColor="#a181ee" /><stop offset=".42" stopColor="#7350d6" /><stop offset="1" stopColor="#3919bd" /></linearGradient>
        <linearGradient id={`${id}-porcelain`} x1="335" y1="133" x2="521" y2="233" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#e3dcea" /></linearGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dy="10" stdDeviation="12" floodColor="#32204d" floodOpacity=".12" /></filter>
        <clipPath id={`${id}-clip`}><rect width="580" height="330" rx="8" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {service === "websites" && <>
          <rect width="580" height="330" fill={`url(#${id}-wash)`} />
          <circle cx="490" cy="290" r="175" fill="#d9cff6" fillOpacity=".5" />
          <g data-art-layer filter={`url(#${id}-shadow)`}>
            <rect x="37" y="30" width="506" height="270" rx="12" fill="white" />
            <path d="M37 63H543" stroke="#ece9f0" />
            <circle cx="53" cy="47" r="2.5" fill="#d8d4e0" /><circle cx="63" cy="47" r="2.5" fill="#d8d4e0" /><circle cx="73" cy="47" r="2.5" fill="#d8d4e0" />
            <rect x="183" y="40" width="212" height="14" rx="7" fill="#f7f6f9" />
            <text x="289" y="50" textAnchor="middle" fill="#8b8497" fontSize="7">sidecode.com.br</text>
            <image href="/brand/side-logo-black.svg" x="61" y="83" width="21" height="19" />
            <path d="M473 88H519M491 95H519" stroke="#c4bdcf" strokeLinecap="round" />
            <text x="61" y="134" fill="#8b7b9f" fontSize="8" letterSpacing="1.2">{c.webLabel}</text>
            <text x="58" y="184" fill="#15111c" fontSize="45" letterSpacing="-2.8">{c.web[0]}</text>
            <text x="58" y="228" fill="#3919bd" fontSize={locale === "en" ? 33 : 39} letterSpacing="-2.1">{c.web[1]}</text>
            <path d="M62 263H143" stroke="#c2b7d6" /><path d="M138 259l5 4-5 4" stroke="#8b7b9f" />
          </g>
          <g className={styles.webSculpture} data-art-layer>
            <ellipse cx="447" cy="218" rx="57" ry="11" fill="#3919bd" fillOpacity=".08" />
            <path d="M447 110l53 31v61l-53 31-53-31v-61l53-31Z" fill="#f2edff" stroke="#cab8f7" />
            <path d="M447 172l53-31v61l-53 31v-61Z" fill="#7855df" /><path d="M447 172l-53-31v61l53 31v-61Z" fill="#b6a0ef" />
            <path d="M447 110v62m-53-31 53 31 53-31" stroke="#fff" strokeOpacity=".5" />
            <ellipse cx="447" cy="171" rx="77" ry="24" transform="rotate(-30 447 171)" stroke="#9e83dc" strokeWidth=".8" />
          </g>
          <g className={styles.webCursor}><path d="m390 251 2 23 6-8 9-2-17-13Z" fill="#2b183e" stroke="white" strokeWidth="1.5" /><rect x="404" y="269" width="132" height="24" rx="12" fill="#3919bd" /><text x="470" y="284" fill="white" fontSize="9" textAnchor="middle">{c.webNote}</text></g>
        </>}

        {service === "identity" && <>
          <rect width="580" height="330" fill="#f3f0f6" />
          <path d="M27 30h526M27 300h526M40 16v298M540 16v298" stroke="#d7cedf" strokeWidth=".7" />
          <g data-art-layer transform="rotate(-7 197 158)" filter={`url(#${id}-shadow)`}>
            <rect x="60" y="44" width="280" height="218" rx="2" fill="#fff" />
            <path d="M79 65h241M79 242h241M87 58v190M313 58v190" stroke="#ede8f2" />
            <circle cx="197" cy="151" r="76" stroke="#e7dff0" /><path d="M121 151h152M197 75v152" stroke="#e7dff0" />
            <image href="/brand/side-logo-black.svg" x="142" y="99" width="112" height="100" />
            <text x="88" y="227" fill="#7e708d" fontSize="7" letterSpacing="1.2">{c.identity}</text>
          </g>
          <g className={styles.identityPaper} data-art-layer filter={`url(#${id}-shadow)`}>
            <rect x="336" y="41" width="177" height="239" rx="2" fill={`url(#${id}-purple)`} />
            <image href="/brand/side-wordmark-white.svg" x="359" y="68" width="126" height="53" />
            <text x="358" y="229" fontFamily="Georgia, serif" fontStyle="italic" fontSize="94" fill="white" letterSpacing="-7">Aa</text>
            <path d="M356 252h136" stroke="#fff" strokeOpacity=".35" />
          </g>
          <g data-art-layer><rect x="71" y="263" width="68" height="27" fill="#3919bd" /><rect x="139" y="263" width="68" height="27" fill="#101011" /><rect x="207" y="263" width="68" height="27" fill="#d7c9f0" /><rect x="275" y="263" width="48" height="27" fill="#fff" /><text x="72" y="311" fill="#8a7c99" fontSize="8" letterSpacing=".8">{c.identityNote}</text></g>
        </>}

        {service === "software" && <>
          <rect width="580" height="330" fill={`url(#${id}-wash)`} />
          <circle cx="80" cy="320" r="177" stroke="#ded6f0" /><circle cx="80" cy="320" r="207" stroke="#e5dff0" />
          <g data-art-layer filter={`url(#${id}-shadow)`}>
            <rect x="43" y="29" width="490" height="261" rx="12" fill="white" />
            <rect x="43" y="29" width="51" height="261" rx="12" fill="#f9f8fc" />
            <path d="M94 29v261M94 75h439" stroke="#ece9f2" />
            <image href="/brand/side-logo-black.svg" x="58" y="46" width="21" height="19" />
            <rect x="56" y="96" width="26" height="26" rx="7" fill="#e8e1f9" /><path d="M64 105h10v9H64zM64 109h10" stroke="#6240c5" strokeWidth="1.2" />
            <path d="M63 146h12M63 151h12M63 173h12M63 178h8M63 201h12M63 206h12" stroke="#bcb4c9" strokeLinecap="round" />
            <text x="117" y="59" fill="#2b2534" fontSize="14" letterSpacing="-.4">{c.overview}</text>
            <circle cx="510" cy="52" r="10" fill="#f0eaf9" /><circle cx="510" cy="50" r="3" fill="#c3b3db" />
            <text x="118" y="107" fill="#8d819c" fontSize="9">{c.flow}</text>
            <path d="M118 135h227M118 170h227M118 205h227M118 240h227" stroke="#f0edf5" />
            <path d="M119 223C146 227 150 189 176 194S209 212 231 174 265 181 288 144 319 154 344 117V242H119Z" fill={`url(#${id}-area)`} />
            <path data-art-draw d="M119 223C146 227 150 189 176 194S209 212 231 174 265 181 288 144 319 154 344 117" stroke="#7554d1" strokeWidth="2.4" strokeLinecap="round" pathLength="1" />
            <circle cx="344" cy="117" r="4" fill="#7554d1" stroke="white" strokeWidth="2" />
            <path d="M373 100v154" stroke="#ece7f2" />
            {[118, 164, 210].map((y,i)=><g key={y}><rect x="391" y={y-8} width="22" height="22" rx="6" fill={i===2?"#edf6ef":"#f0ebf9"} /><path d={`M398 ${y+2}l3 3 5-6`} stroke={i===2?"#71a184":"#a390c6"} strokeWidth="1.4" /><path d={`M426 ${y-2}h68M426 ${y+7}h43`} stroke="#d8d1e2" strokeWidth="3" strokeLinecap="round" /></g>)}
          </g>
          <g data-art-layer filter={`url(#${id}-shadow)`}><rect x="305" y="264" width="213" height="37" rx="18.5" fill="#fff" /><circle cx="328" cy="282" r="8" fill="#e3f1e7" /><path d="m324 282 3 3 5-6" stroke="#51976a" strokeWidth="1.4" /><text x="345" y="286" fill="#51435f" fontSize="11">{c.software}</text></g>
        </>}

        {service === "ai" && <>
          <rect width="580" height="330" fill="#eeeaf4" data-chat-background />
          <text x="35" y="33" fill="#8b7c9b" fontSize="8" letterSpacing="1.3">{c.chatLabel}</text>
          <g data-chat-message="customer" filter={`url(#${id}-shadow)`}>
            <rect x="46" y="55" width="430" height="84" rx="15" fill="white" data-chat-bubble /><path d="M46 122v17l18-10" fill="white" />
            <text x="67" y="77" fill="#8d8299" fontSize="9" letterSpacing=".6">{c.customer}</text>
            <text x="67" y="100" fill="#332c3d" fontSize="17" letterSpacing="-.4">{c.question[0]}</text><text x="67" y="122" fill="#332c3d" fontSize="17" letterSpacing="-.4">{c.question[1]}</text>
            <text x="438" y="126" fill="#aba0b6" fontSize="8">10:24</text>
          </g>
          <g data-chat-message="assistant" filter={`url(#${id}-shadow)`}>
            <rect x="104" y="158" width="430" height="84" rx="15" fill="#dcefd8" data-chat-bubble /><path d="M534 225v17l-18-10" fill="#dcefd8" />
            <text x="125" y="180" fill="#68856a" fontSize="9" letterSpacing=".6">SIDE · {c.assistant}</text>
            <text x="125" y="203" fill="#2c3d2e" fontSize="17" letterSpacing="-.4">{c.answer[0]}</text><text x="125" y="225" fill="#2c3d2e" fontSize="17" letterSpacing="-.4">{c.answer[1]}</text>
            <path d="m494 226 4 4 7-8m-1 6 2 2 7-8" stroke="#68a4ae" strokeWidth="1.3" />
          </g>
          <g data-chat-flow><rect x="46" y="276" width="488" height="30" rx="15" fill="white" /><circle cx="68" cy="291" r="4" fill="#80b88b" /><text x="84" y="295" fill="#7e718d" fontSize="10">{c.conversation}</text><path d="M199 291h32m-4-4 4 4-4 4" stroke="#b4a7c3" /><text x="270" y="295" fill="#614784" fontSize="10">{c.assistant}</text><path d="M328 291h32m-4-4 4 4-4 4" stroke="#b4a7c3" /><text x="407" y="295" fill="#7e718d" fontSize="10">{c.team}</text></g>
        </>}

        {service === "integrations" && <>
          <rect width="580" height="330" fill="#eeebf2" />
          <text x="32" y="34" fill="#96889f" fontSize="8" letterSpacing="1.25">{c.custom}</text>
          <text x="28" y="91" fill="#241c2c" fontSize="49" letterSpacing="-2.9">{c.customTitle}</text>
          <path d="M47 117H533M47 251H533M47 111v12M190 111v12M332 111v12M533 111v12M47 245v12M190 245v12M332 245v12M533 245v12" stroke="#bfb0ce" strokeWidth=".7" />
          <path d="M190 105v158M332 105v158" stroke="#c8bed2" strokeWidth=".6" strokeDasharray="2 5" />
          <g filter={`url(#${id}-shadow)`}>
            <g className={styles.integrationSource} data-custom-piece="source">
              <path d="M48 139H190V165H214V197H190V223H48Z" fill="#100d14" />
              <path d="M48 133H190V159H214V191H190V217H48Z" fill={`url(#${id}-ink)`} />
              <path d="M49 134H189V159M49 134V216" stroke="#fff" strokeOpacity=".3" strokeWidth=".8" />
              <path d="M67 155H104M67 167H121M67 179H95" stroke="#bfb0cc" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
              <text x="67" y="201" fill="#d5c9df" fontSize="10">{c.tools}</text>
            </g>
            <g className={styles.integrationDestination} data-custom-piece="destination">
              <path d="M332 139H532V223H332V197H356V165H332Z" fill="#c0b3ce" />
              <path d="M332 133H532V217H332V191H356V159H332Z" fill={`url(#${id}-porcelain)`} />
              <path d="M333 134H531V216" stroke="white" strokeOpacity=".9" />
              <path d="M385 155H506M385 168H471M385 181H491" stroke="#b4a3c9" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
              <text x="385" y="201" fill="#6f5b84" fontSize="10">{c.workflow}</text>
            </g>
            <g className={styles.integrationAdapter} data-custom-piece="adapter">
              <path d="M190 139H332V165H356V197H332V223H190V197H214V165H190Z" fill="#301285" />
              <path d="M190 133H332V159H356V191H332V217H190V191H214V159H190Z" fill={`url(#${id}-adapter)`} />
              <path d="M191 134H331V159H355" stroke="#d8bfff" strokeWidth=".8" />
              <path d="M215 160V190H191M331 192V216" stroke="#311076" strokeOpacity=".4" strokeWidth=".8" />
              <image href="/brand/side-logo-white.svg" x="249" y="149" width="53" height="47" />
            </g>
          </g>
          <text x="32" y="298" fill="#574763" fontSize="20" letterSpacing="-.65">{c.customNote}</text>
          <path d="M493 293h39m-7-7 7 7-7 7" stroke="#8c6db0" strokeWidth="1.1" />
        </>}
      </g>
    </svg>
  </div>;
}
