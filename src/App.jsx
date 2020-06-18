import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import Form from './components/Form'
import styles from './app.module.css'

const App = () => {
    return (
        <>
            <div className={styles.header}>
                <h2>Apply for some subscription</h2>
                <h3>Free to apply, get a non-binding offer.</h3>
            </div>
            <Router>
                <Form path="/" />
            </Router>
        </>
    )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
