export default function SelectProperty({ getXProperty, getYProperty }) {
  function changeXProperty(event) {
    event.preventDefault();
    // console.log(`select property x change`)
    getXProperty(event.target.value);
  }
  function changeYProperty(event) {
    event.preventDefault();
    // console.log("select property y change")
    getYProperty(event.target.value);
  }

  return (
    <div className="control">
      <div className="notification columns">
        <form className="column is-centered">
          <label className="label">x property</label>
          <div className="select">
            <select defaultValue="sepalLength" onChange={changeXProperty}>
              <option value="sepalLength">sepal length</option>
              <option value="sepalWidth">sepal width</option>
              <option value="petalLength">petal length</option>
              <option value="petalWidth">petal width</option>
            </select>
          </div>
        </form>
        <form className="column is-centered">
          <label className="label">y property</label>
          <div className="select">
            <select defaultValue="sepalWidth" onChange={changeYProperty}>
              <option value="sepalLength">sepal length</option>
              <option value="sepalWidth">sepal width</option>
              <option value="petalLength">petal length</option>
              <option value="petalWidth">petal width</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
