const themeIcon = document.querySelector('.theme-icon');
const body = document.body;
const menuItems = document.querySelectorAll("#menu li");
const extensionsGrid = document.querySelector('.extensions-grid')
let extensions = [];
fetch('./data.json')
.then(response => response.json())
.then((data) => {
  extensions = data
  createGridItems(extensions)
})
.catch(err => console.log(err))


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
    const choice = this.innerText;
      const data = extensions.filter((ext)=>{
        if(choice==='Active'){
          return ext.isActive == true;
        }else if(choice==='Inactive'){
          return ext.isActive == false;
        }else{
          return ext;
        }
      })

      createGridItems(data)
    
    menuItems
    .forEach(li => li.classList.remove("active"));
      this.classList.add("active");
  });
});

function createGridItems(items){
  extensionsGrid.innerHTML = ""

  items.forEach((item)=>{
    //console.log(ext)
    const container = document.createElement('div');
    container.classList.add('grid-item');
    const upperContainer = document.createElement('div');
    upperContainer.classList.add('grid-item-title-container');

    const titleContainer = document.createElement('div');
    const title = document.createElement('span');
    title.classList.add('grid-item-title')
    title.innerHTML = item.name;
    titleContainer.appendChild(title);
    const description = document.createElement('p');
    description.classList.add('grid-item-description')
    description.innerHTML = item.description;
    titleContainer.appendChild(description);


    const iconImg = document.createElement('img');
    iconImg.classList.add('grid-item-icon');
    iconImg.src = item.logo;
    upperContainer.appendChild(iconImg);
    upperContainer.appendChild(titleContainer);


    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('grid-item-bottom-container');
    const removeBtn = document.createElement('div');
    removeBtn.classList.add('grid-item-remove-btn');
    removeBtn.tabIndex = 0; 
    removeBtn.innerText = 'Remove';
    bottomContainer.appendChild(removeBtn);

    container.appendChild(upperContainer);
    container.appendChild(bottomContainer);
    extensionsGrid.appendChild(container);
  }) 
}