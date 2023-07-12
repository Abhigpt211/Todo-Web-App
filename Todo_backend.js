const express = require('express')
const app = express();

app.use(express.json())

let todos = []

// Get all todos
app.get('/', (req, res)=>{
    res.json(todos)
})

//Add a new todo
app.post('/add', (req, res)=>{
    const {task} = req.body
    if(!task){
        res.status(404).json({error: 'Task is required'});
    } else{
        const newTodo = {id: Date.now().toString(), task}
        todos.push(newTodo)
        res.json({msg: 'Todo created successfully', data:todos})
    }
})

//Update a Todo
app.put('/update/:id', (req,res)=>{
   const {id} = req.params 
   const {task} = req.body
   const todo = todos.find((todo)=> todo.id === id)
   if(!todo){
    res.status(404).json({error: 'Todo not found'})
   }     
 
    else if(!task){
    console.log(task)
    res.status(404).json({error: 'Task is required'})
   }   

   else {
    todo.task = task
    res.json({msg: 'Todo updated successfully', data: todos})
   }
})

//Delete a todo
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params
    const index = todos.findIndex((todo)=> todo.id === id)
    if(!index){
        res.status(404).json({error: 'Todo not found'})
    } else {
        todos.splice(index, 1)
        res.json({msg: 'Todo deleted ', data: todos})
    }
})


app.listen(3009, ()=>{
    console.log('Server running at port 3014')
})