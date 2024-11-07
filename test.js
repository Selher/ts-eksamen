import { Selector } from 'testcafe';

fixture('Testing Hover Effect on Button')
    .page('http://localhost:5173/todo/');  // Replace with the correct URL of your app

  

test('Should interact with form and see button hover effect', async t => {
  // Arrange: Prepare the test scenario
  const inputText = Selector('#todo-input'); // Replace with the actual input selector for "exam"
  const dropdown = Selector('#todo-day');  // Replace with the actual selector for the dropdown
  const addButton = Selector('button').withText('Add'); // Replace with the button selector if needed

  // Act: Perform the actions
  await t
    .typeText(inputText, 'exam')              // Enter text in the "exam" input field
    .click(dropdown)                          // Click on the dropdown to open it
    .click(dropdown.find('option').withText('Tuesday')) // Select "Tuesday" from the dropdown
    .hover(addButton)                         // Hover over the "Add" button to see the hover effect
    .click(addButton);                        // Click the "Add" button

  // Assert: Verify the expected outcome (optional based on your actual testing goal)
  // You can verify the hover effect by checking if the button has the expected styles during hover
  // Example: Check if background color changes after hover
  const buttonBackgroundColor = await addButton.getStyleProperty('background-color');
  
});

    
    test('Check h1 rotation animation', async t => {
        // Arrange: Set up the h1 element and capture the initial rotation
        const h1 = Selector('h1');  // Select the h1 element
        const initialTransform = await h1.getStyleProperty('transform');
    
        // Act: Wait for the animation to be triggered (e.g., on page load or trigger)
        await t.wait(500);  // Wait for the animation to complete (adjust if necessary)
        const rotatedTransform = await h1.getStyleProperty('transform');
    
        
    });

    test('Should add a todo and mark it as complete with strikethrough', async t => {
        // Arrange: Set up the test elements
        const inputText = Selector('#todo-input'); // Input field by id
        const dropdown = Selector('#todo-day'); // Dropdown for selecting the day
        const addButton = Selector('button').withText('Add'); // Button to add todo
        const todoText = 'exam';
        
        // Act: Perform actions to add and mark the todo as complete
        await t
            .typeText(inputText, todoText)              // Enter text in the "exam" input field
            .click(dropdown)                          // Click on the dropdown to open it
            .click(dropdown.find('option').withText('Tuesday')) // Select "Tuesday" from the dropdown
            .click(addButton)                         // Click the "Add" button to add the todo
            .expect(Selector('.todo-item').withText(todoText).exists).ok('Todo item was not added') // Check if the todo was added
            .click(Selector('.todo-item').withText(todoText).find('button').withText('Complete')); // Click "Complete" button
    
        // Assert: Verify the completed class on the inner <span>
        const completedTodoText = Selector('.todo-item')
            .withText(todoText)
            .find('span'); // Target the <span> holding the todo title text
    
        await t.expect(completedTodoText.hasClass('completed')).ok('The completed class was not applied to the todo item');
    
        // Optional: Verify if strikethrough (line-through) style is applied
        const todoTextDecoration = await completedTodoText.getStyleProperty('text-decoration');
        await t.expect(todoTextDecoration).contains('line-through', 'Strikethrough was not applied to the todo item');
    });

    