/* global store, $ */
const bookmarkList = (function () {
    
    
    const bookmarkClick = function () {
        $('#add-bookmark').on('click', e => {
            // console.log('button clicked'); 
            store.toggleAddFormVisible();
            console.log(store);
            render();
        })
    };
    const detailedViewClick = function () {
        $('.bookmark-list').on('click','.shopping-item',e => {
            // console.log('button clicked'); 
            e.preventDefault();
            store.toggleExpandedFilter();
            console.log(e.currentTarget); 
            const itemIndex =store.items.findIndex(element => element); 
            const currentObject = store.items[itemIndex];
            console.log(currentObject);
            console.log(currentObject.id); 

            console.log(itemIndex); 
            render();
            
            // store.idFromElement = id; 
            // console.log(store.detailedViewVisible);
            // console.log(id);
            // console.log(getItemIdFromElement(e.currentTarget));
            // console.log(store.idFromElement); 
            render();
        })

    };
    const ratingSelect = function(){
        $('.submit-rating').click( function(){
            console.log('submit rating drop-down has been clicked!');
            $(this).children("ul").css('display:none').toggle();
        });
    };

    const handleNewItemSubmit = function() {
        $('.div-form').on('submit','#js-bookmark-list-form', function (event) {
          console.log('save button has been submitted!');
          event.preventDefault();
        //   const newItemName = $('.js-shopping-list-entry').val();
          const newBookmark = $(event.target).serializeJson(); 
          console.log(newBookmark); 
          api.createItems(newBookmark, (newItem) =>{
            store.addItem(newItem); 
            render(); 
          });
        }
    )};

    $.fn.extend({
        serializeJson: function() {
          const formData = new FormData(this[0]);
          const o = {};
          formData.forEach((val, name) => o[name] = val);
          return JSON.stringify(o);
        }
      });
      function getItemIdFromElement(item) {
        console.log($(item).closest('.js-item-element').data('data-item-id'));
        // return $(item)
          
      }
    function generateItemElement(item) {
        console.log(item); 
        const expandedClass = item.expanded ? 'bookmark-item-expanded' : '';
       let itemTitle = `<a href="#"class="shopping-item ${expandedClass}">${item.title}</a>`;
       
       return `
        <li class="js-item-element" data-item-id=${item.id}>
       ${itemTitle}
       <div class="ratingContainer">
       <div>
       <img src="https://image.ibb.co/jpMUXa/stars_blank.png" alt="img">
       </div>
       <div class="cornerimage" style="width:75%;">
       <img src="https://image.ibb.co/caxgdF/stars_full.png" alt="">
       </div>
    </div>
        <div class="shopping-item-controls">
            <button class="shopping-item-delete js-item-delete">
                <span class="button-label">Delete</span>
            </button>
        </div>
    </li>`;
      }

function generateShoppingItemsString(itemA) {
    console.log(itemA);
    const items = itemA.map((item) => generateItemElement(item));
    return items;
  }
  
  
  function render() {
    let items = [...store.items];
    newPerspective(items); 

    console.log(items); 
    const shoppingListItemsString = generateShoppingItemsString(items);

  
    // insert that HTML into the DOM
    $('.bookmark-list').html(shoppingListItemsString);
    console.log('`render` ran');
  }
  
    const newPerspective = function(object) {
        // console.log('perspective called');
        console.log(getItemIdFromElement(object)); 
        const idFromElement = getItemIdFromElement(object);
        const editCurrentItemObject = store.findById(idFromElement);
        console.log(editCurrentItemObject);
     if (store.addFormVisible) {
            console.log('form should be visible');
            $('#js-bookmark-list-form').html(
                `<input type='text' class='input-title js-title-input' name = 'title' placeholder='Add Title Here'>
      <input type='text' name = 'url' class='input-url js-url-input' placeholder='Add URL Here'>
      <input name= 'rating' type='text' class= 'rating-input' placeholder='input your rating here'> 
      <li class="js-input-element">
          <input type='text' class='input-description js-description-input' placeholder='Add Description Here'>
          <div class="save-item-controls">
      
              <button class="shopping-item-toggle js-item-toggle" id="save-button" type ='submit'>
                  <span class="button-label">Save</span>
              </button>
          </div>
      </li>
      
      </li>
     `
            )
        }
     
        
     if(!store.addFormVisible ) {
            console.log('form is invisible');
            $('#js-bookmark-list-form').html('');
        }
           
    // if(!store.detailedViewVisible){
    //         console.log('detailedForm is invisible');
    //         (currentItemObject.id).html('');
    //     }

}
const findAndDisplayExtended = function(){
    if (store.detailedViewVisible) {
        console.log('detailed form should be visible');
        $('.top-level-class').html(`
                 <li class="js-item-element" data-item-id="${currentItemObject.id}">
                  ${currentItemObject.title}
                  <div class="shopping-item-controls">
                    <button class="shopping-item-edit js-item-edit">
                      <span class="button-label">Edit</span>
                    </button>
                    <button class="detailed-item-toggle js-detailed-item-toggle">
                      <span class="button-label">link</span>
                    </button>
                  </div>
                </li>
                `)
}
}

function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.bookmark-list').on('click', '.js-item-delete', event => {
        console.log('deleted bitch'); 
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteItem(id, () =>{
        store.findAndDelete(id);
        render();
      });
    });
  }


function bindEventListeners() {
    // addBookmark();
    bookmarkClick();
    detailedViewClick();
    ratingSelect(); 
    findAndDisplayExtended();
    // handleSave();  
    handleNewItemSubmit();
    // handleItemCheckClicked();
    handleDeleteItemClicked();
    // handleEditShoppingItemSubmit();
    // handleToggleFilterClick();
    // handleShoppingListSearch();
    // handleItemStartEditing();
};

// This object contains the only exposed methods from this module:
return {
    render: render,
    bindEventListeners: bindEventListeners,
    
};
    }());
