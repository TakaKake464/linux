function App() {
	const greeing = "Hello world! jsx!";
const styleObject = {
  color: "red",
  fontSize: "32px",
};
  return (
	  <>
	  <h1 style={styleObject}>{greeing}</h1>
	  <p>This is a paragraph.</p>
	  </>
  );
}

export default App;

