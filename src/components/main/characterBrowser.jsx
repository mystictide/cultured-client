import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { getCategories } from "../../features/main/mainSlice";

function CharacterBrowser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { characters, isLoading } = useSelector((state) => state.main);

  // useEffect(() => {
  //   if (!categories) {
  //     const reqData = {
  //       parentid: 0,
  //       main: true,
  //     };
  //     dispatch(getCategories(reqData));
  //   }
  // }, [categories, isLoading]);

  const handleClick = (item) => {};

  const backToMain = () => {
    const reqData = {
      parentid: 0,
      main: true,
    };
    dispatch(getCategories(reqData)).then(() => navigate("/"));
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
                {characters
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
                  : ""}
              </ul>
              <button
                className="function"
                onClick={(e) => {
                  backToMain();
                }}
              >
                <IoReturnDownBack /> Back to main
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default CharacterBrowser;
