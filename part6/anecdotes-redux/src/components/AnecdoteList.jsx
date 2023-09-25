import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {anecdotes
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
