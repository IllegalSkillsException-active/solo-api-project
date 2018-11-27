
const store = (function(){
    const items =[]; 
    let addFormVisible = false; 
    let detailedViewVisible = false; 
    const idFromElement = '';
    let editFormVisible = false; 

    const toggleEditFormVisible = function(){
        this.editFormVisible = !this.editFormVisible; 
    }

    const toggleAddFormVisible = function(){
            this.addFormVisible = !this.addFormVisible; 
    };

    const toggleExpandedFilter = function() {
      this.detailedViewVisible = !this.detailedViewVisible;
    };

    const addItem = function(item) {
      this.items.push(item); 
    };
    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };
    const findAndDelete = function(id) {
    
        const itemIndex = this.items.findIndex(element => element.id === id);
        items.splice(itemIndex,1);
    };

    const findAndUpdate = function(itemId, newData) { 
        const itemIndex = this.items.findIndex(element => element.id === itemId); 
         items[itemIndex].expanded = Object.assign(items[itemIndex] ,newData);
      };
      
    
    const setItemIsEditing = function(id, isEditing) {
        const item = this.findById(id);
        item.isEditing = isEditing;
      };
    
    const setSearchRating = function(term) {
        this.searchTerm = term;
      };
    return {
        items, addItem, findById,findAndDelete, findAndUpdate,toggleEditFormVisible,
        toggleExpandedFilter, setItemIsEditing, setSearchRating, 
        addFormVisible, toggleAddFormVisible,detailedViewVisible,editFormVisible,
        idFromElement, 
    };
}());