import { useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { formatPrettyURL } from "../../assets/js/helpers";
import { filterCharacters, getCategories } from "../../features/main/mainSlice";

function CategoryBrowser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.main);
  const [subState, setSubState] = useState(
    categories ? (categories[0].ParentID ? true : false) : false
  );

  useEffect(() => {
    if (!categories) {
      const reqData = {
        parentid: 0,
        main: true,
      };
      dispatch(getCategories(reqData));
    }
  }, [categories, isLoading]);

  const handleClick = (item) => {
    if (item.ItemCount > 0) {
      const reqData = {
        filter: { Keyword: "", page: 1, CategoryID: item.ID },
      };
      dispatch(filterCharacters(reqData)).then(() =>
        navigate(`/c/${formatPrettyURL(item.Name)}`)
      );
    } else {
      const reqData = {
        parentid: item.ID,
        main: true,
      };
      dispatch(getCategories(reqData)).then(() => setSubState(true));
    }
  };

  const backToMain = () => {
    const reqData = {
      parentid: 0,
      main: true,
    };
    dispatch(getCategories(reqData));
    setSubState(false);
  };

  return (
    <div className="page-centered ">
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      ) : (
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
                backToMain();
              }}
            >
              <IoReturnDownBack /> Back to main
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default CategoryBrowser;
