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
            e.preventDefault();
            store.toggleExpandedFilter();
            const currentTargetId = getItemIdFromElement(e.currentTarget); 
            const currentObject = store.findById(currentTargetId);
            currentObject.expanded = store.detailedViewVisible; 
            const objectIndex = store.items.findIndex(element => element.id === currentTargetId);
            const findAndDisplayExtended = function() {        
                if (currentObject.expanded) {    
                        store.items.splice(objectIndex,1, currentObject);
                };
            };
            findAndDisplayExtended();  
            render();
            console.log('detailed form should be visible');  
        });
        
    }

    const ratingSelect = function() {
        $('.submit-rating').click( function() {
            console.log('submit rating drop-down has been clicked!');
            $(this).children("ul").css('display:none').toggle();
        });
    };

    const handleNewItemSubmit = function() {
        $('.div-form').on('submit','#js-bookmark-list-form', function (event) {
          console.log('save button has been submitted!');
          event.preventDefault();
          store.toggleAddFormVisible(); 
          const newBookmark = $(event.target).serializeJson(); 
          console.log(newBookmark); 
          api.createItems(newBookmark, (newItem) =>{
          store.addItem(newItem);
          render();
         });
        })   
    };

    $.fn.extend({
        serializeJson: function() {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return JSON.stringify(o);
        }
    });

    function getItemIdFromElement(item) {
        return $(item).closest('.js-item-element').data('item-id');
    }

    function generateItemElement(item) {
        console.log(item); 
        const width = 16 * $('.rating-input').val();
        const expandedClass = item.expanded ? 'bookmark-item-expanded' : '';
        let itemTitle = `<a href="#"class="shopping-item ${expandedClass}">${item.title}</a>`;
        console.log(!store.detailedViewVisible);
        if(!item.expanded){
            console.log('detailed form should not be visible');
            return `
            <li class="js-item-element" data-item-id=${item.id}>
            ${itemTitle}
            <div class="ratingContainer">
                <div>
                    <img src="https://image.ibb.co/jpMUXa/stars_blank.png" alt="img">
                    </div>
                    <div class="cornerimage" style="width:${width}px;">
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

        else {
            console.log('detailed for should be visible'); 
            return `
                <li class="js-item-element" data-item-id="${item.id}">
                    ${itemTitle}
                    <div class="shopping-item-controls">
                    <button class="shopping-item-edit js-item-edit">
                    <span class="button-label">Edit</span>
                    </button>
                    <button class="detailed-item-toggle js-detailed-item-toggle">
                    <span class="button-label">link</span>
                    </button>
                    </div>
                </li>`
                ;
        }
    }

    function generateShoppingItemsString(itemA) {
        console.log(itemA);
        const items = itemA.map((item) => generateItemElement(item));
        return items;
    }
  
    function render() {
        let items = [...store.items];
        console.log(store.items);
        newPerspective(); 
        // findAndDisplayExtended(); 
        console.log(items); 
        const shoppingListItemsString = generateShoppingItemsString(items);
        // insert that HTML into the DOM
        console.log(shoppingListItemsString);
        $('.bookmark-list').html(shoppingListItemsString);
        console.log('`render` ran');
    }
  
    const newPerspective = function() {
        if(store.addFormVisible) {
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
                </li>`  
             )
        } else {
            console.log('form is invisible');
            $('#js-bookmark-list-form').html('');
        }
    }

    function handleDeleteItemClicked() {
        $('.bookmark-list').on('click', '.js-item-delete', event => {
            console.log('deleted bitch'); 
            const id = getItemIdFromElement(event.currentTarget);

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
