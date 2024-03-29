import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isAuth } from "../../../helpers/auth";
import { Documents } from "../Document-uplaod/Documents";

import SearchResult from "./SearchResult";

interface DocumentSearchProps {
  docs: Documents[];
  setDocs: Dispatch<SetStateAction<Documents[]>>;
}
function DocumentSearch(props: DocumentSearchProps) {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/File/get-all", {
        params: { instituteid: isAuth().institutes[0].id },
      })
      .then((response) => props.setDocs(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [props.docs]);

  if (loading) return <h2>Loading ...</h2>;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const clickHandler = () => {
    setSearch(input);
    setIsEntered(true);
  };
  return (
    <div className="DocumentSearch">
      <div className="DocumentSearch-fullBar">
        <input
          type="text"
          className="DocumentSearch-searchbar"
          placeholder="  Search documents"
          onChange={inputChangeHandler}
        ></input>

        <button
          type="submit"
          className="DocumentSearch-searchbutton"
          onClick={clickHandler}
        >
          Search
        </button>
      </div>
      <SearchResult
        docs={props.docs}
        setDocs={props.setDocs}
        search={search}
        isEntered={isEntered}
        setIsEntered={setIsEntered}
      />
    </div>
  );
}

export default DocumentSearch;
