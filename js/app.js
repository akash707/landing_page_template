/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

const ACTIVE = 'active';
// build the nav
/** function to dynamically create nav items
 * @returns {Array} navbar items
 */
const getNavbarItems = () => {
    const sectionsDetails = document.querySelectorAll("section");
    const navItems = [];
    for (let item = 1; item <= sectionsDetails.length; item++) {
        navItems.push(`SECTION-${item}`);
    }
    return navItems;
}

/**
 * function to navigate to particular selection 
 * @param {object} event 
 */
const navigateToSection = (event) => {
  const sectionIndex = event.target.id;
  const section = document.getElementsByTagName("section")[sectionIndex];
  section.scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });
}

/**
 * function to render navigation bar items on the navbar section
 */
const addNavigationBar = () => {
    const navbarList = document.getElementById("navbar__list");
    const navBarFragment = document.createDocumentFragment();
    const navbarItemsDetails = getNavbarItems();
    navbarItemsDetails.forEach((navBarItems, index) => {
        const li = document.createElement('li')
        li.setAttribute("id", index);
        li.addEventListener('click', navigateToSection);
        if(index === 0) {
            li.className = ACTIVE
        }
        li.append(document.createTextNode(navBarItems));
        navBarFragment.appendChild(li);
    });
    navbarList.appendChild(navBarFragment);
}

/**
 * 
 * @param {Object} section 
 * @returns function to return true/false based on section position inside viewport
 */
const inViewPort = (section) => {
    const boundaryDetails = section.getBoundingClientRect()
    return boundaryDetails.top < window.innerHeight / 2;
}

/**
 * function to make last active navbar item inactive
 */
const removeLastActiveNavbarItem = () => {
    const lastActiveNavbarItem = document.querySelector("li.active");
    const lastActiveSection = document.querySelector("section.active");
    lastActiveNavbarItem.className = '';
    if(lastActiveSection) lastActiveSection.classList.remove(ACTIVE);
}

/**
 * function to set navbar item active and inactive based on position of section
 */
const scrollListener = () => {
    const sections = document.getElementsByTagName("section");
    const lists = document.getElementsByTagName("li");
    const scrollHandler = () => {
        [...sections].forEach((section, index) => {
            if(inViewPort(sections[index])) {
                removeLastActiveNavbarItem();
                lists[index].className = ACTIVE;
                sections[index].classList.add(ACTIVE);
            }
        })  
    }
    document.addEventListener('scroll', scrollHandler);
}

window.addEventListener('load', function () {
    addNavigationBar();
    scrollListener()
});


