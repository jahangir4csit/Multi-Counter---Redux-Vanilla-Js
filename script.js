// Select Dom elements
const newCounterEl = document.getElementById('counterContainer');
const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

const addCounterEl = document.getElementById('addCounter');
const resetCounterEl = document.getElementById('resetCounter');


// Action Identifier
const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const ADD_COUNTER = 'addCounter'
const RESET_COUNTER = 'resetCounter'

// Action Creator
const increment = (counterId, incrementBy)=> {
    return {
        type: INCREMENT,
        payload: {counterId: counterId, value: incrementBy}
    }
}
const decrement = (counterId, decrementBy)=> {
    return {
        type: DECREMENT,
        payload: {counterId: counterId, value: decrementBy}
    }
}

const addCounter = ()=> {
    return {
        type: ADD_COUNTER
    }
}

const resetCounter = ()=> {
    return {
        type: RESET_COUNTER
    }
}

const incrementHandler = (id, incrementBy)=>{
    store.dispatch(increment(id, incrementBy));
}
const decrementHandler = (id, decrementBy)=>{
    store.dispatch(decrement(id, decrementBy));
}
const nextCounterId = (counters)=>{
    console.log(counters, 'Counter');
    const maxId = counters.reduce((maxId, counter)=> Math.max(counter.id, maxId), -1);
    return maxId + 1;
}

// Initial State
const initialState = [
    {
        id: 0,
        value: 0,
        incrementBy: 1,
        decrementBy: 1
    }
]


// Create reducer function
function counterReducer(state = initialState, action){

    if(action.type === ADD_COUNTER){
        return [
            ...state,
            {
                id: nextCounterId(state),
                value: 0,
                incrementBy: Math.floor(Math.random() * 10) + 1,
                decrementBy: Math.floor(Math.random() * 10) + 1
            }
        ]
    }
    if(action.type === RESET_COUNTER){
        return state.map((counter)=>{
            return {
                ...counter,
                value: 0
            }
        })
    }
    
    if(action.type === INCREMENT){
        const {counterId, value} = action.payload;
        return state.map((counter)=>{
            if(counter.id === counterId){
                return {
                    ...counter,
                    value: counter.value + value
                }
            }
            return {
                ...counter
            }
        })
    }

    if(action.type === DECREMENT){
        const {counterId, value} = action.payload;
        return state.map((counter)=>{
            if(counter.id === counterId){
                return {
                    ...counter,
                    value: counter.value - value
                }
            }
            return {
                ...counter
            }
        })
    }

    return [...state]

}

//create store

const store = Redux.createStore(counterReducer);


const render = ()=>{
    // current state
    const state = store.getState();

    let countersMarkup = "";

    state.forEach((counter) => {
        countersMarkup += `<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
        <div id="counter" class="text-2xl font-semibold">${counter.value}</div>
        <div class="flex space-x-3">
            <button
                class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                id="increment" onclick="incrementHandler(${counter.id}, ${counter.incrementBy})"
            >
                Increment
            </button>
            <button
                class="bg-red-400 text-white px-3 py-2 rounded shadow"
                id="decrement" onClick="decrementHandler(${counter.id}, ${counter.decrementBy})"
            >
                Decrement
            </button>
        </div>
    </div>`
    });

    newCounterEl.innerHTML = countersMarkup;
}

render();
store.subscribe(render);


// Button click event listeners

addCounterEl.addEventListener('click', ()=>{
    store.dispatch(addCounter())
});
resetCounterEl.addEventListener('click', ()=>{
    store.dispatch(resetCounter())
});
