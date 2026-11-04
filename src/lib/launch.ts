/** The site opens to everyone at 11 November 2026, 00:00 in Malaysia (UTC+8), wherever the visitor is. */
export const LAUNCH_AT = "2026-11-11T00:00:00+08:00";

/** Open any page with ?preview=<key> to see the real site before launch (remembered for the tab). */
export const PREVIEW_KEY = "sri";

/** Runs before first paint: gates the site behind the countdown until launch, unless previewing. */
export const LAUNCH_GATE_SCRIPT = `(function(){try{
var q=new URLSearchParams(location.search).get('preview');
if(q==='${PREVIEW_KEY}')sessionStorage.setItem('launch-preview','1');
if(sessionStorage.getItem('launch-preview'))return;
if(Date.now()<new Date('${LAUNCH_AT}').getTime())document.documentElement.classList.add('launch-gated');
}catch(e){}})();`;
