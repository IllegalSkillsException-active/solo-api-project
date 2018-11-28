# solo-api-project 
To start the server locally,in your project folder run http-server in your command promt. 
Then visit one of the avbailable ip addresses or http://localhost:8080/  ---> 8080 being the local port I am running the http-server on. 
yours may vary. 
User Stories
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)
I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I receive appropriate feedback when I cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

(Extension) I can edit the rating and description of a bookmark in my list

Technical Requirements
Use jQuery for AJAX and DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables!
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use responsive design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the lessons on accessibility, forms
(Extension) Follow AJAX and a11y best practices

AJAX and Aria Live for help
