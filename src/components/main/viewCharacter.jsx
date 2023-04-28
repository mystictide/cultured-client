import { useEffect } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { formatPrettyURL } from "../../assets/js/helpers";
import Character from "./character";

function ViewCharacter() {
  const navigate = useNavigate();
  const param = useParams();
  const { character, isLoading } = useSelector((state) => state.main);

  useEffect(() => {
    if (param && !character) {
      navigate(`/browse/${formatPrettyURL(param.name)}`);
    }
  }, [character, param]);

  const backToCategory = () => {
    if (character) {
      navigate(`/category/${formatPrettyURL(character.Categories[0].Name)}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="main">
      <div className="overlay"></div>
      <section className="content content-wrapper">
        <div className="page-centered">
          {isLoading ? (
            <div className="loading">
              <PropagateLoader
                color="#6f5773"
                size={30}
                speedMultiplier={0.5}
              />
            </div>
          ) : (
            <>
              {character ? <Character /> : "Could not find character"}
              <button
                className="function"
                onClick={(e) => {
                  backToCategory();
                }}
              >
                <IoReturnDownBack /> Back to{" "}
                {character ? character.Categories[0].Name : "main"}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ViewCharacter;
