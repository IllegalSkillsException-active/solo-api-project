const store = (function(){
    const items =[]; 
    const addFormVisible = false; 
    const detailedViewVisible = false; 
    const idFromElement = ''; 
    const toggleAddFormVisible = function(){
            this.addFormVisible = !this.addFormVisible; 
    }
    const toggleViewFormVisible = function (){
      this.detailedViewVisible = !this.detailedViewVisible; 
    }
    const addItem = function(item) {
      this.items.push(item); 
    }
    const findById = function(id) {
        return this.items.find(item => item.id === id);
      };
      const findAndDelete = function(id) {
    
        const itemIndex = this.items.findIndex(element => element.id === id);
        items.splice(itemIndex,1);
      };
      const findAndUpdate = function(itemId, newData) {
        console.log(this.items); 
        const itemIndex = this.items.findIndex(element => element.id === itemId); 
        console.log(itemIndex); 
        console.log(items[itemIndex]); 
         items[itemIndex] = Object.assign(items[itemIndex] ,newData);
      };
      const toggleExpandedFilter = function() {
        this.hideExpandedItems = !this.hideExpandedItems;
      };
    
      const setItemIsEditing = function(id, isEditing) {
        const item = this.findById(id);
        item.isEditing = isEditing;
      };
    
      const setSearchRating = function(term) {
        this.searchTerm = term;
      };
    return {
        items, addItem, findById,findAndDelete, findAndUpdate, 
        toggleExpandedFilter, setItemIsEditing, setSearchRating, 
        addFormVisible, toggleAddFormVisible,detailedViewVisible,
         toggleViewFormVisible, idFromElement
    }
}());