import { useEffect } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { decodeURL, formatPrettyURL } from "../../assets/js/helpers";
import { getCharacter } from "../../features/main/mainSlice";
import Character from "./character";

function ViewCharacter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { character, isLoading } = useSelector((state) => state.main);

  useEffect(() => {
    if (param && !character) {
      const reqData = {
        Name: decodeURL(param.name),
      };
      dispatch(getCharacter(reqData));
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
              {character ? (
                <Character />
              ) : (
                "Could not gather character information."
              )}
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
