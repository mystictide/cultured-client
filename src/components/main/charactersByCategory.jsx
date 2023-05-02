import { useEffect } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { decodeURL, formatPrettyURL } from "../../assets/js/helpers";
import {
  filterCharacters,
  getCategories,
  getCharacter,
} from "../../features/main/mainSlice";
import Pager from "../helpers/pager";

function CharactersByCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { characters, isLoading } = useSelector((state) => state.main);

  useEffect(() => {
    if (param && !characters) {
      const reqData = {
        filter: {
          Keyword: "",
          page: 1,
          CategoryName: decodeURL(param.name),
          SortBy: "asc",
        },
      };
      dispatch(filterCharacters(reqData));
    }
  }, [characters, param]);

  const setFilter = (e, page) => {
    const reqData = {
      filter: {
        Keyword: "",
        page: page,
        CategoryID: characters.filter.CategoryID,
        CategoryName: characters.filter.CategoryName,
        SortBy: "asc",
      },
    };
    dispatch(filterCharacters(reqData));
  };

  const handleClick = (item) => {
    const reqData = {
      ID: item.ID,
      Name: item.Name,
    };
    dispatch(getCharacter(reqData)).then(() =>
      navigate(`/c/${formatPrettyURL(item.Name)}`)
    );
  };

  const backToMain = () => {
    if (characters && characters.data.length > 0) {
      const reqData = {
        parentid: characters.data[0].Category.ParentID,
        main: false,
        prev: false,
      };
      dispatch(getCategories(reqData)).then(navigate("/"));
    } else {
      navigate("/");
    }
  };

  return (
    <div className="main">
      <div className="overlay"></div>
      <section className="content content-wrapper">
        <div className="page-centered ">
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
              <ul className="h-list c-gap-10 r-gap-10 categories">
                {characters && characters.data.length > 0
                  ? characters.data.map((item, index) => (
                      <li
                        key={index}
                        className="box"
                        style={{
                          backgroundImage: `url("${item.ImageURL}")`,
                        }}
                        onClick={(e) => {
                          handleClick(item);
                        }}
                      >
                        <div className="info v-center h-center">
                          <h4>{item.Name}</h4>
                        </div>
                      </li>
                    ))
                  : "No characters found under category"}
              </ul>
              {characters && characters.data.length > 0 ? (
                <Pager
                  data={characters}
                  setFilter={setFilter}
                  filterModel={characters.filterModel}
                />
              ) : (
                ""
              )}

              <button
                className="function"
                onClick={(e) => {
                  backToMain();
                }}
              >
                <IoReturnDownBack /> Back to categories
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default CharactersByCategory;
