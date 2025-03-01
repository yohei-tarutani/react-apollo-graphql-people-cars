const Title = () => {
  const styles = getStyles();

  return <h2 style={styles.title}>PEOPLE AND THEIR CARS</h2>;
};

const getStyles = () => ({
  title: {
    fontSize: 30,
    padding: "15px",
    marginBottom: "50px",
  },
});

export default Title;
