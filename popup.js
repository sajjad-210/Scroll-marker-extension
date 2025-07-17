document.getElementById("mark").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        localStorage.setItem("scrollMarkerY", window.scrollY);
        alert("📍 Position marked at Y = " + window.scrollY);
      }
    });
  });
});

document.getElementById("return").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        const y = localStorage.getItem("scrollMarkerY");
        if (y !== null) {
          window.scrollTo({ top: parseInt(y), behavior: "smooth" });
        } else {
          alert("⚠️ No position marked yet.");
        }
      }
    });
  });
});
