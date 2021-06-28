import React, {useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function TodoList() {
    const[todos, setTodos] = useState([])
    // здесь хранится массив наших тудушек
    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }
        const newTodos = [todo, ...todos]
        // проверка не дает вводить пустой массив, и вырезает пробелы из строки
        // если строка валидная, то newTodos берет новую тудушку, и добавляет ее первым элементом в массив
        // а с помощью спред ...todos, позволяет хранить старые туду, уже после нового туду элемента 
        // которые мы благополучно загоняет в стейт
        setTodos(newTodos)
    }
    
    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id = todoId ? newValue : item)))
    }
        //  если новый тект не валиден, мы его не сможем добавить
        //  если же проверка успешна, он позволяет нам перезаписать value по старому id ?????
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr) 
    }
        // удаляет выбранную тудушку, и оставляет те, чьих id не совпал с выбранной


    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos)
        // тут не понял, он берет массив todo, и если id todo совпадает с ее же id, меняет состояние свойства с true на false
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
