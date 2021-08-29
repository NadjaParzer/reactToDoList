import { FilterValuesType, TaskStateType } from './../App';
import { ActionType, RemoveTodoListAC, todolistsReducer, AddTodoListAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC } from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListsType} from '../App';
import { title } from 'process';
import { tasksReducer } from './tasks-reducer';

test('correct todolist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: Array<TodoListsType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
 
    let newTodolistTitle = "New Todolist";
 
    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
 
    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))
 
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
 });


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListsType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

 


 test('correct filter of todolist should be changed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newFilter: FilterValuesType = "completed";

   const startState: Array<TodoListsType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,newFilter ));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListsType> = [];
 
    const action = AddTodoListAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
 });
 

 test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
 
    const action = RemoveTodoListAC("todolistId2");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });
 