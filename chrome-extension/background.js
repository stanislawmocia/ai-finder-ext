chrome.commands.onCommand.addListener(o=>{console.log(o),o==="open-ai-search"&&chrome.action.openPopup()}),chrome.runtime.onMessage.addListener((o,c,e)=>{if(o.action==="saveConfig")chrome.storage.local.remove(["config"]),chrome.storage.local.set({config:o.config},()=>{});else if(o.action==="getConfig")return chrome.storage.local.get(["config"],n=>{e({config:n.config})}),!0});