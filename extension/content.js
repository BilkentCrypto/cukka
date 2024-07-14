// Define the URLs to match
const targetUrls = [
  "https://x.com",
  "https://twitter.com",
  "https://github.com"
];

const currentUrl = window.location.href;
window.onload = () => {
// Check if the current URL starts with any of the target URLs
if (targetUrls.some(url => currentUrl.startsWith(url))) {

  if (currentUrl.includes("github.com")) {
    const nicknameElement = document.querySelector(".p-nickname");
    console.log(nicknameElement)
    if (nicknameElement) {
      // Create a new button element
      const button = document.createElement("button");
      button.innerText = "Cukka!";
      button.style.padding = "8px 16px";
      button.style.border = "none";
      button.style.borderRadius = "4px";
      button.style.backgroundColor = "#007BFF";
      button.style.color = "#fff";
      button.style.fontSize = "14px";
      button.style.cursor = "pointer";
      button.style.transition = "background-color 0.3s";

      // Add hover effect
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#0056b3";
      });

      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#007BFF";
      });
      button.onclick = () => {
        // Navigate to the specified URL when the button is clicked
        window.location.href = `http://localhost:3000/transfer?username=${nicknameElement.textContent.trim()}&platform=github`;
      };


      // Insert the button after the p-nickname element
      nicknameElement.parentNode.insertBefore(button, nicknameElement.nextSibling);
    }
  } else {

    let usernameElement = document.querySelector('div[data-testid="UserName"] span');

    if (usernameElement) {
      // Get the text content of the username element
      let usernameText = usernameElement.innerText || usernameElement.textContent;

      // Create a new button element
      let button = document.createElement("button");
      button.innerText = "Go";
      button.style.padding = "8px 16px";
      button.style.marginLeft = "10px";
      button.style.border = "none";
      button.style.borderRadius = "4px";
      button.style.backgroundColor = "#007BFF";
      button.style.color = "#fff";
      button.style.fontSize = "14px";
      button.style.cursor = "pointer";
      button.style.transition = "background-color 0.3s";

      // Add hover effect
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#0056b3";
      });

      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#007BFF";
      });

      button.onclick = () => {
        // Use the username text in the navigation URL
        window.location.href = `https://your-target-url.com?username=${encodeURIComponent(usernameText)}`;
      };

      // Insert the button after the username element
      usernameElement.parentNode.insertBefore(button, usernameElement.nextSibling);
    }


  }



}
}