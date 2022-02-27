import React, {useState} from 'react'
import './Repository.css';
import {CommitInterface, RepositoryInterface} from "../../types";
import {getCommitsUrl} from "../../constants";
import axios from "axios";
import star from "../../svg/star.svg";
import fork from "../../svg/fork.svg";
import exclamation from "../../svg/exclamation.svg";
import {Commit} from "../commit";

const roundBigNumbers = (value: number) => {
    return value > 1000 ? `${Math.ceil(value/1000)}k` : value;
}

interface IRepositoryProps {
    repository: RepositoryInterface;
}

function Repository({repository}: IRepositoryProps) {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<React.ReactNode>();
    const [commits, setCommits] = useState<CommitInterface[]>()

    const handleExpand = async () => {
        setExpanded(s => !s)

        if (!commits) {
            setLoading(true)
            try {
                const commitsUrl = getCommitsUrl(repository.owner.login, repository.name)
                const commitsResponse = await axios.get<CommitInterface[]>(commitsUrl)
                setCommits(commitsResponse.data)
            } catch (e) {
                setError('Some errors occur during fetching repository details')
            } finally {
                setLoading(false)
            }
        }
    }

    return repository ? (
        <div className={`repository_root ${!expanded && "repository_collapsed"}`} onClick={handleExpand}>
            <div className="repository_card">
                <div className="repository_baseInfo">
                    <div>
                        {!!repository.name &&
                        <a href={repository.html_url} className="repository_name">{repository.name}</a>}
                        <span className="repository_id">{`#${repository.id}`}</span>
                    </div>
                    <div className="repository_date">
                        <span>{`Created: ${new Date(repository.created_at).toDateString()}`}</span>
                        <span>{`Updated: ${new Date(repository.updated_at).toDateString()}`}</span>
                    </div>
                    {!!repository.description && <span className="repository_description">{repository.description}</span>}
                    <div className="repository_info">
                        {!!repository.language && <span>{`Language: ${repository.language}`}</span>}
                        <span>{`Default branch: ${repository.default_branch}`}</span>
                    </div>
                </div>
                <div className="repository_additionalInfo">
                    <div>
                        <img src={fork} alt="forks"/>
                        {roundBigNumbers(repository.forks)}
                    </div>
                    <div>
                        <img src={star} alt="star"/>
                        {roundBigNumbers(repository.stargazers_count)}
                    </div>
                    <div>
                        <img src={exclamation} alt="open issues"/>
                        {roundBigNumbers(repository.open_issues_count)}
                    </div>
                </div>
            </div>

            {expanded && <div className="repository_commits">
                {loading && <p className="repository_loading">Loading...</p>}
                {!!error && <p className="repository_error">{error}</p>}
                {!loading && commits?.map(commit => <Commit key={commit.sha} commit={commit}/>)}
            </div>}
        </div>
    ) : null;
}

export default Repository;
