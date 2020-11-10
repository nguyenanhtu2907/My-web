
function resizeGridItem(item){
    grid = document.getElementsByClassName("grid")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }
  
  function resizeAllGridItems(){
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
    }
  }
  window.onload = resizeAllGridItems();
  function resizeInstance(instance){
  item = instance.elements[0];
    resizeGridItem(item);
  }
  
  
  
  allItems = document.getElementsByClassName("item");
  for(x=0;x<allItems.length;x++){
    imagesLoaded( allItems[x], resizeInstance);
  }

  // var selected = document.getElementsByClassName("nav-link");
  // selected[0].onclick = function (e) { 
  //   window.onload = resizeAllGridItems();

  //   window.addEventListener("resize", resizeAllGridItems);

  //   for(x=0;x<allItems.length;x++){
  //       imagesLoaded( allItems[x], resizeInstance);
  //   }
  // };

    // selected[1].onclick = function (e) { 
    //     window.onload = resizeAllGridItems();
    
    //     window.addEventListener("resize", resizeAllGridItems);
    
    //     for(x=0;x<allItems.length;x++){
    //         imagesLoaded( allItems[x], resizeInstance);
    //     }
    //   };

      
  
  
  









  

  
  