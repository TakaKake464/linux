function App() {
	const greeing = "Hello world! jsx!";
const styleObject = {
  color: "white",
  fontSize: "32px",
};
const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  width: "100vw",
};
const boxStyle = {
  width: "33%",
  height: "180px",
  textAlign: "center",
};
  return (
	  <>
	  <h1 style={styleObject}>{greeing}</h1>
	  <p>This is a paragraph.</p>
	  </>
  );
}

export default App;

