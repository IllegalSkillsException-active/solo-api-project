/* global shoppingList, store */
$(document).ready(function() {
  bookmarkList.bindEventListeners();
});


// store.items.push(Item.create('apples'));
api.getItems((items) => {
  
  items.forEach((item) => {
    const desItem = Object.assign(item,{'expanded': false})
    store.addItem(desItem);
  })
  const item = store.items[0];
 console.log(item);
  bookmarkList.render();
});
