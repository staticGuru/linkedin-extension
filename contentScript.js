(() => {
  let currentLinkedInMembers = [];
  let i=0;
  var timer;
  let activeTab;
  const followClassName =
    "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view";
    const modalClassName="artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1"
  const toggleTimer = (timerType) => {};
  const startConnectionRequests = async(btnNo) => {

     currentLinkedInMembers[0]?.click();
     let isPopupOpened=document.getElementsByClassName(modalClassName);
     if(isPopupOpened.length){
          isPopupOpened[0].click();
     }
     currentLinkedInMembers.shift();
  
  };
  const getCurrectLinkedinMembers = () => {
    let members = document.getElementsByClassName(followClassName);
    for(let member of members) {
     if(member.className ==followClassName &&(member.innerText=="Connect"||member.innerText=="Follow")){
          currentLinkedInMembers.push(member);
     }
    }
  };
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
     
    if (type === "CONNECT") {
      activeTab=value;
      if (currentLinkedInMembers.length == 0) {
        getCurrectLinkedinMembers();
      }
      startConnectionRequests(i);
    }
  });
  toggleTimer(false);
})();
