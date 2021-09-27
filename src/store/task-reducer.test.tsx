import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, setTasksTC, tasksReducer} from './tasks-reducer';
import {TaskStateType} from '../App';
import { AddTodoListAC, RemoveTodoListAC, SetTodolistsAC } from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../api/todolistsAPI';

let startState: TaskStateType

beforeEach( () => {
   startState = {
        "todolistId1": [
            { id: "1", title: "CSS", todoListId: "todolistId1", status: TaskStatuses.New, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "JS", todoListId: "todolistId1", status: TaskStatuses.Completed, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low  },
            { id: "3", title: "React", todoListId: "todolistId1", status: TaskStatuses.New, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            { id: "1", title: "bread", todoListId: "todolistId2", status: TaskStatuses.New, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk",todoListId: "todolistId2", status: TaskStatuses.Completed, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "tea", todoListId: "todolistId2", status: TaskStatuses.New, description: '', startDate:'', deadline: '', addedDate:'', order: 0, priority: TaskPriorities.Low}
        ]
     };
})


test('correct task should be deleted from correct array', () => {
    
    const action = RemoveTaskAC("2", "todolistId2");
   
    const endState = tasksReducer(startState, action)
 
   expect(endState).toEqual({
    "todolistId1": [
        { id: "1", title: "CSS", status: false },
        { id: "2", title: "JS", status: true },
        { id: "3", title: "React", status: false }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: false },
        { id: "3", title: "tea", status: false }
    ]
 });
 });

 test('correct task should be added to correct array', () => {

    const action = AddTaskAC("juce", "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
 
    const action = ChangeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  });


  test('title of specified task should be changed', () => {
 
    const action = ChangeTaskTitleAC("2", "go to sleep", "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].title).toBe("go to sleep");
  });


  test('new array should be added when new todolist is added', () => {
 
    const action = AddTodoListAC("new todolist");
 
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
 });

 test('property with todolistId should be deleted', () => {
 
    const action = RemoveTodoListAC("todolistId2");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });

 test('empty arrays should be added when we set todolists', () => {
 
    const action = SetTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 1', order: 0, addedDate: ''},
    ]);
 
    const endState = tasksReducer({}, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
 });

 test('tasks should be added for todolist', () => {
 
    const action = setTasksTC(startState["todolistId1"], "todolistId1");
 
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)
 
 
    const keys = Object.keys(endState);
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
 });


 

 
 