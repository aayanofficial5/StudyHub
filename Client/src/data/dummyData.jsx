export const catalogData = {
  data: {
    selectedCategory: {
      _id: "cat1",
      name: "Web Development",
      description:
        "Courses related to front-end and full-stack web development.",
      course: ["course1"],
    },
    differentCategory: {
      _id: "cat2",
      name: "Backend Development",
      description: "Courses that focus on backend technologies and API design.",
      course: ["course2"],
    },
    mostSellingCourses: [
      {
        _id: "course1",
        courseName: "Modern Web Development",
        courseDescription:
          "Learn full-stack web development from scratch using HTML, CSS, JavaScript, React, and Node.js.",
        instructor: "user1",
        whatYouWillLearn: "Build modern web applications with the MERN stack.",
        courseContent: ["section1"],
        ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 5 }],
        price: 1499,
        thumbnail:
          "https://thumbs.dreamstime.com/z/information-technology-courses-concept-vector-illustration-software-development-programming-coding-learning-all-levels-155177013.jpg",
        tag: ["web", "mern", "frontend"],
        category: "cat1",
        studentsEnrolled: ["user2", "user3"],
        instructions: [
          "Complete each module",
          "Submit all assignments",
          "Participate in discussions",
        ],
        status: "Published",
        createdAt: "2025-04-24T00:00:00Z",
        sold: 453,
      },
      {
        _id: "course2",
        courseName: "Introduction to Backend with Express",
        courseDescription:
          "Master backend fundamentals using Node.js and Express framework.",
        instructor: "user1",
        whatYouWillLearn:
          "Set up APIs, connect to databases, and handle server-side logic.",
        courseContent: ["section2"],
        ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 5 }],
        price: 1299,
        thumbnail:
          "https://thumbs.dreamstime.com/z/information-technology-courses-concept-vector-illustration-software-development-programming-coding-learning-all-levels-155177013.jpg",
        tag: ["backend", "node", "express"],
        category: "cat2",
        studentsEnrolled: ["user4", "user5"],
        instructions: [
          "Watch all videos",
          "Practice coding exercises",
          "Take weekly quizzes",
        ],
        status: "Published",
        createdAt: "2025-04-24T00:00:00Z",
        sold: 322,
      },
      {
        _id: "course1",
        courseName: "Modern Web Development",
        courseDescription:
          "Learn full-stack web development from scratch using HTML, CSS, JavaScript, React, and Node.js.",
        instructor: "user1",
        whatYouWillLearn: "Build modern web applications with the MERN stack.",
        courseContent: ["section1"],
        ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 5 }],
        price: 1499,
        thumbnail:
          "https://thumbs.dreamstime.com/z/information-technology-courses-concept-vector-illustration-software-development-programming-coding-learning-all-levels-155177013.jpg",
        tag: ["web", "mern", "frontend"],
        category: "cat1",
        studentsEnrolled: ["user2", "user3"],
        instructions: [
          "Complete each module",
          "Submit all assignments",
          "Participate in discussions",
        ],
        status: "Published",
        createdAt: "2025-04-24T00:00:00Z",
        sold: 453,
      },
      {
        _id: "course2",
        courseName: "Introduction to Backend with Express",
        courseDescription:
          "Master backend fundamentals using Node.js and Express framework.",
        instructor: "user1",
        whatYouWillLearn:
          "Set up APIs, connect to databases, and handle server-side logic.",
        courseContent: ["section2"],
        ratingAndReviews: [{ rating: 3 }, { rating: 2 }, { rating: 5 }],
        price: 1299,
        thumbnail:
          "https://thumbs.dreamstime.com/z/information-technology-courses-concept-vector-illustration-software-development-programming-coding-learning-all-levels-155177013.jpg",
        tag: ["backend", "node", "express"],
        category: "cat2",
        studentsEnrolled: ["user4", "user5"],
        instructions: [
          "Watch all videos",
          "Practice coding exercises",
          "Take weekly quizzes",
        ],
        status: "Published",
        createdAt: "2025-04-24T00:00:00Z",
        sold: 322,
      },
    ],
  },
};
