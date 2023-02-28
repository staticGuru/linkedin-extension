(() => {
  let currentLinkedInMembers = [];
  let i = 0;
  let activeTab;
  const followClassName =
    "artdeco-button artdeco-button--2 artdeco-button--secondary ember-view";
  const modalClassName =
    "artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1";

    //Manipulate the linkedin's class names
  const startConnectionRequests = async (ReliefCallback, successCallback) => {
    currentLinkedInMembers[0]?.click();
    let isPopupOpened = document.getElementsByClassName(modalClassName);
    if (isPopupOpened.length) {
      isPopupOpened[0].click();
    }
    currentLinkedInMembers.shift();
    successCallback();
    if (currentLinkedInMembers.length == 0) {
      ReliefCallback();
    }
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
          chrome.runtime.sendMessage({ message: "SuccessConnection" });
        }
      );
    }
  });
})();
