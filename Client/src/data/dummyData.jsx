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
        _id:"680a619b94ad0f11ad43a228",
        courseName: "Backend Development for Beginners",
        courseDescription:
          "Learn the fundamentals of backend development, including database management, server-side programming, and APIs. This course will cover key backend technologies like Node.js, Express.js, and SQL.",
          instructor: "user1",
        whatYouWillLearn:
          "Master backend fundamentals like databases, server-side programming, and RESTful APIs.\r\nLearn to work with databases and write SQL queries.\r\nBuild your first server with Node.js and Express.js.\r\nUnderstand the importance of authentication, middleware, and error handling.",
        ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 5 }],
        price: 49,
        thumbnail:
          "https://res.cloudinary.com/djpjyg8my/image/upload/v1745510812/knowgeek/asqkauj42rpetnbo09uz.jpg",
        tag: [
          "api",
          "restful",
          "restapi",
          "backend",
          "node",
          "express",
          "javascript",
          "databases",
          "mongodb",
          "mongoose",
        ],
        studentsEnrolled: [],
        createdAt: "2025-04-24T16:06:51.762Z",
      },
      {
        _id: "680a5ac8a5e519775f981dba",
        courseName: "Web Development",
        courseDescription:
          "A comprehensive course on building modern web applications using HTML, CSS, JavaScript, and React. Learn the fundamentals and advanced techniques for creating dynamic and interactive websites.",
          instructor: "user1",
        whatYouWillLearn:
          "Learn the fundamentals of HTML, CSS, and JavaScript.\r\nGain hands-on experience in building responsive websites.\r\nUnderstand how to use modern JavaScript frameworks like React.js.\r\nLearn debugging techniques and how to optimize web applications.",
        courseContent: [
          {
            $oid: "680a5aeca5e519775f981dbe",
          },
          {
            $oid: "680a5bb8a5e519775f981dc6",
          },
        ],
        ratingAndReviews: [{ rating: 3 }, { rating: 4 }, { rating: 5 }],
        price: 99,
        thumbnail:
          "https://res.cloudinary.com/djpjyg8my/image/upload/v1745509065/knowgeek/disx4maacxjhs4xo0eep.jpg",
        tag: [
          "webdevelopment",
          "javascript",
          "html",
          "css",
          "express.js",
          "react.js",
          "node.js",
          "backend",
          "frontend",
        ],
        studentsEnrolled: [],
        createdAt: "2025-04-24T15:37:44.846Z",
        __v: 0,
        status: "Published",
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
