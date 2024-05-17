module.exports = async (req, res, next) => {
  // db code here

  // sample return value
  res.status(200).json({
    classes: [
      {
        id: 1,
        name: "Math 101",
        description: "Introduction to Algebra",
      },
      {
        id: 2,
        name: "Math 102",
        description: "Introduction to Calculus",
      },
      {
        id: 3,
        name: "Math 103",
        description: "Introduction to Statistics",
      },
    ],
  })
}
