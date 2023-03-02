(() => {
  let currentLinkedInMembers = [];
  let i = -1;
  let activeTab;
  const followClassName =
    "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view";
  const modalClassName =
    "artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1";
    const handleOverlay=()=>{
     
    }
    //Recursively call the functions
const syntheticCallbacks= async (index,ReliefCallback, successCallback)=>{
  if (index == 10) {
    ReliefCallback();
  }
  let isPopupOpened = document.getElementsByClassName(modalClassName);
  if (isPopupOpened?.length) {
    isPopupOpened[0].click();
  }else{
    await currentLinkedInMembers[index]?.click();
    successCallback();
    if(currentLinkedInMembers[index]?.innerText ==="Connect" || currentLinkedInMembers[index]?.innerText == "Follow"){
      syntheticCallbacks(index,ReliefCallback, successCallback)
    }
  }
}
    //Manipulate the linkedin's class names
  const startConnectionRequests = async (ReliefCallback, successCallback) => {
    i +=1;
    return await syntheticCallbacks(i,ReliefCallback, successCallback);
  };

  //collect all follows members in the linkedin sections
  const getCurrectLinkedinMembers = () => {
    let members = document.getElementsByClassName(followClassName);
    for (let member of members) {
      if (
        member.className == followClassName &&
        (member.innerText == "Connect" || member.innerText == "Follow")
      ) {
        currentLinkedInMembers.push(member);
      }
    }
  };

  //onMessage listeners
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value } = obj;

    if (type === "CONNECT") {
      activeTab = value;
      if (currentLinkedInMembers.length == 0) {
        getCurrectLinkedinMembers();
      }
      //connnections requests with callbacks
      startConnectionRequests(
        () => {
          chrome.runtime.sendMessage({ message: "STOPTIMER" });
        },
        () => {
          chrome.runtime.sendMessage({ message: "SuccessConnection",value:i});
        }
      );
    }
  });
})();
