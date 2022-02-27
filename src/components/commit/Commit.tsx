import React from 'react'
import './Commit.css';
import {CommitInterface} from "../../types";

interface ICommitProps {
    commit: CommitInterface;
}

function Commit({commit}: ICommitProps) {
    const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        window.open(commit?.html_url, '_blank');
    }

    return commit ? (
        <div className="commit_root" onClick={handleUserClick}>
            <div className="commit_avatar" style={{background: `url("${commit.committer.avatar_url}")`}}/>
            <div className="commit_details">
                <div className="commit_infos">
                    <span className="commit_login">{commit.committer.login}</span>
                    <span className="commit_date">{new Date(commit.commit.committer.date).toDateString()}</span>
                    <span className="commit_sha">{`#${commit.sha.slice(34, 40)}`}</span>
                </div>
                <span className="commit_message">{commit.commit.message}</span>
            </div>
        </div>
    ) : null;
}

export default Commit;
