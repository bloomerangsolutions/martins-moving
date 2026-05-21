// Static-compiled Tailwind (styles.css) replaces the render-blocking CDN compiler.
// Theme lives in /tailwind.config.js. Custom CSS (mascot, hero gradient, dropdowns) stays inline below.
export const HEAD_STYLES = String.raw`
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&amp;family=Sora:wght@400;600;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/styles.css"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 132, 61, 0.1);
        }
        .hero-gradient {
            background: linear-gradient(to right, rgba(0,40,19,0.92) 0%, rgba(0,46,21,0.74) 38%, rgba(0,56,26,0.44) 66%, rgba(0,66,31,0.20) 100%);
        }
        @media (max-width: 767px){ .hero-gradient{ background: linear-gradient(rgba(0,52,24,0.62), rgba(0,34,16,0.86)); } }
    </style>
<style>
.form-status{min-height:1.25rem;}
.dd-panel{opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .18s ease,transform .18s ease,visibility .18s;}
.dd-wrap:hover>.dd-panel,.dd-wrap:focus-within>.dd-panel{opacity:1;visibility:visible;transform:translateY(0);}
.dd-wrap:hover .dd-chev,.dd-wrap:focus-within .dd-chev{transform:rotate(180deg);}
details>summary{list-style:none;} details>summary::-webkit-details-marker{display:none;}
details[open] .dd-chev{transform:rotate(180deg);}
/* snail mascot: runs in beside the In short box, then a gentle idle bob */
.snail-fly{will-change:transform,opacity;opacity:1;}
.snail-fly img{display:block;}
@media (prefers-reduced-motion: no-preference){
  @keyframes snail-run-in{0%{transform:translateX(170%) scale(.72) rotate(8deg);opacity:0;}55%{opacity:1;}82%{transform:translateX(-5%) scale(1.05) rotate(-2deg);}100%{transform:translateX(0) scale(1) rotate(0);opacity:1;}}
  @keyframes snail-bob{0%,100%{transform:translateY(0) rotate(0);}50%{transform:translateY(-6px) rotate(-1.5deg);}}
  .snail-fly{animation:snail-run-in 1.3s cubic-bezier(.22,1,.36,1) .3s both;}
  .snail-fly img{animation:snail-bob 3.4s ease-in-out 1.9s infinite;}
}
</style>
`;
