import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrettyURL } from "../../assets/js/helpers";
import { resetCharacters } from "../../features/main/mainSlice";

function Character() {
  const dispatch = useDispatch();
  const { character } = useSelector((state) => state.main);
  function createMarkup() {
    return { __html: character.Body };
  }
  function Body() {
    return <div className="text" dangerouslySetInnerHTML={createMarkup()} />;
  }

  useEffect(() => {
    return () => {
      dispatch(resetCharacters());
    };
  }, [resetCharacters, dispatch]);

  return (
    <div className="character c-gap-15">
      <section className="info">
        <h1>{character.Name}</h1>
        <span>
          <ul className="v-list v-items r-gap-5">
            {character.Categories.map((item, index) => (
              <li key={index}>
                <div className="info v-center h-center">
                  <Link
                    to={"/category/" + formatPrettyURL(item.Name)}
                    className="category"
                  >
                    {item.Name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </span>
        <img src={character.ImageURL} />
      </section>
      <section className="body">{Body()}</section>
    </div>
  );
}

export default Character;
