import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);
  block.textContent = "";

  const footerDivContainer = document.createElement("div");
  const footerDivSpace = document.createElement("div");
  footerDivSpace.classList.add("blank-space");

  const footerClasses = ["footer-nav", "footer-text"];
  let index = 0;

  while (fragment.firstElementChild) {
    fragment.firstElementChild.classList.add(footerClasses[index]);
    footerDivContainer.append(fragment.firstElementChild);
    if (index === 0) {
      footerDivContainer.append(footerDivSpace);
    }
    index += 1;
  }

  // Find the footer navigation section
  const navSection = footerDivContainer.querySelector(".footer-nav");
  if (navSection) {
    const navContent = navSection.querySelector(".default-content-wrapper");
    if (navContent) {
      // Find the paragraph that contains "FOLLOW US" and social icons
      const paragraphs = navContent.querySelectorAll("p");
      let followUsParagraph = null;

      // Find the paragraph containing "FOLLOW US" text
      for (const paragraph of paragraphs) {
        if (paragraph.textContent.includes("FOLLOW US")) {
          followUsParagraph = paragraph;
          break;
        }
      }

      // If we found the follow us paragraph
      if (followUsParagraph) {
        // Create a new container for the social content
        const socialContainer = document.createElement("div");
        socialContainer.classList.add("social-container");

        // Extract the text content (FOLLOW US)
        const followUsText = document.createTextNode(
          followUsParagraph.childNodes[0].textContent
        );
        socialContainer.appendChild(followUsText);

        // Create a box for the social icons
        const iconBox = document.createElement("div");
        iconBox.classList.add("social-icons-box");

        // Find social icons and move them to the box
        const socialIcons = followUsParagraph.querySelectorAll("a");
        socialIcons.forEach((icon) => {
          // Convert white icons to black (if they have images)
          const iconImg = icon.querySelector("img");
          if (iconImg) {
            iconImg.classList.add("black-icon");
          }
          iconBox.appendChild(icon);
        });

        // Add the icon box to the social container
        socialContainer.appendChild(iconBox);

        // Remove the original paragraph
        followUsParagraph.remove();

        // Add the social container after the nav list
        const navList = navContent.querySelector("ul");
        if (navList) {
          navList.parentNode.insertBefore(socialContainer, navList.nextSibling);
        } else {
          navContent.appendChild(socialContainer);
        }
      }
    }
  }

  block.append(footerDivContainer);
}
