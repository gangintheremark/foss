import App from "App"
import { createBrowserRouter } from "react-router-dom"

const customRouter = createBrowserRouter([
    {
        path : '/',
        element : <App />,
    }
])

export default customRouter