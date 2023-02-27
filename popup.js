import { getActiveTabURL } from "./utils.js";
let timer;
const timerValueElement = document.getElementById("timerValue");
const actionButton = document.getElementById("autoConnectsid");
const TabUrl="linkedin.com/search/results/people"

const handleTimerActions = async () => {
  timerValueElement.innerHTML = 0;
  actionButton.innerHTML = "Stop Connections";
  const activeTab = await getActiveTabURL();
  timer = setInterval(() => {
    chrome.tabs.sendMessage(activeTab.id, {
      type: "CONNECT",
      value: activeTab,
    });
  }, 1000);
};

const stopTimer = () => {
  timerValueElement.innerHTML = 0;
  actionButton.innerHTML = "Start Connections";
  if(timer) clearInterval(timer);
  timer = null;
};

const completeConnections=()=>{
  actionButton.innerHTML = "Restart";
  if(timer) clearInterval(timer);
  timer = null;
}

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { message } = obj;
  if (message == "STOPTIMER") {
    completeConnections();
  }
  if (message === "SuccessConnection") {
    timerValueElement.innerHTML = parseInt(timerValueElement.innerHTML) + 1;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (activeTab.url.includes(TabUrl)) {
    timerValueElement.innerHTML = 0;
    actionButton.addEventListener("click", () => {
      timer ? stopTimer() : handleTimerActions();
    });
    actionButton.innerHTML = "Start Connecting";
  } else {
    timer && clearInterval(timer);
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML = `<div class="title">This is not a Linkedin page.</div>`;
  }
});
