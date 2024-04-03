
let taxSwitch= document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener('click', ()=>{
  let taxInfo = document.getElementsByClassName("tax-info");
for(info of taxInfo){
  if(info.style.display != "inline"){
    info.style.display =  "inline";
  }else{
    info.style.display =  "none";
  }

}})


document.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filters = document.getElementById('filters');
    let scrollAmount = 0;

    // Calculate width of a single filter element
    const filterWidth = document.querySelector('.filter').offsetWidth;

    // Calculate total width of all filter elements
    const filtersWidth = filters.scrollWidth;

    // Calculate width of visible area
    const visibleWidth = filters.offsetWidth;

    // Calculate width to scroll on each click
    const scrollWidth = filterWidth; // Set scroll width to the width of a single filter element

    nextBtn.addEventListener('click', function() {
      // Ensure scroll amount doesn't exceed the total width
      scrollAmount = Math.min(scrollAmount + scrollWidth, filtersWidth - visibleWidth);
      filters.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', function() {
      // Ensure scroll amount doesn't go below zero
      scrollAmount = Math.max(scrollAmount - scrollWidth, 0);
      filters.style.transform = `translateX(-${scrollAmount}px)`;
    });
  });
