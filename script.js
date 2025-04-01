const themeIcon = document.querySelector('.theme-icon');
const body = document.body;
const menuItems = document.querySelectorAll("#menu li");


themeIcon.addEventListener('click',function(){
    if (body.classList.contains("light-theme")) {
        body.classList.replace("light-theme", "dark-theme");
        this.src = './assets/images/icon-sun.svg';
      } else {
        body.classList.replace("dark-theme", "light-theme");
        this.src = './assets/images/icon-moon.svg';
      }
});

menuItems.forEach(item => {
  item.addEventListener("click", function() {
    menuItems.forEach(li => li.classList.remove("active"));
      this.classList.add("active");
  });
});