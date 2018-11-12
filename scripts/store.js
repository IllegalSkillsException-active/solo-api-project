
const store = (function(){
    const items =[]; 
    const addFormVisible = false; 
    const detailedViewVisible = false; 
    const idFromElement = ''; 
    const toggleAddFormVisible = function(){
            this.addFormVisible = !this.addFormVisible; 
    }
    const toggleViewFormVisible = function (){
      console.log(detailedViewVisible);
      this.addFormVisible = !this.addFormVisible; 
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
      const expandedDisplay = function(){
            const itemIndex =store.items.findIndex(element => element.id);
            const currentObject = store.items[itemIndex];
            return currentObject; 
      }
      const findAndUpdate = function(itemId) { 
        const itemIndex = this.items.findIndex(element => element.id === itemId); 
         items[itemIndex].expanded = Object.assign(items[itemIndex] ,newData);
      };
      const toggleExpandedFilter = function() {
        this.detailedViewVisible = !this.detailedViewVisible;
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
         toggleViewFormVisible, idFromElement, expandedDisplay
    }
}());