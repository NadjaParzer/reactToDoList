import { TaskStateType } from './../App';
import { ActionType, RemoveTodoListAC, todolistsReducer, AddTodoListAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC, TodolistDomainType, FilterValuesType, SetTodolistsAC } from './todolists-reducer';
import {v1} from 'uuid';
import { tasksReducer } from './tasks-reducer';

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType> 

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
    { id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate:'' },
    { id: todolistId2, title: "What to buy", filter: "all",  order: 0, addedDate:'' }
    ]
})

test('correct todolist should be removed', () => {

   const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
 
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle))
 
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
 });


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

 


 test('correct filter of todolist should be changed', () => {

   let newFilter: FilterValuesType = "completed";

   const startState: Array<TodolistDomainType> = [
       {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate:''},
       {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate:''}
   ]

   const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,newFilter ));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
 
    const action = AddTodoListAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
 });

 test('todolists should be setted', () => {
 
    const action = SetTodolistsAC(startState);
 
    const endState = todolistsReducer([], action)
 
    expect(endState.length).toBe(2);
 });
 

