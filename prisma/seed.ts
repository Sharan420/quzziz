import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

// Create sample quizzes
const quizzes: Prisma.QuizesCreateInput[] = [
  {
    title: "JavaScript Basics",
    description: "Test your knowledge of JavaScript fundamentals",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is JavaScript?",
        options: [
          "A programming language",
          "A markup language",
          "A styling language",
          "A database language",
        ],
        correctOption: 0,
      },
      {
        question: "Which of these is not a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Object"],
        correctOption: 2,
      },
      {
        question: "What does 'this' refer to in JavaScript?",
        options: [
          "The current function",
          "The current object",
          "The global object",
          "The parent object",
        ],
        correctOption: 1,
      },
    ],
  },
  {
    title: "Python Programming",
    description: "Test your Python programming skills",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is Python?",
        options: [
          "A programming language",
          "A snake species",
          "A web framework",
          "A database system",
        ],
        correctOption: 0,
      },
      {
        question: "Which of these is not a Python data type?",
        options: ["List", "Tuple", "Dictionary", "Array"],
        correctOption: 3,
      },
      {
        question: "What is the correct way to create a function in Python?",
        options: [
          "function myFunction():",
          "def myFunction():",
          "func myFunction():",
          "create myFunction():",
        ],
        correctOption: 1,
      },
    ],
  },
  {
    title: "Web Development",
    description: "Test your knowledge of web development concepts",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language",
        ],
        correctOption: 0,
      },
      {
        question: "What is CSS used for?",
        options: [
          "Styling web pages",
          "Creating databases",
          "Writing server code",
          "Managing user authentication",
        ],
        correctOption: 0,
      },
      {
        question: "What is the purpose of JavaScript in web development?",
        options: [
          "To add interactivity to web pages",
          "To style web pages",
          "To structure web pages",
          "To store data",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "React.js Fundamentals",
    description: "Test your knowledge of React.js",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is React.js?",
        options: [
          "A JavaScript library for building user interfaces",
          "A programming language",
          "A database system",
          "A testing framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is JSX?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JavaScript Extension",
          "Java XML Syntax",
        ],
        correctOption: 0,
      },
      {
        question: "What is a React component?",
        options: [
          "A reusable piece of UI",
          "A database table",
          "A server endpoint",
          "A CSS style",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Node.js Basics",
    description: "Test your knowledge of Node.js",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is Node.js?",
        options: [
          "A JavaScript runtime environment",
          "A web browser",
          "A database system",
          "A programming language",
        ],
        correctOption: 0,
      },
      {
        question: "What is npm?",
        options: [
          "Node Package Manager",
          "Node Program Manager",
          "Node Project Manager",
          "Node Process Manager",
        ],
        correctOption: 0,
      },
      {
        question: "What is the purpose of package.json?",
        options: [
          "To manage project dependencies",
          "To store user data",
          "To configure the web server",
          "To define database schemas",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Database Concepts",
    description: "Test your knowledge of database systems",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is SQL?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Language",
          "System Query Language",
        ],
        correctOption: 0,
      },
      {
        question: "What is a primary key?",
        options: [
          "A unique identifier for a record",
          "A type of database",
          "A query language",
          "A database management system",
        ],
        correctOption: 0,
      },
      {
        question: "What is MongoDB?",
        options: [
          "A NoSQL database",
          "A SQL database",
          "A programming language",
          "A web framework",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Git and Version Control",
    description: "Test your knowledge of Git and version control",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is Git?",
        options: [
          "A version control system",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is a commit in Git?",
        options: [
          "A snapshot of your code",
          "A branch of code",
          "A remote repository",
          "A merge conflict",
        ],
        correctOption: 0,
      },
      {
        question: "What is a pull request?",
        options: [
          "A request to merge code changes",
          "A way to delete code",
          "A type of branch",
          "A Git command",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "RESTful APIs",
    description: "Test your knowledge of RESTful API concepts",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What does REST stand for?",
        options: [
          "Representational State Transfer",
          "Remote Execution State Transfer",
          "Resource Execution State Transfer",
          "Representation Execution State Transfer",
        ],
        correctOption: 0,
      },
      {
        question: "What is an API endpoint?",
        options: [
          "A URL that represents an object or collection",
          "A database table",
          "A programming language",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is HTTP?",
        options: [
          "Hypertext Transfer Protocol",
          "High Transfer Protocol",
          "Hyper Transfer Protocol",
          "Home Transfer Protocol",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "TypeScript Basics",
    description: "Test your knowledge of TypeScript",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is TypeScript?",
        options: [
          "A typed superset of JavaScript",
          "A programming language",
          "A web framework",
          "A database system",
        ],
        correctOption: 0,
      },
      {
        question: "What is an interface in TypeScript?",
        options: [
          "A way to define the shape of an object",
          "A type of function",
          "A database table",
          "A web component",
        ],
        correctOption: 0,
      },
      {
        question: "What is type inference?",
        options: [
          "Automatic type detection",
          "Manual type declaration",
          "Type conversion",
          "Type checking",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Docker Basics",
    description: "Test your knowledge of Docker",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is Docker?",
        options: [
          "A containerization platform",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is a Docker container?",
        options: [
          "A lightweight, standalone executable package",
          "A virtual machine",
          "A database",
          "A web server",
        ],
        correctOption: 0,
      },
      {
        question: "What is a Docker image?",
        options: [
          "A template for creating containers",
          "A running container",
          "A database snapshot",
          "A web application",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "AWS Cloud Services",
    description: "Test your knowledge of AWS services",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is AWS?",
        options: [
          "Amazon Web Services",
          "Advanced Web Services",
          "Application Web Services",
          "Automated Web Services",
        ],
        correctOption: 0,
      },
      {
        question: "What is EC2?",
        options: [
          "Elastic Compute Cloud",
          "Elastic Container Cloud",
          "Elastic Cloud Compute",
          "Elastic Cloud Container",
        ],
        correctOption: 0,
      },
      {
        question: "What is S3?",
        options: [
          "Simple Storage Service",
          "Secure Storage Service",
          "System Storage Service",
          "Server Storage Service",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Machine Learning Basics",
    description: "Test your knowledge of machine learning concepts",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is machine learning?",
        options: [
          "A subset of AI that enables systems to learn from data",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is supervised learning?",
        options: [
          "Learning from labeled data",
          "Learning without guidance",
          "Learning from unlabeled data",
          "Learning from rules",
        ],
        correctOption: 0,
      },
      {
        question: "What is a neural network?",
        options: [
          "A computing system inspired by biological neural networks",
          "A type of database",
          "A web server",
          "A programming language",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Cybersecurity Basics",
    description: "Test your knowledge of cybersecurity",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is encryption?",
        options: [
          "Converting data into a secure format",
          "Deleting data",
          "Copying data",
          "Moving data",
        ],
        correctOption: 0,
      },
      {
        question: "What is a firewall?",
        options: [
          "A security system that monitors network traffic",
          "A type of virus",
          "A database system",
          "A web server",
        ],
        correctOption: 0,
      },
      {
        question: "What is two-factor authentication?",
        options: [
          "Using two methods to verify identity",
          "Using two passwords",
          "Using two usernames",
          "Using two computers",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Agile Methodology",
    description: "Test your knowledge of Agile development",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is Agile?",
        options: [
          "A project management methodology",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is a sprint?",
        options: [
          "A time-boxed period for completing work",
          "A type of meeting",
          "A database query",
          "A code review",
        ],
        correctOption: 0,
      },
      {
        question: "What is a scrum master?",
        options: [
          "A facilitator for the team",
          "A project manager",
          "A developer",
          "A tester",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Data Structures",
    description: "Test your knowledge of data structures",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is a data structure?",
        options: [
          "A way to organize and store data",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is a linked list?",
        options: [
          "A linear data structure",
          "A database table",
          "A web page",
          "A file system",
        ],
        correctOption: 0,
      },
      {
        question: "What is a binary tree?",
        options: [
          "A tree data structure with two children per node",
          "A database index",
          "A web component",
          "A file format",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Algorithms",
    description: "Test your knowledge of algorithms",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is an algorithm?",
        options: [
          "A step-by-step procedure for solving a problem",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is Big O notation?",
        options: [
          "A way to describe algorithm complexity",
          "A type of algorithm",
          "A database query",
          "A web protocol",
        ],
        correctOption: 0,
      },
      {
        question: "What is a sorting algorithm?",
        options: [
          "An algorithm that puts elements in order",
          "A search algorithm",
          "A compression algorithm",
          "An encryption algorithm",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "DevOps Practices",
    description: "Test your knowledge of DevOps",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is DevOps?",
        options: [
          "A set of practices combining development and operations",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is CI/CD?",
        options: [
          "Continuous Integration/Continuous Deployment",
          "Computer Interface/Computer Design",
          "Code Integration/Code Deployment",
          "Continuous Integration/Code Deployment",
        ],
        correctOption: 0,
      },
      {
        question: "What is infrastructure as code?",
        options: [
          "Managing infrastructure through code",
          "Writing code for infrastructure",
          "Building infrastructure manually",
          "Documenting infrastructure",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Mobile Development",
    description: "Test your knowledge of mobile development",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is React Native?",
        options: [
          "A framework for building mobile apps",
          "A programming language",
          "A database system",
          "A web framework",
        ],
        correctOption: 0,
      },
      {
        question: "What is Flutter?",
        options: [
          "A UI toolkit for building mobile apps",
          "A database system",
          "A web server",
          "A programming language",
        ],
        correctOption: 0,
      },
      {
        question: "What is a mobile app architecture?",
        options: [
          "The structure and organization of a mobile app",
          "A mobile device",
          "A mobile network",
          "A mobile database",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "UI/UX Design",
    description: "Test your knowledge of UI/UX design",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is UI design?",
        options: [
          "User Interface design",
          "User Integration design",
          "User Interaction design",
          "User Implementation design",
        ],
        correctOption: 0,
      },
      {
        question: "What is UX design?",
        options: [
          "User Experience design",
          "User Execution design",
          "User Extension design",
          "User Expression design",
        ],
        correctOption: 0,
      },
      {
        question: "What is a wireframe?",
        options: [
          "A visual guide representing the structure of a page",
          "A type of font",
          "A color scheme",
          "A layout grid",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    title: "Testing and QA",
    description: "Test your knowledge of software testing",
    imageUrl: "https://picsum.photos/400/250",
    questions: [
      {
        question: "What is unit testing?",
        options: [
          "Testing individual components of software",
          "Testing the entire system",
          "Testing user interfaces",
          "Testing databases",
        ],
        correctOption: 0,
      },
      {
        question: "What is integration testing?",
        options: [
          "Testing how components work together",
          "Testing individual components",
          "Testing user interfaces",
          "Testing databases",
        ],
        correctOption: 0,
      },
      {
        question: "What is regression testing?",
        options: [
          "Testing to ensure new changes don't break existing functionality",
          "Testing new features",
          "Testing user interfaces",
          "Testing performance",
        ],
        correctOption: 0,
      },
    ],
  },
];

export async function main() {
  for (const quiz of quizzes) {
    await prisma.quizes.create({ data: quiz });
  }
}

main();
