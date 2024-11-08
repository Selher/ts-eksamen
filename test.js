import { Selector } from 'testcafe';

fixture('Testing Hover Effect on Button')
    .page('https://test.salher01.dk/todo/');  

  

test('Should interact with form and see button hover effect', async t => {
  // Arrange: Prepare the test scenario
  const inputText = Selector('#todo-input'); 
  const dropdown = Selector('#todo-day');  
  const addButton = Selector('button').withText('Add'); 

  // Act: Perform the actions
  await t
    .typeText(inputText, 'exam')              
    .click(dropdown)                          
    .click(dropdown.find('option').withText('Tuesday')) 
    .hover(addButton)                         
    .click(addButton);                       

  // Assert: Verify the expected outcome (optional based on your actual testing goal)
  
  const buttonBackgroundColor = await addButton.getStyleProperty('background-color');
  
});

    
    test('Check h1 rotation animation', async t => {
        // Arrange: Set up the h1 element and capture the initial rotation
        const h1 = Selector('h1');  
        const initialTransform = await h1.getStyleProperty('transform');
    
        // Act: Wait for the animation to be triggered (e.g., on page load )
        await t.wait(500);  
        const rotatedTransform = await h1.getStyleProperty('transform');
    
        
    });

   test('Should add a todo and mark it as complete with strikethrough', async t => {
    // Arrange: Set up the test elements
    const inputText = Selector('#todo-input'); 
    const dropdown = Selector('#todo-day'); 
    const addButton = Selector('button').withText('Add'); 
    const todoText = 'exam';
    
    // Act: Perform actions to add and mark the todo as complete
    await t
        .typeText(inputText, todoText)              
        .click(dropdown)                          
        .click(dropdown.find('option').withText('Tuesday')) 
        .click(addButton)                         
        .expect(Selector('.todo-item').withText(todoText).exists).ok('Todo item was not added') 
        .click(Selector('.todo-item').withText(todoText).find('button').withText('Complete')); 

    // Assert: Verify the completed class on the inner <span>
    const completedTodoText = Selector('.todo-item')
        .withText(todoText)
        .find('span'); // Target the <span> holding the todo title text

    await t.expect(completedTodoText.hasClass('completed')).ok('The completed class was not applied to the todo item');

    // Verify if strikethrough (line-through) style is applied
    const todoTextDecoration = await completedTodoText.getStyleProperty('text-decoration');
    await t.expect(todoTextDecoration).contains('line-through', 'Strikethrough was not applied to the todo item');
});

    