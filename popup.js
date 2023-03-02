import { getActiveTabURL } from "./utils.js";
let timer;
//constants
const timerValueElement = document.getElementById("timerValue");
const actionButton = document.getElementById("autoConnectsid");
const TabUrl="linkedin.com/search/results/people"

//timer initiations
const handleTimerActions = async () => {
  timerValueElement.innerHTML = 0;
  actionButton.innerHTML = "Stop Connections";
  const activeTab = await getActiveTabURL();
  timer = setInterval(() => {
    chrome.tabs.sendMessage(activeTab.id, {
      type: "CONNECT",
      value: activeTab,
    });
  }, 3000);
};

//clear the timer interval
const stopTimer = () => {
  timerValueElement.innerHTML = 0;
  actionButton.innerHTML = "Start Connections";
  if(timer) clearInterval(timer);
  timer = null;
};

//Restart the connections
const completeConnections=()=>{
  actionButton.innerHTML = "Restart";
  if(timer) clearInterval(timer);
  timer = null;
}

//onMessage listeners
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { message,value } = obj;
  if (message == "STOPTIMER") {
    completeConnections();
  }
  if (message === "SuccessConnection") {
    timerValueElement.innerHTML = value;
  }
});

//On DOM load listeners
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (activeTab.url.includes(TabUrl)) {
    //On Linkedin page sections contents
    timerValueElement.innerHTML = 0;
    actionButton.addEventListener("click", () => {
      timer ? stopTimer() : handleTimerActions();
    });
    actionButton.innerHTML = "Start Connecting";
  } else {
    //Non linkedin Page contents
    timer && clearInterval(timer);
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = `<div class="title">This is not a Linkedin page.</div>`;
  }
});
