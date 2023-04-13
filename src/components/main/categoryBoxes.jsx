import { BsFillStarFill } from "react-icons/bs";

function CategoryBoxes({ data }) {
  return (
    <>
      <ul className="h-list c-gap-10 r-gap-10 boxes">
        {data.map((item, index) => (
          <li key={index} className={`main-border ${isCMS ? "" : "main-box"}`}>
            <div className="info">
              <h4>{item.Name}</h4>
            </div>
            {isCMS ? (
              <div className="preview">
                <img src={item.PreviewURL} />
              </div>
            ) : (
              <div className="preview" onClick={() => handleClick(item)}>
                <img src={item.PreviewURL} />
              </div>
            )}

            {isCMS ? (
              <div className="functions c-gap-5">
                <button
                  className="btn-function"
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-function"
                  onClick={() => {
                    getConfirm(item);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="functions c-gap-5">
                {favourites ? (
                  <>
                    {favourites.some((o) => o.ID === item.ID) ? (
                      <button
                        className="btn-icon active"
                        onClick={(e) => {
                          removeFav(e.target, item);
                        }}
                      >
                        <BsFillStarFill />
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <button
                    className="btn-icon"
                    onClick={(e) => {
                      addFav(e.target, item);
                    }}
                  >
                    <BsFillStarFill />
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryBoxes;
