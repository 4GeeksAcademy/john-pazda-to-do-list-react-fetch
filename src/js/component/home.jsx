import React, { useEffect, useState } from "react";
import { Tasks } from "./tasks";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [sentences, setSentences] = useState([]);

  const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/Jpazda21";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const loadedData = data.map((e) => e.label);
        setSentences([...loadedData]);
        console.log(JSON.stringify(loadedData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApiRequest = async (method, body = null) => {
    try {
      const response = await fetch(apiUrl, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addLines = () => {
    setInputValue("");
    setSentences([...sentences, inputValue]);
  };

  const remove = (ind) => {
    if (sentences.length > 1) {
      setSentences(sentences.filter((sentence, index) => index !== ind));
    }
  };

  const removeAllData = () => {
    setSentences([]);
    handleApiRequest("PUT", []);
  };

  const removeUser = () => {
    setSentences([]);
    handleApiRequest("DELETE");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center mb-4">Todos</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What needs to be done?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-primary" onClick={addLines}>
                  Add Task
                </button>
                <button className="btn btn-danger" onClick={removeAllData}>
                  Delete All Data
                </button>
                <button className="btn btn-warning" onClick={removeUser}>
                  Delete User
                </button>
              </div>
              <ul className="list-group mt-3">
                {sentences.map((sentence, index) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                    <Tasks line={sentence} />
                    <button className="btn btn-outline-danger" onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-muted">{sentences.length} item(s) left</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
