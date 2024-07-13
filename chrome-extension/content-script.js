chrome.runtime.onMessage.addListener((e,t,n)=>{e.action==="search"&&n({content:document.body.innerText})});
