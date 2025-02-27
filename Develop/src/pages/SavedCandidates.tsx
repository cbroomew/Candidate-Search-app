import { Candidate } from "../interfaces/Candidate.interface";
import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [saved, setSaved] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored: Candidate[] = JSON.parse(localStorage.getItem("saved") as string) || [];
    console.log("Loaded from storage", stored);
    setSaved(stored);
  }, []);

  const removeCandidate = (index: number) => {
    const updatedList = [...saved];
    updatedList.splice(index, 1);
    setSaved(updatedList);
    localStorage.setItem("saved", JSON.stringify(updatedList)); 
  };

  return (
    <div>
      <h2>Saved Candidates</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {saved.map((person: Candidate, idx: number) => (
            <tr key={person.login}>
              <td><img width="100px" src={person.avatar_url} alt="Candidate Avatar" /></td>
              <td>{person.login}</td>
              <td><button onClick={() => removeCandidate(idx)}>Reject</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
