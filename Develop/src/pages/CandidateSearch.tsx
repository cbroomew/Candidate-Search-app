import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [pot, setPot] = useState<Candidate[]>([]);
  const [curr, setCurr] = useState<Candidate>();
  const [idx, setIdx] = useState(0);

  const loadCandidates = async () => {
    const data = await searchGithub();
    if (data.length === 0) return;
    console.log(data);
    setPot(data);
    const first = await searchGithubUser(data[idx]);
    setCurr(first);
    console.log(data);
  };

  const next = () => {
    if (idx === pot.length - 1) {
      console.log("No more candidates");
    } else {
      setCurr(pot[idx + 1]);
      setIdx(idx + 1);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const save = () => {
    next();
    let stored: Candidate[] = JSON.parse(localStorage.getItem("saved") as string) || [];
    console.log(stored);
    if (curr) {
      stored.push(curr);
      localStorage.setItem("saved", JSON.stringify(stored));
    }
    console.log(stored);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        {idx === pot.length - 1 ? (
          <div>No more candidates</div>
        ) : (
          <div>
            <img width="200px" src={curr?.avatar_url} alt="Candidate Avatar" />
            <p>{curr?.login}</p>
            <p>{curr?.email}</p>
            <p>{curr?.location}</p>
            <p>{curr?.company}</p>
            <p>{curr?.bio}</p>
          </div>
        )}
        <button className="removeButton" onClick={next}>-</button>
        <button className="addButton" onClick={save}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
