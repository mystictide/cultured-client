import { useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { formatPrettyURL } from "../../assets/js/helpers";
import {
  filterCharacters,
  getCategories,
  reset,
} from "../../features/main/mainSlice";

function CategoryBrowser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.main);
  const [subState, setSubState] = useState(
    categories
      ? categories.length > 0
        ? categories[0].ParentID
          ? true
          : false
        : false
      : false
  );

  useEffect(() => {
    if (!categories) {
      const reqData = {
        parentid: 0,
        main: true,
        prev: false,
      };
      dispatch(getCategories(reqData));
    }
    if (categories && categories.length > 0 && !categories[0].ParentID) {
      setSubState(false);
    }
  }, [categories, isLoading, subState]);

  const handleClick = (item) => {
    if (item.ItemCount > 0) {
      const reqData = {
        filter: { Keyword: "", page: 1, CategoryID: item.ID },
      };
      dispatch(filterCharacters(reqData)).then(() =>
        navigate(`/category/${formatPrettyURL(item.Name)}`)
      );
    } else {
      const reqData = {
        parentid: item.ID,
        prev: false,
        main: true,
      };
      dispatch(getCategories(reqData)).then(() => setSubState(true));
    }
  };

  const backToPrevious = () => {
    const reqData = {
      parentid: categories[0].ParentID ?? 0,
      prev: true,
      main: false,
    };
    dispatch(getCategories(reqData));
  };

  return (
    <div className="page-centered">
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      ) : (
        <>
          {categories && categories.length > 0 ? (
            <>
              <ul className="h-list c-gap-10 r-gap-10 categories">
                {categories
                  ? categories.map((item, index) => (
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
                  : ""}
              </ul>
              {subState ? (
                <button
                  className="function"
                  onClick={(e) => {
                    backToPrevious();
                  }}
                >
                  <IoReturnDownBack /> Back to previous
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className="page-centered v-center h-center">
              <h2>No items found</h2>
              <button
                className="function"
                onClick={(e) => {
                  dispatch(reset());
                }}
              >
                <IoReturnDownBack /> Back to main
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryBrowser;
