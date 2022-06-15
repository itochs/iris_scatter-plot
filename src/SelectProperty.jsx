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
    <div>
      <form>
        <label>x property</label>
        <select defaultValue="sepalLength" onChange={changeXProperty}>
          <option value="sepalLength">sepal length</option>
          <option value="sepalWidth">sepal width</option>
          <option value="petalLength">petal length</option>
          <option value="petalWidth">petal width</option>
        </select>
      </form>
      <form>
        <label>y property</label>
        <select defaultValue="sepalWidth" onChange={changeYProperty}>
          <option value="sepalLength">sepal length</option>
          <option value="sepalWidth">sepal width</option>
          <option value="petalLength">petal length</option>
          <option value="petalWidth">petal width</option>
        </select>
      </form>
    </div>
  );
}
