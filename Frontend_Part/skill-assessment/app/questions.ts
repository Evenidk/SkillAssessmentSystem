// questions.ts

export const questionSets = {
  html: {
    section1: [
      {
        question: "What does HTML stand for?",
        options: ["Hyperlinks Text Mark Language", "Hyper Text Markup Language", "Hyperlinking Text Markup Language", "Hyper Text Markdown Language"],
        answer: "Hyper Text Markup Language",
      },
      {
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<list>", "<ul>", "<ol>", "<li>"],
        answer: "<ul>",
      },
      {
        question: "What is the correct way to create a hyperlink in HTML?",
        options: ["<a href='url'>link text</a>", "<link src='url'>link text</link>", "<url href='url'>link text</url>", "<a src='url'>link text</a>"],
        answer: "<a href='url'>link text</a>",
      },
      {
        question: "Which HTML tag is used for inserting an image?",
        options: ["<src>", "<image>", "<pic>", "<img>"],
        answer: "<img>",
      },
      {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<header>", "<h1>", "<h6>", "<heading>"],
        answer: "<h1>",
      },
    ],
    section2: [
      {
        question: "What tag is used to create a numbered list?",
        options: ["<nl>", "<ol>", "<ul>", "<li>"],
        answer: "<ol>",
      },
      {
        question: "Which tag is used to add a line break in HTML?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        answer: "<br>",
      },
      {
        question: "Which attribute specifies an alternate text for an image?",
        options: ["src", "title", "longdesc", "alt"],
        answer: "alt",
      },
      {
        question: "What is the purpose of the <meta> tag?",
        options: ["Display text", "Provide metadata", "Insert media", "Create links"],
        answer: "Provide metadata",
      },
      {
        question: "How do you specify the background color in HTML?",
        options: ["<bg color='yellow'>", "<background>yellow</background>", "<body style='background-color:yellow;'>", "<background-color='yellow'>"],
        answer: "<body style='background-color:yellow;'>",
      },
    ],
  },

  css: {
    section1: [
      {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System", "Computer Style Sheets"],
        answer: "Cascading Style Sheets",
      },
      {
        question: "Which CSS property changes the text color?",
        options: ["text-color", "color", "font-color", "text-style"],
        answer: "color",
      },
      {
        question: "How do you center an element using CSS?",
        options: ["padding: auto;", "margin: auto;", "center: true;", "align: center;"],
        answer: "margin: auto;",
      },
      {
        question: "What property is used to change the font of an element?",
        options: ["font-style", "font-family", "font-weight", "font-text"],
        answer: "font-family",
      },
      {
        question: "Which CSS property controls the space between lines?",
        options: ["font-height", "line-spacing", "line-height", "text-spacing"],
        answer: "line-height",
      },
    ],
    section2: [
      {
        question: "Which property is used to change the background color?",
        options: ["bg-color", "color", "background-color", "bg-style"],
        answer: "background-color",
      },
      {
        question: "What does the 'display: flex;' property do?",
        options: ["Centers text", "Changes font", "Creates a flex container", "Aligns content vertically"],
        answer: "Creates a flex container",
      },
      {
        question: "Which of the following is used to set the width of an element?",
        options: ["element-width", "width", "size", "set-width"],
        answer: "width",
      },
      {
        question: "Which CSS property adds shadow to elements?",
        options: ["element-shadow", "shadow", "text-shadow", "box-shadow"],
        answer: "box-shadow",
      },
      {
        question: "What is the default value of the 'position' property?",
        options: ["fixed", "absolute", "relative", "static"],
        answer: "static",
      },
    ],
  },

  javascript: {
    section1: [
      {
        question: "What is the output of `console.log(typeof null)` in JavaScript?",
        options: ["'undefined'", "'number'", "'object'", "'null'"],
        answer: "'object'",
      },
      {
        question: "What does UI stand for?",
        options: ["User Interface", "Uniform Interface", "User Interaction", "Unified Interaction"],
        answer: "User Interface",
      },
      {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Google", "Netscape", "Apple"],
        answer: "Netscape",
      },
      {
        question: "What keyword is used to declare a constant in JavaScript?",
        options: ["let", "constant", "const", "var"],
        answer: "const",
      },
      {
        question: "Which of the following is NOT a primitive type in JavaScript?",
        options: ["function", "undefined", "boolean", "string"],
        answer: "function",
      },
    ],
    section2: [
      {
        question: "Which operator is used to assign a value to a variable?",
        options: ["=>", "=", "==", "==="],
        answer: "=",
      },
      {
        question: "Which method converts JSON data to a JavaScript object?",
        options: ["objectify.JSON()", "JSON.stringify()", "parse.JSON()", "JSON.parse()"],
        answer: "JSON.parse()",
      },
      {
        question: "What does 'this' keyword refer to in JavaScript?",
        options: ["Window object", "Current object", "Global object", "New object"],
        answer: "Current object",
      },
      {
        question: "What does 'NaN' stand for in JavaScript?",
        options: ["Non-array Number", "Not a Number", "No Another Name", "Null as Number"],
        answer: "Not a Number",
      },
      {
        question: "How do you declare an asynchronous function in JavaScript?",
        options: ["await function", "async function", "asynchronous function", "function async"],
        answer: "async function",
      },
    ],
  },

  react: {
    section1: [
      {
        question: "What is the primary purpose of React?",
        options: ["To manage CSS", "To handle databases", "To create UI components", "To optimize JavaScript"],
        answer: "To create UI components",
      },
      {
        question: "What is JSX in React?",
        options: ["JavaScript X", "Java Syntax Extension", "JavaScript XML", "JavaScript Extension"],
        answer: "JavaScript XML",
      },
      {
        question: "Which method is used to update state in React?",
        options: ["changeState", "getState", "setState", "updateState"],
        answer: "setState",
      },
      {
        question: "Which hook allows you to use state in a functional component?",
        options: ["useContext", "useState", "useReducer", "useEffect"],
        answer: "useState",
      },
      {
        question: "What is the default state management tool in React?",
        options: ["Flux", "Context API", "Redux", "MobX"],
        answer: "Context API",
      },
    ],
    section2: [
      {
        question: "What hook is used to manage side effects in React?",
        options: ["useContext", "useRef", "useEffect", "useState"],
        answer: "useEffect",
      },
      {
        question: "Which lifecycle method is called after a component is rendered in React class components?",
        options: ["componentWillUnmount", "componentDidMount", "render", "componentWillMount"],
        answer: "componentDidMount",
      },
      {
        question: "How do you create a React app?",
        options: ["npm create react-app", "npx new react-app", "npx create-react-app", "npm init react-app"],
        answer: "npx create-react-app",
      },
      {
        question: "Which of the following is NOT a React hook?",
        options: ["useCallback", "useReducer", "useNode", "useMemo"],
        answer: "useNode",
      },
      {
        question: "What is React.Fragment used for?",
        options: ["To style elements", "To group elements without adding extra nodes", "To create a new DOM element", "To manage state"],
        answer: "To group elements without adding extra nodes",
      },
    ],
  },

  cplusplus: {
    section1: [
      {
        question: "Which operator is used to access members of a class in C++?",
        options: ["->", "*", ".", "::"],
        answer: ".",
      },
      {
        question: "What is the use of 'cout' in C++?",
        options: ["To manage memory", "To display output", "To define classes", "To take input"],
        answer: "To display output",
      },
      {
        question: "Which header file is required for input/output in C++?",
        options: ["stdlib.h", "stdio.h", "iostream", "fstream"],
        answer: "iostream",
      },
      {
        question: "What is the purpose of 'new' operator in C++?",
        options: ["Allocate memory", "Delete memory", "Return memory", "Manage threads"],
        answer: "Allocate memory",
      },
      {
        question: "What is the default access specifier for class members in C++?",
        options: ["Public", "Protected", "None", "Private"],
        answer: "Private",
      },
    ],
    section2: [
      {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["while", "do-while", "foreach", "for"],
        answer: "do-while",
      },
      {
        question: "Which keyword is used to inherit a class in C++?",
        options: ["super", "extends", "inherits", "public"],
        answer: "public",
      },
      {
        question: "What is a destructor in C++?",
        options: ["Method to clean up memory", "Constructor", "Loop initializer", "Library"],
        answer: "Method to clean up memory",
      },
      {
        question: "How do you declare a pointer in C++?",
        options: ["int *p", "int p*", "pointer p", "int p->"],
        answer: "int *p",
      },
      {
        question: "What is polymorphism in C++?",
        options: ["Ability to take many forms", "Creating objects", "Encapsulation", "Defining classes"],
        answer: "Ability to take many forms",
      },
    ],
  },

  python: {
    section1: [
      {
        question: "What keyword is used to define a function in Python?",
        options: ["def", "func", "define", "function"],
        answer: "def",
      },
      {
        question: "What is the output of '2 + 2 * 2' in Python?",
        options: ["6", "8", "4", "10"],
        answer: "6",
      },
      {
        question: "Which of the following is NOT a data type in Python?",
        options: ["dictionary", "list", "tuple", "set"],
        answer: "dictionary",
      },
      {
        question: "How do you start a comment in Python?",
        options: ["#", "//", "/*", "--"],
        answer: "#",
      },
      {
        question: "What is the output of 'print(type([]))'?",
        options: ["<list>", "<type 'list'>", "list", "<class 'list'>"],
        answer: "<class 'list'>",
      },
    ],
    section2: [
      {
        question: "What is used to import a library in Python?",
        options: ["import", "require", "include", "library"],
        answer: "import",
      },
      {
        question: "Which loop is used to iterate over a sequence in Python?",
        options: ["foreach", "for", "while", "do"],
        answer: "for",
      },
      {
        question: "How do you initialize an empty dictionary?",
        options: ["{}", "[]", "<>", "()"],
        answer: "{}",
      },
      {
        question: "What is 'None' in Python?",
        options: ["Null value", "Integer", "Zero", "Object"],
        answer: "Null value",
      },
      {
        question: "Which of the following is used for inheritance?",
        options: ["class Base.Sub()", "Sub = inherit(Base)", "class BaseClass(Subclass)", "class Subclass(BaseClass)"],
        answer: "class Subclass(BaseClass)",
      },
    ],
  },

  java: {
    section1: [
      {
        question: "What is the correct way to declare an integer in Java?",
        options: ["x = 10;", "int x : 10;", "int x = 10;", "integer x = 10;"],
        answer: "int x = 10;",
      },
      {
        question: "Which method is the entry point in a Java application?",
        options: ["main", "start", "entry", "execute"],
        answer: "main",
      },
      {
        question: "What is encapsulation?",
        options: ["Hiding data", "Creating data", "Using data", "Deleting data"],
        answer: "Hiding data",
      },
      {
        question: "What is the output of `System.out.println('Hello');`?",
        options: ["Hello", "'Hello'", "hello", "print Hello"],
        answer: "Hello",
      },
      {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["extends", "inherits", "public", "super"],
        answer: "extends",
      },
    ],
    section2: [
      {
        question: "What does JVM stand for?",
        options: ["Java Virtual Machine", "Java Visual Model", "Java Variable Machine", "Java Visual Memory"],
        answer: "Java Virtual Machine",
      },
      {
        question: "What is polymorphism in Java?",
        options: ["Ability to take many forms", "Creating multiple variables", "Data hiding", "Loop control"],
        answer: "Ability to take many forms",
      },
      {
        question: "What keyword is used to create an object in Java?",
        options: ["new", "object", "create", "make"],
        answer: "new",
      },
      {
        question: "Which keyword is used for exception handling?",
        options: ["try", "catch", "throw", "handle"],
        answer: "try",
      },
      {
        question: "What is the purpose of the 'final' keyword?",
        options: ["To make a variable constant", "To inherit classes", "To implement interfaces", "To define loops"],
        answer: "To make a variable constant",
      },
    ],
  },

  machineLearning: {
    section1: [
      {
        question: "What is supervised learning?",
        options: ["Learning with unlabeled data", "Learning with labeled data", "Learning without data", "Learning by reinforcement"],
        answer: "Learning with labeled data",
      },
      {
        question: "What does 'overfitting' mean in ML?",
        options: ["Model performs well on both training and test data", "Model performs well on training data but poorly on test data", "Model performs well on test data but poorly on training data", "Model does not learn at all"],
        answer: "Model performs well on training data but poorly on test data",
      },
      {
        question: "Which is NOT a type of machine learning?",
        options: ["Reinforcement learning", "Supervised learning", "Unsupervised learning", "Enhanced learning"],
        answer: "Enhanced learning",
      },
      {
        question: "What is a neural network?",
        options: ["Storage system for data", "Computational model inspired by the human brain", "Tool for data visualization", "Type of supervised learning"],
        answer: "Computational model inspired by the human brain",
      },
      {
        question: "What is the purpose of a cost function in ML?",
        options: ["Measure error", "Create models", "Classify data", "Visualize data"],
        answer: "Measure error",
      },
    ],
    section2: [
      {
        question: "What does 'feature' mean in ML?",
        options: ["Input variable", "Output variable", "Storage system", "Data type"],
        answer: "Input variable",
      },
      {
        question: "What is unsupervised learning?",
        options: ["Learning with labeled data", "Learning by reinforcement", "Learning through deep networks", "Learning with unlabeled data"],
        answer: "Learning with unlabeled data",
      },
      {
        question: "Which technique reduces dimensionality?",
        options: ["SVM", "PCA", "KNN", "ANN"],
        answer: "PCA",
      },
      {
        question: "What is a decision tree?",
        options: ["Flowchart-like model", "Neural network", "Mathematical function", "Storage structure"],
        answer: "Flowchart-like model",
      },
      {
        question: "Which of these is a classification algorithm?",
        options: ["Linear Regression", "Gradient Descent", "KNN", "PCA"],
        answer: "KNN",
      },
    ],
  },
  nodejs: {
    section1: [
      {
        question: "What is Node.js primarily used for?",
        options: ["Server-side scripting", "Machine learning", "Mobile applications", "Graphics rendering"],
        answer: "Server-side scripting",
      },
      {
        question: "Which command is used to initialize a Node.js project?",
        options: ["node init", "npm start", "npm init", "node start"],
        answer: "npm init",
      },
      {
        question: "Which module is used to work with file systems in Node.js?",
        options: ["fs", "file", "filesystem", "path"],
        answer: "fs",
      },
      {
        question: "What is the default runtime environment for Node.js?",
        options: ["Chrome V8", "Node", "ECMAScript", "Google Engine"],
        answer: "Chrome V8",
      },
      {
        question: "How do you import a module in Node.js?",
        options: ["import module from 'module'", "require('module')", "load 'module'", "import 'module'"],
        answer: "require('module')",
      },
    ],
    section2: [
      {
        question: "What is the purpose of npm?",
        options: ["To manage Node packages", "To compile Node.js code", "To create databases", "To handle HTTP requests"],
        answer: "To manage Node packages",
      },
      {
        question: "Which of these is a popular web framework for Node.js?",
        options: ["Express", "React", "Flask", "Angular"],
        answer: "Express",
      },
      {
        question: "What does the 'async' keyword do in Node.js?",
        options: ["Runs code asynchronously", "Loads a module", "Creates a server", "Compiles JavaScript"],
        answer: "Runs code asynchronously",
      },
      {
        question: "How do you handle exceptions in Node.js?",
        options: ["try-catch", "if-else", "exception block", "error handling"],
        answer: "try-catch",
      },
      {
        question: "What command is used to install a package globally in Node.js?",
        options: ["npm install <package>", "npm global <package>", "npm install -g <package>", "npm add <package>"],
        answer: "npm install -g <package>",
      },
    ],
  },

  mongodb: {
    section1: [
      {
        question: "What type of database is MongoDB?",
        options: ["Relational", "Document-based", "Key-value", "Graph"],
        answer: "Document-based",
      },
      {
        question: "Which format does MongoDB store its data in?",
        options: ["JSON", "CSV", "BSON", "XML"],
        answer: "BSON",
      },
      {
        question: "Which command is used to show all collections in MongoDB?",
        options: ["show dbs", "db.collections()", "show collections", "list collections"],
        answer: "show collections",
      },
      {
        question: "What is the primary key in MongoDB?",
        options: ["_id", "ID", "key_id", "uid"],
        answer: "_id",
      },
      {
        question: "Which command is used to insert a document in MongoDB?",
        options: ["db.collection.insert()", "db.insert()", "insert.collection()", "add.document()"],
        answer: "db.collection.insert()",
      },
    ],
    section2: [
      {
        question: "What does sharding in MongoDB mean?",
        options: ["Distributing data across servers", "Backing up data", "Indexing data", "Storing data on one server"],
        answer: "Distributing data across servers",
      },
      {
        question: "Which command is used to delete a document in MongoDB?",
        options: ["remove.document()", "db.collection.remove()", "delete.doc()", "drop.document()"],
        answer: "db.collection.remove()",
      },
      {
        question: "What is the default port MongoDB listens on?",
        options: ["3306", "8080", "27017", "3000"],
        answer: "27017",
      },
      {
        question: "How do you start the MongoDB shell?",
        options: ["mongodb", "mongo", "start mongo", "mongodb shell"],
        answer: "mongo",
      },
      {
        question: "What is an index in MongoDB used for?",
        options: ["To speed up queries", "To backup data", "To shard data", "To replicate data"],
        answer: "To speed up queries",
      },
    ],
  },

  c: {
    section1: [
      {
        question: "Which of these is used to declare a constant in C?",
        options: ["const", "constant", "define", "set"],
        answer: "const",
      },
      {
        question: "What is the output of `printf('%d', 10);`?",
        options: ["10", "10.0", "'10'", "error"],
        answer: "10",
      },
      {
        question: "What library is required to use `printf()` in C?",
        options: ["stdio.h", "stdlib.h", "string.h", "math.h"],
        answer: "stdio.h",
      },
      {
        question: "Which operator is used to access memory addresses in C?",
        options: ["&", "*", "->", "%"],
        answer: "&",
      },
      {
        question: "What is a pointer in C?",
        options: ["Variable that stores a memory address", "Type of data", "Loop statement", "Library"],
        answer: "Variable that stores a memory address",
      },
    ],
    section2: [
      {
        question: "How do you declare an integer variable in C?",
        options: ["int x;", "integer x;", "var x;", "int: x"],
        answer: "int x;",
      },
      {
        question: "Which of these is a logical operator in C?",
        options: ["&&", "++", "--", "?:"],
        answer: "&&",
      },
      {
        question: "What is a NULL pointer?",
        options: ["Pointer with no address", "Pointer with value 0", "Variable of type null", "Character pointer"],
        answer: "Pointer with no address",
      },
      {
        question: "Which function is used to allocate memory in C?",
        options: ["malloc()", "memory()", "alloc()", "pointer()"],
        answer: "malloc()",
      },
      {
        question: "What is a function prototype in C?",
        options: ["Declaration of a function", "Definition of a function", "Library function", "Variable declaration"],
        answer: "Declaration of a function",
      },
    ],
  },

  csharp: {
    section1: [
      {
        question: "Which keyword is used to declare a class in C#?",
        options: ["class", "struct", "public", "module"],
        answer: "class",
      },
      {
        question: "What is encapsulation in C#?",
        options: ["Hiding data", "Using multiple data types", "Inheriting classes", "Defining classes"],
        answer: "Hiding data",
      },
      {
        question: "Which keyword is used to inherit a class in C#?",
        options: ["extends", "inherits", "super", ":"],
        answer: ":",
      },
      {
        question: "What is the entry point method in C#?",
        options: ["Main", "Start", "Entry", "Run"],
        answer: "Main",
      },
      {
        question: "What does the 'static' keyword mean in C#?",
        options: ["Shared by all instances", "Only accessible in class", "Not usable", "Inherited automatically"],
        answer: "Shared by all instances",
      },
    ],
    section2: [
      {
        question: "What is polymorphism in C#?",
        options: ["Ability to take many forms", "Creating multiple variables", "Data hiding", "Loop control"],
        answer: "Ability to take many forms",
      },
      {
        question: "Which keyword is used for exception handling in C#?",
        options: ["try", "catch", "throw", "error"],
        answer: "try",
      },
      {
        question: "What is an interface in C#?",
        options: ["Contract of methods", "Database connection", "Method declaration", "Variable storage"],
        answer: "Contract of methods",
      },
      {
        question: "Which type is immutable in C#?",
        options: ["string", "int", "float", "DateTime"],
        answer: "string",
      },
      {
        question: "Which method checks if a string is null or empty in C#?",
        options: ["IsNullOrEmpty()", "IsNull()", "IsEmpty()", "CheckNullEmpty()"],
        answer: "IsNullOrEmpty()",
      },
    ],
  },

  sql: {
    section1: [
      {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "System Query Language", "Simple Query Language", "Sorted Query Language"],
        answer: "Structured Query Language",
      },
      {
        question: "Which SQL statement is used to fetch data?",
        options: ["SELECT", "FETCH", "RETRIEVE", "PULL"],
        answer: "SELECT",
      },
      {
        question: "How do you add a new record in SQL?",
        options: ["INSERT INTO", "ADD RECORD", "NEW RECORD", "APPEND"],
        answer: "INSERT INTO",
      },
      {
        question: "What does `JOIN` do in SQL?",
        options: ["Combines rows from tables", "Deletes rows", "Sorts rows", "Creates tables"],
        answer: "Combines rows from tables",
      },
      {
        question: "What is the purpose of `GROUP BY`?",
        options: ["Aggregate rows", "Order rows", "Sort rows", "Insert rows"],
        answer: "Aggregate rows",
      },
    ],
    section2: [
      {
        question: "Which command is used to update data in SQL?",
        options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
        answer: "UPDATE",
      },
      {
        question: "How do you remove a table in SQL?",
        options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "ERASE TABLE"],
        answer: "DROP TABLE",
      },
      {
        question: "What is a primary key in SQL?",
        options: ["Unique identifier for rows", "First column in table", "Field type", "Data storage type"],
        answer: "Unique identifier for rows",
      },
      {
        question: "Which SQL clause filters results?",
        options: ["WHERE", "HAVING", "IF", "WITH"],
        answer: "WHERE",
      },
      {
        question: "Which command removes duplicates?",
        options: ["DISTINCT", "UNIQUE", "DELETE", "DIFFERENT"],
        answer: "DISTINCT",
      },
    ],
  },

  expressjs: {
    section1: [
      {
        question: "What is Express.js?",
        options: ["A web framework for Node.js", "A JavaScript compiler", "A database manager", "An HTTP client"],
        answer: "A web framework for Node.js",
      },
      {
        question: "How do you create an Express app?",
        options: ["express()", "express.start()", "new Express()", "app.create()"],
        answer: "express()",
      },
      {
        question: "Which method handles GET requests in Express?",
        options: ["app.get()", "app.fetch()", "app.select()", "app.retrieve()"],
        answer: "app.get()",
      },
      {
        question: "How do you install Express?",
        options: ["npm install express", "node install express", "npm add express", "install express"],
        answer: "npm install express",
      },
      {
        question: "What is `app.use()` used for in Express?",
        options: ["To use middleware", "To fetch data", "To connect databases", "To handle errors"],
        answer: "To use middleware",
      },
    ],
    section2: [
      {
        question: "How do you start an Express server?",
        options: ["app.listen()", "app.start()", "server.begin()", "app.connect()"],
        answer: "app.listen()",
      },
      {
        question: "Which HTTP method is used to send data in a form?",
        options: ["POST", "GET", "PUT", "DELETE"],
        answer: "POST",
      },
      {
        question: "What does `req.body` contain in Express?",
        options: ["Request body data", "Request headers", "Query string", "Response data"],
        answer: "Request body data",
      },
      {
        question: "How do you handle errors in Express?",
        options: ["Error handling middleware", "error() method", "catchError()", "try-catch block only"],
        answer: "Error handling middleware",
      },
      {
        question: "Which package is commonly used to parse incoming JSON in Express?",
        options: ["body-parser", "jsonify", "express-parser", "parser"],
        answer: "body-parser",
      },
    ],
  },

  webservers: {
    section1: [
      {
        question: "What is a web server?",
        options: ["A server that serves web pages", "A server for databases", "A mail server", "A file server"],
        answer: "A server that serves web pages",
      },
      {
        question: "Which protocol does a web server use?",
        options: ["HTTP", "FTP", "SMTP", "POP"],
        answer: "HTTP",
      },
      {
        question: "Which is an open-source web server?",
        options: ["Apache", "IIS", "Oracle", "Tomcat"],
        answer: "Apache",
      },
      {
        question: "What does HTTPS stand for?",
        options: ["HyperText Transfer Protocol Secure", "Hyper Transfer Protocol", "Hyper Test Protocol Secure", "HyperTerminal Transfer Protocol"],
        answer: "HyperText Transfer Protocol Secure",
      },
      {
        question: "Which port does HTTP use by default?",
        options: ["80", "21", "443", "25"],
        answer: "80",
      },
    ],
    section2: [
      {
        question: "Which server software is used to run PHP?",
        options: ["Apache", "IIS", "Tomcat", "Jetty"],
        answer: "Apache",
      },
      {
        question: "What does a reverse proxy do?",
        options: ["Routes requests to servers", "Loads web pages", "Encrypts data", "Caches web pages"],
        answer: "Routes requests to servers",
      },
      {
        question: "Which server serves dynamic content?",
        options: ["Apache", "Nginx", "Node.js", "FTP server"],
        answer: "Node.js",
      },
      {
        question: "What does load balancing do?",
        options: ["Distributes traffic across servers", "Increases storage", "Reduces power consumption", "Secures connections"],
        answer: "Distributes traffic across servers",
      },
      {
        question: "What is the purpose of SSL certificates?",
        options: ["To secure data", "To serve images", "To format HTML", "To cache web pages"],
        answer: "To secure data",
      },
    ],
  },

  datascience: {
    section1: [
      {
        question: "What is data science?",
        options: ["Field of analyzing and interpreting data", "Managing databases", "Data encryption", "Creating data"],
        answer: "Field of analyzing and interpreting data",
      },
      {
        question: "What does 'big data' refer to?",
        options: ["Large, complex datasets", "Data with many types", "Data with no structure", "Formatted data"],
        answer: "Large, complex datasets",
      },
      {
        question: "Which programming language is popular in data science?",
        options: ["Python", "Java", "JavaScript", "C"],
        answer: "Python",
      },
      {
        question: "What does 'data cleaning' mean?",
        options: ["Removing or fixing data errors", "Formatting data", "Encrypting data", "Creating tables"],
        answer: "Removing or fixing data errors",
      },
      {
        question: "What is a data frame?",
        options: ["A 2D data structure", "A database", "A class", "A function"],
        answer: "A 2D data structure",
      },
    ],
    section2: [
      {
        question: "Which library is used for data visualization in Python?",
        options: ["Matplotlib", "Pandas", "NumPy", "Requests"],
        answer: "Matplotlib",
      },
      {
        question: "What is machine learning?",
        options: ["Algorithms that learn from data", "Database management", "Server management", "A coding language"],
        answer: "Algorithms that learn from data",
      },
      {
        question: "What does a correlation matrix show?",
        options: ["Relationships between variables", "Data types", "Data sizes", "Indexing"],
        answer: "Relationships between variables",
      },
      {
        question: "What is 'training data'?",
        options: ["Data used to teach a model", "Data for analysis", "Data for testing", "Formatted data"],
        answer: "Data used to teach a model",
      },
      {
        question: "What is a neural network?",
        options: ["A computational model inspired by the human brain", "A database structure", "A loop in code", "A data structure"],
        answer: "A computational model inspired by the human brain",
      },
    ],
  },

  aptitude: {
    section1: [
      {
        question: "What is a common aptitude test question type?",
        options: ["Logical reasoning", "Programming", "Drawing", "Singing"],
        answer: "Logical reasoning",
      },
      {
        question: "Which of these is a math-based aptitude question?",
        options: ["Numerical reasoning", "Drawing shapes", "Writing essays", "Using grammar"],
        answer: "Numerical reasoning",
      },
      {
        question: "What is 15% of 200?",
        options: ["30", "25", "20", "15"],
        answer: "30",
      },
      {
        question: "What does 'spatial reasoning' measure?",
        options: ["Ability to visualize objects", "Math skills", "Writing skills", "Logic skills"],
        answer: "Ability to visualize objects",
      },
      {
        question: "What is the next number in the series: 2, 4, 8, 16?",
        options: ["32", "30", "24", "20"],
        answer: "32",
      },
    ],
    section2: [
      {
        question: "How many degrees are in a right angle?",
        options: ["90", "45", "180", "360"],
        answer: "90",
      },
      {
        question: "What is the perimeter of a rectangle with length 5 and width 3?",
        options: ["16", "8", "15", "10"],
        answer: "16",
      },
      {
        question: "What is 2^3?",
        options: ["8", "6", "9", "12"],
        answer: "8",
      },
      {
        question: "What does 'verbal reasoning' test?",
        options: ["Understanding and reasoning using words", "Using numbers", "Computer skills", "Writing essays"],
        answer: "Understanding and reasoning using words",
      },
      {
        question: "If x + 3 = 10, what is x?",
        options: ["7", "8", "6", "9"],
        answer: "7",
      },
    ],
  }
};
