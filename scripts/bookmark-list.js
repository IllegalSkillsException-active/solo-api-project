/* global store, $ */
const bookmarkList = (function () {
    
    let objectIndex = undefined;
    const bookmarkClick = function () {
        $('#add-bookmark').on('click', e => {
            // console.log('button clicked'); 
            store.toggleAddFormVisible();
            console.log(store);
            if(store.editFormVisible){
                store.toggleEditFormVisible();
              }
            objectIndex = undefined;
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
            objectIndex = store.items.findIndex(element => element.id === currentTargetId);
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
   
    const editingItemClick = function(){

        $('.bookmark-list').on('click','.js-item-edit',function newFunction(e) {
            e.preventDefault();
            store.toggleEditFormVisible();
            store.toggleExpandedFilter();
            console.log('edit button clicked!'); 
            const currentTargetId = getItemIdFromElement(e.currentTarget); 
            const currentObject = store.findById(currentTargetId);
            currentObject.editing = store.editFormVisible; 
            console.log('Edit form should be visible'); 
            render(); 
        });  
    }

    const handleNewItemSubmit = function() {
        $('.div-form').on('submit','#js-bookmark-list-form', function (event) {
          console.log('save button has been submitted!');
          event.preventDefault();
          
          if(store.addFormVisible){
            store.toggleAddFormVisible(); 
          }
          if(store.editFormVisible){
            store.toggleEditFormVisible();
          }
          const description = $( "input.input-description.js-description-input" ).val();
          let newBookmark = $(event.target).serializeJson();
          let bookmark2 = JSON.parse(newBookmark); 
          bookmark2.desc = description; 
        //   if(objectIndex != undefined){

        //     const oldId = store.items[objectIndex].id;
        //     bookmark2.id = oldId; 
        //     updatedBookmark = JSON.stringify(bookmark2);
        //     console.log(oldId);
        //     console.log('object index is NOT undefined and final form is: ', bookmark2);   
        //     api.updateItem(oldId, updatedBookmark, ()=>{
        //         store.findAndUpdate(oldId, updatedBookmark); 
        //         render();                   
        //     });
        //   }
          if(objectIndex === undefined){
            let finalForm = JSON.stringify(bookmark2);
            console.log('object index IS undefined and final form is:',finalForm); 
            api.createItems(finalForm, (newItem) =>{
                store.addItem(newItem);
                render(); 
            });
          } 
  
    });
    }

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

    function generateItemElement(item,i) {

        const expandedClass = item.expanded ? 'bookmark-item-expanded' : '';
        let itemTitle = `<a href="#"class="shopping-item ${expandedClass}">${item.title}</a>`;
        console.log(!store.detailedViewVisible);
        if(!item.expanded){
             
            let width = store.items[i].rating; 
            return `
            <li class="js-item-element" data-item-id=${item.id}>
            ${itemTitle}
            <div class="ratingContainer">
                <div>
                    <img src="https://image.ibb.co/jpMUXa/stars_blank.png" alt="img">
                    </div>
                    <div class="cornerimage" style="width:${width*16}px;">
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
    
        else  {
            let width = store.items[i].rating; 
            let description = store.items[i].desc;
            console.log('detailed form should be visible'); 
            return `
                <li class="js-item-element" data-item-id="${item.id}">
                    ${itemTitle}
                    <div class="shopping-item-controls">
                    <button class="js-item-edit">
                    <span class="button-label">Edit</span>
                    </button>
                    <button class="detailed-item-toggle js-detailed-item-toggle">
                    <span class="button-label">link</span>
                    </button>
                    <div class="ratingContainer">
                        <div>
                        <img src="https://image.ibb.co/jpMUXa/stars_blank.png" alt="img">
                        </div>
                        <div class="cornerimage" style="width:${width*16}px;">
                        <img src="https://image.ibb.co/caxgdF/stars_full.png" alt="">
                        </div>
                    </div> 
                        <div class = "description"><h1>Description</h1><p1>${description}</p1>
                        </div>
                    </div>
                </li>`
                
        }
        
    }

    function generateShoppingItemsString(itemA) {
        const items = itemA.map((item, i) => generateItemElement(item,i)); 
        return items;
    }
  
    function render() {
        let items = [...store.items];
        newPerspective(); 
        const shoppingListItemsString = generateShoppingItemsString(items);
        $('.bookmark-list').html(shoppingListItemsString);
    }
  
    const newPerspective = function() {
        let newTitle =""; 
        let newUrl= "";
        let newRating= "";
        let newDescription= ""; 

        let editDetails =store.items[objectIndex];
        if(editDetails != undefined){
        newTitle += editDetails.title; 
        newUrl += editDetails.url; 
        newRating += editDetails.rating;
        newDescription += editDetails.desc;
        
            };  
        console.log(editDetails); 
        if(store.addFormVisible || store.editFormVisible) {
            console.log('form should be visible');
            $('#js-bookmark-list-form').html(
               `<input type='text' class='input-title js-title-input' name = 'title' placeholder='Add Title Here' value='${newTitle}'>
                <input type='text' name = 'url' class='input-url js-url-input' placeholder='Add URL Here' value='${newUrl}'>
                <input name= 'rating' type='number' class= 'rating-input' placeholder='input your rating here' value='${newRating}'> 
                <li class="js-input-element">
                <input type='text' class='input-description js-description-input' placeholder='Add Description Here' value='${newDescription}'>
                <div class="save-item-controls">
                <button class="shopping-item-toggle js-item-toggle" id="save-button" type ='submit'>
                <span class="button-label">Save</span>
                </button>
                </div>
                </li>
                </li>`         
             );
        }else {
            $('#js-bookmark-list-form').html('');
        }
         
    }

    function handleDeleteItemClicked() {
        $('.bookmark-list').on('click', '.js-item-delete', event => {
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
        // ratingSelect(); 
        editingItemClick(); 
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
