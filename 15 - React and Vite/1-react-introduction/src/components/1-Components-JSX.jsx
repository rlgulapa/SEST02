// Two types of components:
// 1. Class based components
// 2. Function based components

// PascalCasing naming convention
// Each first letter of each word should be capital.
function Component(){
    // Code goes here
    // JSX: Javascript XML
    // fragment: <></>
    const greeting = "Welcome to React.js, Let's gooo!";
    return (
        <>
            <h1>{greeting}</h1>
            <p>React is a JavaScript Library for building user interfaces.</p>
        </>
    )
}

export default Component;