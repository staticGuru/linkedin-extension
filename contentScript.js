(() => {
  let currentLinkedInMembers = [];
  let i=0;
  var timer;
  let activeTab;
  const followClassName =
    "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view";
  const toggleTimer = (timerType) => {};
  const startConnectionRequests = async(btnNo) => {

     currentLinkedInMembers[0]?.click();
     let isPopupOpened=document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1");
     console.log("isPopupOpened",isPopupOpened);
     if(isPopupOpened.length){
          isPopupOpened[0].click();
     }
     currentLinkedInMembers.shift();
  
     if(currentLinkedInMembers.length ==0){
          // chrome.tabs.sendMessage(activeTab.id, {
          //      type: "STOP",
          //      value: "guruvignesh",
          //    });
     }
  };
  const getCurrectLinkedinMembers = () => {
    let members = document.getElementsByClassName(followClassName);
    for(let member of members) {
     if(member.className ==followClassName &&(member.innerText=="Connect"||member.innerText=="Follow")){
          currentLinkedInMembers.push(member);
     }
    }

    console.log("mbersc",currentLinkedInMembers)
  };
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
     
    if (type === "CONNECT") {
      //   currentVideo = videoId;
      //   toggleTimer();
      activeTab=value;
      if (currentLinkedInMembers.length == 0) {
        getCurrectLinkedinMembers();
      }
      startConnectionRequests(i);
      // console.log("valuee",obj)
    }
    //  else if (type === "PLAY") {
    //   youtubePlayer.currentTime = value;
    // } else if (type === "DELETE") {
    //   currentVideoBookmarks = currentVideoBookmarks.filter(
    //     (b) => b.time != value
    //   );
    //   chrome.storage.sync.set({
    //     [currentVideo]: JSON.stringify(currentVideoBookmarks),
    //   });

    //   response(currentVideoBookmarks);
    // }
  });
  toggleTimer(false);
})();
