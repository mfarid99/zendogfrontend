import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //variable to hold URL
    const url = "http://mfzendogbackend.herokuapp.com"
  //State to hold dogs
  const[dogs, setDogs] = React.useState([])
  //EMPTY DOG
  const emptyDog = {
  name: "",
  age: 0,
  img: "",
};

//SELECTED DOG STATE
const [selectedDog, setSelectedDog] = React.useState(emptyDog);

// // GET LIST OF DOGS FUNCTION
// const getDogs = () => {
//   fetch(url + "/dog/")
//     .then((response) => response.json())
//     .then((data) => {
//       setDogs(data);
//     });
// };

  //function to get dogs via API
  const getDogs = () => {
    fetch(url + "/dog/")
    .then(response => response.json())
    .then(data=> {
      setDogs (data)
    })
  }
  //useEffect to get initial call of getDogs
  React.useEffect(()=> {
    getDogs()
  }, [])

  //handle create to create docs

  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then(response => {
      // don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    });
  };

  //handleUpdate function for updating dogs
const handleUpdate = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  }).then(() => {
    // don't need the response from the post but will be using the .then to update the list of dogs
    getDogs();
  });
};

//Set the state when you select the dog to edit
const selectDog = (dog) => {
  setSelectedDog(dog);
};

 //Function to delete dog
 const deleteDog = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "delete",
  }).then((response) => getDogs());
};



//Switch allows to use one of these route at a given time
  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
      <button>Add Dog</button>
      </Link>
      <main>
    
        <Switch> 
        <Route
            exact
            path="/"
            render={(rp) => <Display selectDog={selectDog} {...rp} dogs={dogs} deleteDog={deleteDog}/>}
          />

          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
                    <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />


        </Switch>
      </main>
    </div>
  );
}

export default App;
