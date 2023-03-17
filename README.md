# To-Do-List

To do list with Java Script by using HTML, CSS, and Java Script with using Local storage, drag &amp; Drop.

# Kanban Board Project


This project is a Kanban Board built using HTML, CSS, and Vanilla JavaScript. It was created as part of the [Kalbonyan elmarsos competition](https://www.albonyanalmarsos.org/).

## Demo

You can view a live demo of the project at [Kanban Board]().


https://user-images.githubusercontent.com/52683244/225976197-0950e5d8-b097-44ed-9219-240c1e8c73f7.mp4


## Technologies Used

- HTML5
- CSS:
  - Flexbox
  - Grid
- JavaScript:
  - Drag and Drop API
  - Local Storage API

## Features and Usage

- ✅ You can create new tasks
- ✅ Edit existing tasks
- ✅ Drag and drop tasks to other positions
- ✅ Reload the page without losing your tasks and data
- ✅ Responsive design for all screen sizes

## Issues and Solutions

- The `createTask` function generates a random ID for each task, which can cause issues when trying to remove or edit tasks that have been saved to the Local Storage API. To solve this issue, modify the `createTask` function to accept the ID stored in the Local Storage API as a parameter.
- Use higher order functions like `filter` and `find` to update the arrays in the Local Storage API when dragging tasks to new positions or performing other operations.

## Future Plans

- Refactor the code to be more readable and maintainable 🔁.
- Build the project using React JS ⚛ for improved performance and scalability.

## Resources

- [MDN Web Docs: Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Maximilian Schwarzmüller's JavaScript Course on Udemy](https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/)
- [Drag and Drop tutorial for Abdelrahman Gamal](https://www.youtube.com/watch?v=PfhAToxyd7s&t=3s)
- [ToDo list with localStorage from Elzero Web School](https://www.youtube.com/watch?v=ylsFXMHpFUQ&t=1443s)
