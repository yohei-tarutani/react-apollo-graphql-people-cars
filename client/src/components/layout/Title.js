const Title = () => {
  const styles = getStyles();

  return <h2 style={styles.title}>PEOPLE AND THEIR CARS</h2>;
};

const getStyles = () => ({
  title: {
    fontSize: "25px",
    padding: "15px",
    marginBottom: "40px",
  },
});

export default Title;
