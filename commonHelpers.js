import"./assets/modulepreload-polyfill-ec808ebb.js";import{f,i}from"./assets/vendor-651d7991.js";const o=document.querySelector("[data-start]"),h=document.querySelector("#datetime-picker");o.setAttribute("disabled","true");let a,p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){a=t[0],a<=new Date?i.error({message:"Please choose a date in the future",position:"topRight",timeout:4e3,progressBar:!1,layout:2}):o.disabled=!1}};f("#datetime-picker",p);o.addEventListener("click",C);const y=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),b=document.querySelector("[data-minutes]"),g=document.querySelector("[data-seconds]");let r;function C(){o.disabled=!0,h.disabled=!0,r=setInterval(()=>{const t=a.getTime()-Date.now();if(t<=0)clearInterval(r),i.show({theme:"dark",message:"Do you want to reload the page?",position:"center",progressBarColor:"rgb(0, 255, 184)",buttons:[["<button>Ok</button>",function(e,n){location.reload()},!0],["<button>Close</button>",function(e,n){e.hide({transitionOut:"fadeOutUp",onClosing:function(u,c,s){console.info("closedBy: "+s)}},n,"buttonName")}]]});else{const e=k(t);y.textContent=e.days,S.textContent=e.hours,b.textContent=e.minutes,g.textContent=e.seconds}},1e3)}function k(t){const s=Math.floor(t/864e5).toString().padStart(2,"0"),d=Math.floor(t%864e5/36e5).toString().padStart(2,"0"),l=Math.floor(t%864e5%36e5/6e4).toString().padStart(2,"0"),m=Math.floor(t%864e5%36e5%6e4/1e3).toString().padStart(2,"0");return{days:s,hours:d,minutes:l,seconds:m}}
//# sourceMappingURL=commonHelpers.js.map
