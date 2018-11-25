
'use strict'

const api = (function () {
    
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/taylorsoloapi';
    
 
           
        // => '{"title":"Matrix","length":120,"studio":"WB"}'
      
    const getItems = function (callBack) {
        
        $.ajax({
            url: `${BASE_URL}/bookmarks`,
            method: 'GET',
            contentType: 'application/json',
            success: callBack,
            error: () => alert("GET Item Api call ERROR"),
        })
        //$.getJSON(`${BASE_URL}/items`, callBack, );
    };

    const createItems = function (newItem, callBack) {
        console.log(newItem); 
        $.ajax({
            url : `${BASE_URL}/bookmarks`,
            method: 'POST',
            contentType: 'application/json',
            data: newItem,
            success: callBack,
            error: () => alert("CREATE Item Api call ERROR"),
    })
    }
    const updateItem = function(itemID, updateData, callBack){
            $.ajax({
                url : `${BASE_URL}/bookmarks/${itemID}`,
                method: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify(updateData),
                success: callBack,
                error: () => alert("UPDATE Item Api call ERROR"),
            })
    }

    const deleteItem = function(itemID, callBack){
        $.ajax({
            url : `${BASE_URL}/bookmarks/${itemID}`,
            method: 'DELETE',
            contentType: 'application/json',
            success: callBack,
            error: () => alert("DELETE Item Api call ERROR"),
        })
}

    return{getItems,
        createItems, 
        updateItem, 
        deleteItem
    }

}());