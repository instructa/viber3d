<page>
  <title>Introduction - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/getting-started/introduction</url>
  <content>How to use Zustand

A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.

Don't disregard it because it's cute, it has claws! Lots of time was spent to deal with common pitfalls, like the dreaded [zombie child problem](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children), [React concurrency](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md), and [context loss](https://github.com/facebook/react/issues/13332) between mixed renderers. It may be the one state manager in the React space that gets all of these right.

You can try a live demo [here](https://codesandbox.io/s/dazzling-moon-itop4).

[

Installation
------------

](#installation)

Zustand is available as a package on NPM for use:

    # NPM
    npm install zustand
    # Or, use any package manager of your choice.
    

[

First create a store
--------------------

](#first-create-a-store)

Your store is a hook! You can put anything in it: primitives, objects, functions. The `set` function _merges_ state.

    import { create } from 'zustand'
    
    const useStore = create((set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      updateBears: (newBears) => set({ bears: newBears }),
    }))
    

[

Then bind your components, and that's it!
-----------------------------------------

](#then-bind-your-components,-and-that's-it!)

You can use the hook anywhere, without the need of providers. Select your state and the consuming component will re-render when that state changes.

    function BearCounter() {
      const bears = useStore((state) => state.bears)
      return <h1>{bears} around here...</h1>
    }
    
    function Controls() {
      const increasePopulation = useStore((state) => state.increasePopulation)
      return <button onClick={increasePopulation}>one up</button>
    }</content>
</page>

<page>
  <title>Comparison - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/getting-started/comparison</url>
  <content>How Zustand stacks up against similar libraries

Zustand is one of many state management libraries for React. On this page we will discuss Zustand in comparison to some of these libraries, including Redux, Valtio, Jotai, and Recoil.

Each library has its own strengths and weaknesses, and we will compare key differences and similarities between each.

[

Redux
-----

](#redux)[

### State Model (vs Redux)

](#state-model-\(vs-redux\))

Conceptually, Zustand and Redux are quite similar, both are based on an immutable state model. However, Redux requires your app to be wrapped in context providers; Zustand does not.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      increment: (qty: number) => void
      decrement: (qty: number) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      increment: (qty: number) => set((state) => ({ count: state.count + qty })),
      decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
    }))
    

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      increment: (qty: number) => void
      decrement: (qty: number) => void
    }
    
    type Action = {
      type: keyof Actions
      qty: number
    }
    
    const countReducer = (state: State, action: Action) => {
      switch (action.type) {
        case 'increment':
          return { count: state.count + action.qty }
        case 'decrement':
          return { count: state.count - action.qty }
        default:
          return state
      }
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      dispatch: (action: Action) => set((state) => countReducer(state, action)),
    }))
    

**Redux**

    import { createStore } from 'redux'
    import { useSelector, useDispatch } from 'react-redux'
    
    type State = {
      count: number
    }
    
    type Action = {
      type: 'increment' | 'decrement'
      qty: number
    }
    
    const countReducer = (state: State, action: Action) => {
      switch (action.type) {
        case 'increment':
          return { count: state.count + action.qty }
        case 'decrement':
          return { count: state.count - action.qty }
        default:
          return state
      }
    }
    
    const countStore = createStore(countReducer)
    

    import { createSlice, configureStore } from '@reduxjs/toolkit'
    
    const countSlice = createSlice({
      name: 'count',
      initialState: { value: 0 },
      reducers: {
        incremented: (state, qty: number) => {
          // Redux Toolkit does not mutate the state, it uses the Immer library
          // behind scenes, allowing us to have something called "draft state".
          state.value += qty
        },
        decremented: (state, qty: number) => {
          state.value -= qty
        },
      },
    })
    
    const countStore = configureStore({ reducer: countSlice.reducer })
    

[

### Render Optimization (vs Redux)

](#render-optimization-\(vs-redux\))

When it comes to render optimizations within your app, there are no major differences in approach between Zustand and Redux. In both libraries it is recommended that you manually apply render optimizations by using selectors.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      increment: (qty: number) => void
      decrement: (qty: number) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      increment: (qty: number) => set((state) => ({ count: state.count + qty })),
      decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
    }))
    
    const Component = () => {
      const count = useCountStore((state) => state.count)
      const increment = useCountStore((state) => state.increment)
      const decrement = useCountStore((state) => state.decrement)
      // ...
    }
    

**Redux**

    import { createStore } from 'redux'
    import { useSelector, useDispatch } from 'react-redux'
    
    type State = {
      count: number
    }
    
    type Action = {
      type: 'increment' | 'decrement'
      qty: number
    }
    
    const countReducer = (state: State, action: Action) => {
      switch (action.type) {
        case 'increment':
          return { count: state.count + action.qty }
        case 'decrement':
          return { count: state.count - action.qty }
        default:
          return state
      }
    }
    
    const countStore = createStore(countReducer)
    
    const Component = () => {
      const count = useSelector((state) => state.count)
      const dispatch = useDispatch()
      // ...
    }
    

    import { useSelector } from 'react-redux'
    import type { TypedUseSelectorHook } from 'react-redux'
    import { createSlice, configureStore } from '@reduxjs/toolkit'
    
    const countSlice = createSlice({
      name: 'count',
      initialState: { value: 0 },
      reducers: {
        incremented: (state, qty: number) => {
          // Redux Toolkit does not mutate the state, it uses the Immer library
          // behind scenes, allowing us to have something called "draft state".
          state.value += qty
        },
        decremented: (state, qty: number) => {
          state.value -= qty
        },
      },
    })
    
    const countStore = configureStore({ reducer: countSlice.reducer })
    
    const useAppSelector: TypedUseSelectorHook<typeof countStore.getState> =
      useSelector
    
    const useAppDispatch: () => typeof countStore.dispatch = useDispatch
    
    const Component = () => {
      const count = useAppSelector((state) => state.count.value)
      const dispatch = useAppDispatch()
      // ...
    }
    

[

Valtio
------

](#valtio)[

### State Model (vs Valtio)

](#state-model-\(vs-valtio\))

Zustand and Valtio approach state management in a fundamentally different way. Zustand is based on the **immutable** state model, while Valtio is based on the **mutable** state model.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      obj: { count: number }
    }
    
    const store = create<State>(() => ({ obj: { count: 0 } }))
    
    store.setState((prev) => ({ obj: { count: prev.obj.count + 1 } }))
    

**Valtio**

    import { proxy } from 'valtio'
    
    const state = proxy({ obj: { count: 0 } })
    
    state.obj.count += 1
    

[

### Render Optimization (vs Valtio)

](#render-optimization-\(vs-valtio\))

The other difference between Zustand and Valtio is Valtio makes render optimizations through property access. However, with Zustand, it is recommended that you manually apply render optimizations by using selectors.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    const useCountStore = create<State>(() => ({
      count: 0,
    }))
    
    const Component = () => {
      const count = useCountStore((state) => state.count)
      // ...
    }
    

**Valtio**

    import { proxy, useSnapshot } from 'valtio'
    
    const state = proxy({
      count: 0,
    })
    
    const Component = () => {
      const { count } = useSnapshot(state)
      // ...
    }
    

[

Jotai
-----

](#jotai)[

### State Model (vs Jotai)

](#state-model-\(vs-jotai\))

There is one major difference between Zustand and Jotai. Zustand is a single store, while Jotai consists of primitive atoms that can be composed together.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      updateCount: (
        countCallback: (count: State['count']) => State['count'],
      ) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      updateCount: (countCallback) =>
        set((state) => ({ count: countCallback(state.count) })),
    }))
    

**Jotai**

    import { atom } from 'jotai'
    
    const countAtom = atom<number>(0)
    

[

### Render Optimization (vs Jotai)

](#render-optimization-\(vs-jotai\))

Jotai achieves render optimizations through atom dependency. However, with Zustand it is recommended that you manually apply render optimizations by using selectors.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      updateCount: (
        countCallback: (count: State['count']) => State['count'],
      ) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      updateCount: (countCallback) =>
        set((state) => ({ count: countCallback(state.count) })),
    }))
    
    const Component = () => {
      const count = useCountStore((state) => state.count)
      const updateCount = useCountStore((state) => state.updateCount)
      // ...
    }
    

**Jotai**

    import { atom, useAtom } from 'jotai'
    
    const countAtom = atom<number>(0)
    
    const Component = () => {
      const [count, updateCount] = useAtom(countAtom)
      // ...
    }
    

[

Recoil
------

](#recoil)[

### State Model (vs Recoil)

](#state-model-\(vs-recoil\))

The difference between Zustand and Recoil is similar to that between Zustand and Jotai. Recoil depends on atom string keys instead of atom object referential identities. Additionally, Recoil needs to wrap your app in a context provider.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      setCount: (countCallback: (count: State['count']) => State['count']) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      setCount: (countCallback) =>
        set((state) => ({ count: countCallback(state.count) })),
    }))
    

**Recoil**

    import { atom } from 'recoil'
    
    const count = atom({
      key: 'count',
      default: 0,
    })
    

[

### Render Optimization (vs Recoil)

](#render-optimization-\(vs-recoil\))

Similar to previous optimization comparisons, Recoil makes render optimizations through atom dependency. Whereas with Zustand, it is recommended that you manually apply render optimizations by using selectors.

**Zustand**

    import { create } from 'zustand'
    
    type State = {
      count: number
    }
    
    type Actions = {
      setCount: (countCallback: (count: State['count']) => State['count']) => void
    }
    
    const useCountStore = create<State & Actions>((set) => ({
      count: 0,
      setCount: (countCallback) =>
        set((state) => ({ count: countCallback(state.count) })),
    }))
    
    const Component = () => {
      const count = useCountStore((state) => state.count)
      const setCount = useCountStore((state) => state.setCount)
      // ...
    }
    

**Recoil**

    import { atom, useRecoilState } from 'recoil'
    
    const countAtom = atom({
      key: 'count',
      default: 0,
    })
    
    const Component = () => {
      const [count, setCount] = useRecoilState(countAtom)
      // ...
    }
    

[

Npm Downloads Trend
-------------------

](#npm-downloads-trend)

*   [Npm Downloads Trend of State Management Libraries for React](https://npm-stat.com/charts.html?package=zustand&package=jotai&package=valtio&package=%40reduxjs%2Ftoolkit&package=recoil)</content>
</page>

<page>
  <title>Immer middleware - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/integrations/immer-middleware</url>
  <content>The [Immer](https://github.com/immerjs/immer) middleware enables you to use immutable state in a more convenient way. Also, with Immer, you can simplify handling immutable data structures in Zustand.

[

Installation
------------

](#installation)

In order to use the Immer middleware in Zustand, you will need to install Immer as a direct dependency.

[

Usage
-----

](#usage)

(Notice the extra parentheses after the type parameter as mentioned in the [Typescript Guide](https://zustand.docs.pmnd.rs/guides/typescript)).

Updating simple states

    import { create } from 'zustand'
    import { immer } from 'zustand/middleware/immer'
    
    type State = {
      count: number
    }
    
    type Actions = {
      increment: (qty: number) => void
      decrement: (qty: number) => void
    }
    
    export const useCountStore = create<State & Actions>()(
      immer((set) => ({
        count: 0,
        increment: (qty: number) =>
          set((state) => {
            state.count += qty
          }),
        decrement: (qty: number) =>
          set((state) => {
            state.count -= qty
          }),
      })),
    )
    

Updating complex states

    import { create } from 'zustand'
    import { immer } from 'zustand/middleware/immer'
    
    interface Todo {
      id: string
      title: string
      done: boolean
    }
    
    type State = {
      todos: Record<string, Todo>
    }
    
    type Actions = {
      toggleTodo: (todoId: string) => void
    }
    
    export const useTodoStore = create<State & Actions>()(
      immer((set) => ({
        todos: {
          '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
            id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
            title: 'Learn Zustand',
            done: false,
          },
          '354ee16c-bfdd-44d3-afa9-e93679bda367': {
            id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
            title: 'Learn Jotai',
            done: false,
          },
          '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
            id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
            title: 'Learn Valtio',
            done: false,
          },
          '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
            id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
            title: 'Learn Signals',
            done: false,
          },
        },
        toggleTodo: (todoId: string) =>
          set((state) => {
            state.todos[todoId].done = !state.todos[todoId].done
          }),
      })),
    )
    

[

Gotchas
-------

](#gotchas)

In this section you will find some things that you need to keep in mind when using Zustand with Immer.

[

### My subscriptions aren't being called

](#my-subscriptions-aren't-being-called)

If you are using Immer, make sure you are actually following [the rules of Immer](https://immerjs.github.io/immer/pitfalls).

For example, you have to add `[immerable] = true` for [class objects](https://immerjs.github.io/immer/complex-objects) to work. If you don't do this, Immer will still mutate the object, but not as a proxy, so it will also update the current state. Zustand checks if the state has actually changed, so since both the current state and the next state are equal (if you don't do it correctly), Zustand will skip calling the subscriptions.

[

CodeSandbox Demo
----------------

](#codesandbox-demo)

*   [Basic](https://codesandbox.io/p/sandbox/zustand-updating-draft-states-basic-demo-forked-96mkdw),
*   [Advanced](https://codesandbox.io/p/sandbox/zustand-updating-draft-states-advanced-demo-forked-phkzzg).</content>
</page>

<page>
  <title>Tutorial: Tic-Tac-Toe - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/tutorial-tic-tac-toe</url>
  <content>Building a game

[

Building a game
---------------

](#building-a-game)

You will build a small tic-tac-toe game during this tutorial. This tutorial does assume existing React knowledge. The techniques you'll learn in the tutorial are fundamental to building any React app, and fully understanding it will give you a deep understanding of React and Zustand.

This tutorial is crafted for those who learn best through hands-on experience and want to swiftly create something tangible. It draws inspiration from React's tic-tac-toe tutorial.

The tutorial is divided into several sections:

*   Setup for the tutorial will give you a starting point to follow the tutorial.
*   Overview will teach you the fundamentals of React: components, props, and state.
*   Completing the game will teach you the most common techniques in React development.
*   Adding time travel will give you a deeper insight into the unique strengths of React.

[

### What are you building?

](#what-are-you-building?)

In this tutorial, you'll build an interactive tic-tac-toe game with React and Zustand.

You can see what it will look like when you're finished here:

    import { create } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    const useGameStore = create(
      combine(
        {
          history: [Array(9).fill(null)],
          currentMove: 0,
        },
        (set, get) => {
          return {
            setHistory: (nextHistory) => {
              set((state) => ({
                history:
                  typeof nextHistory === 'function'
                    ? nextHistory(state.history)
                    : nextHistory,
              }))
            },
            setCurrentMove: (nextCurrentMove) => {
              set((state) => ({
                currentMove:
                  typeof nextCurrentMove === 'function'
                    ? nextCurrentMove(state.currentMove)
                    : nextCurrentMove,
              }))
            },
          }
        },
      ),
    )
    
    function Square({ value, onSquareClick }) {
      return (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            backgroundColor: '#fff',
            border: '1px solid #999',
            outline: 0,
            borderRadius: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          onClick={onSquareClick}
        >
          {value}
        </button>
      )
    }
    
    function Board({ xIsNext, squares, onPlay }) {
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        onPlay(nextSquares)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((_, i) => (
              <Square
                key={`square-${i}`}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
              />
            ))}
          </div>
        </>
      )
    }
    
    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const currentMove = useGameStore((state) => state.currentMove)
      const setCurrentMove = useGameStore((state) => state.setCurrentMove)
      const xIsNext = currentMove % 2 === 0
      const currentSquares = history[currentMove]
    
      function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
      }
    
      function jumpTo(nextMove) {
        setCurrentMove(nextMove)
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>
              {history.map((_, historyIndex) => {
                const description =
                  historyIndex > 0
                    ? `Go to move #${historyIndex}`
                    : 'Go to game start'
    
                return (
                  <li key={historyIndex}>
                    <button onClick={() => jumpTo(historyIndex)}>
                      {description}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      )
    }
    
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
    
      return null
    }
    
    function calculateTurns(squares) {
      return squares.filter((square) => !square).length
    }
    
    function calculateStatus(winner, turns, player) {
      if (!winner && !turns) return 'Draw'
      if (winner) return `Winner ${winner}`
      return `Next player: ${player}`
    }
    

[

### Building the board

](#building-the-board)

Let's start by creating the `Square` component, which will be a building block for our `Board` component. This component will represent each square in our game.

The `Square` component should take `value` and `onSquareClick` as props. It should return a `<button>` element, styled to look like a square. The button displays the value prop, which can be `'X'`, `'O'`, or `null`, depending on the game's state. When the button is clicked, it triggers the `onSquareClick` function passed in as a prop, allowing the game to respond to user input.

Here's the code for the `Square` component:

    function Square({ value, onSquareClick }) {
      return (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            backgroundColor: '#fff',
            border: '1px solid #999',
            outline: 0,
            borderRadius: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          onClick={onSquareClick}
        >
          {value}
        </button>
      )
    }
    

Let's move on to creating the Board component, which will consist of 9 squares arranged in a grid. This component will serve as the main playing area for our game.

The `Board` component should return a `<div>` element styled as a grid. The grid layout is achieved using CSS Grid, with three columns and three rows, each taking up an equal fraction of the available space. The overall size of the grid is determined by the width and height properties, ensuring that it is square-shaped and appropriately sized.

Inside the grid, we place nine Square components, each with a value prop representing its position. These Square components will eventually hold the game symbols (`'X'` or `'O'`) and handle user interactions.

Here's the code for the `Board` component:

    export default function Board() {
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            width: 'calc(3 * 2.5rem)',
            height: 'calc(3 * 2.5rem)',
            border: '1px solid #999',
          }}
        >
          <Square value="1" />
          <Square value="2" />
          <Square value="3" />
          <Square value="4" />
          <Square value="5" />
          <Square value="6" />
          <Square value="7" />
          <Square value="8" />
          <Square value="9" />
        </div>
      )
    }
    

This Board component sets up the basic structure for our game board by arranging nine squares in a 3x3 grid. It positions the squares neatly, providing a foundation for adding more features and handling player interactions in the future.

[

### Lifting state up

](#lifting-state-up)

Each `Square` component could maintain a part of the game's state. To check for a winner in a tic-tac-toe game, the `Board` component would need to somehow know the state of each of the 9 `Square` components.

How would you approach that? At first, you might guess that the `Board` component needs to ask each `Square` component for that `Square`'s component state. Although this approach is technically possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game's state in the parent `Board` component instead of in each `Square` component. The `Board` component can tell each `Square` component what to display by passing a prop, like you did when you passed a number to each `Square` component.

To collect data from multiple children, or to have two or more child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.

Let's take this opportunity to try it out. Edit the `Board` component so that it declares a state variable named squares that defaults to an array of 9 nulls corresponding to the 9 squares:

    import { create } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    const useGameStore = create(
      combine({ squares: Array(9).fill(null) }, (set) => {
        return {
          setSquares: (nextSquares) => {
            set((state) => ({
              squares:
                typeof nextSquares === 'function'
                  ? nextSquares(state.squares)
                  : nextSquares,
            }))
          },
        }
      }),
    )
    
    export default function Board() {
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
    
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            width: 'calc(3 * 2.5rem)',
            height: 'calc(3 * 2.5rem)',
            border: '1px solid #999',
          }}
        >
          {squares.map((square, squareIndex) => (
            <Square key={squareIndex} value={square} />
          ))}
        </div>
      )
    }
    

`Array(9).fill(null)` creates an array with nine elements and sets each of them to `null`. The `useGameStore` declares a `squares` state that's initially set to that array. Each entry in the array corresponds to the value of a square. When you fill the board in later, the squares array will look like this:

    const squares = ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
    

Each Square will now receive a `value` prop that will either be `'X'`, `'O'`, or `null` for empty squares.

Next, you need to change what happens when a `Square` component is clicked. The `Board` component now maintains which squares are filled. You'll need to create a way for the `Square` component to update the `Board`'s component state. Since state is private to a component that defines it, you cannot update the `Board`'s component state directly from `Square` component.

Instead, you'll pass down a function from the Board component to the `Square` component, and you'll have `Square` component call that function when a square is clicked. You'll start with the function that the `Square` component will call when it is clicked. You'll call that function `onSquareClick`:

Now you'll connect the `onSquareClick` prop to a function in the `Board` component that you'll name `handleClick`. To connect `onSquareClick` to `handleClick` you'll pass an inline function to the `onSquareClick` prop of the first Square component:

    <Square key={squareIndex} value={square} onSquareClick={() => handleClick(i)} />
    

Lastly, you will define the `handleClick` function inside the `Board` component to update the squares array holding your board's state.

The `handleClick` function should take the index of the square to update and create a copy of the `squares` array (`nextSquares`). Then, `handleClick` updates the `nextSquares` array by adding `X` to the square at the specified index (`i`) if is not already filled.

    export default function Board() {
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
    
      function handleClick(i) {
        if (squares[i]) return
        const nextSquares = squares.slice()
        nextSquares[i] = 'X'
        setSquares(nextSquares)
      }
    
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            width: 'calc(3 * 2.5rem)',
            height: 'calc(3 * 2.5rem)',
            border: '1px solid #999',
          }}
        >
          {squares.map((square, squareIndex) => (
            <Square
              key={squareIndex}
              value={square}
              onSquareClick={() => handleClick(squareIndex)}
            />
          ))}
        </div>
      )
    }
    

Note how in `handleClick` function, you call `.slice()` to create a copy of the squares array instead of modifying the existing array.

[

### Taking turns

](#taking-turns)

It's now time to fix a major defect in this tic-tac-toe game: the `'O'`s cannot be used on the board.

You'll set the first move to be `'X'` by default. Let's keep track of this by adding another piece of state to the `useGameStore` hook:

    const useGameStore = create(
      combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
        return {
          setSquares: (nextSquares) => {
            set((state) => ({
              squares:
                typeof nextSquares === 'function'
                  ? nextSquares(state.squares)
                  : nextSquares,
            }))
          },
          setXIsNext: (nextXIsNext) => {
            set((state) => ({
              xIsNext:
                typeof nextXIsNext === 'function'
                  ? nextXIsNext(state.xIsNext)
                  : nextXIsNext,
            }))
          },
        }
      }),
    )
    

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine which player goes next and the game's state will be saved. You'll update the Board's `handleClick` function to flip the value of `xIsNext`:

    export default function Board() {
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
      const player = xIsNext ? 'X' : 'O'
    
      function handleClick(i) {
        if (squares[i]) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
      }
    
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            width: 'calc(3 * 2.5rem)',
            height: 'calc(3 * 2.5rem)',
            border: '1px solid #999',
          }}
        >
          {squares.map((square, squareIndex) => (
            <Square
              key={squareIndex}
              value={square}
              onSquareClick={() => handleClick(squareIndex)}
            />
          ))}
        </div>
      )
    }
    

[

### Declaring a winner or draw

](#declaring-a-winner-or-draw)

Now that the players can take turns, you'll want to show when the game is won or drawn and there are no more turns to make. To do this you'll add three helper functions. The first helper function called `calculateWinner` that takes an array of 9 squares, checks for a winner and returns `'X'`, `'O'`, or `null` as appropriate. The second helper function called `calculateTurns` that takes the same array, checks for remaining turns by filtering out only `null` items, and returns the count of them. The last helper called `calculateStatus` that takes the remaining turns, the winner, and the current player (`'X' or 'O'`):

    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
    
      return null
    }
    
    function calculateTurns(squares) {
      return squares.filter((square) => !square).length
    }
    
    function calculateStatus(winner, turns, player) {
      if (!winner && !turns) return 'Draw'
      if (winner) return `Winner ${winner}`
      return `Next player: ${player}`
    }
    

You will use the result of `calculateWinner(squares)` in the Board component's `handleClick` function to check if a player has won. You can perform this check at the same time you check if a user has clicked a square that already has a `'X'` or and `'O'`. We'd like to return early in both cases:

    function handleClick(i) {
      if (squares[i] || winner) return
      const nextSquares = squares.slice()
      nextSquares[i] = player'
      setSquares(nextSquares)
      setXIsNext(!xIsNext)
    }
    

To let the players know when the game is over, you can display text such as `'Winner: X'` or `'Winner: O'`. To do that you'll add a `status` section to the `Board` component. The status will display the winner or draw if the game is over and if the game is ongoing you'll display which player's turn is next:

    export default function Board() {
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </>
      )
    }
    

Congratulations! You now have a working tic-tac-toe game. And you've just learned the basics of React and Zustand too. So you are the real winner here. Here is what the code should look like:

    import { create } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    const useGameStore = create(
      combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
        return {
          setSquares: (nextSquares) => {
            set((state) => ({
              squares:
                typeof nextSquares === 'function'
                  ? nextSquares(state.squares)
                  : nextSquares,
            }))
          },
          setXIsNext: (nextXIsNext) => {
            set((state) => ({
              xIsNext:
                typeof nextXIsNext === 'function'
                  ? nextXIsNext(state.xIsNext)
                  : nextXIsNext,
            }))
          },
        }
      }),
    )
    
    function Square({ value, onSquareClick }) {
      return (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            backgroundColor: '#fff',
            border: '1px solid #999',
            outline: 0,
            borderRadius: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          onClick={onSquareClick}
        >
          {value}
        </button>
      )
    }
    
    export default function Board() {
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </>
      )
    }
    
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
    
      return null
    }
    
    function calculateTurns(squares) {
      return squares.filter((square) => !square).length
    }
    
    function calculateStatus(winner, turns, player) {
      if (!winner && !turns) return 'Draw'
      if (winner) return `Winner ${winner}`
      return `Next player: ${player}`
    }
    

[

### Adding time travel

](#adding-time-travel)

As a final exercise, let's make it possible to “go back in time” and revisit previous moves in the game.

If you had directly modified the squares array, implementing this time-travel feature would be very difficult. However, since you used `slice()` to create a new copy of the squares array after every move, treating it as immutable, you can store every past version of the squares array and navigate between them.

You'll keep track of these past squares arrays in a new state variable called `history`. This `history` array will store all board states, from the first move to the latest one, and will look something like this:

    const history = [
      // First move
      [null, null, null, null, null, null, null, null, null],
      // Second move
      ['X', null, null, null, null, null, null, null, null],
      // Third move
      ['X', 'O', null, null, null, null, null, null, null],
      // and so on...
    ]
    

This approach allows you to easily navigate between different game states and implement the time-travel feature.

[

### Lifting state up, again

](#lifting-state-up,-again)

Next, you will create a new top-level component called `Game` to display a list of past moves. This is where you will store the `history` state that contains the entire game history.

By placing the `history` state in the `Game` component, you can remove the `squares` state from the `Board` component. You will now lift the state up from the `Board` component to the top-level `Game` component. This change allows the `Game` component to have full control over the `Board`'s component data and instruct the `Board` component to render previous turns from the `history`.

First, add a `Game` component with `export default` and remove it from `Board` component. Here is what the code should look like:

    function Board() {
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const squares = useGameStore((state) => state.squares)
      const setSquares = useGameStore((state) => state.setSquares)
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </>
      )
    }
    
    export default function Game() {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      )
    }
    

Add some state to the `useGameStore` hook to track the history of moves:

    const useGameStore = create(
      combine({ history: [Array(9).fill(null)], xIsNext: true }, (set) => {
        return {
          setHistory: (nextHistory) => {
            set((state) => ({
              history:
                typeof nextHistory === 'function'
                  ? nextHistory(state.history)
                  : nextHistory,
            }))
          },
          setXIsNext: (nextXIsNext) => {
            set((state) => ({
              xIsNext:
                typeof nextXIsNext === 'function'
                  ? nextXIsNext(state.xIsNext)
                  : nextXIsNext,
            }))
          },
        }
      }),
    )
    

Notice how `[Array(9).fill(null)]` creates an array with a single item, which is itself an array of 9 null values.

To render the squares for the current move, you'll need to read the most recent squares array from the `history` state. You don't need an extra state for this because you already have enough information to calculate it during rendering:

    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const currentSquares = history[history.length - 1]
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>{/*TODO*/}</ol>
          </div>
        </div>
      )
    }
    

Next, create a `handlePlay` function inside the `Game` component that will be called by the `Board` component to update the game. Pass `xIsNext`, `currentSquares` and `handlePlay` as props to the `Board` component:

    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const currentMove = useGameStore((state) => state.currentMove)
      const setCurrentMove = useGameStore((state) => state.setCurrentMove)
      const currentSquares = history[history.length - 1]
    
      function handlePlay(nextSquares) {
        // TODO
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>{/*TODO*/}</ol>
          </div>
        </div>
      )
    }
    

Let's make the `Board` component fully controlled by the props it receives. To do this, we'll modify the `Board` component to accept three props: `xIsNext`, `squares`, and a new `onPlay` function that the `Board` component can call with the updated squares array when a player makes a move.

    function Board({ xIsNext, squares, onPlay }) {
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </>
      )
    }
    

The `Board` component is now fully controlled by the props passed to it by the `Game` component. To get the game working again, you need to implement the `handlePlay` function in the `Game` component.

What should `handlePlay` do when called? Previously, the `Board` component called `setSquares` with an updated array; now it passes the updated squares array to `onPlay`.

The `handlePlay` function needs to update the `Game` component's state to trigger a re-render. Instead of using `setSquares`, you'll update the `history` state variable by appending the updated squares array as a new `history` entry. You also need to toggle `xIsNext`, just as the `Board` component used to do.

    function handlePlay(nextSquares) {
      setHistory(history.concat([nextSquares]))
      setXIsNext(!xIsNext)
    }
    

At this point, you've moved the state to live in the `Game` component, and the UI should be fully working, just as it was before the refactor. Here is what the code should look like at this point:

    import { create } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    const useGameStore = create(
      combine({ history: [Array(9).fill(null)], xIsNext: true }, (set) => {
        return {
          setHistory: (nextHistory) => {
            set((state) => ({
              history:
                typeof nextHistory === 'function'
                  ? nextHistory(state.history)
                  : nextHistory,
            }))
          },
          setXIsNext: (nextXIsNext) => {
            set((state) => ({
              xIsNext:
                typeof nextXIsNext === 'function'
                  ? nextXIsNext(state.xIsNext)
                  : nextXIsNext,
            }))
          },
        }
      }),
    )
    
    function Square({ value, onSquareClick }) {
      return (
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            backgroundColor: '#fff',
            border: '1px solid #999',
            outline: 0,
            borderRadius: 0,
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          onClick={onSquareClick}
        >
          {value}
        </button>
      )
    }
    
    function Board({ xIsNext, squares, onPlay }) {
      const winner = calculateWinner(squares)
      const turns = calculateTurns(squares)
      const player = xIsNext ? 'X' : 'O'
      const status = calculateStatus(winner, turns, player)
    
      function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        onPlay(nextSquares)
      }
    
      return (
        <>
          <div style={{ marginBottom: '0.5rem' }}>{status}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              width: 'calc(3 * 2.5rem)',
              height: 'calc(3 * 2.5rem)',
              border: '1px solid #999',
            }}
          >
            {squares.map((square, squareIndex) => (
              <Square
                key={squareIndex}
                value={square}
                onSquareClick={() => handleClick(squareIndex)}
              />
            ))}
          </div>
        </>
      )
    }
    
    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const currentSquares = history[history.length - 1]
    
      function handlePlay(nextSquares) {
        setHistory(history.concat([nextSquares]))
        setXIsNext(!xIsNext)
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>{/*TODO*/}</ol>
          </div>
        </div>
      )
    }
    
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
    
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
    
      return null
    }
    
    function calculateTurns(squares) {
      return squares.filter((square) => !square).length
    }
    
    function calculateStatus(winner, turns, player) {
      if (!winner && !turns) return 'Draw'
      if (winner) return `Winner ${winner}`
      return `Next player: ${player}`
    }
    

[

### Showing the past moves

](#showing-the-past-moves)

Since you are recording the tic-tac-toe game's history, you can now display a list of past moves to the player.

You already have an array of `history` moves in store, so now you need to transform it to an array of React elements. In JavaScript, to transform one array into another, you can use the Array `.map()` method:

You'll use `map` to transform your `history` of moves into React elements representing buttons on the screen, and display a list of buttons to **jump** to past moves. Let's `map` over the `history` in the `Game` component:

    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const currentSquares = history[history.length - 1]
    
      function handlePlay(nextSquares) {
        setHistory(history.concat([nextSquares]))
        setXIsNext(!xIsNext)
      }
    
      function jumpTo(nextMove) {
        // TODO
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>
              {history.map((_, historyIndex) => {
                const description =
                  historyIndex > 0
                    ? `Go to move #${historyIndex}`
                    : 'Go to game start'
    
                return (
                  <li key={historyIndex}>
                    <button onClick={() => jumpTo(historyIndex)}>
                      {description}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      )
    }
    

Before you can implement the `jumpTo` function, you need the `Game` component to keep track of which step the user is currently viewing. To do this, define a new state variable called `currentMove`, which will start at `0`:

    const useGameStore = create(
      combine(
        { history: [Array(9).fill(null)], currentMove: 0, xIsNext: true },
        (set) => {
          return {
            setHistory: (nextHistory) => {
              set((state) => ({
                history:
                  typeof nextHistory === 'function'
                    ? nextHistory(state.history)
                    : nextHistory,
              }))
            },
            setCurrentMove: (nextCurrentMove) => {
              set((state) => ({
                currentMove:
                  typeof nextCurrentMove === 'function'
                    ? nextCurrentMove(state.currentMove)
                    : nextCurrentMove,
              }))
            },
            setXIsNext: (nextXIsNext) => {
              set((state) => ({
                xIsNext:
                  typeof nextXIsNext === 'function'
                    ? nextXIsNext(state.xIsNext)
                    : nextXIsNext,
              }))
            },
          }
        },
      ),
    )
    

Next, update the `jumpTo` function inside `Game` component to update that `currentMove`. You’ll also set `xIsNext` to `true` if the number that you’re changing `currentMove` to is even.

    function jumpTo(nextMove) {
      setCurrentMove(nextMove)
      setXIsNext(currentMove % 2 === 0)
    }
    

You will now make two changes to the `handlePlay` function in the `Game` component, which is called when you click on a square.

*   If you "go back in time" and then make a new move from that point, you only want to keep the history up to that point. Instead of adding `nextSquares` after all items in the history (using the Array `.concat()` method), you'll add it after all items in `history.slice(0, currentMove + 1)` to keep only that portion of the old history.
*   Each time a move is made, you need to update `currentMove` to point to the latest history entry.

    function handlePlay(nextSquares) {
      const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
      setHistory(nextHistory)
      setCurrentMove(nextHistory.length - 1)
      setXIsNext(!xIsNext)
    }
    

Finally, you will modify the `Game` component to render the currently selected move, instead of always rendering the final move:

    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const currentMove = useGameStore((state) => state.currentMove)
      const setCurrentMove = useGameStore((state) => state.setCurrentMove)
      const xIsNext = useGameStore((state) => state.xIsNext)
      const setXIsNext = useGameStore((state) => state.setXIsNext)
      const currentSquares = history[currentMove]
    
      function handlePlay(nextSquares) {
        const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setXIsNext(!xIsNext)
      }
    
      function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        setXIsNext(currentMove % 2 === 0)
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>
              {history.map((_, historyIndex) => {
                const description =
                  historyIndex > 0
                    ? `Go to move #${historyIndex}`
                    : 'Go to game start'
    
                return (
                  <li key={historyIndex}>
                    <button onClick={() => jumpTo(historyIndex)}>
                      {description}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      )
    }
    

[

### Final cleanup

](#final-cleanup)

If you look closely at the code, you'll see that `xIsNext` is `true` when `currentMove` is even and `false` when `currentMove` is odd. This means that if you know the value of `currentMove`, you can always determine what `xIsNext` should be.

There's no need to store `xIsNext` separately in the state. It’s better to avoid redundant state because it can reduce bugs and make your code easier to understand. Instead, you can calculate `xIsNext` based on `currentMove`:

    export default function Game() {
      const history = useGameStore((state) => state.history)
      const setHistory = useGameStore((state) => state.setHistory)
      const currentMove = useGameStore((state) => state.currentMove)
      const setCurrentMove = useGameStore((state) => state.setCurrentMove)
      const xIsNext = currentMove % 2 === 0
      const currentSquares = history[currentMove]
    
      function handlePlay(nextSquares) {
        const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
      }
    
      function jumpTo(nextMove) {
        setCurrentMove(nextMove)
      }
    
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            fontFamily: 'monospace',
          }}
        >
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <ol>
              {history.map((_, historyIndex) => {
                const description =
                  historyIndex > 0
                    ? `Go to move #${historyIndex}`
                    : 'Go to game start'
    
                return (
                  <li key={historyIndex}>
                    <button onClick={() => jumpTo(historyIndex)}>
                      {description}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      )
    }
    

You no longer need the `xIsNext` state declaration or the calls to `setXIsNext`. Now, there’s no chance for `xIsNext` to get out of sync with `currentMove`, even if you make a mistake while coding the components.

[

### Wrapping up

](#wrapping-up)

Congratulations! You’ve created a tic-tac-toe game that:

*   Lets you play tic-tac-toe,
*   Indicates when a player has won the game or when is drawn,
*   Stores a game’s history as a game progresses,
*   Allows players to review a game’s history and see previous versions of a game’s board.

Nice work! We hope you now feel like you have a decent grasp of how React and Zustand works.</content>
</page>

<page>
  <title>createContext from zustand/context - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/previous-versions/zustand-v3-create-context</url>
  <content>A special `createContext` is provided since v3.5, which avoids misusing the store hook.

> **Note**: This function is deprecated in v4 and will be removed in v5. See [Migration](#migration).

    import create from 'zustand'
    import createContext from 'zustand/context'
    
    const { Provider, useStore } = createContext()
    
    const createStore = () => create(...)
    
    const App = () => (
      <Provider createStore={createStore}>
        ...
      </Provider>
    )
    
    const Component = () => {
      const state = useStore()
      const slice = useStore(selector)
      ...
    

[

createContext usage in real components
--------------------------------------

](#createcontext-usage-in-real-components)

    import create from "zustand";
    import createContext from "zustand/context";
    
    // Best practice: You can move the below createContext() and createStore to a separate file(store.js) and import the Provider, useStore here/wherever you need.
    
    const { Provider, useStore } = createContext();
    
    const createStore = () =>
      create((set) => ({
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 })
      }));
    
    const Button = () => {
      return (
          {/** store() - This will create a store for each time using the Button component instead of using one store for all components **/}
        <Provider createStore={createStore}>
          <ButtonChild />
        </Provider>
      );
    };
    
    const ButtonChild = () => {
      const state = useStore();
      return (
        <div>
          {state.bears}
          <button
            onClick={() => {
              state.increasePopulation();
            }}
          >
            +
          </button>
        </div>
      );
    };
    
    export default function App() {
      return (
        <div className="App">
          <Button />
          <Button />
        </div>
      );
    }
    

[

createContext usage with initialization from props
--------------------------------------------------

](#createcontext-usage-with-initialization-from-props)

    import create from 'zustand'
    import createContext from 'zustand/context'
    
    const { Provider, useStore } = createContext()
    
    export default function App({ initialBears }) {
      return (
        <Provider
          createStore={() =>
            create((set) => ({
              bears: initialBears,
              increase: () => set((state) => ({ bears: state.bears + 1 })),
            }))
          }
        >
          <Button />
        </Provider>
      )
    }
    

[

Migration
---------

](#migration)

Discussion: [https://github.com/pmndrs/zustand/discussions/1276](https://github.com/pmndrs/zustand/discussions/1276)

Here's the new context usage with v4 API.

    import { createContext, useContext, useRef } from 'react'
    import { createStore, useStore } from 'zustand'
    
    const StoreContext = createContext(null)
    
    const StoreProvider = ({ children }) => {
      const storeRef = useRef()
      if (!storeRef.current) {
        storeRef.current = createStore((set) => ({
          // ...
        }))
      }
      return (
        <StoreContext.Provider value={storeRef.current}>
          {children}
        </StoreContext.Provider>
      )
    }
    
    const useStoreInContext = (selector) => {
      const store = useContext(StoreContext)
      if (!store) {
        throw new Error('Missing StoreProvider')
      }
      return useStore(store, selector)
    }
    

Or reach out to some third-party libraries that provide Zustand v3-like APIs:

*   [https://github.com/charkour/zustand-di](https://github.com/charkour/zustand-di)
*   [https://github.com/arvinxx/zustand-utils](https://github.com/arvinxx/zustand-utils)</content>
</page>

<page>
  <title>Migrating to v4 - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/migrations/migrating-to-v4</url>
  <content>The only breaking changes are in types. If you are using Zustand with TypeScript or JSDoc type annotations, this guide applies. Otherwise, no migration is required.

Also, it's recommended to first read the new [TypeScript Guide](https://zustand.docs.pmnd.rs/guides/typescript), so that the migration is easier to understand.

In addition to this migration guide, you can also check the [diff](https://github.com/pmndrs/zustand/compare/v3.7.2...v4.0.0?short_path=37e5b4c#diff-c21e24854115b390eccde717da83f91feb2d5927a76c1485e5f0fdd0135c2afa) of the test files in the Zustand repository from v3 to v4.

[

`create`
--------

](#create)

**Applicable imports**

    import create from 'zustand'
    import create from 'zustand/vanilla'
    

**Change**

    - create:
    -   < State
    -   , StoreSetState = StoreApi<State>["set"]
    -   , StoreGetState = StoreApi<State>["get"]
    -   , Store = StoreApi<State>
    -   >
    -     (f: ...) => ...
    + create:
    +   { <State>(): (f: ...) => ...
    +   , <State, Mutators>(f: ...) => ...
    +   }
    

**Migration**

If you are not passing any type parameters to `create`, no migration is required.

If you are using a "leaf" middleware like `combine` or `redux`, remove all type parameters from `create`.

Else, replace `create<T, ...>(...)` with `create<T>()(...)`.

[

`StateCreator`
--------------

](#statecreator)

**Applicable imports**

    import type { StateCreator } from 'zustand'
    import type { StateCreator } from 'zustand/vanilla'
    

**Change**

    - type StateCreator
    -   < State
    -   , StoreSetState = StoreApi<State>["set"]
    -   , StoreGetState = StoreApi<State>["get"]
    -   , Store = StoreApi<State>
    -   > =
    -     ...
    + type StateCreator
    +   < State
    +   , InMutators extends [StoreMutatorIdentifier, unknown][] = []
    +   , OutMutators extends [StoreMutatorIdentifier, unknown][] = []
    +   , Return = State
    +   > =
    +     ...
    

**Migration**

If you are using `StateCreator`, you are likely authoring a middleware or using the "slices" pattern. For that check the [Authoring middlewares and advanced usage](https://zustand.docs.pmnd.rs/guides/typescript#authoring-middlewares-and-advanced-usage) and [Common recipes](https://zustand.docs.pmnd.rs/guides/typescript#common-recipes) sections of the TypeScript Guide.

[

`PartialState`
--------------

](#partialstate)

**Applicable imports**

    import type { PartialState } from 'zustand'
    import type { PartialState } from 'zustand/vanilla'
    

**Change**

    - type PartialState
    -   < T extends State
    -   , K1 extends keyof T = keyof T
    -   , K2 extends keyof T = K1
    -   , K3 extends keyof T = K2
    -   , K4 extends keyof T = K3
    -   > =
    -   | (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
    -   | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
    + type PartialState<T> =
    +   | Partial<T>
    +   | ((state: T) => Partial<T>)
    

**Migration**

Replace `PartialState<T, ...>` with `PartialState<T>` and preferably turn on [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes) in your `tsconfig.json`:

    {
      "compilerOptions": {
        "exactOptionalPropertyTypes": true
      }
    }
    

We're no longer using the trick to disallow `{ foo: undefined }` to be assigned to `Partial<{ foo: string }>`. Instead, we're relying on the users to turn on `exactOptionalPropertyTypes`.

[

`useStore`
----------

](#usestore)

**Applicable imports**

    import { useStore } from 'zustand'
    import { useStore } from 'zustand/react'
    

**Change**

    - useStore:
    -   { <State>(store: StoreApi<State>): State
    -   , <State, StateSlice>
    -       ( store: StoreApi<State>
    -       , selector: StateSelector<State, StateSlice>,
    -       , equals?: EqualityChecker<StateSlice>
    -       ): StateSlice
    -   }
    + useStore:
    +   <Store, StateSlice = ExtractState<Store>>
    +     ( store: Store
    +     , selector?: StateSelector<State, StateSlice>,
    +     , equals?: EqualityChecker<StateSlice>
    +     )
    +       => StateSlice
    

**Migration**

If you are not passing any type parameters to `useStore`, no migration is required.

If you are, it's recommended to remove all the type parameters, or pass the **store** type instead of the **state** type as the first parameter.

[

`UseBoundStore`
---------------

](#useboundstore)

**Applicable imports**

    import type { UseBoundStore } from 'zustand'
    import type { UseBoundStore } from 'zustand/react'
    

**Change**

    - type UseBoundStore<
    -   State,
    -   Store = StoreApi<State>
    - > =
    -   & { (): T
    -     , <StateSlice>
    -         ( selector: StateSelector<State, StateSlice>
    -         , equals?: EqualityChecker<StateSlice>
    -         ): U
    -     }
    -   & Store
    + type UseBoundStore<Store> =
    +   & (<StateSlice = ExtractState<S>>
    +       ( selector?: (state: ExtractState<S>) => StateSlice
    +       , equals?: (a: StateSlice, b: StateSlice) => boolean
    +       ) => StateSlice
    +     )
    +   & S
    

**Migration**

Replace `UseBoundStore<T>` with `UseBoundStore<StoreApi<T>>`, and `UseBoundStore<T, S>` with `UseBoundStore<S>`

[

`UseContextStore`
-----------------

](#usecontextstore)

**Applicable imports**

    import type { UseContextStore } from 'zustand/context'
    

**Change**

**Migration**

Use `typeof MyContext.useStore` instead

[

`createContext`
---------------

](#createcontext)

**Applicable imports**

    import createContext from 'zustand/context'
    

**Change**

      createContext:
    -   <State, Store = StoreApi<State>>() => ...
    +   <Store>() => ...
    

**Migration**

Replace `createContext<T>()` with `createContext<StoreApi<T>>()`, and `createContext<T, S>()` with `createContext<S>()`.

[](#combine,-devtools,-subscribewithselector)

**Applicable imports**

    import { combine } from 'zustand/middleware'
    import { devtools } from 'zustand/middleware'
    import { subscribeWithSelector } from 'zustand/middleware'
    

**Change**

    - combine:
    -   <T, U>(...) => ...
    + combine:
    +   <T, U, Mps, Mcs>(...) => ...
    
    - devtools:
    -   <T>(...) => ...
    + devtools:
    +   <T, Mps, Mcs>(...) => ...
    
    - subscribeWithSelector:
    -   <T>(...) => ...
    + subscribeWithSelector:
    +   <T, Mps, Mcs>(...) => ...
    

**Migration**

If you are not passing any type parameters to `combine`, `devtools`, or `subscribeWithSelector`, no migration is required.

If you are, remove all the type parameters, as they are inferred automatically.

[

`persist`
---------

](#persist)

**Applicable imports**

    import { persist } from 'zustand/middleware'
    

**Change**

    - persist:
    -   <T, U = Partial<T>>(...) => ...
    + persist:
    +   <T, Mps, Mcs, U = T>(...) => ...
    

**Migration**

If you are passing any type parameters, remove them as they are inferred automatically.

Next, if you are passing the `partialize` option, there is no further steps required for migration.

If you are **not** passing the `partialize` option, you might see some compilation errors. If you do not see any, there is no further migration required.

The type of partialized state is now `T` instead of `Partial<T>`, which aligns with the runtime behavior of the default `partialize`, which is an identity (`s => s`).

If you see some compilation errors, you have to find and fix the errors yourself, because they might be indicative of unsound code. Alternatively, the workaround will be passing `s => s as Partial<typeof s>` to `partialize`. If your partialized state is truly `Partial<T>`, you should not encounter any bugs.

The runtime behavior has not changed, only the types are now correct.

[

`redux`
-------

](#redux)

**Applicable imports**

    import { redux } from 'zustand/middleware'
    

**Change**

    - redux:
    -   <T, A>(...) => ...
    + redux:
    +   <T, A, Mps, Mcs>(...) => ...
    

**Migration**

If you are not passing any type parameters to `redux`, no migration is required.

If you are, remove all the type parameters, and annotate only the second (action) parameter. That is, replace `redux<T, A>((state, action) => ..., ...)` with `redux((state, action: A) => ..., ...)`.</content>
</page>

<page>
  <title>createStore - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/apis/create-store</url>
  <content>How to create vanilla stores

`createStore` lets you create a vanilla store that exposes API utilities.

    const someStore = createStore(stateCreatorFn)
    

*   [Types](#types)
    
    *   [Signature](#createstore-signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Updating state based on previous state](#updating-state-based-on-previous-state)
    *   [Updating Primitives in State](#updating-primitives-in-state)
    *   [Updating Objects in State](#updating-objects-in-state)
    *   [Updating Arrays in State](#updating-arrays-in-state)
    *   [Subscribing to state updates](#subscribing-to-state-updates)
    
*   [Troubleshooting](#troubleshooting)
    
    *   [I’ve updated the state, but the screen doesn’t update](#ive-updated-the-state-but-the-screen-doesnt-update)
    

[

Types
-----

](#types)[

### Signature

](#signature)

    createStore<T>()(stateCreatorFn: StateCreator<T, [], []>): StoreApi<T>
    

[

Reference
---------

](#reference)[

### `createStore(stateCreatorFn)`

](#createstore\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.

[

#### Returns

](#returns)

`createStore` returns a vanilla store that exposes API utilities, `setState`, `getState`, `getInitialState` and `subscribe`.

[

Usage
-----

](#usage)[

### Updating state based on previous state

](#updating-state-based-on-previous-state)

This example shows how you can support **updater functions** within **actions**.

    import { createStore } from 'zustand/vanilla'
    
    type AgeStoreState = { age: number }
    
    type AgeStoreActions = {
      setAge: (
        nextAge:
          | AgeStoreState['age']
          | ((currentAge: AgeStoreState['age']) => AgeStoreState['age']),
      ) => void
    }
    
    type AgeStore = AgeStoreState & AgeStoreActions
    
    const ageStore = createStore<AgeStore>()((set) => ({
      age: 42,
      setAge: (nextAge) =>
        set((state) => ({
          age: typeof nextAge === 'function' ? nextAge(state.age) : nextAge,
        })),
    }))
    
    function increment() {
      ageStore.getState().setAge((currentAge) => currentAge + 1)
    }
    
    const $yourAgeHeading = document.getElementById(
      'your-age',
    ) as HTMLHeadingElement
    const $incrementBy3Button = document.getElementById(
      'increment-by-3',
    ) as HTMLButtonElement
    const $incrementBy1Button = document.getElementById(
      'increment-by-1',
    ) as HTMLButtonElement
    
    $incrementBy3Button.addEventListener('click', () => {
      increment()
      increment()
      increment()
    })
    
    $incrementBy1Button.addEventListener('click', () => {
      increment()
    })
    
    const render: Parameters<typeof ageStore.subscribe>[0] = (state) => {
      $yourAgeHeading.innerHTML = `Your age: ${state.age}`
    }
    
    render(ageStore.getInitialState(), ageStore.getInitialState())
    
    ageStore.subscribe(render)
    

Here's the `html` code

    <h1 id="your-age"></h1>
    <button id="increment-by-3" type="button">+3</button>
    <button id="increment-by-1" type="button">+1</button>
    

[

### Updating Primitives in State

](#updating-primitives-in-state)

State can hold any kind of JavaScript value. When you want to update built-in primitive values like numbers, strings, booleans, etc. you should directly assign new values to ensure updates are applied correctly, and avoid unexpected behaviors.

By default, `set` function performs a shallow merge. If you need to completely replace the state with a new one, use the `replace` parameter set to `true`

    import { createStore } from 'zustand/vanilla'
    
    type XStore = number
    
    const xStore = createStore<XStore>()(() => 0)
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      xStore.setState(event.clientX, true)
    })
    
    const render: Parameters<typeof xStore.subscribe>[0] = (x) => {
      $dot.style.transform = `translate(${x}px, 0)`
    }
    
    render(xStore.getInitialState(), xStore.getInitialState())
    
    xStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Updating Objects in State

](#updating-objects-in-state)

Objects are **mutable** in JavaScript, but you should treat them as **immutable** when you store them in state. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use the new object.

By default, `set` function performs a shallow merge. For most updates where you only need to modify specific properties, the default shallow merge is preferred as it's more efficient. To completely replace the state with a new one, use the `replace` parameter set to `true` with caution, as it discards any existing nested data within the state.

    import { createStore } from 'zustand/vanilla'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getInitialState(), positionStore.getInitialState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Updating Arrays in State

](#updating-arrays-in-state)

Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

By default, `set` function performs a shallow merge. To update array values we should assign new values to ensure updates are applied correctly, and avoid unexpected behaviors. To completely replace the state with a new one, use the `replace` parameter set to `true`.

We should prefer immutable operations like: `[...array]`, `concat(...)`, `filter(...)`, `slice(...)`, `map(...)`, `toSpliced(...)`, `toSorted(...)`, and `toReversed(...)`, and avoid mutable operations like `array[arrayIndex] = ...`, `push(...)`, `unshift(...)`, `pop(...)`, `shift(...)`, `splice(...)`, `reverse(...)`, and `sort(...)`.

    import { createStore } from 'zustand/vanilla'
    
    type PositionStore = [number, number]
    
    const positionStore = createStore<PositionStore>()(() => [0, 0])
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.setState([event.clientX, event.clientY], true)
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = ([x, y]) => {
      $dot.style.transform = `translate(${x}px, ${y}px)`
    }
    
    render(positionStore.getInitialState(), positionStore.getInitialState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Subscribing to state updates

](#subscribing-to-state-updates)

By subscribing to state updates, you register a callback that fires whenever the store's state updates. We can use `subscribe` for external state management.

    import { createStore } from 'zustand/vanilla'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dot.addEventListener('mouseenter', (event) => {
      const parent = event.currentTarget.parentElement
      const parentWidth = parent.clientWidth
      const parentHeight = parent.clientHeight
    
      positionStore.getState().setPosition({
        x: Math.ceil(Math.random() * parentWidth),
        y: Math.ceil(Math.random() * parentHeight),
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getInitialState(), positionStore.getInitialState())
    
    positionStore.subscribe(render)
    
    const logger: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      console.log('new position', { position: state.position })
    }
    
    positionStore.subscribe(logger)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

Troubleshooting
---------------

](#troubleshooting)[

### I’ve updated the state, but the screen doesn’t update

](#i’ve-updated-the-state,-but-the-screen-doesn’t-update)

In the previous example, the `position` object is always created fresh from the current cursor position. But often, you will want to include existing data as a part of the new object you’re creating. For example, you may want to update only one field in a form, but keep the previous values for all other fields.

These input fields don’t work because the `oninput` handlers mutate the state:

    import { createStore } from 'zustand/vanilla'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: PersonStoreState['person']) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const personStore = createStore<PersonStore>()((set) => ({
      person: {
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
      },
      setPerson: (person) => set({ person }),
    }))
    
    const $firstNameInput = document.getElementById(
      'first-name',
    ) as HTMLInputElement
    const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
    const $emailInput = document.getElementById('email') as HTMLInputElement
    const $result = document.getElementById('result') as HTMLDivElement
    
    function handleFirstNameChange(event: Event) {
      personStore.getState().person.firstName = (event.target as any).value
    }
    
    function handleLastNameChange(event: Event) {
      personStore.getState().person.lastName = (event.target as any).value
    }
    
    function handleEmailChange(event: Event) {
      personStore.getState().person.email = (event.target as any).value
    }
    
    $firstNameInput.addEventListener('input', handleFirstNameChange)
    $lastNameInput.addEventListener('input', handleLastNameChange)
    $emailInput.addEventListener('input', handleEmailChange)
    
    const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
      $firstNameInput.value = state.person.firstName
      $lastNameInput.value = state.person.lastName
      $emailInput.value = state.person.email
    
      $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
    }
    
    render(personStore.getInitialState(), personStore.getInitialState())
    
    personStore.subscribe(render)
    

Here's the `html` code

    <label style="display: block">
      First name:
      <input id="first-name" />
    </label>
    <label style="display: block">
      Last name:
      <input id="last-name" />
    </label>
    <label style="display: block">
      Email:
      <input id="email" />
    </label>
    <p id="result"></p>
    

For example, this line mutates the state from a past render:

    personStore.getState().firstName = (e.target as any).value
    

The reliable way to get the behavior you’re looking for is to create a new object and pass it to `setPerson`. But here you want to also copy the existing data into it because only one of the fields has changed:

    personStore.getState().setPerson({
      firstName: e.target.value, // New first name from the input
    })
    

We don’t need to copy every property separately due to `set` function performing shallow merge by default.

Now the form works!

Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!

    import { createStore } from 'zustand/vanilla'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: PersonStoreState['person']) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const personStore = createStore<PersonStore>()((set) => ({
      person: {
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
      },
      setPerson: (person) => set({ person }),
    }))
    
    const $firstNameInput = document.getElementById(
      'first-name',
    ) as HTMLInputElement
    const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
    const $emailInput = document.getElementById('email') as HTMLInputElement
    const $result = document.getElementById('result') as HTMLDivElement
    
    function handleFirstNameChange(event: Event) {
      personStore.getState().setPerson({
        ...personStore.getState().person,
        firstName: (event.target as any).value,
      })
    }
    
    function handleLastNameChange(event: Event) {
      personStore.getState().setPerson({
        ...personStore.getState().person,
        lastName: (event.target as any).value,
      })
    }
    
    function handleEmailChange(event: Event) {
      personStore.getState().setPerson({
        ...personStore.getState().person,
        email: (event.target as any).value,
      })
    }
    
    $firstNameInput.addEventListener('input', handleFirstNameChange)
    $lastNameInput.addEventListener('input', handleLastNameChange)
    $emailInput.addEventListener('input', handleEmailChange)
    
    const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
      $firstNameInput.value = state.person.firstName
      $lastNameInput.value = state.person.lastName
      $emailInput.value = state.person.email
    
      $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
    }
    
    render(personStore.getInitialState(), personStore.getInitialState())
    
    personStore.subscribe(render)</content>
</page>

<page>
  <title>useShallow ⚛️ - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/hooks/use-shallow</url>
  <content>How to memoize selector functions

`useShallow` is a React Hook that lets you optimize re-renders.

    const memoizedSelector = useShallow(selector)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Writing a memoized selector](#writing-a-memoized-selector)
    
*   [Troubleshooting](#troubleshooting)

[

### Signature

](#signature)

    useShallow<T, U = T>(selectorFn: (state: T) => U): (state: T) => U
    

[

Reference
---------

](#reference)[

### `useShallow(selectorFn)`

](#useshallow\(selectorfn\))[

#### Parameters

](#parameters)

*   `selectorFn`: A function that lets you return data that is based on current state.

[

#### Returns

](#returns)

`useShallow` returns a memoized version of a selector function using a shallow comparison for memoization.

[

Usage
-----

](#usage)[

### Writing a memoized selector

](#writing-a-memoized-selector)

First, we need to setup a store to hold the state for the bear family. In this store, we define three properties: `papaBear`, `mamaBear`, and `babyBear`, each representing a different member of the bear family and their respective oatmeal pot sizes.

    import { create } from 'zustand'
    
    type BearFamilyMealsStore = {
      [key: string]: string
    }
    
    const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
      papaBear: 'large porridge-pot',
      mamaBear: 'middle-size porridge pot',
      babyBear: 'A little, small, wee pot',
    }))
    

Next, we'll create a `BearNames` component that retrieves the keys of our state (the bear family members) and displays them.

    function BearNames() {
      const names = useBearFamilyMealsStore((state) => Object.keys(state))
    
      return <div>{names.join(', ')}</div>
    }
    

Next, we will create a `UpdateBabyBearMeal` component that periodically updates baby bear's meal choice.

    const meals = [
      'A tiny, little, wee bowl',
      'A small, petite, tiny pot',
      'A wee, itty-bitty, small bowl',
      'A little, petite, tiny dish',
      'A tiny, small, wee vessel',
      'A small, little, wee cauldron',
      'A little, tiny, small cup',
      'A wee, small, little jar',
      'A tiny, wee, small pan',
      'A small, wee, little crock',
    ]
    
    function UpdateBabyBearMeal() {
      useEffect(() => {
        const timer = setInterval(() => {
          useBearFamilyMealsStore.setState({
            babyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
          })
        }, 1000)
    
        return () => {
          clearInterval(timer)
        }
      }, [])
    
      return null
    }
    

Finally, we combine both components in the `App` component to see them in action.

    export default function App() {
      return (
        <>
          <UpdateBabyBearPorridge />
          <BearNames />
        </>
      )
    }
    

Here is what the code should look like:

    import { useEffect } from 'react'
    import { create } from 'zustand'
    
    type BearFamilyMealsStore = {
      [key: string]: string
    }
    
    const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
      papaBear: 'large porridge-pot',
      mamaBear: 'middle-size porridge pot',
      babyBear: 'A little, small, wee pot',
    }))
    
    const meals = [
      'A tiny, little, wee bowl',
      'A small, petite, tiny pot',
      'A wee, itty-bitty, small bowl',
      'A little, petite, tiny dish',
      'A tiny, small, wee vessel',
      'A small, little, wee cauldron',
      'A little, tiny, small cup',
      'A wee, small, little jar',
      'A tiny, wee, small pan',
      'A small, wee, little crock',
    ]
    
    function UpdateBabyBearMeal() {
      useEffect(() => {
        const timer = setInterval(() => {
          useBearFamilyMealsStore.setState({
            babyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
          })
        }, 1000)
    
        return () => {
          clearInterval(timer)
        }
      }, [])
    
      return null
    }
    
    function BearNames() {
      const names = useBearFamilyMealsStore((state) => Object.keys(state))
    
      return <div>{names.join(', ')}</div>
    }
    
    export default function App() {
      return (
        <>
          <UpdateBabyBearMeal />
          <BearNames />
        </>
      )
    }
    

Everything might look fine, but there’s a small problem: the `BearNames` component keeps re-rendering even if the names haven’t changed. This happens because the component re-renders whenever any part of the state changes, even if the specific part we care about (the list of names) hasn’t changed.

To fix this, we use `useShallow` to make sure the component only re-renders when the actual keys of the state change:

    function BearNames() {
      const names = useBearFamilyStore(useShallow((state) => Object.keys(state)))
    
      return <div>{names.join(', ')}</div>
    }
    

Here is what the code should look like:

    import { useEffect } from 'react'
    import { create } from 'zustand'
    import { useShallow } from 'zustand/react/shallow'
    
    type BearFamilyMealsStore = {
      [key: string]: string
    }
    
    const useBearFamilyMealsStore = create<BearFamilyMealsStore>()(() => ({
      papaBear: 'large porridge-pot',
      mamaBear: 'middle-size porridge pot',
      babyBear: 'A little, small, wee pot',
    }))
    
    const meals = [
      'A tiny, little, wee bowl',
      'A small, petite, tiny pot',
      'A wee, itty-bitty, small bowl',
      'A little, petite, tiny dish',
      'A tiny, small, wee vessel',
      'A small, little, wee cauldron',
      'A little, tiny, small cup',
      'A wee, small, little jar',
      'A tiny, wee, small pan',
      'A small, wee, little crock',
    ]
    
    function UpdateBabyBearMeal() {
      useEffect(() => {
        const timer = setInterval(() => {
          useBearFamilyMealsStore.setState({
            babyBear: meals[Math.floor(Math.random() * (meals.length - 1))],
          })
        }, 1000)
    
        return () => {
          clearInterval(timer)
        }
      }, [])
    
      return null
    }
    
    function BearNames() {
      const names = useBearFamilyMealsStore(
        useShallow((state) => Object.keys(state)),
      )
    
      return <div>{names.join(', ')}</div>
    }
    
    export default function App() {
      return (
        <>
          <UpdateBabyBearMeal />
          <BearNames />
        </>
      )
    }
    

By using `useShallow`, we optimized the rendering process, ensuring that the component only re-renders when necessary, which improves overall performance.

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>combine - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/combine</url>
  <content>How to create a store and get types automatically inferred

`combine` middleware lets you create a cohesive state by merging an initial state with a state creator function that adds new state slices and actions. This is really helpful as it automatically infers types, so there’s no need for explicit type definitions.

This makes state management more straightforward and efficient by making curried version of `create` and `createStore` not necessary for middleware usage.

    const nextStateCreatorFn = combine(initialState, additionalStateCreatorFn)
    

*   [Types](#types)
    
    *   [Signature](#combine-signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Creating a state with inferred types](#creating-a-state-wit-inferred-types)
    
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    combine<T, U>(initialState: T, additionalStateCreatorFn: StateCreator<T, [], [], U>): StateCreator<Omit<T, keyof U> & U, [], []>
    

[

Reference
---------

](#reference)[

### `combine(initialState, additionalStateCreatorFn)`

](#combine\(initialstate,-additionalstatecreatorfn\))[

#### Parameters

](#parameters)

*   `initialState`: The value you want the state to be initially. It can be a value of any type, except a function.
*   `additionalStateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.

[

#### Returns

](#returns)

`combine` returns a state creator function.

[

Usage
-----

](#usage)[

### Creating a store with inferred types

](#creating-a-store-with-inferred-types)

This example shows you how you can create a store and get types automatically inferred, so you don’t need to define them explicitly.

    import { createStore } from 'zustand/vanilla'
    import { combine } from 'zustand/middleware'
    
    const positionStore = createStore(
      combine({ position: { x: 0, y: 0 } }, (set) => ({
        setPosition: (position) => set({ position }),
      })),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getInitialState(), positionStore.getInitialState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>Updating state - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/updating-state</url>
  <content>[

Flat updates
------------

](#flat-updates)

Updating state with Zustand is simple! Call the provided `set` function with the new state, and it will be shallowly merged with the existing state in the store. **Note** See next section for nested state.

    import { create } from 'zustand'
    
    type State = {
      firstName: string
      lastName: string
    }
    
    type Action = {
      updateFirstName: (firstName: State['firstName']) => void
      updateLastName: (lastName: State['lastName']) => void
    }
    
    // Create your store, which includes both state and (optionally) actions
    const usePersonStore = create<State & Action>((set) => ({
      firstName: '',
      lastName: '',
      updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
      updateLastName: (lastName) => set(() => ({ lastName: lastName })),
    }))
    
    // In consuming app
    function App() {
      // "select" the needed state and actions, in this case, the firstName value
      // and the action updateFirstName
      const firstName = usePersonStore((state) => state.firstName)
      const updateFirstName = usePersonStore((state) => state.updateFirstName)
    
      return (
        <main>
          <label>
            First name
            <input
              // Update the "firstName" state
              onChange={(e) => updateFirstName(e.currentTarget.value)}
              value={firstName}
            />
          </label>
    
          <p>
            Hello, <strong>{firstName}!</strong>
          </p>
        </main>
      )
    }
    

[

Deeply nested object
--------------------

](#deeply-nested-object)

If you have a deep state object like this:

    type State = {
      deep: {
        nested: {
          obj: { count: number }
        }
      }
    }
    

Updating nested state requires some effort to ensure the process is completed immutably.

[

### Normal approach

](#normal-approach)

Similar to React or Redux, the normal approach is to copy each level of the state object. This is done with the spread operator `...`, and by manually merging that in with the new state values. Like so:

      normalInc: () =>
        set((state) => ({
          deep: {
            ...state.deep,
            nested: {
              ...state.deep.nested,
              obj: {
                ...state.deep.nested.obj,
                count: state.deep.nested.obj.count + 1
              }
            }
          }
        })),
    

This is very long! Let's explore some alternatives that will make your life easier.

[

### With Immer

](#with-immer)

Many people use [Immer](https://github.com/immerjs/immer) to update nested values. Immer can be used anytime you need to update nested state such as in React, Redux and of course, Zustand!

You can use Immer to shorten your state updates for deeply nested object. Let's take a look at an example:

      immerInc: () =>
        set(produce((state: State) => { ++state.deep.nested.obj.count })),
    

What a reduction! Please take note of the [gotchas listed here](https://zustand.docs.pmnd.rs/integrations/immer-middleware).

[

### With optics-ts

](#with-optics-ts)

There is another option with [optics-ts](https://github.com/akheron/optics-ts/):

      opticsInc: () =>
        set(O.modify(O.optic<State>().path("deep.nested.obj.count"))((c) => c + 1)),
    

Unlike Immer, optics-ts doesn't use proxies or mutation syntax.

[

### With Ramda

](#with-ramda)

You can also use [Ramda](https://ramdajs.com/):

      ramdaInc: () =>
        set(R.modifyPath(["deep", "nested", "obj", "count"], (c) => c + 1)),
    

Both ramda and optics-ts also work with types.

[

### CodeSandbox Demo

](#codesandbox-demo)

[https://codesandbox.io/s/zustand-normal-immer-optics-ramda-updating-ynn3o?file=/src/App.tsx](https://codesandbox.io/s/zustand-normal-immer-optics-ramda-updating-ynn3o?file=/src/App.tsx)</content>
</page>

<page>
  <title>TypeScript Guide - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/typescript</url>
  <content>[

Basic usage
-----------

](#basic-usage)

The difference when using TypeScript is that instead of writing `create(...)`, you have to write `create<T>()(...)` (notice the extra parentheses `()` too along with the type parameter) where `T` is the type of the state to annotate it. For example:

    import { create } from 'zustand'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const useBearStore = create<BearState>()((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
    

Why can't we simply infer the type from the initial state?

**TLDR**: Because state generic `T` is invariant.

Consider this minimal version `create`:

    declare const create: <T>(f: (get: () => T) => T) => T
    
    const x = create((get) => ({
      foo: 0,
      bar: () => get(),
    }))
    // `x` is inferred as `unknown` instead of
    // interface X {
    //   foo: number,
    //   bar: () => X
    // }
    

Here, if you look at the type of `f` in `create`, i.e. `(get: () => T) => T`, it "gives" `T` via return (making it covariant), but it also "takes" `T` via `get` (making it contravariant). "So where does `T` come from?" TypeScript wonders. It's like that chicken or egg problem. At the end TypeScript, gives up and infers `T` as `unknown`.

So, as long as the generic to be inferred is invariant (i.e. both covariant and contravariant), TypeScript will be unable to infer it. Another simple example would be this:

    const createFoo = {} as <T>(f: (t: T) => T) => T
    const x = createFoo((_) => 'hello')
    

Here again, `x` is `unknown` instead of `string`.

More about the inference (just for the people curious and interested in TypeScript)

In some sense this inference failure is not a problem because a value of type `<T>(f: (t: T) => T) => T` cannot be written. That is to say you can't write the real runtime implementation of `createFoo`. Let's try it:

    const createFoo = (f) => f(/* ? */)
    

`createFoo` needs to return the return value of `f`. And to do that we first have to call `f`. And to call it we have to pass a value of type `T`. And to pass a value of type `T` we first have to produce it. But how can we produce a value of type `T` when we don't even know what `T` is? The only way to produce a value of type `T` is to call `f`, but then to call `f` itself we need a value of type `T`. So you see it's impossible to actually write `createFoo`.

So what we're saying is, the inference failure in case of `createFoo` is not really a problem because it's impossible to implement `createFoo`. But what about the inference failure in case of `create`? That also is not really a problem because it's impossible to implement `create` too. Wait a minute, if it's impossible to implement `create` then how does Zustand implement it? The answer is, it doesn't.

Zustand lies that it implemented `create`'s type, it implemented only the most part of it. Here's a simple proof by showing unsoundness. Consider the following code:

    import { create } from 'zustand'
    
    const useBoundStore = create<{ foo: number }>()((_, get) => ({
      foo: get().foo,
    }))
    

This code compiles. But if we run it, we'll get an exception: "Uncaught TypeError: Cannot read properties of undefined (reading 'foo')". This is because `get` would return `undefined` before the initial state is created (hence you shouldn't call `get` when creating the initial state). The types promise that `get` will never return `undefined` but it does initially, which means Zustand failed to implement it.

And of course Zustand failed because it's impossible to implement `create` the way types promise (in the same way it's impossible to implement `createFoo`). In other words we don't have a type to express the actual `create` we have implemented. We can't type `get` as `() => T | undefined` because it would cause inconvenience and it still won't be correct as `get` is indeed `() => T` eventually, just if called synchronously it would be `() => undefined`. What we need is some kind of TypeScript feature that allows us to type `get` as `(() => T) & WhenSync<() => undefined>`, which of course is extremely far-fetched.

So we have two problems: lack of inference and unsoundness. Lack of inference can be solved if TypeScript can improve its inference for invariants. And unsoundness can be solved if TypeScript introduces something like `WhenSync`. To work around lack of inference we manually annotate the state type. And we can't work around unsoundness, but it's not a big deal because it's not much, calling `get` synchronously anyway doesn't make sense.

Why the currying `()(...)`?

**TLDR**: It is a workaround for [microsoft/TypeScript#10571](https://github.com/microsoft/TypeScript/issues/10571).

Imagine you have a scenario like this:

    declare const withError: <T, E>(
      p: Promise<T>,
    ) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>
    declare const doSomething: () => Promise<string>
    
    const main = async () => {
      let [error, value] = await withError(doSomething())
    }
    

Here, `T` is inferred to be a `string` and `E` is inferred to be `unknown`. You might want to annotate `E` as `Foo`, because you are certain of the shape of error `doSomething()` would throw. However, you can't do that. You can either pass all generics or none. Along with annotating `E` as `Foo`, you will also have to annotate `T` as `string` even though it gets inferred anyway. The solution is to make a curried version of `withError` that does nothing at runtime. Its purpose is to just allow you annotate `E`.

    declare const withError: {
      <E>(): <T>(
        p: Promise<T>,
      ) => Promise<[error: undefined, value: T] | [error: E, value: undefined]>
      <T, E>(
        p: Promise<T>,
      ): Promise<[error: undefined, value: T] | [error: E, value: undefined]>
    }
    declare const doSomething: () => Promise<string>
    interface Foo {
      bar: string
    }
    
    const main = async () => {
      let [error, value] = await withError<Foo>()(doSomething())
    }
    

This way, `T` gets inferred and you get to annotate `E`. Zustand has the same use case when we want to annotate the state (the first type parameter) but allow other parameters to get inferred.

Alternatively, you can also use `combine`, which infers the state so that you do not need to type it.

    import { create } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    const useBearStore = create(
      combine({ bears: 0 }, (set) => ({
        increase: (by: number) => set((state) => ({ bears: state.bears + by })),
      })),
    )
    

Be a little careful

We achieve the inference by lying a little in the types of `set`, `get`, and `store` that you receive as parameters. The lie is that they're typed as if the state is the first parameter, when in fact the state is the shallow-merge (`{ ...a, ...b }`) of both first parameter and the second parameter's return. For example, `get` from the second parameter has type `() => { bears: number }` and that is a lie as it should be `() => { bears: number, increase: (by: number) => void }`. And `useBearStore` still has the correct type; for example, `useBearStore.getState` is typed as `() => { bears: number, increase: (by: number) => void }`.

It isn't really a lie because `{ bears: number }` is still a subtype of `{ bears: number, increase: (by: number) => void }`. Therefore, there will be no problem in most cases. You should just be careful while using replace. For example, `set({ bears: 0 }, true)` would compile but will be unsound as it will delete the `increase` function. Another instance where you should be careful is if you use `Object.keys`. `Object.keys(get())` will return `["bears", "increase"]` and not `["bears"]`. The return type of `get` can make you fall for these mistakes.

`combine` trades off a little type-safety for the convenience of not having to write a type for state. Hence, you should use `combine` accordingly. It is fine in most cases and you can use it conveniently.

Note that we don't use the curried version when using `combine` because `combine` "creates" the state. When using a middleware that creates the state, it isn't necessary to use the curried version because the state now can be inferred. Another middleware that creates state is `redux`. So when using `combine`, `redux`, or any other custom middleware that creates the state, we don't recommend using the curried version.

If you want to infer state type also outside of state declaration, you can use the `ExtractState` type helper:

    import { create, ExtractState } from 'zustand'
    import { combine } from 'zustand/middleware'
    
    type BearState = ExtractState<typeof useBearStore>
    
    const useBearStore = create(
      combine({ bears: 0 }, (set) => ({
        increase: (by: number) => set((state) => ({ bears: state.bears + by })),
      })),
    )
    

[

Using middlewares
-----------------

](#using-middlewares)

You do not have to do anything special to use middlewares in TypeScript.

    import { create } from 'zustand'
    import { devtools, persist } from 'zustand/middleware'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const useBearStore = create<BearState>()(
      devtools(
        persist(
          (set) => ({
            bears: 0,
            increase: (by) => set((state) => ({ bears: state.bears + by })),
          }),
          { name: 'bearStore' },
        ),
      ),
    )
    

Just make sure you are using them immediately inside `create` so as to make the contextual inference work. Doing something even remotely fancy like the following `myMiddlewares` would require more advanced types.

    import { create } from 'zustand'
    import { devtools, persist } from 'zustand/middleware'
    
    const myMiddlewares = (f) => devtools(persist(f, { name: 'bearStore' }))
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const useBearStore = create<BearState>()(
      myMiddlewares((set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      })),
    )
    

Also, we recommend using `devtools` middleware as last as possible. For example, when you use it with `immer` as a middleware, it should be `devtools(immer(...))` and not `immer(devtools(...))`. This is because`devtools` mutates the `setState` and adds a type parameter on it, which could get lost if other middlewares (like `immer`) also mutate `setState` before `devtools`. Hence using `devtools` at the end makes sure that no middlewares mutate `setState` before it.

[](#authoring-middlewares-and-advanced-usage)

Imagine you had to write this hypothetical middleware.

    import { create } from 'zustand'
    
    const foo = (f, bar) => (set, get, store) => {
      store.foo = bar
      return f(set, get, store)
    }
    
    const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
    console.log(useBearStore.foo.toUpperCase())
    

Zustand middlewares can mutate the store. But how could we possibly encode the mutation on the type-level? That is to say how could we type `foo` so that this code compiles?

For a usual statically typed language, this is impossible. But thanks to TypeScript, Zustand has something called a "higher-kinded mutator" that makes this possible. If you are dealing with complex type problems, like typing a middleware or using the `StateCreator` type, you will have to understand this implementation detail. For this, you can [check out #710](https://github.com/pmndrs/zustand/issues/710).

If you are eager to know what the answer is to this particular problem then you can [see it here](#middleware-that-changes-the-store-type).

[

### Handling Dynamic `replace` Flag

](#handling-dynamic-replace-flag)

If the value of the `replace` flag is not known at compile time and is determined dynamically, you might face issues. To handle this, you can use a workaround by annotating the `replace` parameter with the parameters of the `setState` function:

    const replaceFlag = Math.random() > 0.5
    const args = [{ bears: 5 }, replaceFlag] as Parameters<
      typeof useBearStore.setState
    >
    store.setState(...args)
    

[

#### Example with `as Parameters` Workaround

](#example-with-as-parameters-workaround)

    import { create } from 'zustand'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const useBearStore = create<BearState>()((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
    
    const replaceFlag = Math.random() > 0.5
    const args = [{ bears: 5 }, replaceFlag] as Parameters<
      typeof useBearStore.setState
    >
    useBearStore.setState(...args) // Using the workaround
    

By following this approach, you can ensure that your code handles dynamic `replace` flags without encountering type issues.

[

Common recipes
--------------

](#common-recipes)[

### Middleware that doesn't change the store type

](#middleware-that-doesn't-change-the-store-type)

    import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'
    
    type Logger = <
      T,
      Mps extends [StoreMutatorIdentifier, unknown][] = [],
      Mcs extends [StoreMutatorIdentifier, unknown][] = [],
    >(
      f: StateCreator<T, Mps, Mcs>,
      name?: string,
    ) => StateCreator<T, Mps, Mcs>
    
    type LoggerImpl = <T>(
      f: StateCreator<T, [], []>,
      name?: string,
    ) => StateCreator<T, [], []>
    
    const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
      const loggedSet: typeof set = (...a) => {
        set(...(a as Parameters<typeof set>))
        console.log(...(name ? [`${name}:`] : []), get())
      }
      const setState = store.setState
      store.setState = (...a) => {
        setState(...(a as Parameters<typeof setState>))
        console.log(...(name ? [`${name}:`] : []), store.getState())
      }
    
      return f(loggedSet, get, store)
    }
    
    export const logger = loggerImpl as unknown as Logger
    
    // ---
    
    const useBearStore = create<BearState>()(
      logger(
        (set) => ({
          bears: 0,
          increase: (by) => set((state) => ({ bears: state.bears + by })),
        }),
        'bear-store',
      ),
    )
    

[

### Middleware that changes the store type

](#middleware-that-changes-the-store-type)

    import {
      create,
      StateCreator,
      StoreMutatorIdentifier,
      Mutate,
      StoreApi,
    } from 'zustand'
    
    type Foo = <
      T,
      A,
      Mps extends [StoreMutatorIdentifier, unknown][] = [],
      Mcs extends [StoreMutatorIdentifier, unknown][] = [],
    >(
      f: StateCreator<T, [...Mps, ['foo', A]], Mcs>,
      bar: A,
    ) => StateCreator<T, Mps, [['foo', A], ...Mcs]>
    
    declare module 'zustand' {
      interface StoreMutators<S, A> {
        foo: Write<Cast<S, object>, { foo: A }>
      }
    }
    
    type FooImpl = <T, A>(
      f: StateCreator<T, [], []>,
      bar: A,
    ) => StateCreator<T, [], []>
    
    const fooImpl: FooImpl = (f, bar) => (set, get, _store) => {
      type T = ReturnType<typeof f>
      type A = typeof bar
    
      const store = _store as Mutate<StoreApi<T>, [['foo', A]]>
      store.foo = bar
      return f(set, get, _store)
    }
    
    export const foo = fooImpl as unknown as Foo
    
    type Write<T extends object, U extends object> = Omit<T, keyof U> & U
    
    type Cast<T, U> = T extends U ? T : U
    
    // ---
    
    const useBearStore = create(foo(() => ({ bears: 0 }), 'hello'))
    console.log(useBearStore.foo.toUpperCase())
    

[

### `create` without curried workaround

](#create-without-curried-workaround)

The recommended way to use `create` is using the curried workaround like so: `create<T>()(...)`. This is because it enables you to infer the store type. But if for some reason you do not want to use the workaround, you can pass the type parameters like the following. Note that in some cases, this acts as an assertion instead of annotation, so we don't recommend it.

    import { create } from "zustand"
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const useBearStore = create<
      BearState,
      [
        ['zustand/persist', BearState],
        ['zustand/devtools', never]
      ]
    >(devtools(persist((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }), { name: 'bearStore' }))
    

[

### Slices pattern

](#slices-pattern)

    import { create, StateCreator } from 'zustand'
    
    interface BearSlice {
      bears: number
      addBear: () => void
      eatFish: () => void
    }
    
    interface FishSlice {
      fishes: number
      addFish: () => void
    }
    
    interface SharedSlice {
      addBoth: () => void
      getBoth: () => void
    }
    
    const createBearSlice: StateCreator<
      BearSlice & FishSlice,
      [],
      [],
      BearSlice
    > = (set) => ({
      bears: 0,
      addBear: () => set((state) => ({ bears: state.bears + 1 })),
      eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
    })
    
    const createFishSlice: StateCreator<
      BearSlice & FishSlice,
      [],
      [],
      FishSlice
    > = (set) => ({
      fishes: 0,
      addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
    })
    
    const createSharedSlice: StateCreator<
      BearSlice & FishSlice,
      [],
      [],
      SharedSlice
    > = (set, get) => ({
      addBoth: () => {
        // you can reuse previous methods
        get().addBear()
        get().addFish()
        // or do them from scratch
        // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
      },
      getBoth: () => get().bears + get().fishes,
    })
    
    const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }))
    

A detailed explanation on the slices pattern can be found [here](https://zustand.docs.pmnd.rs/guides/slices-pattern).

If you have some middlewares then replace `StateCreator<MyState, [], [], MySlice>` with `StateCreator<MyState, Mutators, [], MySlice>`. For example, if you are using `devtools` then it will be `StateCreator<MyState, [["zustand/devtools", never]], [], MySlice>`. See the ["Middlewares and their mutators reference"](#middlewares-and-their-mutators-reference) section for a list of all mutators.

[

### Bounded `useStore` hook for vanilla stores

](#bounded-usestore-hook-for-vanilla-stores)

    import { useStore } from 'zustand'
    import { createStore } from 'zustand/vanilla'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const bearStore = createStore<BearState>()((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
    
    function useBearStore(): BearState
    function useBearStore<T>(selector: (state: BearState) => T): T
    function useBearStore<T>(selector?: (state: BearState) => T) {
      return useStore(bearStore, selector!)
    }
    

You can also make an abstract `createBoundedUseStore` function if you need to create bounded `useStore` hooks often and want to DRY things up...

    import { useStore, StoreApi } from 'zustand'
    import { createStore } from 'zustand/vanilla'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
    }
    
    const bearStore = createStore<BearState>()((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
    
    const createBoundedUseStore = ((store) => (selector) =>
      useStore(store, selector)) as <S extends StoreApi<unknown>>(
      store: S,
    ) => {
      (): ExtractState<S>
      <T>(selector: (state: ExtractState<S>) => T): T
    }
    
    type ExtractState<S> = S extends { getState: () => infer X } ? X : never
    
    const useBearStore = createBoundedUseStore(bearStore)
    

[

Middlewares and their mutators reference
----------------------------------------

](#middlewares-and-their-mutators-reference)

*   `devtools` — `["zustand/devtools", never]`
*   `persist` — `["zustand/persist", YourPersistedState]`  
    `YourPersistedState` is the type of state you are going to persist, ie the return type of `options.partialize`, if you're not passing `partialize` options the `YourPersistedState` becomes `Partial<YourState>`. Also [sometimes](https://github.com/pmndrs/zustand/issues/980#issuecomment-1162289836) passing actual `PersistedState` won't work. In those cases, try passing `unknown`.
*   `immer` — `["zustand/immer", never]`
*   `subscribeWithSelector` — `["zustand/subscribeWithSelector", never]`
*   `redux` — `["zustand/redux", YourAction]`
*   `combine` — no mutator as `combine` does not mutate the store</content>
</page>

<page>
  <title>Setup with Next.js - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/nextjs</url>
  <content>[Next.js](https://nextjs.org/) is a popular server-side rendering framework for React that presents some unique challenges for using Zustand properly. Keep in mind that Zustand store is a global variable (AKA module state) making it optional to use a `Context`. These challenges include:

*   **Per-request store:** A Next.js server can handle multiple requests simultaneously. This means that the store should be created per request and should not be shared across requests.
*   **SSR friendly:** Next.js applications are rendered twice, first on the server and again on the client. Having different outputs on both the client and the server will result in "hydration errors." The store will have to be initialized on the server and then re-initialized on the client with the same data in order to avoid that. Please read more about that in our [SSR and Hydration](https://zustand.docs.pmnd.rs/guides/ssr-and-hydration) guide.
*   **SPA routing friendly:** Next.js supports a hybrid model for client side routing, which means that in order to reset a store, we need to initialize it at the component level using a `Context`.
*   **Server caching friendly:** Recent versions of Next.js (specifically applications using the App Router architecture) support aggressive server caching. Due to our store being a **module state**, it is completely compatible with this caching.

We have these general recommendations for the appropriate use of Zustand:

*   **No global stores** - Because the store should not be shared across requests, it should not be defined as a global variable. Instead, the store should be created per request.
*   **React Server Components should not read from or write to the store** - RSCs cannot use hooks or context. They aren't meant to be stateful. Having an RSC read from or write values to a global store violates the architecture of Next.js.

[

### Creating a store per request

](#creating-a-store-per-request)

Let's write our store factory function that will create a new store for each request.

    // tsconfig.json
    {
      "compilerOptions": {
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
          {
            "name": "next"
          }
        ],
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      "exclude": ["node_modules"]
    }
    

> **Note:** do not forget to remove all comments from your `tsconfig.json` file.

    // src/stores/counter-store.ts
    import { createStore } from 'zustand/vanilla'
    
    export type CounterState = {
      count: number
    }
    
    export type CounterActions = {
      decrementCount: () => void
      incrementCount: () => void
    }
    
    export type CounterStore = CounterState & CounterActions
    
    export const defaultInitState: CounterState = {
      count: 0,
    }
    
    export const createCounterStore = (
      initState: CounterState = defaultInitState,
    ) => {
      return createStore<CounterStore>()((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
      }))
    }
    

[

### Providing the store

](#providing-the-store)

Let's use the `createCounterStore` in our component and share it using a context provider.

    // src/providers/counter-store-provider.tsx
    'use client'
    
    import { type ReactNode, createContext, useRef, useContext } from 'react'
    import { useStore } from 'zustand'
    
    import { type CounterStore, createCounterStore } from '@/stores/counter-store'
    
    export type CounterStoreApi = ReturnType<typeof createCounterStore>
    
    export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
      undefined,
    )
    
    export interface CounterStoreProviderProps {
      children: ReactNode
    }
    
    export const CounterStoreProvider = ({
      children,
    }: CounterStoreProviderProps) => {
      const storeRef = useRef<CounterStoreApi>(null)
      if (!storeRef.current) {
        storeRef.current = createCounterStore()
      }
    
      return (
        <CounterStoreContext.Provider value={storeRef.current}>
          {children}
        </CounterStoreContext.Provider>
      )
    }
    
    export const useCounterStore = <T,>(
      selector: (store: CounterStore) => T,
    ): T => {
      const counterStoreContext = useContext(CounterStoreContext)
    
      if (!counterStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
      }
    
      return useStore(counterStoreContext, selector)
    }
    

> **Note:** In this example, we ensure that this component is re-render-safe by checking the value of the reference, so that the store is only created once. This component will only be rendered once per request on the server, but might be re-rendered multiple times on the client if there are stateful client components located above this component in the tree, or if this component also contains other mutable state that causes a re-render.

[

### Initializing the store

](#initializing-the-store)

    // src/stores/counter-store.ts
    import { createStore } from 'zustand/vanilla'
    
    export type CounterState = {
      count: number
    }
    
    export type CounterActions = {
      decrementCount: () => void
      incrementCount: () => void
    }
    
    export type CounterStore = CounterState & CounterActions
    
    export const initCounterStore = (): CounterState => {
      return { count: new Date().getFullYear() }
    }
    
    export const defaultInitState: CounterState = {
      count: 0,
    }
    
    export const createCounterStore = (
      initState: CounterState = defaultInitState,
    ) => {
      return createStore<CounterStore>()((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
      }))
    }
    

    // src/providers/counter-store-provider.tsx
    'use client'
    
    import { type ReactNode, createContext, useRef, useContext } from 'react'
    import { useStore } from 'zustand'
    
    import {
      type CounterStore,
      createCounterStore,
      initCounterStore,
    } from '@/stores/counter-store'
    
    export type CounterStoreApi = ReturnType<typeof createCounterStore>
    
    export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
      undefined,
    )
    
    export interface CounterStoreProviderProps {
      children: ReactNode
    }
    
    export const CounterStoreProvider = ({
      children,
    }: CounterStoreProviderProps) => {
      const storeRef = useRef<CounterStoreApi>(null)
      if (!storeRef.current) {
        storeRef.current = createCounterStore(initCounterStore())
      }
    
      return (
        <CounterStoreContext.Provider value={storeRef.current}>
          {children}
        </CounterStoreContext.Provider>
      )
    }
    
    export const useCounterStore = <T,>(
      selector: (store: CounterStore) => T,
    ): T => {
      const counterStoreContext = useContext(CounterStoreContext)
    
      if (!counterStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
      }
    
      return useStore(counterStoreContext, selector)
    }
    

[

### Using the store with different architectures

](#using-the-store-with-different-architectures)

There are two architectures for a Next.js application: the [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing) and the [App Router](https://nextjs.org/docs/app/building-your-application/routing). The usage of Zustand on both architectures should be the same with slight differences related to each architecture.

[

#### Pages Router

](#pages-router)

    // src/components/pages/home-page.tsx
    import { useCounterStore } from '@/providers/counter-store-provider.ts'
    
    export const HomePage = () => {
      const { count, incrementCount, decrementCount } = useCounterStore(
        (state) => state,
      )
    
      return (
        <div>
          Count: {count}
          <hr />
          <button type="button" onClick={incrementCount}>
            Increment Count
          </button>
          <button type="button" onClick={decrementCount}>
            Decrement Count
          </button>
        </div>
      )
    }
    

    // src/_app.tsx
    import type { AppProps } from 'next/app'
    
    import { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'
    
    export default function App({ Component, pageProps }: AppProps) {
      return (
        <CounterStoreProvider>
          <Component {...pageProps} />
        </CounterStoreProvider>
      )
    }
    

    // src/pages/index.tsx
    import { HomePage } from '@/components/pages/home-page.tsx'
    
    export default function Home() {
      return <HomePage />
    }
    

> **Note:** creating a store per route would require creating and sharing the store at page (route) component level. Try not to use this if you do not need to create a store per route.

    // src/pages/index.tsx
    import { CounterStoreProvider } from '@/providers/counter-store-provider.tsx'
    import { HomePage } from '@/components/pages/home-page.tsx'
    
    export default function Home() {
      return (
        <CounterStoreProvider>
          <HomePage />
        </CounterStoreProvider>
      )
    }
    

[

#### App Router

](#app-router)

    // src/components/pages/home-page.tsx
    'use client'
    
    import { useCounterStore } from '@/providers/counter-store-provider'
    
    export const HomePage = () => {
      const { count, incrementCount, decrementCount } = useCounterStore(
        (state) => state,
      )
    
      return (
        <div>
          Count: {count}
          <hr />
          <button type="button" onClick={incrementCount}>
            Increment Count
          </button>
          <button type="button" onClick={decrementCount}>
            Decrement Count
          </button>
        </div>
      )
    }
    

    // src/app/layout.tsx
    import type { Metadata } from 'next'
    import { Inter } from 'next/font/google'
    import './globals.css'
    
    import { CounterStoreProvider } from '@/providers/counter-store-provider'
    
    const inter = Inter({ subsets: ['latin'] })
    
    export const metadata: Metadata = {
      title: 'Create Next App',
      description: 'Generated by create next app',
    }
    
    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode
    }>) {
      return (
        <html lang="en">
          <body className={inter.className}>
            <CounterStoreProvider>{children}</CounterStoreProvider>
          </body>
        </html>
      )
    }
    

    // src/app/page.tsx
    import { HomePage } from '@/components/pages/home-page'
    
    export default function Home() {
      return <HomePage />
    }
    

> **Note:** creating a store per route would require creating and sharing the store at page (route) component level. Try not to use this if you do not need to create a store per route.

    // src/app/page.tsx
    import { CounterStoreProvider } from '@/providers/counter-store-provider'
    import { HomePage } from '@/components/pages/home-page'
    
    export default function Home() {
      return (
        <CounterStoreProvider>
          <HomePage />
        </CounterStoreProvider>
      )
    }</content>
</page>

<page>
  <title>Third-party Libraries - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/integrations/third-party-libraries</url>
  <content>Zustand provides bear necessities for state management. Although it is great for most projects, some users wish to extend the library's feature set. This can be done using third-party libraries created by the community.

Disclaimer: These libraries may have bugs, limited maintenance, or other limitations, and are not officially recommended by pmndrs or the Zustand maintainers. This list aims to provide a good starting point for someone looking to extend Zustand's feature set.</content>
</page>

<page>
  <title>Persisting store data - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/integrations/persisting-store-data</url>
  <content>The Persist middleware enables you to store your Zustand state in a storage (e.g., `localStorage`, `AsyncStorage`, `IndexedDB`, etc.), thus persisting its data.

Note that this middleware supports both synchronous storages, like `localStorage`, and asynchronous storages, like `AsyncStorage`, but using an asynchronous storage does come with a cost. See [Hydration and asynchronous storages](#hydration-and-asynchronous-storages) for more details.

[

Simple example
--------------

](#simple-example)

    import { create } from 'zustand'
    import { persist, createJSONStorage } from 'zustand/middleware'
    
    export const useBearStore = create()(
      persist(
        (set, get) => ({
          bears: 0,
          addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
          name: 'food-storage', // name of the item in the storage (must be unique)
          storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
      ),
    )
    

[

Typescript simple example
-------------------------

](#typescript-simple-example)

    import { create } from 'zustand'
    import { persist, createJSONStorage } from 'zustand/middleware'
    
    type BearStore = {
      bears: number
      addABear: () => void
    }
    
    export const useBearStore = create<BearStore>()(
      persist(
        (set, get) => ({
          bears: 0,
          addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
          name: 'food-storage', // name of the item in the storage (must be unique)
          storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
      ),
    )
    

[

Options
-------

](#options)[

### `name`

](#name)

This is the only required option. The given name is going to be the key used to store your Zustand state in the storage, so it must be unique.

[

### `storage`

](#storage)

> Type: `() => StateStorage`

The `StateStorage` can be imported with:

    import { StateStorage } from 'zustand/middleware'
    

> Default: `createJSONStorage(() => localStorage)`

Enables you to use your own storage. Simply pass a function that returns the storage you want to use. It's recommended to use the [`createJSONStorage`](#createjsonstorage) helper function to create a `storage` object that is compliant with the `StateStorage` interface.

Example:

    import { persist, createJSONStorage } from 'zustand/middleware'
    
    export const useBoundStore = create(
      persist(
        (set, get) => ({
          // ...
        }),
        {
          // ...
          storage: createJSONStorage(() => AsyncStorage),
        },
      ),
    )
    

[

### `partialize`

](#partialize)

> Type: `(state: Object) => Object`

> Default: `(state) => state`

Enables you to pick some of the state's fields to be stored in the storage.

You could omit multiple fields using the following:

    export const useBoundStore = create(
      persist(
        (set, get) => ({
          foo: 0,
          bar: 1,
        }),
        {
          // ...
          partialize: (state) =>
            Object.fromEntries(
              Object.entries(state).filter(([key]) => !['foo'].includes(key)),
            ),
        },
      ),
    )
    

Or you could allow only specific fields using the following:

    export const useBoundStore = create(
      persist(
        (set, get) => ({
          foo: 0,
          bar: 1,
        }),
        {
          // ...
          partialize: (state) => ({ foo: state.foo }),
        },
      ),
    )
    

[

### `onRehydrateStorage`

](#onrehydratestorage)

> Type: `(state: Object) => ((state?: Object, error?: Error) => void) | void`

This option enables you to pass a listener function that will be called when the storage is hydrated.

Example:

    export const useBoundStore = create(
      persist(
        (set, get) => ({
          // ...
        }),
        {
          // ...
          onRehydrateStorage: (state) => {
            console.log('hydration starts')
    
            // optional
            return (state, error) => {
              if (error) {
                console.log('an error happened during hydration', error)
              } else {
                console.log('hydration finished')
              }
            }
          },
        },
      ),
    )
    

[

### `version`

](#version)

> Type: `number`

> Default: `0`

If you want to introduce a breaking change in your storage (e.g. renaming a field), you can specify a new version number. By default, if the version in the storage does not match the version in the code, the stored value won't be used. You can use the [migrate](#migrate) function (see below) to handle breaking changes in order to persist previously stored data.

[

### `migrate`

](#migrate)

> Type: `(persistedState: Object, version: number) => Object | Promise<Object>`

> Default: `(persistedState) => persistedState`

You can use this option to handle versions migration. The migrate function takes the persisted state and the version number as arguments. It must return a state that is compliant to the latest version (the version in the code).

For instance, if you want to rename a field, you can use the following:

    export const useBoundStore = create(
      persist(
        (set, get) => ({
          newField: 0, // let's say this field was named otherwise in version 0
        }),
        {
          // ...
          version: 1, // a migration will be triggered if the version in the storage mismatches this one
          migrate: (persistedState, version) => {
            if (version === 0) {
              // if the stored value is in version 0, we rename the field to the new name
              persistedState.newField = persistedState.oldField
              delete persistedState.oldField
            }
    
            return persistedState
          },
        },
      ),
    )
    

[

### `merge`

](#merge)

> Type: `(persistedState: Object, currentState: Object) => Object`

> Default: `(persistedState, currentState) => ({ ...currentState, ...persistedState })`

In some cases, you might want to use a custom merge function to merge the persisted value with the current state.

By default, the middleware does a shallow merge. The shallow merge might not be enough if you have partially persisted nested objects. For instance, if the storage contains the following:

But your Zustand store contains:

    {
      foo: {
        bar: 0,
        baz: 1,
      }
    }
    

The shallow merge will erase the `baz` field from the `foo` object. One way to fix this would be to give a custom deep merge function:

    export const useBoundStore = create(
      persist(
        (set, get) => ({
          foo: {
            bar: 0,
            baz: 1,
          },
        }),
        {
          // ...
          merge: (persistedState, currentState) =>
            deepMerge(currentState, persistedState),
        },
      ),
    )
    

[

### `skipHydration`

](#skiphydration)

> Type: `boolean | undefined`

> Default: `undefined`

By default the store will be hydrated on initialization.

In some applications you may need to control when the first hydration occurs. For example, in server-rendered apps.

If you set `skipHydration`, the initial call for hydration isn't called, and it is left up to you to manually call `rehydrate()`.

    export const useBoundStore = create(
      persist(
        () => ({
          count: 0,
          // ...
        }),
        {
          // ...
          skipHydration: true,
        },
      ),
    )
    

    import { useBoundStore } from './path-to-store';
    
    export function StoreConsumer() {
      // hydrate persisted store after on mount
      useEffect(() => {
        useBoundStore.persist.rehydrate();
      }, [])
    
      return (
        //...
      )
    }
    

[

API
---

](#api)

> Version: >=3.6.3

The Persist API enables you to do a number of interactions with the Persist middleware from inside or outside of a React component.

[

### `getOptions`

](#getoptions)

> Type: `() => Partial<PersistOptions>`

> Returns: Options of the Persist middleware

For example, it can be used to obtain the storage name:

    useBoundStore.persist.getOptions().name
    

[

### `setOptions`

](#setoptions)

> Type: `(newOptions: Partial<PersistOptions>) => void`

Changes the middleware options. Note that the new options will be merged with the current ones.

For instance, this can be used to change the storage name:

    useBoundStore.persist.setOptions({
      name: 'new-name',
    })
    

Or even to change the storage engine:

    useBoundStore.persist.setOptions({
      storage: createJSONStorage(() => sessionStorage),
    })
    

[

### `clearStorage`

](#clearstorage)

> Type: `() => void`

Clears everything stored under the [name](#name) key.

    useBoundStore.persist.clearStorage()
    

[

### `rehydrate`

](#rehydrate)

> Type: `() => Promise<void>`

In some cases, you might want to trigger the rehydration manually. This can be done by calling the `rehydrate` method.

    await useBoundStore.persist.rehydrate()
    

[

### `hasHydrated`

](#hashydrated)

> Type: `() => boolean`

This is a non-reactive getter to check if the storage has been hydrated (note that it updates when calling [`rehydrate`](#rehydrate)).

    useBoundStore.persist.hasHydrated()
    

[

### `onHydrate`

](#onhydrate)

> Type: `(listener: (state) => void) => () => void`

> Returns: Unsubscribe function

This listener will be called when the hydration process starts.

    const unsub = useBoundStore.persist.onHydrate((state) => {
      console.log('hydration starts')
    })
    
    // later on...
    unsub()
    

[

### `onFinishHydration`

](#onfinishhydration)

> Type: `(listener: (state) => void) => () => void`

> Returns: Unsubscribe function

This listener will be called when the hydration process ends.

    const unsub = useBoundStore.persist.onFinishHydration((state) => {
      console.log('hydration finished')
    })
    
    // later on...
    unsub()
    

[

### `createJSONStorage`

](#createjsonstorage)

> Type: `(getStorage: () => StateStorage, options?: JsonStorageOptions) => StateStorage`

> Returns: `PersistStorage`

This helper function enables you to create a [`storage`](#storage) object which is useful when you want to use a custom storage engine.

`getStorage` is a function that returns the storage engine with the properties `getItem`, `setItem`, and `removeItem`.

`options` is an optional object that can be used to customize the serialization and deserialization of the data. `options.reviver` is a function that is passed to `JSON.parse` to deserialize the data. `options.replacer` is a function that is passed to `JSON.stringify` to serialize the data.

    import { createJSONStorage } from 'zustand/middleware'
    
    const storage = createJSONStorage(() => sessionStorage, {
      reviver: (key, value) => {
        if (value && value.type === 'date') {
          return new Date(value)
        }
        return value
      },
      replacer: (key, value) => {
        if (value instanceof Date) {
          return { type: 'date', value: value.toISOString() }
        }
        return value
      },
    })
    

[

Hydration and asynchronous storages
-----------------------------------

](#hydration-and-asynchronous-storages)

To explain what is the "cost" of asynchronous storages, you need to understand what is hydration.

In a nutshell, hydration is a process of retrieving persisted state from the storage and merging it with the current state.

The Persist middleware does two kinds of hydration: synchronous and asynchronous. If the given storage is synchronous (e.g., `localStorage`), hydration will be done synchronously. On the other hand, if the given storage is asynchronous (e.g., `AsyncStorage`), hydration will be done asynchronously (shocking, I know!).

But what's the catch? With synchronous hydration, the Zustand store will already have been hydrated at its creation. In contrast, with asynchronous hydration, the Zustand store will be hydrated later on, in a microtask.

Why does it matter? Asynchronous hydration can cause some unexpected behaviors. For instance, if you use Zustand in a React app, the store will **not** be hydrated at the initial render. In cases where your app depends on the persisted value at page load, you might want to wait until the store has been hydrated before showing anything. For example, your app might think the user is not logged in because it's the default, but in reality the store has not been hydrated yet.

If your app does depends on the persisted state at page load, see [_How can I check if my store has been hydrated_](#how-can-i-check-if-my-store-has-been-hydrated) in the [FAQ](#faq) section below.

[

### Usage in Next.js

](#usage-in-next.js)

NextJS uses Server Side Rendering, and it will compare the rendered component on the server with the one rendered on client. But since you are using data from browser to change your component, the two renders will differ and Next will throw a warning at you.

The errors usually are:

*   Text content does not match server-rendered HTML
*   Hydration failed because the initial UI does not match what was rendered on the server
*   There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering

To solve these errors, create a custom hook so that Zustand waits a little before changing your components.

Create a file with the following:

    // useStore.ts
    import { useState, useEffect } from 'react'
    
    const useStore = <T, F>(
      store: (callback: (state: T) => unknown) => unknown,
      callback: (state: T) => F,
    ) => {
      const result = store(callback) as F
      const [data, setData] = useState<F>()
    
      useEffect(() => {
        setData(result)
      }, [result])
    
      return data
    }
    
    export default useStore
    

Now in your pages, you will use the hook a little bit differently:

    // useBearStore.ts
    
    import { create } from 'zustand'
    import { persist } from 'zustand/middleware'
    
    // the store itself does not need any change
    export const useBearStore = create(
      persist(
        (set, get) => ({
          bears: 0,
          addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
          name: 'food-storage',
        },
      ),
    )
    

    // yourComponent.tsx
    
    import useStore from './useStore'
    import { useBearStore } from './stores/useBearStore'
    
    const bears = useStore(useBearStore, (state) => state.bears)
    

Credits: [This reply to an issue](https://github.com/pmndrs/zustand/issues/938#issuecomment-1481801942), which points to [this blog post](https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5).

[

FAQ
---

](#faq)[

### How can I check if my store has been hydrated

](#how-can-i-check-if-my-store-has-been-hydrated)

There are a few different ways to do this.

You can use the [`onRehydrateStorage`](#onrehydratestorage) listener function to update a field in the store:

    const useBoundStore = create(
      persist(
        (set, get) => ({
          // ...
          _hasHydrated: false,
          setHasHydrated: (state) => {
            set({
              _hasHydrated: state
            });
          }
        }),
        {
          // ...
          onRehydrateStorage: (state) => {
            return () => state.setHasHydrated(true)
          }
        }
      )
    );
    
    export default function App() {
      const hasHydrated = useBoundStore(state => state._hasHydrated);
    
      if (!hasHydrated) {
        return <p>Loading...</p>
      }
    
      return (
        // ...
      );
    }
    

You can also create a custom `useHydration` hook:

    const useBoundStore = create(persist(...))
    
    const useHydration = () => {
      const [hydrated, setHydrated] = useState(false)
    
      useEffect(() => {
        // Note: This is just in case you want to take into account manual rehydration.
        // You can remove the following line if you don't need it.
        const unsubHydrate = useBoundStore.persist.onHydrate(() => setHydrated(false))
    
        const unsubFinishHydration = useBoundStore.persist.onFinishHydration(() => setHydrated(true))
    
        setHydrated(useBoundStore.persist.hasHydrated())
    
        return () => {
          unsubHydrate()
          unsubFinishHydration()
        }
      }, [])
    
      return hydrated
    }
    

[

### How can I use a custom storage engine

](#how-can-i-use-a-custom-storage-engine)

If the storage you want to use does not match the expected API, you can create your own storage:

    import { create } from 'zustand'
    import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
    import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.
    
    // Custom storage object
    const storage: StateStorage = {
      getItem: async (name: string): Promise<string | null> => {
        console.log(name, 'has been retrieved')
        return (await get(name)) || null
      },
      setItem: async (name: string, value: string): Promise<void> => {
        console.log(name, 'with value', value, 'has been saved')
        await set(name, value)
      },
      removeItem: async (name: string): Promise<void> => {
        console.log(name, 'has been deleted')
        await del(name)
      },
    }
    
    export const useBoundStore = create(
      persist(
        (set, get) => ({
          bears: 0,
          addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
          name: 'food-storage', // unique name
          storage: createJSONStorage(() => storage),
        },
      ),
    )
    

If you're using a type that `JSON.stringify()` doesn't support, you'll need to write your own serialization/deserialization code. However, if this is tedious, you can use third-party libraries to serialize and deserialize different types of data.

For example, [Superjson](https://github.com/blitz-js/superjson) can serialize data along with its type, allowing the data to be parsed back to its original type upon deserialization

    import superjson from 'superjson' //  can use anything: serialize-javascript, devalue, etc.
    import { PersistStorage } from 'zustand/middleware'
    
    interface BearState {
      bear: Map<string, string>
      fish: Set<string>
      time: Date
      query: RegExp
    }
    
    const storage: PersistStorage<BearState> = {
      getItem: (name) => {
        const str = localStorage.getItem(name)
        if (!str) return null
        return superjson.parse(str)
      },
      setItem: (name, value) => {
        localStorage.setItem(name, superjson.stringify(value))
      },
      removeItem: (name) => localStorage.removeItem(name),
    }
    
    const initialState: BearState = {
      bear: new Map(),
      fish: new Set(),
      time: new Date(),
      query: new RegExp(''),
    }
    
    export const useBearStore = create<BearState>()(
      persist(
        (set) => ({
          ...initialState,
          // ...
        }),
        {
          name: 'food-storage',
          storage,
        },
      ),
    )
    

[

### How can I rehydrate on storage event

](#how-can-i-rehydrate-on-storage-event)

You can use the Persist API to create your own implementation, similar to the example below:

    type StoreWithPersist = Mutate<StoreApi<State>, [["zustand/persist", unknown]]>
    
    export const withStorageDOMEvents = (store: StoreWithPersist) => {
      const storageEventCallback = (e: StorageEvent) => {
        if (e.key === store.persist.getOptions().name && e.newValue) {
          store.persist.rehydrate()
        }
      }
    
      window.addEventListener('storage', storageEventCallback)
    
      return () => {
        window.removeEventListener('storage', storageEventCallback)
      }
    }
    
    const useBoundStore = create(persist(...))
    withStorageDOMEvents(useBoundStore)
    

[

### How do I use it with TypeScript

](#how-do-i-use-it-with-typescript)

Basic typescript usage doesn't require anything special except for writing `create<State>()(...)` instead of `create(...)`.

    import { create } from 'zustand'
    import { persist, createJSONStorage } from 'zustand/middleware'
    
    interface MyState {
      bears: number
      addABear: () => void
    }
    
    export const useBearStore = create<MyState>()(
      persist(
        (set, get) => ({
          bears: 0,
          addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
          name: 'food-storage', // name of item in the storage (must be unique)
          storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
          partialize: (state) => ({ bears: state.bears }),
        },
      ),
    )
    

[

### How do I use it with Map and Set

](#how-do-i-use-it-with-map-and-set)

In order to persist object types such as `Map` and `Set`, they will need to be converted to JSON-serializable types such as an `Array` which can be done by defining a custom `storage` engine.

Let's say your state uses `Map` to handle a list of `transactions`, then you can convert the `Map` into an `Array` in the `storage` prop which is shown below:

    
    interface BearState {
      .
      .
      .
      transactions: Map<any>
    }
    
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const existingValue = JSON.parse(str);
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              transactions: new Map(existingValue.state.transactions),
            }
          }
        },
        setItem: (name, newValue: StorageValue<BearState>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              transactions: Array.from(newValue.state.transactions.entries()),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
      },</content>
</page>

<page>
  <title>Immutable state and merging - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/immutable-state-and-merging</url>
  <content>Like with React's `useState`, we need to update state immutably.

Here's a typical example:

    import { create } from 'zustand'
    
    const useCountStore = create((set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }))
    

The `set` function is to update state in the store. Because the state is immutable, it should have been like this:

    set((state) => ({ ...state, count: state.count + 1 }))
    

However, as this is a common pattern, `set` actually merges state, and we can skip the `...state` part:

    set((state) => ({ count: state.count + 1 }))
    

[

Nested objects
--------------

](#nested-objects)

The `set` function merges state at only one level. If you have a nested object, you need to merge them explicitly. You will use the spread operator pattern like so:

    import { create } from 'zustand'
    
    const useCountStore = create((set) => ({
      nested: { count: 0 },
      inc: () =>
        set((state) => ({
          nested: { ...state.nested, count: state.nested.count + 1 },
        })),
    }))
    

For complex use cases, consider using some libraries that help with immutable updates. You can refer to [Updating nested state object values](https://zustand.docs.pmnd.rs/guides/updating-state#deeply-nested-object).

[

Replace flag
------------

](#replace-flag)

To disable the merging behavior, you can specify a `replace` boolean value for `set` like so:

    set((state) => newState, true)</content>
</page>

<page>
  <title>Flux inspired practice - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/flux-inspired-practice</url>
  <content>Although Zustand is an unopinionated library, we do recommend a few patterns. These are inspired by practices originally found in [Flux](https://github.com/facebookarchive/flux), and more recently [Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles), so if you are coming from another library, you should feel right at home.

However, Zustand does differ in some fundamental ways, so some terminology may not perfectly align to other libraries.

[

Recommended patterns
--------------------

](#recommended-patterns)[

### Single store

](#single-store)

Your applications global state should be located in a single Zustand store.

If you have a large application, Zustand supports [splitting the store into slices](https://zustand.docs.pmnd.rs/guides/slices-pattern).

[

### Use `set` / `setState` to update the store

](#use-set-/-setstate-to-update-the-store)

Always use `set` (or `setState`) to perform updates to your store. `set` (and `setState`) ensures the described update is correctly merged and listeners are appropriately notified.

[

### Colocate store actions

](#colocate-store-actions)

In Zustand, state can be updated without the use of dispatched actions and reducers found in other Flux libraries. These store actions can be added directly to the store as shown below.

Optionally, by using `setState` they can be [located external to the store](https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions)

    const useBoundStore = create((set) => ({
      storeSliceA: ...,
      storeSliceB: ...,
      storeSliceC: ...,
      updateX: () => set(...),
      updateY: () => set(...),
    }))
    

[

Redux-like patterns
-------------------

](#redux-like-patterns)

If you can't live without Redux-like reducers, you can define a `dispatch` function on the root level of the store:

    const types = { increase: 'INCREASE', decrease: 'DECREASE' }
    
    const reducer = (state, { type, by = 1 }) => {
      switch (type) {
        case types.increase:
          return { grumpiness: state.grumpiness + by }
        case types.decrease:
          return { grumpiness: state.grumpiness - by }
      }
    }
    
    const useGrumpyStore = create((set) => ({
      grumpiness: 0,
      dispatch: (args) => set((state) => reducer(state, args)),
    }))
    
    const dispatch = useGrumpyStore((state) => state.dispatch)
    dispatch({ type: types.increase, by: 2 })
    

You could also use our redux-middleware. It wires up your main reducer, sets initial state, and adds a dispatch function to the state itself and the vanilla api.

    import { redux } from 'zustand/middleware'
    
    const useReduxStore = create(redux(reducer, initialState))
    

Another way to update the store could be through functions wrapping the state functions. These could also handle side-effects of actions. For example, with HTTP-calls. To use Zustand in a non-reactive way, see [the readme](https://github.com/pmndrs/zustand#readingwriting-state-and-reacting-to-changes-outside-of-components).</content>
</page>

<page>
  <title>Auto Generating Selectors - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/auto-generating-selectors</url>
  <content>We recommend using selectors when using either the properties or actions from the store. You can access values from the store like so:

    const bears = useBearStore((state) => state.bears)
    

However, writing these could be tedious. If that is the case for you, you can auto-generate your selectors.

[

Create the following function: `createSelectors`
------------------------------------------------

](#create-the-following-function:-createselectors)

    import { StoreApi, UseBoundStore } from 'zustand'
    
    type WithSelectors<S> = S extends { getState: () => infer T }
      ? S & { use: { [K in keyof T]: () => T[K] } }
      : never
    
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
      _store: S,
    ) => {
      let store = _store as WithSelectors<typeof _store>
      store.use = {}
      for (let k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
      }
    
      return store
    }
    

If you have a store like this:

    interface BearState {
      bears: number
      increase: (by: number) => void
      increment: () => void
    }
    
    const useBearStoreBase = create<BearState>()((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
      increment: () => set((state) => ({ bears: state.bears + 1 })),
    }))
    

Apply that function to your store:

    const useBearStore = createSelectors(useBearStoreBase)
    

Now the selectors are auto generated and you can access them directly:

    // get the property
    const bears = useBearStore.use.bears()
    
    // get the action
    const increment = useBearStore.use.increment()
    

[

Vanilla Store
-------------

](#vanilla-store)

If you are using a vanilla store, use the following `createSelectors` function:

    import { StoreApi, useStore } from 'zustand'
    
    type WithSelectors<S> = S extends { getState: () => infer T }
      ? S & { use: { [K in keyof T]: () => T[K] } }
      : never
    
    const createSelectors = <S extends StoreApi<object>>(_store: S) => {
      const store = _store as WithSelectors<typeof _store>
      store.use = {}
      for (const k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () =>
          useStore(_store, (s) => s[k as keyof typeof s])
      }
    
      return store
    }
    

The usage is the same as a React store. If you have a store like this:

    import { createStore } from 'zustand'
    
    interface BearState {
      bears: number
      increase: (by: number) => void
      increment: () => void
    }
    
    const store = createStore<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
      increment: () => set((state) => ({ bears: state.bears + 1 })),
    }))
    

Apply that function to your store:

    const useBearStore = createSelectors(store)
    

Now the selectors are auto generated and you can access them directly:

    // get the property
    const bears = useBearStore.use.bears()
    
    // get the action
    const increment = useBearStore.use.increment()
    

[

Live Demo
---------

](#live-demo)

For a working example of this, see the [Code Sandbox](https://codesandbox.io/s/zustand-auto-generate-selectors-forked-rl8v5e?file=/src/selectors.ts).

[

Third-party Libraries
---------------------

](#third-party-libraries)

*   [auto-zustand-selectors-hook](https://github.com/Albert-Gao/auto-zustand-selectors-hook)
*   [react-hooks-global-state](https://github.com/dai-shi/react-hooks-global-state)
*   [zustood](https://github.com/udecode/zustood)
*   [@davstack/store](https://github.com/DawidWraga/davstack)</content>
</page>

<page>
  <title>Practice with no store actions - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions</url>
  <content>The recommended usage is to colocate actions and states within the store (let your actions be located together with your state).

For example:

    export const useBoundStore = create((set) => ({
      count: 0,
      text: 'hello',
      inc: () => set((state) => ({ count: state.count + 1 })),
      setText: (text) => set({ text }),
    }))
    

This creates a self-contained store with data and actions together.

* * *

An alternative approach is to define actions at module level, external to the store.

    export const useBoundStore = create(() => ({
      count: 0,
      text: 'hello',
    }))
    
    export const inc = () =>
      useBoundStore.setState((state) => ({ count: state.count + 1 }))
    
    export const setText = (text) => useBoundStore.setState({ text })
    

This has a few advantages:

*   It doesn't require a hook to call an action;
*   It facilitates code splitting.

While this pattern doesn't offer any downsides, some may prefer colocating due to its encapsulated nature.</content>
</page>

<page>
  <title>Testing - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/testing</url>
  <content>Writing Tests

[

Setting Up a Test Environment
-----------------------------

](#setting-up-a-test-environment)[

### Test Runners

](#test-runners)

Usually, your test runner needs to be configured to run JavaScript/TypeScript syntax. If you're going to be testing UI components, you will likely need to configure the test runner to use JSDOM to provide a mock DOM environment.

See these resources for test runner configuration instructions:

*   **Jest**
    
    *   [Jest: Getting Started](https://jestjs.io/docs/getting-started)
    *   [Jest: Configuration - Test Environment](https://jestjs.io/docs/configuration#testenvironment-string)
    
*   **Vitest**
    
    *   [Vitest: Getting Started](https://vitest.dev/guide)
    *   [Vitest: Configuration - Test Environment](https://vitest.dev/config/#environment)
    

[

### UI and Network Testing Tools

](#ui-and-network-testing-tools)

**We recommend using [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) to test out React components that connect to Zustand**. RTL is a simple and complete React DOM testing utility that encourages good testing practices. It uses ReactDOM's `render` function and `act` from `react-dom/tests-utils`. Futhermore, [Native Testing Library (RNTL)](https://testing-library.com/docs/react-native-testing-library/intro) is the alternative to RTL to test out React Native components. The [Testing Library](https://testing-library.com/) family of tools also includes adapters for many other popular frameworks.

We also recommend using [Mock Service Worker (MSW)](https://mswjs.io/) to mock network requests, as this means your application logic does not need to be changed or mocked when writing tests.

*   **React Testing Library (DOM)**
    
    *   [DOM Testing Library: Setup](https://testing-library.com/docs/dom-testing-library/setup)
    *   [React Testing Library: Setup](https://testing-library.com/docs/react-testing-library/setup)
    *   [Testing Library Jest-DOM Matchers](https://testing-library.com/docs/ecosystem-jest-dom)
    
*   **Native Testing Library (React Native)**
    
    *   [Native Testing Library: Setup](https://testing-library.com/docs/react-native-testing-library/setup)
    
*   **User Event Testing Library (DOM)**
    
    *   [User Event Testing Library: Setup](https://testing-library.com/docs/user-event/setup)
    
*   **TypeScript for Jest**
    
    *   [TypeScript for Jest: Setup](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)
    
*   **TypeScript for Node**
    
    *   [TypeScript for Node: Setup](https://typestrong.org/ts-node/docs/installation)
    
*   **Mock Service Worker**
    
    *   [MSW: Installation](https://mswjs.io/docs/getting-started/install)
    *   [MSW: Setting up mock requests](https://mswjs.io/docs/getting-started/mocks/rest-api)
    *   [MSW: Mock server configuration for Node](https://mswjs.io/docs/getting-started/integrate/node)
    

[

Setting Up Zustand for testing
------------------------------

](#setting-up-zustand-for-testing)

> **Note**: Since Jest and Vitest have slight differences, like Vitest using **ES modules** and Jest using **CommonJS modules**, you need to keep that in mind if you are using Vitest instead of Jest.

The mock provided below will enable the relevant test runner to reset the zustand stores after each test.

[

### Shared code just for testing purposes

](#shared-code-just-for-testing-purposes)

This shared code was added to avoid code duplication in our demo since we use the same counter store creator for both implementations, with and without `Context` API — `createStore` and `create`, respectively.

    // shared/counter-store-creator.ts
    import { type StateCreator } from 'zustand'
    
    export type CounterStore = {
      count: number
      inc: () => void
    }
    
    export const counterStoreCreator: StateCreator<CounterStore> = (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
    })
    

[

### Jest

](#jest)

In the next steps we are going to setup our Jest environment in order to mock Zustand.

    // __mocks__/zustand.ts
    import { act } from '@testing-library/react'
    import type * as ZustandExportedTypes from 'zustand'
    export * from 'zustand'
    
    const { create: actualCreate, createStore: actualCreateStore } =
      jest.requireActual<typeof ZustandExportedTypes>('zustand')
    
    // a variable to hold reset functions for all stores declared in the app
    export const storeResetFns = new Set<() => void>()
    
    const createUncurried = <T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      const store = actualCreate(stateCreator)
      const initialState = store.getInitialState()
      storeResetFns.add(() => {
        store.setState(initialState, true)
      })
      return store
    }
    
    // when creating a store, we get its initial state, create a reset function and add it in the set
    export const create = (<T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      console.log('zustand create mock')
    
      // to support curried version of create
      return typeof stateCreator === 'function'
        ? createUncurried(stateCreator)
        : createUncurried
    }) as typeof ZustandExportedTypes.create
    
    const createStoreUncurried = <T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      const store = actualCreateStore(stateCreator)
      const initialState = store.getInitialState()
      storeResetFns.add(() => {
        store.setState(initialState, true)
      })
      return store
    }
    
    // when creating a store, we get its initial state, create a reset function and add it in the set
    export const createStore = (<T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      console.log('zustand createStore mock')
    
      // to support curried version of createStore
      return typeof stateCreator === 'function'
        ? createStoreUncurried(stateCreator)
        : createStoreUncurried
    }) as typeof ZustandExportedTypes.createStore
    
    // reset all stores after each test run
    afterEach(() => {
      act(() => {
        storeResetFns.forEach((resetFn) => {
          resetFn()
        })
      })
    })
    

    // setup-jest.ts
    import '@testing-library/jest-dom'
    

    // jest.config.ts
    import type { JestConfigWithTsJest } from 'ts-jest'
    
    const config: JestConfigWithTsJest = {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['./setup-jest.ts'],
    }
    
    export default config
    

> **Note**: to use TypeScript we need to install two packages `ts-jest` and `ts-node`.

[

### Vitest

](#vitest)

In the next steps we are going to setup our Vitest environment in order to mock Zustand.

> **Warning:** In Vitest you can change the [root](https://vitest.dev/config/#root). Due to that, you need make sure that you are creating your `__mocks__` directory in the right place. Let's say that you change the **root** to `./src`, that means you need to create a `__mocks__` directory under `./src`. The end result would be `./src/__mocks__`, rather than `./__mocks__`. Creating `__mocks__` directory in the wrong place can lead to issues when using Vitest.

    // __mocks__/zustand.ts
    import { act } from '@testing-library/react'
    import type * as ZustandExportedTypes from 'zustand'
    export * from 'zustand'
    
    const { create: actualCreate, createStore: actualCreateStore } =
      await vi.importActual<typeof ZustandExportedTypes>('zustand')
    
    // a variable to hold reset functions for all stores declared in the app
    export const storeResetFns = new Set<() => void>()
    
    const createUncurried = <T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      const store = actualCreate(stateCreator)
      const initialState = store.getInitialState()
      storeResetFns.add(() => {
        store.setState(initialState, true)
      })
      return store
    }
    
    // when creating a store, we get its initial state, create a reset function and add it in the set
    export const create = (<T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      console.log('zustand create mock')
    
      // to support curried version of create
      return typeof stateCreator === 'function'
        ? createUncurried(stateCreator)
        : createUncurried
    }) as typeof ZustandExportedTypes.create
    
    const createStoreUncurried = <T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      const store = actualCreateStore(stateCreator)
      const initialState = store.getInitialState()
      storeResetFns.add(() => {
        store.setState(initialState, true)
      })
      return store
    }
    
    // when creating a store, we get its initial state, create a reset function and add it in the set
    export const createStore = (<T>(
      stateCreator: ZustandExportedTypes.StateCreator<T>,
    ) => {
      console.log('zustand createStore mock')
    
      // to support curried version of createStore
      return typeof stateCreator === 'function'
        ? createStoreUncurried(stateCreator)
        : createStoreUncurried
    }) as typeof ZustandExportedTypes.createStore
    
    // reset all stores after each test run
    afterEach(() => {
      act(() => {
        storeResetFns.forEach((resetFn) => {
          resetFn()
        })
      })
    })
    

> **Note**: without [globals configuration](https://vitest.dev/config/#globals) enabled, we need to add `import { afterEach, vi } from 'vitest'` at the top.

    // global.d.ts
    /// <reference types="vite/client" />
    /// <reference types="vitest/globals" />
    

> **Note**: without [globals configuration](https://vitest.dev/config/#globals) enabled, we do need to remove `/// <reference types="vitest/globals" />`.

    // setup-vitest.ts
    import '@testing-library/jest-dom'
    
    vi.mock('zustand') // to make it work like Jest (auto-mocking)
    

> **Note**: without [globals configuration](https://vitest.dev/config/#globals) enabled, we need to add `import { vi } from 'vitest'` at the top.

    // vitest.config.ts
    import { defineConfig, mergeConfig } from 'vitest/config'
    import viteConfig from './vite.config'
    
    export default mergeConfig(
      viteConfig,
      defineConfig({
        test: {
          globals: true,
          environment: 'jsdom',
          setupFiles: ['./setup-vitest.ts'],
        },
      }),
    )
    

[

### Testing components

](#testing-components)

In the next examples we are going to use `useCounterStore`

> **Note**: all of these examples are written using TypeScript.

    // shared/counter-store-creator.ts
    import { type StateCreator } from 'zustand'
    
    export type CounterStore = {
      count: number
      inc: () => void
    }
    
    export const counterStoreCreator: StateCreator<CounterStore> = (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
    })
    

    // stores/use-counter-store.ts
    import { create } from 'zustand'
    
    import {
      type CounterStore,
      counterStoreCreator,
    } from '../shared/counter-store-creator'
    
    export const useCounterStore = create<CounterStore>()(counterStoreCreator)
    

    // contexts/use-counter-store-context.tsx
    import { type ReactNode, createContext, useContext, useRef } from 'react'
    import { createStore } from 'zustand'
    import { useStoreWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/shallow'
    
    import {
      type CounterStore,
      counterStoreCreator,
    } from '../shared/counter-store-creator'
    
    export const createCounterStore = () => {
      return createStore<CounterStore>(counterStoreCreator)
    }
    
    export type CounterStoreApi = ReturnType<typeof createCounterStore>
    
    export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
      undefined,
    )
    
    export interface CounterStoreProviderProps {
      children: ReactNode
    }
    
    export const CounterStoreProvider = ({
      children,
    }: CounterStoreProviderProps) => {
      const counterStoreRef = useRef<CounterStoreApi>(null)
      if (!counterStoreRef.current) {
        counterStoreRef.current = createCounterStore()
      }
    
      return (
        <CounterStoreContext.Provider value={counterStoreRef.current}>
          {children}
        </CounterStoreContext.Provider>
      )
    }
    
    export type UseCounterStoreContextSelector<T> = (store: CounterStore) => T
    
    export const useCounterStoreContext = <T,>(
      selector: UseCounterStoreContextSelector<T>,
    ): T => {
      const counterStoreContext = useContext(CounterStoreContext)
    
      if (counterStoreContext === undefined) {
        throw new Error(
          'useCounterStoreContext must be used within CounterStoreProvider',
        )
      }
    
      return useStoreWithEqualityFn(counterStoreContext, selector, shallow)
    }
    

    // components/counter/counter.tsx
    import { useCounterStore } from '../../stores/use-counter-store'
    
    export function Counter() {
      const { count, inc } = useCounterStore()
    
      return (
        <div>
          <h2>Counter Store</h2>
          <h4>{count}</h4>
          <button onClick={inc}>One Up</button>
        </div>
      )
    }
    

    // components/counter/index.ts
    export * from './counter'
    

    // components/counter/counter.test.tsx
    import { act, render, screen } from '@testing-library/react'
    import userEvent from '@testing-library/user-event'
    
    import { Counter } from './counter'
    
    describe('Counter', () => {
      test('should render with initial state of 1', async () => {
        renderCounter()
    
        expect(await screen.findByText(/^1$/)).toBeInTheDocument()
        expect(
          await screen.findByRole('button', { name: /one up/i }),
        ).toBeInTheDocument()
      })
    
      test('should increase count by clicking a button', async () => {
        const user = userEvent.setup()
    
        renderCounter()
    
        expect(await screen.findByText(/^1$/)).toBeInTheDocument()
    
        await act(async () => {
          await user.click(await screen.findByRole('button', { name: /one up/i }))
        })
    
        expect(await screen.findByText(/^2$/)).toBeInTheDocument()
      })
    })
    
    const renderCounter = () => {
      return render(<Counter />)
    }
    

    // components/counter-with-context/counter-with-context.tsx
    import {
      CounterStoreProvider,
      useCounterStoreContext,
    } from '../../contexts/use-counter-store-context'
    
    const Counter = () => {
      const { count, inc } = useCounterStoreContext((state) => state)
    
      return (
        <div>
          <h2>Counter Store Context</h2>
          <h4>{count}</h4>
          <button onClick={inc}>One Up</button>
        </div>
      )
    }
    
    export const CounterWithContext = () => {
      return (
        <CounterStoreProvider>
          <Counter />
        </CounterStoreProvider>
      )
    }
    

    // components/counter-with-context/index.ts
    export * from './counter-with-context'
    

    // components/counter-with-context/counter-with-context.test.tsx
    import { act, render, screen } from '@testing-library/react'
    import userEvent from '@testing-library/user-event'
    
    import { CounterWithContext } from './counter-with-context'
    
    describe('CounterWithContext', () => {
      test('should render with initial state of 1', async () => {
        renderCounterWithContext()
    
        expect(await screen.findByText(/^1$/)).toBeInTheDocument()
        expect(
          await screen.findByRole('button', { name: /one up/i }),
        ).toBeInTheDocument()
      })
    
      test('should increase count by clicking a button', async () => {
        const user = userEvent.setup()
    
        renderCounterWithContext()
    
        expect(await screen.findByText(/^1$/)).toBeInTheDocument()
    
        await act(async () => {
          await user.click(await screen.findByRole('button', { name: /one up/i }))
        })
    
        expect(await screen.findByText(/^2$/)).toBeInTheDocument()
      })
    })
    
    const renderCounterWithContext = () => {
      return render(<CounterWithContext />)
    }
    

> **Note**: without [globals configuration](https://vitest.dev/config/#globals) enabled, we need to add `import { describe, test, expect } from 'vitest'` at the top of each test file.

**CodeSandbox Demos**

*   Jest Demo: [https://stackblitz.com/edit/jest-zustand](https://stackblitz.com/edit/jest-zustand)
*   Vitest Demo: [https://stackblitz.com/edit/vitest-zustand](https://stackblitz.com/edit/vitest-zustand)

[

References
----------

](#references)

*   **React Testing Library**: [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) is a very lightweight solution for testing React components. It provides utility functions on top of `react-dom` and `react-dom/test-utils`, in a way that encourages better testing practices. Its primary guiding principle is: "The more your tests resemble the way your software is used, the more confidence they can give you."
*   **Native Testing Library**: [Native Testing Library (RNTL)](https://testing-library.com/docs/react-native-testing-library/intro) is a very lightweight solution for testing React Native components, similarly to RTL, but its functions are built on top of `react-test-renderer`.
*   **Testing Implementation Details**: Blog post by Kent C. Dodds on why he recommends to avoid [testing implementation details](https://kentcdodds.com/blog/testing-implementation-details).</content>
</page>

<page>
  <title>Calling actions outside a React event handler in pre React 18 - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/event-handler-in-pre-react-18</url>
  <content>Because React handles `setState` synchronously if it's called outside an event handler, updating the state outside an event handler will force react to update the components synchronously. Therefore, there is a risk of encountering the zombie-child effect. In order to fix this, the action needs to be wrapped in `unstable_batchedUpdates` like so:

    import { unstable_batchedUpdates } from 'react-dom' // or 'react-native'
    
    const useFishStore = create((set) => ({
      fishes: 0,
      increaseFishes: () => set((prev) => ({ fishes: prev.fishes + 1 })),
    }))
    
    const nonReactCallback = () => {
      unstable_batchedUpdates(() => {
        useFishStore.getState().increaseFishes()
      })
    }
    

More details: [https://github.com/pmndrs/zustand/issues/302](https://github.com/pmndrs/zustand/issues/302)</content>
</page>

<page>
  <title>Map and Set Usage - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/maps-and-sets-usage</url>
  <content>You need to wrap Maps and Sets inside an object. When you want its update to be reflected (e.g. in React), you do it by calling `setState` on it:

**You can view a codesandbox here: [https://codesandbox.io/s/late-https-bxz9qy](https://codesandbox.io/s/late-https-bxz9qy)**

    import { create } from 'zustand'
    
    const useFooBar = create(() => ({ foo: new Map(), bar: new Set() }))
    
    function doSomething() {
      // doing something...
    
      // If you want to update some React component that uses `useFooBar`, you have to call setState
      // to let React know that an update happened.
      // Following React's best practices, you should create a new Map/Set when updating them:
      useFooBar.setState((prev) => ({
        foo: new Map(prev.foo).set('newKey', 'newValue'),
        bar: new Set(prev.bar).add('newKey'),
      }))
    }</content>
</page>

<page>
  <title>Connect to state with URL - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/connect-to-state-with-url-hash</url>
  <content>[

Connect State with URL Hash
---------------------------

](#connect-state-with-url-hash)

If you want to connect state of a store to URL hash, you can create your own hash storage.

    import { create } from 'zustand'
    import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'
    
    const hashStorage: StateStorage = {
      getItem: (key): string => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        const storedValue = searchParams.get(key) ?? ''
        return JSON.parse(storedValue)
      },
      setItem: (key, newValue): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.set(key, JSON.stringify(newValue))
        location.hash = searchParams.toString()
      },
      removeItem: (key): void => {
        const searchParams = new URLSearchParams(location.hash.slice(1))
        searchParams.delete(key)
        location.hash = searchParams.toString()
      },
    }
    
    export const useBoundStore = create(
      persist(
        (set, get) => ({
          fishes: 0,
          addAFish: () => set({ fishes: get().fishes + 1 }),
        }),
        {
          name: 'food-storage', // unique name
          storage: createJSONStorage(() => hashStorage),
        },
      ),
    )
    

[

### CodeSandbox Demo

](#codesandbox-demo)

[https://codesandbox.io/s/zustand-state-with-url-hash-demo-f29b88?file=/src/store/index.ts](https://codesandbox.io/s/zustand-state-with-url-hash-demo-f29b88?file=/src/store/index.ts)

[

Persist and Connect State with URL Parameters (Example: URL Query Parameters)
-----------------------------------------------------------------------------

](#persist-and-connect-state-with-url-parameters-\(example:-url-query-parameters\))

There are times when you want to conditionally connect the state to the URL. This example depicts usage of the URL query parameters while keeping it synced with another persistence implementation, like `localstorage`.

If you want the URL params to always populate, the conditional check on `getUrlSearch()` can be removed.

The implementation below will update the URL in place, without refresh, as the relevant states change.

    import { create } from 'zustand'
    import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'
    
    const getUrlSearch = () => {
      return window.location.search.slice(1)
    }
    
    const persistentStorage: StateStorage = {
      getItem: (key): string => {
        // Check URL first
        if (getUrlSearch()) {
          const searchParams = new URLSearchParams(getUrlSearch())
          const storedValue = searchParams.get(key)
          return JSON.parse(storedValue as string)
        } else {
          // Otherwise, we should load from localstorage or alternative storage
          return JSON.parse(localStorage.getItem(key) as string)
        }
      },
      setItem: (key, newValue): void => {
        // Check if query params exist at all, can remove check if always want to set URL
        if (getUrlSearch()) {
          const searchParams = new URLSearchParams(getUrlSearch())
          searchParams.set(key, JSON.stringify(newValue))
          window.history.replaceState(null, '', `?${searchParams.toString()}`)
        }
    
        localStorage.setItem(key, JSON.stringify(newValue))
      },
      removeItem: (key): void => {
        const searchParams = new URLSearchParams(getUrlSearch())
        searchParams.delete(key)
        window.location.search = searchParams.toString()
      },
    }
    
    type LocalAndUrlStore = {
      typesOfFish: string[]
      addTypeOfFish: (fishType: string) => void
      numberOfBears: number
      setNumberOfBears: (newNumber: number) => void
    }
    
    const storageOptions = {
      name: 'fishAndBearsStore',
      storage: createJSONStorage<LocalAndUrlStore>(() => persistentStorage),
    }
    
    const useLocalAndUrlStore = create(
      persist<LocalAndUrlStore>(
        (set) => ({
          typesOfFish: [],
          addTypeOfFish: (fishType) =>
            set((state) => ({ typesOfFish: [...state.typesOfFish, fishType] })),
    
          numberOfBears: 0,
          setNumberOfBears: (numberOfBears) => set(() => ({ numberOfBears })),
        }),
        storageOptions,
      ),
    )
    
    export default useLocalAndUrlStore
    

When generating the URL from a component, you can call buildShareableUrl:

    const buildURLSuffix = (params, version = 0) => {
      const searchParams = new URLSearchParams()
    
      const zustandStoreParams = {
        state: {
          typesOfFish: params.typesOfFish,
          numberOfBears: params.numberOfBears,
        },
        version: version, // version is here because that is included with how Zustand sets the state
      }
    
      // The URL param key should match the name of the store, as specified as in storageOptions above
      searchParams.set('fishAndBearsStore', JSON.stringify(zustandStoreParams))
      return searchParams.toString()
    }
    
    export const buildShareableUrl = (params, version) => {
      return `${window.location.origin}?${buildURLSuffix(params, version)}`
    }
    

The generated URL would look like (here without any encoding, for readability):

`https://localhost/search?fishAndBearsStore={"state":{"typesOfFish":["tilapia","salmon"],"numberOfBears":15},"version":0}}`</content>
</page>

<page>
  <title>How to reset state - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/how-to-reset-state</url>
  <content>The following pattern can be used to reset the state to its initial value.

    import { create } from 'zustand'
    
    // define types for state values and actions separately
    type State = {
      salmon: number
      tuna: number
    }
    
    type Actions = {
      addSalmon: (qty: number) => void
      addTuna: (qty: number) => void
      reset: () => void
    }
    
    // define the initial state
    const initialState: State = {
      salmon: 0,
      tuna: 0,
    }
    
    // create store
    const useSlice = create<State & Actions>()((set, get) => ({
      ...initialState,
      addSalmon: (qty: number) => {
        set({ salmon: get().salmon + qty })
      },
      addTuna: (qty: number) => {
        set({ tuna: get().tuna + qty })
      },
      reset: () => {
        set(initialState)
      },
    }))
    

Resetting multiple stores at once

    import type { StateCreator } from 'zustand'
    import { create: actualCreate } from 'zustand'
    
    const storeResetFns = new Set<() => void>()
    
    const resetAllStores = () => {
      storeResetFns.forEach((resetFn) => {
        resetFn()
      })
    }
    
    export const create = (<T>() => {
      return (stateCreator: StateCreator<T>) => {
        const store = actualCreate(stateCreator)
        const initialState = store.getInitialState()
        storeResetFns.add(() => {
          store.setState(initialState, true)
        })
        return store
      }
    }) as typeof actualCreate
    

[

CodeSandbox Demo
----------------

](#codesandbox-demo)

*   Basic: [https://codesandbox.io/s/zustand-how-to-reset-state-basic-demo-rrqyon](https://codesandbox.io/s/zustand-how-to-reset-state-basic-demo-rrqyon)
*   Advanced: [https://codesandbox.io/s/zustand-how-to-reset-state-advanced-demo-gtu0qe](https://codesandbox.io/s/zustand-how-to-reset-state-advanced-demo-gtu0qe)
*   Immer: [https://codesandbox.io/s/how-to-reset-state-advance-immer-demo-nyet3f](https://codesandbox.io/s/how-to-reset-state-advance-immer-demo-nyet3f)</content>
</page>

<page>
  <title>Initialize state with props - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/initialize-state-with-props</url>
  <content>In cases where [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) is needed, such as when a store should be initialized with props from a component, the recommended approach is to use a vanilla store with React.context.

[

Store creator with `createStore`
--------------------------------

](#store-creator-with-createstore)

    import { createStore } from 'zustand'
    
    interface BearProps {
      bears: number
    }
    
    interface BearState extends BearProps {
      addBear: () => void
    }
    
    type BearStore = ReturnType<typeof createBearStore>
    
    const createBearStore = (initProps?: Partial<BearProps>) => {
      const DEFAULT_PROPS: BearProps = {
        bears: 0,
      }
      return createStore<BearState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addBear: () => set((state) => ({ bears: ++state.bears })),
      }))
    }
    

[

Creating a context with `React.createContext`
---------------------------------------------

](#creating-a-context-with-react.createcontext)

    import { createContext } from 'react'
    
    export const BearContext = createContext<BearStore | null>(null)
    

[

Basic component usage
---------------------

](#basic-component-usage)

    // Provider implementation
    import { useRef } from 'react'
    
    function App() {
      const store = useRef(createBearStore()).current
      return (
        <BearContext.Provider value={store}>
          <BasicConsumer />
        </BearContext.Provider>
      )
    }
    

    // Consumer component
    import { useContext } from 'react'
    import { useStore } from 'zustand'
    
    function BasicConsumer() {
      const store = useContext(BearContext)
      if (!store) throw new Error('Missing BearContext.Provider in the tree')
      const bears = useStore(store, (s) => s.bears)
      const addBear = useStore(store, (s) => s.addBear)
      return (
        <>
          <div>{bears} Bears.</div>
          <button onClick={addBear}>Add bear</button>
        </>
      )
    }
    

[

Common patterns
---------------

](#common-patterns)[

### Wrapping the context provider

](#wrapping-the-context-provider)

    // Provider wrapper
    import { useRef } from 'react'
    
    type BearProviderProps = React.PropsWithChildren<BearProps>
    
    function BearProvider({ children, ...props }: BearProviderProps) {
      const storeRef = useRef<BearStore>()
      if (!storeRef.current) {
        storeRef.current = createBearStore(props)
      }
      return (
        <BearContext.Provider value={storeRef.current}>
          {children}
        </BearContext.Provider>
      )
    }
    

[

### Extracting context logic into a custom hook

](#extracting-context-logic-into-a-custom-hook)

    // Mimic the hook returned by `create`
    import { useContext } from 'react'
    import { useStore } from 'zustand'
    
    function useBearContext<T>(selector: (state: BearState) => T): T {
      const store = useContext(BearContext)
      if (!store) throw new Error('Missing BearContext.Provider in the tree')
      return useStore(store, selector)
    }
    

    // Consumer usage of the custom hook
    function CommonConsumer() {
      const bears = useBearContext((s) => s.bears)
      const addBear = useBearContext((s) => s.addBear)
      return (
        <>
          <div>{bears} Bears.</div>
          <button onClick={addBear}>Add bear</button>
        </>
      )
    }
    

[

### Optionally allow using a custom equality function

](#optionally-allow-using-a-custom-equality-function)

    // Allow custom equality function by using useStoreWithEqualityFn instead of useStore
    import { useContext } from 'react'
    import { useStoreWithEqualityFn } from 'zustand/traditional'
    
    function useBearContext<T>(
      selector: (state: BearState) => T,
      equalityFn?: (left: T, right: T) => boolean,
    ): T {
      const store = useContext(BearContext)
      if (!store) throw new Error('Missing BearContext.Provider in the tree')
      return useStoreWithEqualityFn(store, selector, equalityFn)
    }
    

[

### Complete example

](#complete-example)

    // Provider wrapper & custom hook consumer
    function App2() {
      return (
        <BearProvider bears={2}>
          <HookConsumer />
        </BearProvider>
      )
    }</content>
</page>

<page>
  <title>Slices Pattern - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/slices-pattern</url>
  <content>[

Slicing the store into smaller stores
-------------------------------------

](#slicing-the-store-into-smaller-stores)

Your store can become bigger and bigger and tougher to maintain as you add more features.

You can divide your main store into smaller individual stores to achieve modularity. This is simple to accomplish in Zustand!

The first individual store:

    export const createFishSlice = (set) => ({
      fishes: 0,
      addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
    })
    

Another individual store:

    export const createBearSlice = (set) => ({
      bears: 0,
      addBear: () => set((state) => ({ bears: state.bears + 1 })),
      eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
    })
    

You can now combine both the stores into **one bounded store**:

    import { create } from 'zustand'
    import { createBearSlice } from './bearSlice'
    import { createFishSlice } from './fishSlice'
    
    export const useBoundStore = create((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }))
    

[

### Usage in a React component

](#usage-in-a-react-component)

    import { useBoundStore } from './stores/useBoundStore'
    
    function App() {
      const bears = useBoundStore((state) => state.bears)
      const fishes = useBoundStore((state) => state.fishes)
      const addBear = useBoundStore((state) => state.addBear)
      return (
        <div>
          <h2>Number of bears: {bears}</h2>
          <h2>Number of fishes: {fishes}</h2>
          <button onClick={() => addBear()}>Add a bear</button>
        </div>
      )
    }
    
    export default App
    

[

### Updating multiple stores

](#updating-multiple-stores)

You can update multiple stores, at the same time, in a single function.

    export const createBearFishSlice = (set, get) => ({
      addBearAndFish: () => {
        get().addBear()
        get().addFish()
      },
    })
    

Combining all the stores together is the same as before.

    import { create } from 'zustand'
    import { createBearSlice } from './bearSlice'
    import { createFishSlice } from './fishSlice'
    import { createBearFishSlice } from './createBearFishSlice'
    
    export const useBoundStore = create((...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createBearFishSlice(...a),
    }))
    

[

Adding middlewares
------------------

](#adding-middlewares)

Adding middlewares to a combined store is the same as with other normal stores.

Adding `persist` middleware to our `useBoundStore`:

    import { create } from 'zustand'
    import { createBearSlice } from './bearSlice'
    import { createFishSlice } from './fishSlice'
    import { persist } from 'zustand/middleware'
    
    export const useBoundStore = create(
      persist(
        (...a) => ({
          ...createBearSlice(...a),
          ...createFishSlice(...a),
        }),
        { name: 'bound-store' },
      ),
    )
    

Please keep in mind you should only apply middlewares in the combined store. Applying them inside individual slices can lead to unexpected issues.

[

Usage with TypeScript
---------------------

](#usage-with-typescript)

A detailed guide on how to use the slice pattern in Zustand with TypeScript can be found [here](https://zustand.docs.pmnd.rs/guides/typescript#slices-pattern).</content>
</page>

<page>
  <title>Prevent rerenders with useShallow - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/prevent-rerenders-with-use-shallow</url>
  <content>When you need to subscribe to a computed state from a store, the recommended way is to use a selector.

The computed selector will cause a rerender if the output has changed according to [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is?retiredLocale=it).

In this case you might want to use `useShallow` to avoid a rerender if the computed value is always shallow equal the previous one.

[

Example
-------

](#example)

We have a store that associates to each bear a meal and we want to render their names.

    import { create } from 'zustand'
    
    const useMeals = create(() => ({
      papaBear: 'large porridge-pot',
      mamaBear: 'middle-size porridge pot',
      littleBear: 'A little, small, wee pot',
    }))
    
    export const BearNames = () => {
      const names = useMeals((state) => Object.keys(state))
    
      return <div>{names.join(', ')}</div>
    }
    

Now papa bear wants a pizza instead:

    useMeals.setState({
      papaBear: 'a large pizza',
    })
    

This change causes `BearNames` rerenders even though the actual output of `names` has not changed according to shallow equal.

We can fix that using `useShallow`!

    import { create } from 'zustand'
    import { useShallow } from 'zustand/react/shallow'
    
    const useMeals = create(() => ({
      papaBear: 'large porridge-pot',
      mamaBear: 'middle-size porridge pot',
      littleBear: 'A little, small, wee pot',
    }))
    
    export const BearNames = () => {
      const names = useMeals(useShallow((state) => Object.keys(state)))
    
      return <div>{names.join(', ')}</div>
    }
    

Now they can all order other meals without causing unnecessary rerenders of our `BearNames` component.</content>
</page>

<page>
  <title>SSR and Hydration - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/guides/ssr-and-hydration</url>
  <content>[

Server-side Rendering (SSR)
---------------------------

](#server-side-rendering-\(ssr\))

Server-side Rendering (SSR) is a technique that helps us render our components into HTML strings on the server, send them directly to the browser, and finally "hydrate" the static markup into a fully interactive app on the client.

[

### React

](#react)

Let's say we want to render a stateless app using React. In order to do that, we need to use `express`, `react` and `react-dom/server`. We don't need `react-dom/client` since it's a stateless app.

Let's dive into that:

*   `express` helps us build a web app that we can run using Node,
*   `react` helps us build the UI components that we use in our app,
*   `react-dom/server` helps us render our components on a server.

    // tsconfig.json
    {
      "compilerOptions": {
        "noImplicitAny": false,
        "noEmitOnError": true,
        "removeComments": false,
        "sourceMap": true,
        "target": "esnext"
      },
      "include": ["**/*"]
    }
    

> **Note:** do not forget to remove all comments from your `tsconfig.json` file.

    // app.tsx
    export const App = () => {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Static Server-side-rendered App</title>
          </head>
          <body>
            <div>Hello World!</div>
          </body>
        </html>
      )
    }
    

    // server.tsx
    import express from 'express'
    import React from 'react'
    import ReactDOMServer from 'react-dom/server'
    
    import { App } from './app.tsx'
    
    const port = Number.parseInt(process.env.PORT || '3000', 10)
    const app = express()
    
    app.get('/', (_, res) => {
      const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
        onShellReady() {
          res.setHeader('content-type', 'text/html')
          pipe(res)
        },
      })
    })
    
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`)
    })
    

[

Hydration
---------

](#hydration)

Hydration turns the initial HTML snapshot from the server into a fully interactive app that runs in the browser. The right way to "hydrate" a component is by using `hydrateRoot`.

[

### React

](#react)

Let's say we want to render a stateful app using React. In order to do that we need to use `express`, `react`, `react-dom/server` and `react-dom/client`.

Let's dive into that:

*   `express` helps us build a web app that we can run using Node,
*   `react` helps us build the UI components that we use in our app,
*   `react-dom/server` helps us render our components on a server,
*   `react-dom/client` helps us hydrate our components on a client.

> **Note:** Do not forget that even if we can render our components on a server, it is important to "hydrate" them on a client to make them interactive.

    // tsconfig.json
    {
      "compilerOptions": {
        "noImplicitAny": false,
        "noEmitOnError": true,
        "removeComments": false,
        "sourceMap": true,
        "target": "esnext"
      },
      "include": ["**/*"]
    }
    

> **Note:** do not forget to remove all comments in your `tsconfig.json` file.

    // app.tsx
    export const App = () => {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Static Server-side-rendered App</title>
          </head>
          <body>
            <div>Hello World!</div>
          </body>
        </html>
      )
    }
    

    // main.tsx
    import ReactDOMClient from 'react-dom/client'
    
    import { App } from './app.tsx'
    
    ReactDOMClient.hydrateRoot(document, <App />)
    

    // server.tsx
    import express from 'express'
    import React from 'react'
    import ReactDOMServer from 'react-dom/server'
    
    import { App } from './app.tsx'
    
    const port = Number.parseInt(process.env.PORT || '3000', 10)
    const app = express()
    
    app.use('/', (_, res) => {
      const { pipe } = ReactDOMServer.renderToPipeableStream(<App />, {
        bootstrapScripts: ['/main.js'],
        onShellReady() {
          res.setHeader('content-type', 'text/html')
          pipe(res)
        },
      })
    })
    
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`)
    })
    

> **Warning:** The React tree you pass to `hydrateRoot` needs to produce the same output as it did on the server. The most common causes leading to hydration errors include:
> 
> *   Extra whitespace (like newlines) around the React-generated HTML inside the root node.
> *   Using checks like typeof window !== 'undefined' in your rendering logic.
> *   Using browser-only APIs like `window.matchMedia` in your rendering logic.
> *   Rendering different data on the server and the client.
> 
> React recovers from some hydration errors, but you must fix them like other bugs. In the best case, they’ll lead to a slowdown; in the worst case, event handlers can get attached to the wrong elements.

You can read more about the caveats and pitfalls here: [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)</content>
</page>

<page>
  <title>How to Migrate to v5 from v4 - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/migrations/migrating-to-v5</url>
  <content>We highly recommend to update to the latest version of v4, before migrating to v5. It will show all deprecation warnings without breaking your app.

[

Changes in v5
-------------

](#changes-in-v5)

*   Drop default exports
*   Drop deprecated features
*   Make React 18 the minimum required version
*   Make use-sync-external-store a peer dependency (required for `createWithEqualityFn` and `useStoreWithEqualityFn` in `zustand/traditional`)
*   Make TypeScript 4.5 the minimum required version
*   Drop UMD/SystemJS support
*   Organize entry points in the package.json
*   Drop ES5 support
*   Stricter types when setState's replace flag is set
*   Persist middleware behavioral change
*   Other small improvements (technically breaking changes)

[

Migration Guide
---------------

](#migration-guide)[

### Using custom equality functions such as `shallow`

](#using-custom-equality-functions-such-as-shallow)

The `create` function in v5 does not support customizing equality function.

If you use custom equality function such as `shallow`, the easiest migration is to use `createWithEqualityFn`.

    // v4
    import { create } from 'zustand'
    import { shallow } from 'zustand/shallow'
    
    const useCountStore = create((set) => ({
      count: 0,
      text: 'hello',
      // ...
    }))
    
    const Component = () => {
      const { count, text } = useCountStore(
        (state) => ({
          count: state.count,
          text: state.text,
        }),
        shallow,
      )
      // ...
    }
    

That can be done with `createWithEqualityFn` in v5:

    npm install use-sync-external-store
    

    // v5
    import { createWithEqualityFn as create } from 'zustand/traditional'
    
    // The rest is the same as v4
    

Alternatively, for the `shallow` use case, you can use `useShallow` hook:

    // v5
    import { create } from 'zustand'
    import { useShallow } from 'zustand/shallow'
    
    const useCountStore = create((set) => ({
      count: 0,
      text: 'hello',
      // ...
    }))
    
    const Component = () => {
      const { count, text } = useCountStore(
        useShallow((state) => ({
          count: state.count,
          text: state.text,
        })),
      )
      // ...
    }
    

[

### Requiring stable selector outputs

](#requiring-stable-selector-outputs)

There is a behavioral change in v5 to match React default behavior. If a selector returns a new reference, it may cause infinite loops.

For example, this may cause infinite loops.

    // v4
    const [searchValue, setSearchValue] = useStore((state) => [
      state.searchValue,
      state.setSearchValue,
    ])
    

The error message will be something like this:

    Uncaught Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
    

To fix it, use the `useShallow` hook, which will return a stable reference.

    // v5
    import { useShallow } from 'zustand/shallow'
    
    const [searchValue, setSearchValue] = useStore(
      useShallow((state) => [state.searchValue, state.setSearchValue]),
    )
    

Here's another example that may cause infinite loops.

    // v4
    const action = useMainStore((state) => {
      return state.action ?? () => {}
    })
    

To fix it, make sure the selector function returns a stable reference.

    // v5
    
    const FALLBACK_ACTION = () => {}
    
    const action = useMainStore((state) => {
      return state.action ?? FALLBACK_ACTION
    })
    

Alternatively, if you need v4 behavior, `createWithEqualityFn` will do.

    // v5
    import { createWithEqualityFn as create } from 'zustand/traditional'
    

[

### Stricter types when setState's replace flag is set (Typescript only)

](#stricter-types-when-setstate's-replace-flag-is-set-\(typescript-only\))

    - setState:
    -   (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void;
    + setState:
    +   (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false) => void;
    +   (state: T | ((state: T) => T), replace: true) => void;
    

If you are not using the `replace` flag, no migration is required.

If you are using the `replace` flag and it's set to `true`, you must provide a complete state object. This change ensures that `store.setState({}, true)` (which results in an invalid state) is no longer considered valid.

**Examples:**

    // Partial state update (valid)
    store.setState({ key: 'value' })
    
    // Complete state replacement (valid)
    store.setState({ key: 'value' }, true)
    
    // Incomplete state replacement (invalid)
    store.setState({}, true) // Error
    

[

#### Handling Dynamic `replace` Flag

](#handling-dynamic-replace-flag)

If the value of the `replace` flag is dynamic and determined at runtime, you might face issues. To handle this, you can use a workaround by annotating the `replace` parameter with the parameters of the `setState` function:

    const replaceFlag = Math.random() > 0.5
    const args = [{ bears: 5 }, replaceFlag] as Parameters<
      typeof useBearStore.setState
    >
    store.setState(...args)
    

[

#### Persist middleware no longer stores item at store creation

](#persist-middleware-no-longer-stores-item-at-store-creation)

Previously, the `persist` middleware stored the initial state during store creation. This behavior has been removed in v5 (and v4.5.5).

For example, in the following code, the initial state is stored in the storage.

    // v4
    import { create } from 'zustand'
    import { persist } from 'zustand/middleware'
    
    const useCountStore = create(
      persist(
        () => ({
          count: Math.floor(Math.random() * 1000),
        }),
        {
          name: 'count',
        },
      ),
    )
    

In v5, this is no longer the case, and you need to explicitly set the state after store creation.

    // v5
    import { create } from 'zustand'
    import { persist } from 'zustand/middleware'
    
    const useCountStore = create(
      persist(
        () => ({
          count: 0,
        }),
        {
          name: 'count',
        },
      ),
    )
    useCountStore.setState({
      count: Math.floor(Math.random() * 1000),
    })
    

[

Links
-----

](#links)

*   [https://github.com/pmndrs/zustand/pull/2138](https://github.com/pmndrs/zustand/pull/2138)
*   [https://github.com/pmndrs/zustand/pull/2580](https://github.com/pmndrs/zustand/pull/2580)</content>
</page>

<page>
  <title>createWithEqualityFn ⚛️ - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/apis/create-with-equality-fn</url>
  <content>How to create efficient stores

`createWithEqualityFn` lets you create a React Hook with API utilities attached, just like `create`. However, it offers a way to define a custom equality check. This allows for more granular control over when components re-render, improving performance and responsiveness.

    const useSomeStore = createWithEqualityFn(stateCreatorFn, equalityFn)
    

*   [Types](#types)
    
    *   [Signature](#createwithequalityfn-signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Updating state based on previous state](#updating-state-based-on-previous-state)
    *   [Updating Primitives in State](#updating-primitives-in-state)
    *   [Updating Objects in State](#updating-objects-in-state)
    *   [Updating Arrays in State](#updating-arrays-in-state)
    *   [Updating state with no store actions](#updating-state-with-no-store-actions)
    *   [Subscribing to state updates](#subscribing-to-state-updates)
    
*   [Troubleshooting](#troubleshooting)
    
    *   [I’ve updated the state, but the screen doesn’t update](#ive-updated-the-state-but-the-screen-doesnt-update)
    

[

Types
-----

](#types)[

### Signature

](#signature)

    createWithEqualityFn<T>()(stateCreatorFn: StateCreator<T, [], []>, equalityFn?: (a: T, b: T) => boolean): UseBoundStore<StoreApi<T>>
    

[

Reference
---------

](#reference)[

### `createWithEqualityFn(stateCreatorFn)`

](#createwithequalityfn\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.
*   **optional** `equalityFn`: Defaults to `Object.is`. A function that lets you skip re-renders.

[

#### Returns

](#returns)

`createWithEqualityFn` returns a React Hook with API utilities attached, just like `create`. It lets you return data that is based on current state, using a selector function, and lets you skip re-renders using an equality function. It should take a selector function, and an equality function as arguments.

[

Usage
-----

](#usage)[

### Updating state based on previous state

](#updating-state-based-on-previous-state)

To update a state based on previous state we should use **updater functions**. Read more about that [here](https://react.dev/learn/queueing-a-series-of-state-updates).

This example shows how you can support **updater functions** within **actions**.

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type AgeStoreState = { age: number }
    
    type AgeStoreActions = {
      setAge: (
        nextAge:
          | AgeStoreState['age']
          | ((currentAge: AgeStoreState['age']) => AgeStoreState['age']),
      ) => void
    }
    
    type AgeStore = AgeStoreState & AgeStoreActions
    
    const useAgeStore = createWithEqualityFn<AgeStore>()(
      (set) => ({
        age: 42,
        setAge: (nextAge) =>
          set((state) => ({
            age: typeof nextAge === 'function' ? nextAge(state.age) : nextAge,
          })),
      }),
      shallow,
    )
    
    export default function App() {
      const age = useAgeStore((state) => state.age)
      const setAge = useAgeStore((state) => state.setAge)
    
      function increment() {
        setAge((currentAge) => currentAge + 1)
      }
    
      return (
        <>
          <h1>Your age: {age}</h1>
          <button
            type="button"
            onClick={() => {
              increment()
              increment()
              increment()
            }}
          >
            +3
          </button>
          <button
            type="button"
            onClick={() => {
              increment()
            }}
          >
            +1
          </button>
        </>
      )
    }
    

[

### Updating Primitives in State

](#updating-primitives-in-state)

State can hold any kind of JavaScript value. When you want to update built-in primitive values like numbers, strings, booleans, etc. you should directly assign new values to ensure updates are applied correctly, and avoid unexpected behaviors.

By default, `set` function performs a shallow merge. If you need to completely replace the state with a new one, use the `replace` parameter set to `true`

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type XStore = number
    
    const useXStore = createWithEqualityFn<XStore>()(() => 0, shallow)
    
    export default function MovingDot() {
      const x = useXStore()
      const setX = (nextX: number) => {
        useXStore.setState(nextX, true)
      }
      const position = { y: 0, x }
    
      return (
        <div
          onPointerMove={(e) => {
            setX(e.clientX)
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating Objects in State

](#updating-objects-in-state)

Objects are **mutable** in JavaScript, but you should treat them as **immutable** when you store them in state. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use the new object.

By default, `set` function performs a shallow merge. For most updates where you only need to modify specific properties, the default shallow merge is preferred as it's more efficient. To completely replace the state with a new one, use the `replace` parameter set to `true` with caution, as it discards any existing nested data within the state.

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const usePositionStore = createWithEqualityFn<PositionStore>()(
      (set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      }),
      shallow,
    )
    
    export default function MovingDot() {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating Arrays in State

](#updating-arrays-in-state)

Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

By default, `set` function performs a shallow merge. To update array values we should assign new values to ensure updates are applied correctly, and avoid unexpected behaviors. To completely replace the state with a new one, use the `replace` parameter set to `true`.

We should prefer immutable operations like: `[...array]`, `concat(...)`, `filter(...)`, `slice(...)`, `map(...)`, `toSpliced(...)`, `toSorted(...)`, and `toReversed(...)`, and avoid mutable operations like `array[arrayIndex] = ...`, `push(...)`, `unshift(...)`, `pop(...)`, `shift(...)`, `splice(...)`, `reverse(...)`, and `sort(...)`.

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type PositionStore = [number, number]
    
    const usePositionStore = createWithEqualityFn<PositionStore>()(
      () => [0, 0],
      shallow,
    )
    
    export default function MovingDot() {
      const [x, y] = usePositionStore()
      const position = { x, y }
      const setPosition: typeof usePositionStore.setState = (nextPosition) => {
        usePositionStore.setState(nextPosition, true)
      }
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition([e.clientX, e.clientY])
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating state with no store actions

](#updating-state-with-no-store-actions)

Defining actions at module level, external to the store have a few advantages like: it doesn't require a hook to call an action, and it facilitates code splitting.

The recommended way is to colocate actions and states within the store (let your actions be located together with your state).

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    const usePositionStore = createWithEqualityFn<{
      x: number
      y: number
    }>()(() => ({ x: 0, y: 0 }), shallow)
    
    const setPosition: typeof usePositionStore.setState = (nextPosition) => {
      usePositionStore.setState(nextPosition)
    }
    
    export default function MovingDot() {
      const position = usePositionStore()
    
      return (
        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
            onMouseEnter={(event) => {
              const parent = event.currentTarget.parentElement
              const parentWidth = parent.clientWidth
              const parentHeight = parent.clientHeight
    
              setPosition({
                x: Math.ceil(Math.random() * parentWidth),
                y: Math.ceil(Math.random() * parentHeight),
              })
            }}
          />
        </div>
      )
    }
    

[

### Subscribing to state updates

](#subscribing-to-state-updates)

By subscribing to state updates, you register a callback that fires whenever the store's state updates. We can use `subscribe` for external state management.

    import { useEffect } from 'react'
    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const usePositionStore = createWithEqualityFn<PositionStore>()(
      (set) => ({
        position: { x: 0, y: 0 },
        setPosition: (nextPosition) => set(nextPosition),
      }),
      shallow,
    )
    
    export default function MovingDot() {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      useEffect(() => {
        const unsubscribePositionStore = usePositionStore.subscribe(
          ({ position }) => {
            console.log('new position', { position })
          },
        )
    
        return () => {
          unsubscribePositionStore()
        }
      }, [])
    
      return (
        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
            onMouseEnter={(event) => {
              const parent = event.currentTarget.parentElement
              const parentWidth = parent.clientWidth
              const parentHeight = parent.clientHeight
    
              setPosition({
                x: Math.ceil(Math.random() * parentWidth),
                y: Math.ceil(Math.random() * parentHeight),
              })
            }}
          />
        </div>
      )
    }
    

[

Troubleshooting
---------------

](#troubleshooting)[

### I’ve updated the state, but the screen doesn’t update

](#i’ve-updated-the-state,-but-the-screen-doesn’t-update)

In the previous example, the `position` object is always created fresh from the current cursor position. But often, you will want to include existing data as a part of the new object you’re creating. For example, you may want to update only one field in a form, but keep the previous values for all other fields.

These input fields don’t work because the `onChange` handlers mutate the state:

    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: PersonStoreState['person']) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const usePersonStore = createWithEqualityFn<PersonStore>()(
      (set) => ({
        person: {
          firstName: 'Barbara',
          lastName: 'Hepworth',
          email: 'bhepworth@sculpture.com',
        },
        setPerson: (person) => set({ person }),
      }),
      shallow,
    )
    
    export default function Form() {
      const person = usePersonStore((state) => state.person)
      const setPerson = usePersonStore((state) => state.setPerson)
    
      function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        person.firstName = e.target.value
      }
    
      function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        person.lastName = e.target.value
      }
    
      function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        person.email = e.target.value
      }
    
      return (
        <>
          <label style={{ display: 'block' }}>
            First name:
            <input value={person.firstName} onChange={handleFirstNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Last name:
            <input value={person.lastName} onChange={handleLastNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Email:
            <input value={person.email} onChange={handleEmailChange} />
          </label>
          <p>
            {person.firstName} {person.lastName} ({person.email})
          </p>
        </>
      )
    }
    

For example, this line mutates the state from a past render:

    person.firstName = e.target.value
    

The reliable way to get the behavior you’re looking for is to create a new object and pass it to `setPerson`. But here you want to also copy the existing data into it because only one of the fields has changed:

    setPerson({ ...person, firstName: e.target.value }) // New first name from the input
    

We don’t need to copy every property separately due to `set` function performing shallow merge by default.

Now the form works!

Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!

    import { type ChangeEvent } from 'react'
    import { createWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/vanilla/shallow'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: PersonStoreState['person']) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const usePersonStore = createWithEqualityFn<PersonStore>()(
      (set) => ({
        person: {
          firstName: 'Barbara',
          lastName: 'Hepworth',
          email: 'bhepworth@sculpture.com',
        },
        setPerson: (nextPerson) => set({ person: nextPerson }),
      }),
      shallow,
    )
    
    export default function Form() {
      const person = usePersonStore((state) => state.person)
      const setPerson = usePersonStore((state) => state.setPerson)
    
      function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, firstName: e.target.value })
      }
    
      function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, lastName: e.target.value })
      }
    
      function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, email: e.target.value })
      }
    
      return (
        <>
          <label style={{ display: 'block' }}>
            First name:
            <input value={person.firstName} onChange={handleFirstNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Last name:
            <input value={person.lastName} onChange={handleLastNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Email:
            <input value={person.email} onChange={handleEmailChange} />
          </label>
          <p>
            {person.firstName} {person.lastName} ({person.email})
          </p>
        </>
      )
    }</content>
</page>

<page>
  <title>create ⚛️ - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/apis/create</url>
  <content>How to create stores

`create` lets you create a React Hook with API utilities attached.

    const useSomeStore = create(stateCreatorFn)
    

*   [Types](#types)
    
    *   [Signature](#create-signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Updating state based on previous state](#updating-state-based-on-previous-state)
    *   [Updating Primitives in State](#updating-primitives-in-state)
    *   [Updating Objects in State](#updating-objects-in-state)
    *   [Updating Arrays in State](#updating-arrays-in-state)
    *   [Updating state with no store actions](#updating-state-with-no-store-actions)
    *   [Subscribing to state updates](#subscribing-to-state-updates)
    
*   [Troubleshooting](#troubleshooting)
    
    *   [I’ve updated the state, but the screen doesn’t update](#ive-updated-the-state-but-the-screen-doesnt-update)
    

[

Types
-----

](#types)[

### Signature

](#signature)

    create<T>()(stateCreatorFn: StateCreator<T, [], []>): UseBoundStore<StoreApi<T>>
    

[

Reference
---------

](#reference)[

### `create(stateCreatorFn)`

](#create\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.

[

#### Returns

](#returns)

`create` returns a React Hook with API utilities, `setState`, `getState`, `getInitialState` and `subscribe`, attached. It lets you return data that is based on current state, using a selector function. It should take a selector function as its only argument.

[

Usage
-----

](#usage)[

### Updating state based on previous state

](#updating-state-based-on-previous-state)

To update a state based on previous state we should use **updater functions**. Read more about that [here](https://react.dev/learn/queueing-a-series-of-state-updates).

This example shows how you can support **updater functions** within **actions**.

    import { create } from 'zustand'
    
    type AgeStoreState = { age: number }
    
    type AgeStoreActions = {
      setAge: (
        nextAge:
          | AgeStoreState['age']
          | ((currentAge: AgeStoreState['age']) => AgeStoreState['age']),
      ) => void
    }
    
    type AgeStore = AgeStoreState & AgeStoreActions
    
    const useAgeStore = create<AgeStore>()((set) => ({
      age: 42,
      setAge: (nextAge) => {
        set((state) => ({
          age: typeof nextAge === 'function' ? nextAge(state.age) : nextAge,
        }))
      },
    }))
    
    export default function App() {
      const age = useAgeStore((state) => state.age)
      const setAge = useAgeStore((state) => state.setAge)
    
      function increment() {
        setAge((currentAge) => currentAge + 1)
      }
    
      return (
        <>
          <h1>Your age: {age}</h1>
          <button
            onClick={() => {
              increment()
              increment()
              increment()
            }}
          >
            +3
          </button>
          <button
            onClick={() => {
              increment()
            }}
          >
            +1
          </button>
        </>
      )
    }
    

[

### Updating Primitives in State

](#updating-primitives-in-state)

State can hold any kind of JavaScript value. When you want to update built-in primitive values like numbers, strings, booleans, etc. you should directly assign new values to ensure updates are applied correctly, and avoid unexpected behaviors.

By default, `set` function performs a shallow merge. If you need to completely replace the state with a new one, use the `replace` parameter set to `true`

    import { create } from 'zustand'
    
    type XStore = number
    
    const useXStore = create<XStore>()(() => 0)
    
    export default function MovingDot() {
      const x = useXStore()
      const setX = (nextX: number) => {
        useXStore.setState(nextX, true)
      }
      const position = { y: 0, x }
    
      return (
        <div
          onPointerMove={(e) => {
            setX(e.clientX)
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating Objects in State

](#updating-objects-in-state)

Objects are **mutable** in JavaScript, but you should treat them as **immutable** when you store them in state. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use the new object.

By default, `set` function performs a shallow merge. For most updates where you only need to modify specific properties, the default shallow merge is preferred as it's more efficient. To completely replace the state with a new one, use the `replace` parameter set to `true` with caution, as it discards any existing nested data within the state.

    import { create } from 'zustand'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const usePositionStore = create<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (nextPosition) => set(nextPosition),
    }))
    
    export default function MovingDot() {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating Arrays in State

](#updating-arrays-in-state)

Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

By default, `set` function performs a shallow merge. To update array values we should assign new values to ensure updates are applied correctly, and avoid unexpected behaviors. To completely replace the state with a new one, use the `replace` parameter set to `true`.

We should prefer immutable operations like: `[...array]`, `concat(...)`, `filter(...)`, `slice(...)`, `map(...)`, `toSpliced(...)`, `toSorted(...)`, and `toReversed(...)`, and avoid mutable operations like `array[arrayIndex] = ...`, `push(...)`, `unshift(...)`, `pop(...)`, `shift(...)`, `splice(...)`, `reverse(...)`, and `sort(...)`.

    import { create } from 'zustand'
    
    type PositionStore = [number, number]
    
    const usePositionStore = create<PositionStore>()(() => [0, 0])
    
    export default function MovingDot() {
      const [x, y] = usePositionStore()
      const setPosition: typeof usePositionStore.setState = (nextPosition) => {
        usePositionStore.setState(nextPosition, true)
      }
      const position = { x, y }
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition([e.clientX, e.clientY])
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

[

### Updating state with no store actions

](#updating-state-with-no-store-actions)

Defining actions at module level, external to the store have a few advantages like: it doesn't require a hook to call an action, and it facilitates code splitting.

The recommended way is to colocate actions and states within the store (let your actions be located together with your state).

    import { create } from 'zustand'
    
    const usePositionStore = create<{
      x: number
      y: number
    }>()(() => ({ x: 0, y: 0 }))
    
    const setPosition: typeof usePositionStore.setState = (nextPosition) => {
      usePositionStore.setState(nextPosition)
    }
    
    export default function MovingDot() {
      const position = usePositionStore()
    
      return (
        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
            onMouseEnter={(event) => {
              const parent = event.currentTarget.parentElement
              const parentWidth = parent.clientWidth
              const parentHeight = parent.clientHeight
    
              setPosition({
                x: Math.ceil(Math.random() * parentWidth),
                y: Math.ceil(Math.random() * parentHeight),
              })
            }}
          />
        </div>
      )
    }
    

[

### Subscribing to state updates

](#subscribing-to-state-updates)

By subscribing to state updates, you register a callback that fires whenever the store's state updates. We can use `subscribe` for external state management.

    import { useEffect } from 'react'
    import { create } from 'zustand'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const usePositionStore = create<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (nextPosition) => set(nextPosition),
    }))
    
    export default function MovingDot() {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      useEffect(() => {
        const unsubscribePositionStore = usePositionStore.subscribe(
          ({ position }) => {
            console.log('new position', { position })
          },
        )
    
        return () => {
          unsubscribePositionStore()
        }
      }, [])
    
      return (
        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
            onMouseEnter={(event) => {
              const parent = event.currentTarget.parentElement
              const parentWidth = parent.clientWidth
              const parentHeight = parent.clientHeight
    
              setPosition({
                x: Math.ceil(Math.random() * parentWidth),
                y: Math.ceil(Math.random() * parentHeight),
              })
            }}
          />
        </div>
      )
    }
    

[

Troubleshooting
---------------

](#troubleshooting)[

### I’ve updated the state, but the screen doesn’t update

](#i’ve-updated-the-state,-but-the-screen-doesn’t-update)

In the previous example, the `position` object is always created fresh from the current cursor position. But often, you will want to include existing data as a part of the new object you’re creating. For example, you may want to update only one field in a form, but keep the previous values for all other fields.

These input fields don’t work because the `onChange` handlers mutate the state:

    import { create } from 'zustand'
    
    type PersonStoreState = {
      firstName: string
      lastName: string
      email: string
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: Partial<PersonStoreState>) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const usePersonStore = create<PersonStore>()((set) => ({
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com',
      setPerson: (nextPerson) => set(nextPerson),
    }))
    
    export default function Form() {
      const person = usePersonStore((state) => state)
      const setPerson = usePersonStore((state) => state.setPerson)
    
      function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        person.firstName = e.target.value
      }
    
      function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        person.lastName = e.target.value
      }
    
      function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        person.email = e.target.value
      }
    
      return (
        <>
          <label style={{ display: 'block' }}>
            First name:
            <input value={person.firstName} onChange={handleFirstNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Last name:
            <input value={person.lastName} onChange={handleLastNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Email:
            <input value={person.email} onChange={handleEmailChange} />
          </label>
          <p>
            {person.firstName} {person.lastName} ({person.email})
          </p>
        </>
      )
    }
    

For example, this line mutates the state from a past render:

    person.firstName = e.target.value
    

The reliable way to get the behavior you’re looking for is to create a new object and pass it to `setPerson`. But here you want to also copy the existing data into it because only one of the fields has changed:

    setPerson({ ...person, firstName: e.target.value }) // New first name from the input
    

We don’t need to copy every property separately due to `set` function performing shallow merge by default.

Now the form works!

Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!

    import { create } from 'zustand'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (nextPerson: PersonStoreState['person']) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const usePersonStore = create<PersonStore>()((set) => ({
      person: {
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
      },
      setPerson: (nextPerson) => set(nextPerson),
    }))
    
    export default function Form() {
      const person = usePersonStore((state) => state.person)
      const setPerson = usePersonStore((state) => state.setPerson)
    
      function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, firstName: e.target.value })
      }
    
      function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, lastName: e.target.value })
      }
    
      function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setPerson({ ...person, email: e.target.value })
      }
    
      return (
        <>
          <label style={{ display: 'block' }}>
            First name:
            <input value={person.firstName} onChange={handleFirstNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Last name:
            <input value={person.lastName} onChange={handleLastNameChange} />
          </label>
          <label style={{ display: 'block' }}>
            Email:
            <input value={person.email} onChange={handleEmailChange} />
          </label>
          <p>
            {person.firstName} {person.lastName} ({person.email})
          </p>
        </>
      )
    }</content>
</page>

<page>
  <title>shallow - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/apis/shallow</url>
  <content>How compare simple data effectively

`shallow` lets you run fast checks on simple data structures. It effectively identifies changes in **top-level** properties when you're working with data structures that don't have nested objects or arrays within them.

Shallow lets you perform quick comparisons, but keep its limitations in mind.

    const equal = shallow(a, b)
    

*   [Types](#types)
    
    *   [Signature](#shallow-signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Comparing Primitives](#comparing-primitives)
    *   [Comparing Objects](#comparing-objects)
    *   [Comparing Sets](#comparing-sets)
    *   [Comparing Maps](#comparing-maps)
    
*   [Troubleshooting](#troubleshooting)
    
    *   [Comparing objects returns `false` even if they are identical.](#comparing-objects-returns-false-even-if-they-are-identical)
    

[

Types
-----

](#types)[

### Signature

](#signature)

    shallow<T>(a: T, b: T): boolean
    

[

Reference
---------

](#reference)[

### `shallow(a, b)`

](#shallow\(a,-b\))[

#### Parameters

](#parameters)

*   `a`: The first value.
*   `b`: The second value.

[

#### Returns

](#returns)

`shallow` returns `true` when `a` and `b` are equal based on a shallow comparison of their **top-level** properties. Otherwise, it should return `false`.

[

Usage
-----

](#usage)[

### Comparing Primitives

](#comparing-primitives)

When comparing primitive values like `string`s, `number`s, `boolean`s, and `BigInt`s, both `Object.is` and `shallow` function return `true` if the values are the same. This is because primitive values are compared by their actual value rather than by reference.

    const stringLeft = 'John Doe'
    const stringRight = 'John Doe'
    
    Object.is(stringLeft, stringRight) // -> true
    shallow(stringLeft, stringRight) // -> true
    
    const numberLeft = 10
    const numberRight = 10
    
    Object.is(numberLeft, numberRight) // -> true
    shallow(numberLeft, numberRight) // -> true
    
    const booleanLeft = true
    const booleanRight = true
    
    Object.is(booleanLeft, booleanRight) // -> true
    shallow(booleanLeft, booleanRight) // -> true
    
    const bigIntLeft = 1n
    const bigIntRight = 1n
    
    Object.is(bigIntLeft, bigIntRight) // -> true
    shallow(bigIntLeft, bigIntRight) // -> true
    

[

### Comparing Objects

](#comparing-objects)

When comparing objects, it's important to understand how `Object.is` and `shallow` function operate, as they handle comparisons differently.

The `shallow` function returns `true` because shallow performs a shallow comparison of the objects. It checks if the top-level properties and their values are the same. In this case, the top-level properties (`firstName`, `lastName`, and `age`) and their values are identical between `objectLeft` and `objectRight`, so shallow considers them equal.

    const objectLeft = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    }
    const objectRight = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    }
    
    Object.is(objectLeft, objectRight) // -> false
    shallow(objectLeft, objectRight) // -> true
    

[

### Comparing Sets

](#comparing-sets)

When comparing sets, it's important to understand how `Object.is` and `shallow` function operate, as they handle comparisons differently.

The `shallow` function returns `true` because shallow performs a shallow comparison of the sets. It checks if the top-level properties (in this case, the sets themselves) are the same. Since `setLeft` and `setRight` are both instances of the Set object and contain the same elements, shallow considers them equal.

    const setLeft = new Set([1, 2, 3])
    const setRight = new Set([1, 2, 3])
    
    Object.is(setLeft, setRight) // -> false
    shallow(setLeft, setRight) // -> true
    

[

### Comparing Maps

](#comparing-maps)

When comparing maps, it's important to understand how `Object.is` and `shallow` function operate, as they handle comparisons differently.

The `shallow` returns `true` because shallow performs a shallow comparison of the maps. It checks if the top-level properties (in this case, the maps themselves) are the same. Since `mapLeft` and `mapRight` are both instances of the Map object and contain the same key-value pairs, shallow considers them equal.

    const mapLeft = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
    const mapRight = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
    
    Object.is(mapLeft, mapRight) // -> false
    shallow(mapLeft, mapRight) // -> true
    

[

Troubleshooting
---------------

](#troubleshooting)[

### Comparing objects returns `false` even if they are identical.

](#comparing-objects-returns-false-even-if-they-are-identical.)

The `shallow` function performs a shallow comparison. A shallow comparison checks if the top-level properties of two objects are equal. It does not check nested objects or deeply nested properties. In other words, it only compares the references of the properties.

In the following example, the shallow function returns `false` because it compares only the top-level properties and their references. The address property in both objects is a nested object, and even though their contents are identical, their references are different. Consequently, shallow sees them as different, resulting in `false`.

    const objectLeft = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
    }
    const objectRight = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
    }
    
    Object.is(objectLeft, objectRight) // -> false
    shallow(objectLeft, objectRight) // -> false
    

If we remove the `address` property, the shallow comparison would work as expected because all top-level properties would be primitive values or references to the same values:

    const objectLeft = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    }
    const objectRight = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    }
    
    Object.is(objectLeft, objectRight) // -> false
    shallow(objectLeft, objectRight) // -> true
    

In this modified example, `objectLeft` and `objectRight` have the same top-level properties and primitive values. Since `shallow` function only compares the top-level properties, it will return `true` because the primitive values (`firstName`, `lastName`, and `age`) are identical in both objects.</content>
</page>

<page>
  <title>useStoreWithEqualityFn ⚛️ - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/hooks/use-store-with-equality-fn</url>
  <content>How to use vanilla stores effectively in React

`useStoreWithEqualityFn` is a React Hook that lets you use a vanilla store in React, just like `useStore`. However, it offers a way to define a custom equality check. This allows for more granular control over when components re-render, improving performance and responsiveness.

    const someState = useStoreWithEqualityFn(store, selectorFn, equalityFn)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Use a vanilla store in React](#use-a-vanilla-store-in-react)
    *   [Using dynamic vanilla stores in React](#using-dynamic-global-vanilla-stores-in-react)
    *   [Using scoped (non-global) vanilla store in React](#using-scoped-non-global-vanilla-store-in-react)
    *   [Using dynamic scoped (non-global) vanilla stores in React](#using-dynamic-scoped-non-global-vanilla-stores-in-react)
    
*   [Troubleshooting](#troubleshooting)

[

### Signature

](#signature)

    useStoreWithEqualityFn<T, U = T>(store: StoreApi<T>, selectorFn: (state: T) => U, equalityFn?: (a: T, b: T) => boolean): U
    

[

Reference
---------

](#reference)[

### `useStoreWithEqualityFn(store, selectorFn, equalityFn)`

](#usestorewithequalityfn\(store,-selectorfn,-equalityfn\))[

#### Parameters

](#parameters)

*   `storeApi`: The instance that lets you access to store API utilities.
*   `selectorFn`: A function that lets you return data that is based on current state.
*   `equalityFn`: A function that lets you skip re-renders.

[

#### Returns

](#returns)

`useStoreWithEqualityFn` returns any data based on current state depending on the selector function, and lets you skip re-renders using an equality function. It should take a store, a selector function, and an equality function as arguments.

[

Usage
-----

](#usage)[

### Using a global vanilla store in React

](#using-a-global-vanilla-store-in-react)

First, let's set up a store that will hold the position of the dot on the screen. We'll define the store to manage `x` and `y` coordinates and provide an action to update these coordinates.

    import { createStore, useStore } from 'zustand'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    

Next, we'll create a `MovingDot` component that renders a div representing the dot. This component will use the store to track and update the dot's position.

    function MovingDot() {
      const position = useStoreWithEqualityFn(
        positionStore,
        (state) => state.position,
        shallow,
      )
      const setPosition = useStoreWithEqualityFn(
        positionStore,
        (state) => state.setPosition,
        shallow,
      )
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

Finally, we’ll render the `MovingDot` component in our `App` component.

    export default function App() {
      return <MovingDot />
    }
    

Here is what the code should look like:

    import { createStore } from 'zustand'
    import { useStoreWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/shallow'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    
    function MovingDot() {
      const position = useStoreWithEqualityFn(
        positionStore,
        (state) => state.position,
        shallow,
      )
      const setPosition = useStoreWithEqualityFn(
        positionStore,
        (state) => state.setPosition,
        shallow,
      )
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    
    export default function App() {
      return <MovingDot />
    }
    

[

### Using dynamic global vanilla stores in React

](#using-dynamic-global-vanilla-stores-in-react)

First, we'll create a factory function that generates a store for managing the counter state. Each tab will have its own instance of this store.

    import { createStore } from 'zustand'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    

Next, we'll create a factory function that manages the creation and retrieval of counter stores. This allows each tab to have its own independent counter.

    const defaultCounterStores = new Map<
      string,
      ReturnType<typeof createCounterStore>
    >()
    
    const createCounterStoreFactory = (
      counterStores: typeof defaultCounterStores,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const getOrCreateCounterStoreByKey =
      createCounterStoreFactory(defaultCounterStores)
    

Now, let’s build the Tabs component, where users can switch between tabs and increment each tab’s counter.

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const counterState = useStoreWithEqualityFn(
      getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
      (state) => state,
      shallow,
    )
    
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid salmon',
            paddingBottom: 4,
          }}
        >
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(0)}
          >
            Tab 1
          </button>
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(1)}
          >
            Tab 2
          </button>
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(2)}
          >
            Tab 3
          </button>
        </div>
        <div style={{ padding: 4 }}>
          Content of Tab {currentTabIndex + 1}
          <br /> <br />
          <button type="button" onClick={() => counterState.increment()}>
            Count: {counterState.count}
          </button>
        </div>
      </div>
    )
    

Finally, we'll create the `App` component, which renders the tabs and their respective counters. The counter state is managed independently for each tab.

    export default function App() {
      return <Tabs />
    }
    

Here is what the code should look like:

    import { useState } from 'react'
    import { createStore } from 'zustand'
    import { useStoreWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/shallow'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    
    const defaultCounterStores = new Map<
      string,
      ReturnType<typeof createCounterStore>
    >()
    
    const createCounterStoreFactory = (
      counterStores: typeof defaultCounterStores,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const getOrCreateCounterStoreByKey =
      createCounterStoreFactory(defaultCounterStores)
    
    export default function App() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useStoreWithEqualityFn(
        getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
        (state) => state,
        shallow,
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    

[

### Using scoped (non-global) vanilla store in React

](#using-scoped-\(non-global\)-vanilla-store-in-react)

First, let's set up a store that will hold the position of the dot on the screen. We'll define the store to manage `x` and `y` coordinates and provide an action to update these coordinates.

    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const createPositionStore = () => {
      return createStore<PositionStore>()((set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      }))
    }
    

Next, we'll create a context and a provider component to pass down the store through the React component tree. This allows each `MovingDot` component to have its own independent state.

    const PositionStoreContext = createContext<ReturnType<
      typeof createPositionStore
    > | null>(null)
    
    function PositionStoreProvider({ children }: { children: ReactNode }) {
      const [positionStore] = useState(createPositionStore)
    
      return (
        <PositionStoreContext.Provider value={positionStore}>
          {children}
        </PositionStoreContext.Provider>
      )
    }
    

To simplify accessing the store, we’ll create a React custom hook, `usePositionStore`. This hook will read the store from the context and allow us to select specific parts of the state.

    function usePositionStore<U>(selector: (state: PositionStore) => U) {
      const store = useContext(PositionStoreContext)
    
      if (store === null) {
        throw new Error(
          'usePositionStore must be used within PositionStoreProvider',
        )
      }
    
      return useStoreWithEqualityFn(store, selector, shallow)
    }
    

Now, let's create the `MovingDot` component, which will render a dot that follows the mouse cursor within its container.

    function MovingDot({ color }: { color: string }) {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x:
                e.clientX > e.currentTarget.clientWidth
                  ? e.clientX - e.currentTarget.clientWidth
                  : e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '50vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

Finally, we'll bring everything together in the `App` component, where we render two `MovingDot` components, each with its own independent state.

    export default function App() {
      return (
        <div style={{ display: 'flex' }}>
          <PositionStoreProvider>
            <MovingDot color="red" />
          </PositionStoreProvider>
          <PositionStoreProvider>
            <MovingDot color="blue" />
          </PositionStoreProvider>
        </div>
      )
    }
    

Here is what the code should look like:

    import { type ReactNode, useState, createContext, useContext } from 'react'
    import { createStore } from 'zustand'
    import { useStoreWithEqualityFn } from 'zustand/traditional'
    import { shallow } from 'zustand/shallow'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const createPositionStore = () => {
      return createStore<PositionStore>()((set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      }))
    }
    
    const PositionStoreContext = createContext<ReturnType<
      typeof createPositionStore
    > | null>(null)
    
    function PositionStoreProvider({ children }: { children: ReactNode }) {
      const [positionStore] = useState(createPositionStore)
    
      return (
        <PositionStoreContext.Provider value={positionStore}>
          {children}
        </PositionStoreContext.Provider>
      )
    }
    
    function usePositionStore<U>(selector: (state: PositionStore) => U) {
      const store = useContext(PositionStoreContext)
    
      if (store === null) {
        throw new Error(
          'usePositionStore must be used within PositionStoreProvider',
        )
      }
    
      return useStoreWithEqualityFn(store, selector, shallow)
    }
    
    function MovingDot({ color }: { color: string }) {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x:
                e.clientX > e.currentTarget.clientWidth
                  ? e.clientX - e.currentTarget.clientWidth
                  : e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '50vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    
    export default function App() {
      return (
        <div style={{ display: 'flex' }}>
          <PositionStoreProvider>
            <MovingDot color="red" />
          </PositionStoreProvider>
          <PositionStoreProvider>
            <MovingDot color="blue" />
          </PositionStoreProvider>
        </div>
      )
    }
    

[

### Using dynamic scoped (non-global) vanilla stores in React

](#using-dynamic-scoped-\(non-global\)-vanilla-stores-in-react)

First, we'll create a factory function that generates a store for managing the counter state. Each tab will have its own instance of this store.

    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    

Next, we'll create a factory function that manages the creation and retrieval of counter stores. This allows each tab to have its own independent counter.

    const createCounterStoreFactory = (
      counterStores: Map<string, ReturnType<typeof createCounterStore>>,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    

Next, we need a way to manage and access these stores throughout our app. We’ll use React’s context for this.

    const CounterStoresContext = createContext(null)
    
    const CounterStoresProvider = ({ children }) => {
      const [stores] = useState(
        () => new Map<string, ReturnType<typeof createCounterStore>>(),
      )
    
      return (
        <CounterStoresContext.Provider value={stores}>
          {children}
        </CounterStoresContext.Provider>
      )
    }
    

Now, we’ll create a custom hook, `useCounterStore`, that lets us access the correct store for a given tab.

    const useCounterStore = <U,>(
      currentTabIndex: number,
      selector: (state: CounterStore) => U,
    ) => {
      const stores = useContext(CounterStoresContext)
    
      if (stores === undefined) {
        throw new Error('useCounterStore must be used within CounterStoresProvider')
      }
    
      const getOrCreateCounterStoreByKey = useCallback(
        () => createCounterStoreFactory(stores),
        [stores],
      )
    
      return useStoreWithEqualityFn(
        getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
        selector,
        shallow,
      )
    }
    

Now, let’s build the Tabs component, where users can switch between tabs and increment each tab’s counter.

    function Tabs() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useCounterStore(
        `tab-${currentTabIndex}`,
        (state) => state,
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    

Finally, we'll create the `App` component, which renders the tabs and their respective counters. The counter state is managed independently for each tab.

    export default function App() {
      return (
        <CounterStoresProvider>
          <Tabs />
        </CounterStoresProvider>
      )
    }
    

Here is what the code should look like:

    import {
      type ReactNode,
      useState,
      useCallback,
      useContext,
      createContext,
    } from 'react'
    import { createStore, useStore } from 'zustand'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    
    const createCounterStoreFactory = (
      counterStores: Map<string, ReturnType<typeof createCounterStore>>,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const CounterStoresContext = createContext<Map<
      string,
      ReturnType<typeof createCounterStore>
    > | null>(null)
    
    const CounterStoresProvider = ({ children }: { children: ReactNode }) => {
      const [stores] = useState(
        () => new Map<string, ReturnType<typeof createCounterStore>>(),
      )
    
      return (
        <CounterStoresContext.Provider value={stores}>
          {children}
        </CounterStoresContext.Provider>
      )
    }
    
    const useCounterStore = <U,>(
      key: string,
      selector: (state: CounterStore) => U,
    ) => {
      const stores = useContext(CounterStoresContext)
    
      if (stores === undefined) {
        throw new Error('useCounterStore must be used within CounterStoresProvider')
      }
    
      const getOrCreateCounterStoreByKey = useCallback(
        (key: string) => createCounterStoreFactory(stores!)(key),
        [stores],
      )
    
      return useStore(getOrCreateCounterStoreByKey(key), selector)
    }
    
    function Tabs() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useCounterStore(
        `tab-${currentTabIndex}`,
        (state) => state,
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    
    export default function App() {
      return (
        <CounterStoresProvider>
          <Tabs />
        </CounterStoresProvider>
      )
    }
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>useStore ⚛️ - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/hooks/use-store</url>
  <content>How to use vanilla stores in React

`useStore` is a React Hook that lets you use a vanilla store in React.

    const someState = useStore(store, selectorFn)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Use a vanilla store in React](#use-a-vanilla-store-in-react)
    *   [Using dynamic vanilla stores in React](#using-dynamic-global-vanilla-stores-in-react)
    *   [Using scoped (non-global) vanilla store in React](#using-scoped-non-global-vanilla-store-in-react)
    *   [Using dynamic scoped (non-global) vanilla stores in React](#using-dynamic-scoped-non-global-vanilla-stores-in-react)
    
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    useStore<StoreApi<T>, U = T>(store: StoreApi<T>, selectorFn?: (state: T) => U) => UseBoundStore<StoreApi<T>>
    

[

Reference
---------

](#reference)[

### `useStore(store, selectorFn)`

](#usestore\(store,-selectorfn\))[

#### Parameters

](#parameters)

*   `storeApi`: The instance that lets you access to store API utilities.
*   `selectorFn`: A function that lets you return data that is based on current state.

[

#### Returns

](#returns)

`useStore` returns any data based on current state depending on the selector function. It should take a store, and a selector function as arguments.

[

Usage
-----

](#usage)[

### Using a global vanilla store in React

](#using-a-global-vanilla-store-in-react)

First, let's set up a store that will hold the position of the dot on the screen. We'll define the store to manage `x` and `y` coordinates and provide an action to update these coordinates.

    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    

Next, we'll create a `MovingDot` component that renders a div representing the dot. This component will use the store to track and update the dot's position.

    function MovingDot() {
      const position = useStore(positionStore, (state) => state.position)
      const setPosition = useStore(positionStore, (state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

Finally, we’ll render the `MovingDot` component in our `App` component.

    export default function App() {
      return <MovingDot />
    }
    

Here is what the code should look like:

    import { createStore, useStore } from 'zustand'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()((set) => ({
      position: { x: 0, y: 0 },
      setPosition: (position) => set({ position }),
    }))
    
    function MovingDot() {
      const position = useStore(positionStore, (state) => state.position)
      const setPosition = useStore(positionStore, (state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x: e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    
    export default function App() {
      return <MovingDot />
    }
    

[

### Using dynamic global vanilla stores in React

](#using-dynamic-global-vanilla-stores-in-react)

First, we'll create a factory function that generates a store for managing the counter state. Each tab will have its own instance of this store.

    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    

Next, we'll create a factory function that manages the creation and retrieval of counter stores. This allows each tab to have its own independent counter.

    const defaultCounterStores = new Map<
      string,
      ReturnType<typeof createCounterStore>
    >()
    
    const createCounterStoreFactory = (
      counterStores: typeof defaultCounterStores,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const getOrCreateCounterStoreByKey =
      createCounterStoreFactory(defaultCounterStores)
    

Now, let’s build the Tabs component, where users can switch between tabs and increment each tab’s counter.

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const counterState = useStore(
      getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
    )
    
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid salmon',
            paddingBottom: 4,
          }}
        >
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(0)}
          >
            Tab 1
          </button>
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(1)}
          >
            Tab 2
          </button>
          <button
            type="button"
            style={{
              border: '1px solid salmon',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentTabIndex(2)}
          >
            Tab 3
          </button>
        </div>
        <div style={{ padding: 4 }}>
          Content of Tab {currentTabIndex + 1}
          <br /> <br />
          <button type="button" onClick={() => counterState.increment()}>
            Count: {counterState.count}
          </button>
        </div>
      </div>
    )
    

Finally, we'll create the `App` component, which renders the tabs and their respective counters. The counter state is managed independently for each tab.

    export default function App() {
      return <Tabs />
    }
    

Here is what the code should look like:

    import { useState } from 'react'
    import { createStore, useStore } from 'zustand'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    
    const defaultCounterStores = new Map<
      string,
      ReturnType<typeof createCounterStore>
    >()
    
    const createCounterStoreFactory = (
      counterStores: typeof defaultCounterStores,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const getOrCreateCounterStoreByKey =
      createCounterStoreFactory(defaultCounterStores)
    
    export default function App() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useStore(
        getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`),
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    

[

### Using scoped (non-global) vanilla store in React

](#using-scoped-\(non-global\)-vanilla-store-in-react)

First, let's set up a store that will hold the position of the dot on the screen. We'll define the store to manage `x` and `y` coordinates and provide an action to update these coordinates.

    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const createPositionStore = () => {
      return createStore<PositionStore>()((set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      }))
    }
    

Next, we'll create a context and a provider component to pass down the store through the React component tree. This allows each `MovingDot` component to have its own independent state.

    const PositionStoreContext = createContext<ReturnType<
      typeof createPositionStore
    > | null>(null)
    
    function PositionStoreProvider({ children }: { children: ReactNode }) {
      const [positionStore] = useState(createPositionStore)
    
      return (
        <PositionStoreContext.Provider value={positionStore}>
          {children}
        </PositionStoreContext.Provider>
      )
    }
    

To simplify accessing the store, we’ll create a React custom hook, `usePositionStore`. This hook will read the store from the context and allow us to select specific parts of the state.

    function usePositionStore<U>(selector: (state: PositionStore) => U) {
      const store = useContext(PositionStoreContext)
    
      if (store === null) {
        throw new Error(
          'usePositionStore must be used within PositionStoreProvider',
        )
      }
    
      return useStore(store, selector)
    }
    

Now, let's create the `MovingDot` component, which will render a dot that follows the mouse cursor within its container.

    function MovingDot({ color }: { color: string }) {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x:
                e.clientX > e.currentTarget.clientWidth
                  ? e.clientX - e.currentTarget.clientWidth
                  : e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '50vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    

Finally, we'll bring everything together in the `App` component, where we render two `MovingDot` components, each with its own independent state.

    export default function App() {
      return (
        <div style={{ display: 'flex' }}>
          <PositionStoreProvider>
            <MovingDot color="red" />
          </PositionStoreProvider>
          <PositionStoreProvider>
            <MovingDot color="blue" />
          </PositionStoreProvider>
        </div>
      )
    }
    

Here is what the code should look like:

    import { type ReactNode, useState, createContext, useContext } from 'react'
    import { createStore, useStore } from 'zustand'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const createPositionStore = () => {
      return createStore<PositionStore>()((set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      }))
    }
    
    const PositionStoreContext = createContext<ReturnType<
      typeof createPositionStore
    > | null>(null)
    
    function PositionStoreProvider({ children }: { children: ReactNode }) {
      const [positionStore] = useState(createPositionStore)
    
      return (
        <PositionStoreContext.Provider value={positionStore}>
          {children}
        </PositionStoreContext.Provider>
      )
    }
    
    function usePositionStore<U>(selector: (state: PositionStore) => U) {
      const store = useContext(PositionStoreContext)
    
      if (store === null) {
        throw new Error(
          'usePositionStore must be used within PositionStoreProvider',
        )
      }
    
      return useStore(store, selector)
    }
    
    function MovingDot({ color }: { color: string }) {
      const position = usePositionStore((state) => state.position)
      const setPosition = usePositionStore((state) => state.setPosition)
    
      return (
        <div
          onPointerMove={(e) => {
            setPosition({
              x:
                e.clientX > e.currentTarget.clientWidth
                  ? e.clientX - e.currentTarget.clientWidth
                  : e.clientX,
              y: e.clientY,
            })
          }}
          style={{
            position: 'relative',
            width: '50vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              backgroundColor: color,
              borderRadius: '50%',
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: -10,
              top: -10,
              width: 20,
              height: 20,
            }}
          />
        </div>
      )
    }
    
    export default function App() {
      return (
        <div style={{ display: 'flex' }}>
          <PositionStoreProvider>
            <MovingDot color="red" />
          </PositionStoreProvider>
          <PositionStoreProvider>
            <MovingDot color="blue" />
          </PositionStoreProvider>
        </div>
      )
    }
    

[

### Using dynamic scoped (non-global) vanilla stores in React

](#using-dynamic-scoped-\(non-global\)-vanilla-stores-in-react)

First, we'll create a factory function that generates a store for managing the counter state. Each tab will have its own instance of this store.

    import { createStore } from 'zustand'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    

Next, we'll create a factory function that manages the creation and retrieval of counter stores. This allows each tab to have its own independent counter.

    const createCounterStoreFactory = (
      counterStores: Map<string, ReturnType<typeof createCounterStore>>,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    

Next, we need a way to manage and access these stores throughout our app. We’ll use React’s context for this.

    const CounterStoresContext = createContext(null)
    
    const CounterStoresProvider = ({ children }) => {
      const [stores] = useState(
        () => new Map<string, ReturnType<typeof createCounterStore>>(),
      )
    
      return (
        <CounterStoresContext.Provider value={stores}>
          {children}
        </CounterStoresContext.Provider>
      )
    }
    

Now, we’ll create a custom hook, `useCounterStore`, that lets us access the correct store for a given tab.

    const useCounterStore = <U>(
      currentTabIndex: number,
      selector: (state: CounterStore) => U,
    ) => {
      const stores = useContext(CounterStoresContext)
    
      if (stores === undefined) {
        throw new Error('useCounterStore must be used within CounterStoresProvider')
      }
    
      const getOrCreateCounterStoreByKey = useCallback(
        () => createCounterStoreFactory(stores),
        [stores],
      )
    
      return useStore(getOrCreateCounterStoreByKey(`tab-${currentTabIndex}`))
    }
    

Now, let’s build the Tabs component, where users can switch between tabs and increment each tab’s counter.

    function Tabs() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useCounterStore(
        `tab-${currentTabIndex}`,
        (state) => state,
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    

Finally, we'll create the `App` component, which renders the tabs and their respective counters. The counter state is managed independently for each tab.

    export default function App() {
      return (
        <CounterStoresProvider>
          <Tabs />
        </CounterStoresProvider>
      )
    }
    

Here is what the code should look like:

    import {
      type ReactNode,
      useState,
      useCallback,
      useContext,
      createContext,
    } from 'react'
    import { createStore, useStore } from 'zustand'
    
    type CounterState = {
      count: number
    }
    
    type CounterActions = { increment: () => void }
    
    type CounterStore = CounterState & CounterActions
    
    const createCounterStore = () => {
      return createStore<CounterStore>()((set) => ({
        count: 0,
        increment: () => {
          set((state) => ({ count: state.count + 1 }))
        },
      }))
    }
    
    const createCounterStoreFactory = (
      counterStores: Map<string, ReturnType<typeof createCounterStore>>,
    ) => {
      return (counterStoreKey: string) => {
        if (!counterStores.has(counterStoreKey)) {
          counterStores.set(counterStoreKey, createCounterStore())
        }
        return counterStores.get(counterStoreKey)!
      }
    }
    
    const CounterStoresContext = createContext<Map<
      string,
      ReturnType<typeof createCounterStore>
    > | null>(null)
    
    const CounterStoresProvider = ({ children }: { children: ReactNode }) => {
      const [stores] = useState(
        () => new Map<string, ReturnType<typeof createCounterStore>>(),
      )
    
      return (
        <CounterStoresContext.Provider value={stores}>
          {children}
        </CounterStoresContext.Provider>
      )
    }
    
    const useCounterStore = <U,>(
      key: string,
      selector: (state: CounterStore) => U,
    ) => {
      const stores = useContext(CounterStoresContext)
    
      if (stores === undefined) {
        throw new Error('useCounterStore must be used within CounterStoresProvider')
      }
    
      const getOrCreateCounterStoreByKey = useCallback(
        (key: string) => createCounterStoreFactory(stores!)(key),
        [stores],
      )
    
      return useStore(getOrCreateCounterStoreByKey(key), selector)
    }
    
    function Tabs() {
      const [currentTabIndex, setCurrentTabIndex] = useState(0)
      const counterState = useCounterStore(
        `tab-${currentTabIndex}`,
        (state) => state,
      )
    
      return (
        <div style={{ fontFamily: 'monospace' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid salmon',
              paddingBottom: 4,
            }}
          >
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(0)}
            >
              Tab 1
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(1)}
            >
              Tab 2
            </button>
            <button
              type="button"
              style={{
                border: '1px solid salmon',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentTabIndex(2)}
            >
              Tab 3
            </button>
          </div>
          <div style={{ padding: 4 }}>
            Content of Tab {currentTabIndex + 1}
            <br /> <br />
            <button type="button" onClick={() => counterState.increment()}>
              Count: {counterState.count}
            </button>
          </div>
        </div>
      )
    }
    
    export default function App() {
      return (
        <CounterStoresProvider>
          <Tabs />
        </CounterStoresProvider>
      )
    }
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>devtools - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/devtools</url>
  <content>How to time-travel debug your store

`devtools` middleware lets you use [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) without Redux. Read more about the benefits of using [Redux DevTools for debugging](https://redux.js.org/style-guide/#use-the-redux-devtools-extension-for-debugging).

    const nextStateCreatorFn = devtools(stateCreatorFn, devtoolsOptions)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    *   [Mutator](#mutator)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Debugging a store](#debugging-a-store)
    *   [Debugging a Slices pattern based store](#debugging-a-slices-pattern-based-store)
    
*   [Troubleshooting](#troubleshooting)
    
    *   [Only one store is displayed](#only-one-store-is-displayed)
    *   [Action names are labeled as 'anonymous'](#all-action-names-are-labeled-as-anonymous)
    

[

Types
-----

](#types)[

### Signature

](#signature)

    devtools<T>(stateCreatorFn: StateCreator<T, [], []>, devtoolsOptions?: DevtoolsOptions): StateCreator<T, [['zustand/devtools', never]], []>
    

[

### Mutator

](#mutator)

    ['zustand/devtools', never]
    

[

Reference
---------

](#reference)[

### `devtools(stateCreatorFn, devtoolsOptions)`

](#devtools\(statecreatorfn,-devtoolsoptions\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.
*   **optional** `devtoolsOptions`: An object to define `Redux Devtools` options.
    
    *   **optional** `name`: A custom identifier for the connection in the Redux DevTools.
    *   **optional** `enabled`: Defaults to `true` when is on development mode, and defaults to `false` when is on production mode. Enables or disables the Redux DevTools integration for this store.
    *   **optional** `anonymousActionType`: Defaults to `anonymous`. A string to use as the action type for anonymous mutations in the Redux DevTools.
    *   **optional** `store`: A custom identifier for the store in the Redux DevTools.
    

[

#### Returns

](#returns)

`devtools` returns a state creator function.

[

Usage
-----

](#usage)[

### Debugging a store

](#debugging-a-store)

This example shows you how you can use `Redux Devtools` to debug a store

    import { create, StateCreator } from 'zustand'
    import { devtools } from 'zustand/middleware'
    
    type JungleStore = {
      bears: number
      addBear: () => void
      fishes: number
      addFish: () => void
    }
    
    const useJungleStore = create<JungleStore>()(
      devtools((set) => ({
        bears: 0,
        addBear: () =>
          set((state) => ({ bears: state.bears + 1 }), undefined, 'jungle/addBear'),
        fishes: 0,
        addFish: () =>
          set(
            (state) => ({ fishes: state.fishes + 1 }),
            undefined,
            'jungle/addFish',
          ),
      })),
    )
    

[

### Debugging a Slices pattern based store

](#debugging-a-slices-pattern-based-store)

This example shows you how you can use `Redux Devtools` to debug a Slices pattern based store

    import { create, StateCreator } from 'zustand'
    import { devtools } from 'zustand/middleware'
    
    type BearSlice = {
      bears: number
      addBear: () => void
    }
    
    type FishSlice = {
      fishes: number
      addFish: () => void
    }
    
    type JungleStore = BearSlice & FishSlice
    
    const createBearSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      BearSlice
    > = (set) => ({
      bears: 0,
      addBear: () =>
        set(
          (state) => ({ bears: state.bears + 1 }),
          undefined,
          'jungle:bear/addBear',
        ),
    })
    
    const createFishSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      FishSlice
    > = (set) => ({
      fishes: 0,
      addFish: () =>
        set(
          (state) => ({ fishes: state.fishes + 1 }),
          undefined,
          'jungle:fish/addFish',
        ),
    })
    
    const useJungleStore = create<JungleStore>()(
      devtools((...args) => ({
        ...createBearSlice(...args),
        ...createFishSlice(...args),
      })),
    )
    

[

Troubleshooting
---------------

](#troubleshooting)[

### Only one store is displayed

](#only-one-store-is-displayed)

By default, `Redux Devtools` only show one store at a time, so in order to see other stores you need to use store selector and choose a different store.

[

### All action names are labeled as 'anonymous'

](#all-action-names-are-labeled-as-'anonymous')

If an action type name is not provided, it is defaulted to "anonymous". You can customize this default value by providing a `anonymousActionType` parameter:

For instance the next example doesn't have action type name:

    import { create, StateCreator } from 'zustand'
    import { devtools } from 'zustand/middleware'
    
    type BearSlice = {
      bears: number
      addBear: () => void
    }
    
    type FishSlice = {
      fishes: number
      addFish: () => void
    }
    
    type JungleStore = BearSlice & FishSlice
    
    const createBearSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      BearSlice
    > = (set) => ({
      bears: 0,
      addBear: () => set((state) => ({ bears: state.bears + 1 })),
      eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
    })
    
    const createFishSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      FishSlice
    > = (set) => ({
      fishes: 0,
      addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
    })
    
    const useJungleStore = create<JungleStore>()(
      devtools((...args) => ({
        ...createBearSlice(...args),
        ...createFishSlice(...args),
      })),
    )
    

In order to fix the previous example, we need to provide an action type name as the third parameter. Additionally, to preserve the default behavior of the replacement logic, the second parameter should be set to `undefined`.

Here's the fixed previous example

    import { create, StateCreator } from 'zustand'
    
    type BearSlice = {
      bears: number
      addBear: () => void
    }
    
    type FishSlice = {
      fishes: number
      addFish: () => void
    }
    
    type JungleStore = BearSlice & FishSlice
    
    const createBearSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      BearSlice
    > = (set) => ({
      bears: 0,
      addBear: () =>
        set((state) => ({ bears: state.bears + 1 }), undefined, 'bear/addBear'),
    })
    
    const createFishSlice: StateCreator<
      JungleStore,
      [['zustand/devtools', never]],
      [],
      FishSlice
    > = (set) => ({
      fishes: 0,
      addFish: () =>
        set((state) => ({ fishes: state.fishes + 1 }), undefined, 'fish/addFish'),
    })
    
    const useJungleStore = create<JungleStore>()(
      devtools((...args) => ({
        ...createBearSlice(...args),
        ...createFishSlice(...args),
      })),
    )
    

Do not set the second parameter to `true` or `false` unless you want to override the default replacement logic</content>
</page>

<page>
  <title>immer - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/immer</url>
  <content>How to perform immutable updates in a store without boilerplate code

`immer` middleware lets you perform immutable updates.

    const nextStateCreatorFn = immer(stateCreatorFn)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    *   [Mutator](#mutator)
    
*   [Reference](#reference)
*   [Usage](#usage)
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    immer<T>(stateCreatorFn: StateCreator<T, [], []>): StateCreator<T, [['zustand/immer', never]], []>
    

[

### Mutator

](#mutator)[

Reference
---------

](#reference)[

### `immer(stateCreatorFn)`

](#immer\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.

[

#### Returns

](#returns)

`immer` returns a state creator function.

[

Usage
-----

](#usage)[

### Updating state without boilerplate code

](#updating-state-without-boilerplate-code)

In the next example, we're going to update the `person` object. Since it's a nested object, we need to create a copy of the entire object before making the update.

    import { createStore } from 'zustand/vanilla'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (
        nextPerson: (
          person: PersonStoreState['person'],
        ) => PersonStoreState['person'] | PersonStoreState['person'],
      ) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const personStore = createStore<PersonStore>()((set) => ({
      person: {
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
      },
      setPerson: (nextPerson) =>
        set((state) => ({
          person:
            typeof nextPerson === 'function'
              ? nextPerson(state.person)
              : nextPerson,
        })),
    }))
    
    const $firstNameInput = document.getElementById(
      'first-name',
    ) as HTMLInputElement
    const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
    const $emailInput = document.getElementById('email') as HTMLInputElement
    const $result = document.getElementById('result') as HTMLDivElement
    
    function handleFirstNameChange(event: Event) {
      personStore.getState().setPerson((person) => ({
        ...person,
        firstName: (event.target as any).value,
      }))
    }
    
    function handleLastNameChange(event: Event) {
      personStore.getState().setPerson((person) => ({
        ...person,
        lastName: (event.target as any).value,
      }))
    }
    
    function handleEmailChange(event: Event) {
      personStore.getState().setPerson((person) => ({
        ...person,
        email: (event.target as any).value,
      }))
    }
    
    $firstNameInput.addEventListener('input', handleFirstNameChange)
    $lastNameInput.addEventListener('input', handleLastNameChange)
    $emailInput.addEventListener('input', handleEmailChange)
    
    const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
      $firstNameInput.value = state.person.firstName
      $lastNameInput.value = state.person.lastName
      $emailInput.value = state.person.email
    
      $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
    }
    
    render(personStore.getInitialState(), personStore.getInitialState())
    
    personStore.subscribe(render)
    

Here's the `html` code

    <label style="display: block">
      First name:
      <input id="first-name" />
    </label>
    <label style="display: block">
      Last name:
      <input id="last-name" />
    </label>
    <label style="display: block">
      Email:
      <input id="email" />
    </label>
    <p id="result"></p>
    

To avoid manually copying the entire object before making updates, we'll use the `immer` middleware.

    import { createStore } from 'zustand/vanilla'
    import { immer } from 'zustand/middleware/immer'
    
    type PersonStoreState = {
      person: { firstName: string; lastName: string; email: string }
    }
    
    type PersonStoreActions = {
      setPerson: (
        nextPerson: (
          person: PersonStoreState['person'],
        ) => PersonStoreState['person'] | PersonStoreState['person'],
      ) => void
    }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const personStore = createStore<PersonStore>()(
      immer((set) => ({
        person: {
          firstName: 'Barbara',
          lastName: 'Hepworth',
          email: 'bhepworth@sculpture.com',
        },
        setPerson: (nextPerson) =>
          set((state) => {
            state.person = typeof nextPerson ? nextPerson(state.person) : nextPerson
          }),
      })),
    )
    
    const $firstNameInput = document.getElementById(
      'first-name',
    ) as HTMLInputElement
    const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
    const $emailInput = document.getElementById('email') as HTMLInputElement
    const $result = document.getElementById('result') as HTMLDivElement
    
    function handleFirstNameChange(event: Event) {
      personStore.getState().setPerson((person) => {
        person.firstName = (event.target as any).value
      })
    }
    
    function handleLastNameChange(event: Event) {
      personStore.getState().setPerson((person) => {
        person.lastName = (event.target as any).value
      })
    }
    
    function handleEmailChange(event: Event) {
      personStore.getState().setPerson((person) => {
        person.email = (event.target as any).value
      })
    }
    
    $firstNameInput.addEventListener('input', handleFirstNameChange)
    $lastNameInput.addEventListener('input', handleLastNameChange)
    $emailInput.addEventListener('input', handleEmailChange)
    
    const render: Parameters<typeof personStore.subscribe>[0] = (state) => {
      $firstNameInput.value = state.person.firstName
      $lastNameInput.value = state.person.lastName
      $emailInput.value = state.person.email
    
      $result.innerHTML = `${state.person.firstName} ${state.person.lastName} (${state.person.email})`
    }
    
    render(personStore.getInitialState(), personStore.getInitialState())
    
    personStore.subscribe(render)
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>persist - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/persist</url>
  <content>How to persist a store

`persist` middleware lets you persist a store's state across page reloads or application restarts.

    const nextStateCreatorFn = persist(stateCreatorFn, persistOptions)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    *   [Mutator](#mutator)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Persisting a state](#persisting-a-state)
    *   [Persisting a state partially](#persisting-a-state-partially)
    *   [Persisting a state with custom storage](#persisting-a-state-with-custom-storage)
    *   [Persisting a state through versioning and migrations](#persisting-a-state-through-versioning-and-migrations)
    *   [Persisting a state with nested objects](#persisting-a-state-with-nested-objects)
    *   [Persisting a state and hydrate it manually](#persisting-a-state-and-hydrate-it-manually)
    
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    persist<T, U>(stateCreatorFn: StateCreator<T, [], []>, persistOptions?: PersistOptions<T, U>): StateCreator<T, [['zustand/persist', U]], []>
    

[

### Mutator

](#mutator)[

Reference
---------

](#reference)[

### `persist(stateCreatorFn)`

](#persist\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.
*   `persistOptions`: An object to define storage options.
    
    *   `name`: A unique name of the item for your store in the storage.
    *   **optional** `storage`: Defaults to `createJSONStorage(() => localStorage)`. -
    *   **optional** `partialize`: A function to filter state fields before persisting it.
    *   **optional** `onRehydrateStorage`: A function or function returning a function that allows custom logic before and after state rehydration.
    *   **optional** `version`: A version number for the persisted state. If the stored state version doesn't match, it won't be used.
    *   **optional** `migrate`: A function to migrate persisted state if the version mismatch occurs.
    *   **optional** `merge`: A function for custom logic when merging persisted state with the current state during rehydration. Defaults to a shallow merge.
    *   **optional** `skipHydration`: Defaults to `false`. If `true`, the middleware won't automatically rehydrate the state on initialization. Use `rehydrate` function manually in this case. This is useful for server-side rendering (SSR) applications.
    

[

#### Returns

](#returns)

`persist` returns a state creator function.

[

Usage
-----

](#usage)[

### Persisting a state

](#persisting-a-state)

In this tutorial, we'll create a simple position tracker using vanilla store and the `persist` middleware. The example tracks the `position` of the mouse as it moves within a container and stores the `position` in local storage, so it persists even when the page reloads.

We start by setting up a vanilla store that holds the position (an object with `x` and `y` coordinates) and an action to update it. We'll also use the `persist` middleware to store the position in `localStorage`.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        { name: 'position-storage' },
      ),
    )
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the complete code.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        { name: 'position-storage' },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Persisting a state partially

](#persisting-a-state-partially)

In this tutorial, we'll create a simple position tracker using vanilla store and the `persist` middleware. Additionally, we'll show you how to persist only part of the state (partial persistence), which can be useful when you don’t want to store the entire state in `localStorage`.

We’ll first create a vanilla store that holds the position state and actions to update it. We'll use the `persist` middleware to persist only the relevant part of the state (in this case, the context containing the position).

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = {
      context: {
        position: { x: number; y: number }
      }
    }
    
    type PositionStoreActions = {
      actions: {
        setPosition: (
          nextPosition: PositionStoreState['context']['position'],
        ) => void
      }
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          context: {
            position: { x: 0, y: 0 },
          },
          actions: {
            setPosition: (position) => set({ context: { position } }),
          },
        }),
        {
          name: 'position-storage',
          partialize: (state) => ({ context: state.context }),
        },
      ),
    )
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().actions.setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.context.position.x}px, ${state.context.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the full code to create a dot that follows your mouse movement inside a container and persists the `context` in `localStorage`.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = {
      context: {
        position: { x: number; y: number }
      }
    }
    
    type PositionStoreActions = {
      actions: {
        setPosition: (
          nextPosition: PositionStoreState['context']['position'],
        ) => void
      }
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          context: {
            position: { x: 0, y: 0 },
          },
          actions: {
            setPosition: (position) => set({ context: { position } }),
          },
        }),
        {
          name: 'position-storage',
          partialize: (state) => ({ context: state.context }),
        },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().actions.setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.context.position.x}px, ${state.context.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Persisting a state with custom storage

](#persisting-a-state-with-custom-storage)

In this mini tutorial, we’ll create a simple position-tracking system using vanilla store, where the position state is persisted in the URL's search parameters. This approach allows state persistence directly in the browser's URL, which can be useful for maintaining state across page reloads or sharing links with state embedded.

We need to implement functions to manipulate URL search parameters as if they were a storage mechanism. This includes retrieving, setting, and removing parameters.

    const getSearchParams = () => {
      return new URL(location.href).searchParams
    }
    
    const updateSearchParams = (searchParams: URLSearchParams) => {
      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`,
      )
    }
    
    const getSearchParam = (key: string) => {
      const searchParams = getSearchParams()
      return searchParams.get(key)
    }
    
    const updateSearchParam = (key: string, value: string) => {
      const searchParams = getSearchParams()
      searchParams.set(key, value)
    
      updateSearchParams(searchParams)
    }
    
    const removeSearchParam = (key: string) => {
      const searchParams = getSearchParams()
      searchParams.delete(key)
    
      updateSearchParams(searchParams)
    }
    

To use the URL search parameters as storage, we define a `searchParamsStorage` object with `getItem`, `setItem`, and `removeItem` methods. These methods map to our custom functions that manipulate search parameters.

    const searchParamsStorage = {
      getItem: (key: string) => getSearchParam(key),
      setItem: (key: string, value: string) => updateSearchParam(key, value),
      removeItem: (key: string) => removeSearchParam(key),
    }
    

Now, we initialize the vanilla store using the `persist` middleware, specifying that we want to use our custom storage. Instead of the default `localStorage` or `sessionStorage`, we’ll persist the position data in the URL search parameters.

    import { createStore } from 'zustand/vanilla'
    import { persist, createJSONStorage } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          storage: createJSONStorage(() => searchParamsStorage),
        },
      ),
    )
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the full code to create a dot that follows your mouse movement inside a container and persists the position in URL's search parameters.

    import { createStore } from 'zustand/vanilla'
    import { persist, createJSONStorage } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const getSearchParams = () => {
      return new URL(location.href).searchParams
    }
    
    const updateSearchParams = (searchParams: URLSearchParams) => {
      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${searchParams.toString()}`,
      )
    }
    
    const getSearchParam = (key: string) => {
      const searchParams = getSearchParams()
      return searchParams.get(key)
    }
    
    const updateSearchParam = (key: string, value: string) => {
      const searchParams = getSearchParams()
      searchParams.set(key, value)
    
      updateSearchParams(searchParams)
    }
    
    const removeSearchParam = (key: string) => {
      const searchParams = getSearchParams()
      searchParams.delete(key)
    
      updateSearchParams(searchParams)
    }
    
    const searchParamsStorage = {
      getItem: (key: string) => getSearchParam(key),
      setItem: (key: string, value: string) => updateSearchParam(key, value),
      removeItem: (key: string) => removeSearchParam(key),
    }
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          storage: createJSONStorage(() => searchParamsStorage),
        },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Persisting a state through versioning and migrations

](#persisting-a-state-through-versioning-and-migrations)

In this tutorial, we’ll explore how to manage state persistence using versioning and migration. We will demonstrate how to evolve your state schema across versions without breaking existing persisted data.

Before moving to versioned state management, we simulate an initial state for `version` 0. This is done by manually setting a `version` 0 state in `localStorage` if it doesn't already exist. The `version` 0 state saves the coordinates as `x` and `y` fields.

    // For tutorial purposes only
    if (!localStorage.getItem('position-storage')) {
      localStorage.setItem(
        'position-storage',
        JSON.stringify({
          state: { x: 100, y: 100 }, // version 0 structure
          version: 0,
        }),
      )
    }
    

Next, we use `persist` middleware to handle state persistence. We also add a migration function to handle changes between versions. In this example, we `migrate` the state from `version` 0 (where `x` and `y` are separate) to `version` 1, where they are combined into a `position` object.

    migrate: (persisted: any, version) => {
      if (version === 0) {
        persisted.position = { x: persisted.x, y: persisted.y }
        delete persisted.x
        delete persisted.y
      }
    
      return persisted
    }
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the complete code.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    // For tutorial purposes only
    if (!localStorage.getItem('position-storage')) {
      localStorage.setItem(
        'position-storage',
        JSON.stringify({
          state: { x: 100, y: 100 },
          version: 0,
        }),
      )
    }
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 }, // version 0: just x: 0, y: 0
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          version: 1,
          migrate: (persisted: any, version) => {
            if (version === 0) {
              persisted.position = { x: persisted.x, y: persisted.y }
              delete persisted.x
              delete persisted.y
            }
    
            return persisted
          },
        },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Persisting a state with nested objects

](#persisting-a-state-with-nested-objects)

In this tutorial, we’ll create a vanilla store that keeps track of a position represented by `x` and `y` coordinates. We will also implement persistence using `localStorage` and demonstrate how to handle merging of state with potentially missing fields.

To simulate an initial state for the tutorial, we will check if our position data exists in `localStorage`. If it doesn't, we’ll set it up.

    if (!localStorage.getItem('position-storage')) {
      localStorage.setItem(
        'position-storage',
        JSON.stringify({
          state: { position: { y: 100 } }, // missing `x` field
          version: 0,
        }),
      )
    }
    

Now, we will create the store and configure it to use persistence and deep merging.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    import createDeepMerge from '@fastify/deepmerge'
    
    const deepMerge = createDeepMerge({ all: true })
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          merge: (persisted, current) => deepMerge(current, persisted) as never,
        },
      ),
    )
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the complete code.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    import createDeepMerge from '@fastify/deepmerge'
    
    const deepMerge = createDeepMerge({ all: true })
    
    // For tutorial purposes only
    if (!localStorage.getItem('position-storage')) {
      localStorage.setItem(
        'position-storage',
        JSON.stringify({
          state: { position: { y: 100 } }, // missing `x` field
          version: 0,
        }),
      )
    }
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          merge: (persisted, current) => deepMerge(current, persisted) as never,
        },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      console.log({ state })
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

### Persisting a state and hydrate it manually

](#persisting-a-state-and-hydrate-it-manually)

In this tutorial, we’ll create a vanilla store that keeps track of a position represented by `x` and `y` coordinates. We will also implement persistence using `localStorage` and explore how to skip the hydration process and manually trigger rehydration after a delay.

We start by setting up a vanilla store that holds the position (an object with `x` and `y` coordinates) and an action to update it. Furthermore, we'll also use the `persist` middleware to store the position in `localStorage` but skipping hydration.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          skipHydration: true,
        },
      ),
    )
    

Since we skipped hydration in the initial setup, we will manually rehydrate the state. Here, we’re using `setTimeout` to simulate a delayed rehydration.

    setTimeout(() => {
      positionStore.persist.rehydrate()
    }, 2000)
    

Next, we'll track the mouse movements inside a div and update the store with the new position.

    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    

We want to reflect the position updates on the screen by moving a div element (representing the dot) to the new coordinates.

    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here’s the complete code.

    import { createStore } from 'zustand/vanilla'
    import { persist } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      persist(
        (set) => ({
          position: { x: 0, y: 0 },
          setPosition: (position) => set({ position }),
        }),
        {
          name: 'position-storage',
          skipHydration: true,
        },
      ),
    )
    
    const $dotContainer = document.getElementById('dot-container') as HTMLDivElement
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dotContainer.addEventListener('pointermove', (event) => {
      positionStore.getState().setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    setTimeout(() => {
      positionStore.persist.rehydrate()
    }, 2000)
    
    render(positionStore.getState(), positionStore.getState())
    
    positionStore.subscribe(render)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>redux - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/redux</url>
  <content>How to use actions and reducers in a store

`redux` middleware lets you update a store through actions and reducers just like redux.

    const nextStateCreatorFn = redux(reducerFn, initialState)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    *   [Mutator](#mutator)
    
*   [Reference](#reference)
*   [Usage](#usage)
    
    *   [Updating state through actions and reducers](#updating-state-through-actions-and-reducers)
    
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    redux<T, A>(reducerFn: (state: T, action: A) => T, initialState: T): StateCreator<T & { dispatch: (action: A) => A }, [['zustand/redux', A]], []>
    

[

### Mutator

](#mutator)[

Reference
---------

](#reference)[

### `redux(reducerFn, initialState)`

](#redux\(reducerfn,-initialstate\))[

#### Parameters

](#parameters)

*   `reducerFn`: It should be pure and should take the current state of your application and an action object as arguments, and returns the new state resulting from applying the action.
*   `initialState`: The value you want the state to be initially. It can be a value of any type, except a function.

[

#### Returns

](#returns)

`redux` returns a state creator function.

[

Usage
-----

](#usage)[

### Updating state through actions and reducers

](#updating-state-through-actions-and-reducers)

    import { createStore } from 'zustand/vanilla'
    import { redux } from 'zustand/middleware'
    
    type PersonStoreState = {
      firstName: string
      lastName: string
      email: string
    }
    
    type PersonStoreAction =
      | { type: 'person/setFirstName'; firstName: string }
      | { type: 'person/setLastName'; lastName: string }
      | { type: 'person/setEmail'; email: string }
    
    type PersonStore = PersonStoreState & PersonStoreActions
    
    const personStoreReducer = (
      state: PersonStoreState,
      action: PersonStoreAction,
    ) => {
      switch (action.type) {
        case 'person/setFirstName': {
          return { ...state, firstName: action.firstName }
        }
        case 'person/setLastName': {
          return { ...state, lastName: action.lastName }
        }
        case 'person/setEmail': {
          return { ...state, email: action.email }
        }
        default: {
          return state
        }
      }
    }
    
    const personStoreInitialState: PersonStoreState = {
      firstName: 'Barbara',
      lastName: 'Hepworth',
      email: 'bhepworth@sculpture.com',
    }
    
    const personStore = createStore<PersonStore>()(
      redux(personStoreReducer, personStoreInitialState),
    )
    
    const $firstNameInput = document.getElementById(
      'first-name',
    ) as HTMLInputElement
    const $lastNameInput = document.getElementById('last-name') as HTMLInputElement
    const $emailInput = document.getElementById('email') as HTMLInputElement
    const $result = document.getElementById('result') as HTMLDivElement
    
    function handleFirstNameChange(event: Event) {
      personStore.dispatch({
        type: 'person/setFirstName',
        firstName: (event.target as any).value,
      })
    }
    
    function handleLastNameChange(event: Event) {
      personStore.dispatch({
        type: 'person/setLastName',
        lastName: (event.target as any).value,
      })
    }
    
    function handleEmailChange(event: Event) {
      personStore.dispatch({
        type: 'person/setEmail',
        email: (event.target as any).value,
      })
    }
    
    $firstNameInput.addEventListener('input', handleFirstNameChange)
    $lastNameInput.addEventListener('input', handleLastNameChange)
    $emailInput.addEventListener('input', handleEmailChange)
    
    const render: Parameters<typeof personStore.subscribe>[0] = (person) => {
      $firstNameInput.value = person.firstName
      $lastNameInput.value = person.lastName
      $emailInput.value = person.email
    
      $result.innerHTML = `${person.firstName} ${person.lastName} (${person.email})`
    }
    
    render(personStore.getInitialState(), personStore.getInitialState())
    
    personStore.subscribe(render)
    

Here's the `html` code

    <label style="display: block">
      First name:
      <input id="first-name" />
    </label>
    <label style="display: block">
      Last name:
      <input id="last-name" />
    </label>
    <label style="display: block">
      Email:
      <input id="email" />
    </label>
    <p id="result"></p>
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>

<page>
  <title>subscribeWithSelector - Zustand</title>
  <url>https://zustand.docs.pmnd.rs/middlewares/subscribe-with-selector</url>
  <content>How to subscribe to granular store updates in a store

`subscribeWithSelector` middleware lets you subscribe to specific data based on current state.

    const nextStateCreatorFn = subscribeWithSelector(stateCreatorFn)
    

*   [Types](#types)
    
    *   [Signature](#signature)
    *   [Mutator](#mutator)
    
*   [Reference](#reference)
*   [Usage](#usage)
*   [Troubleshooting](#troubleshooting)

[

Types
-----

](#types)[

### Signature

](#signature)

    subscribeWithSelector<T>(stateCreatorFn: StateCreator<T, [], []>): StateCreator<T, [['zustand/subscribeWithSelector', never]], []>
    

[

### Mutator

](#mutator)

    ['zustand/subscribeWithSelector', never]
    

[

Reference
---------

](#reference)[

### `subscribeWithSelector(stateCreatorFn)`

](#subscribewithselector\(statecreatorfn\))[

#### Parameters

](#parameters)

*   `stateCreatorFn`: A function that takes `set` function, `get` function and `store` as arguments. Usually, you will return an object with the methods you want to expose.

[

#### Returns

](#returns)

`subscribeWithSelector` returns a state creator function.

[

Usage
-----

](#usage)[

### Subscribing partial state updates

](#subscribing-partial-state-updates)

By subscribing to partial state updates, you register a callback that fires whenever the store's partial state updates. We can use `subscribe` for external state management.

    import { createStore } from 'zustand/vanilla'
    import { subscribeWithSelector } from 'zustand/middleware'
    
    type PositionStoreState = { position: { x: number; y: number } }
    
    type PositionStoreActions = {
      setPosition: (nextPosition: PositionStoreState['position']) => void
    }
    
    type PositionStore = PositionStoreState & PositionStoreActions
    
    const positionStore = createStore<PositionStore>()(
      subscribeWithSelector((set) => ({
        position: { x: 0, y: 0 },
        setPosition: (position) => set({ position }),
      })),
    )
    
    const $dot = document.getElementById('dot') as HTMLDivElement
    
    $dot.addEventListener('mouseenter', (event) => {
      const parent = event.currentTarget.parentElement
      const parentWidth = parent.clientWidth
      const parentHeight = parent.clientHeight
    
      positionStore.getState().setPosition({
        x: Math.ceil(Math.random() * parentWidth),
        y: Math.ceil(Math.random() * parentHeight),
      })
    })
    
    const render: Parameters<typeof positionStore.subscribe>[0] = (state) => {
      $dot.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`
    }
    
    render(positionStore.getInitialState(), positionStore.getInitialState())
    
    positionStore.subscribe((state) => state.position, render)
    
    const logger: Parameters<typeof positionStore.subscribe>[0] = (x) => {
      console.log('new x position', { x })
    }
    
    positionStore.subscribe((state) => state.position.x, logger)
    

Here's the `html` code

    <div
      id="dot-container"
      style="position: relative; width: 100vw; height: 100vh;"
    >
      <div
        id="dot"
        style="position: absolute; background-color: red; border-radius: 50%; left: -10px; top: -10px; width: 20px; height: 20px;"
      ></div>
    </div>
    

[

Troubleshooting
---------------

](#troubleshooting)

TBD</content>
</page>