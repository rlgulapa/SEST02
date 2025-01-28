/*
    Conditional Rendering

    control on what gets rendered in our application.
*/


function UsersList(){
    // ternary operator
    // condition ? true : false
    // if (condition) {} else {}
    const isLoggedIn = false;
    const username = "John Doe";
    const loggedInElement = <em>{username}</em>;

    const userList = ["David", "Michael", "Lili"];
    
    return (
        <>
            <h1>Welcome {isLoggedIn ? loggedInElement : "Guest"}!</h1>
            <ul>
                {userList.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </>
    )
}

export default UsersList;