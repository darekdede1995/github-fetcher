import axios from 'axios';
import React, {useEffect, useState} from 'react'
import './App.css';
import {Form, Repository, User} from "./components";
import {getUserRepositoriesUrl, getUserUrl} from "./constants";
import {UserInterface, RepositoryInterface} from "./types";

const INITIAL_USERNAME = "octocat"

function App() {
    const [inputValue, setInputValue] = useState<string>(INITIAL_USERNAME)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<React.ReactNode>();
    const [repositories, setRepositories] = useState<RepositoryInterface[] | null>(null);
    const [user, setUser] = useState<UserInterface | null>();

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = async () => {
        setRepositories(null)
        setUser(null)
        setError(null)
        setLoading(true)
        try {
            const userUrl = getUserUrl(inputValue)
            const userResponse = await axios.get<UserInterface>(userUrl)
            setUser(userResponse.data)

            const repositoriesUrl = getUserRepositoriesUrl(inputValue)
            const repositoriesResponse = await axios.get<RepositoryInterface[]>(repositoriesUrl)
            setRepositories(repositoriesResponse.data)
        } catch (e) {
            if (e?.response?.status === 404) {
                setError(<>User with username: <strong>{inputValue}</strong> not found</>)
            } else {
                setError('Some errors occur during fetching')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Form inputValue={inputValue} onInputChange={handleInput} onSubmit={handleSubmit} />
            {loading && <p className="app_loading">Loading...</p>}
            {!!error && <p className="app_error">{error}</p>}
            {!loading && user && <User user={user}/>}
            {!loading && user && !repositories?.length && <p>This user dont have any repositories</p>}
            {!loading && user && repositories?.map(repository => <Repository key={repository.id} repository={repository}/>)}
        </>
    );
}

export default App;
