import { getActiveTabURL } from "./utils.js";
var timer;
var isTimerRunning = false;
var triggerValue = 0;
const handleTimerActions = async () => {
  const timerValueElement = document.getElementById("timerValue");
  const actionButton = document.getElementById("autoConnectsid");
  actionButton.innerHTML = "Stop Connections";
  const activeTab = await getActiveTabURL();
  timer = setInterval(() => {
    timerValueElement.innerHTML = parseInt(timerValueElement.innerHTML) + 1;
    chrome.tabs.sendMessage(activeTab.id, {
      type: "CONNECT",
      value: activeTab,
    });
    triggerValue += 1;
    if (triggerValue == 10) return clearInterval(timer);
  }, 1100);
};
const stopTimer = () => {
  const timerValueElement = document.getElementById("timerValue");
  const actionButton = document.getElementById("autoConnectsid");
  timerValueElement.innerHTML = 0;
  actionButton.innerHTML = "Start Connections";
  clearInterval(timer);
  timer = null;
};
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type, value, videoId } = obj;
  if (type === "STOP") {
    stopTimer();
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  if (activeTab.url.includes("linkedin.com/search/results/people")) {
    //     renderTimer(0);
    const timerValueElement = document.getElementById("timerValue");
    timerValueElement.innerHTML = 0;
    const actionButton = document.getElementById("autoConnectsid");
    actionButton.addEventListener("click", () => {
      console.log("calleddddvalue");
      timer ? stopTimer() : handleTimerActions();
    });
    actionButton.innerHTML = "Start Connecting";
  } else {
    timer && clearInterval(timer);
    const container = document.getElementsByClassName("container")[0];
    console.log("CurrentVideo==>", activeTab);
    container.innerHTML = `<div class="title">This is guru a youtube video page. ${JSON.stringify(
      activeTab.url
    )}</div>`;
  }
});
