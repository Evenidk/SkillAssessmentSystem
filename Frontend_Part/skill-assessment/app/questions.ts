// questions.ts

export const questionSets = {
    html: {
      section1: [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "Hyperlinks Text Mark Language", "Hyper Text Markdown Language", "Hyperlinking Text Markup Language"],
          answer: "Hyper Text Markup Language",
        },
        {
          question: "Which HTML tag is used to define an unordered list?",
          options: ["<ul>", "<ol>", "<li>", "<list>"],
          answer: "<ul>",
        },
        {
          question: "What is the correct way to create a hyperlink in HTML?",
          options: ["<a href='url'>link text</a>", "<link src='url'>link text</link>", "<a src='url'>link text</a>", "<url href='url'>link text</url>"],
          answer: "<a href='url'>link text</a>",
        },
        {
          question: "Which HTML tag is used for inserting an image?",
          options: ["<img>", "<image>", "<pic>", "<src>"],
          answer: "<img>",
        },
        {
          question: "What is the correct HTML element for the largest heading?",
          options: ["<h1>", "<h6>", "<heading>", "<header>"],
          answer: "<h1>",
        },
      ],
      section2: [
        {
          question: "What tag is used to create a numbered list?",
          options: ["<ol>", "<ul>", "<li>", "<nl>"],
          answer: "<ol>",
        },
        {
          question: "Which tag is used to add a line break in HTML?",
          options: ["<br>", "<lb>", "<break>", "<newline>"],
          answer: "<br>",
        },
        {
          question: "Which attribute specifies an alternate text for an image?",
          options: ["alt", "src", "title", "longdesc"],
          answer: "alt",
        },
        {
          question: "What is the purpose of the <meta> tag?",
          options: ["Provide metadata", "Display text", "Insert media", "Create links"],
          answer: "Provide metadata",
        },
        {
          question: "How do you specify the background color in HTML?",
          options: ["<body style='background-color:yellow;'>", "<background>yellow</background>", "<bg color='yellow'>", "<background-color='yellow'>"],
          answer: "<body style='background-color:yellow;'>",
        },
      ],
    },
  
    css: {
      section1: [
        {
          question: "What does CSS stand for?",
          options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets", "Computer Style Sheets"],
          answer: "Cascading Style Sheets",
        },
        {
          question: "Which CSS property changes the text color?",
          options: ["color", "text-color", "font-color", "text-style"],
          answer: "color",
        },
        {
          question: "How do you center an element using CSS?",
          options: ["margin: auto;", "align: center;", "center: true;", "padding: auto;"],
          answer: "margin: auto;",
        },
        {
          question: "What property is used to change the font of an element?",
          options: ["font-family", "font-style", "font-weight", "font-text"],
          answer: "font-family",
        },
        {
          question: "Which CSS property controls the space between lines?",
          options: ["line-height", "line-spacing", "text-spacing", "font-height"],
          answer: "line-height",
        },
      ],
      section2: [
        {
          question: "Which property is used to change the background color?",
          options: ["background-color", "bg-color", "color", "bg-style"],
          answer: "background-color",
        },
        {
          question: "What does the 'display: flex;' property do?",
          options: ["Creates a flex container", "Centers text", "Changes font", "Aligns content vertically"],
          answer: "Creates a flex container",
        },
        {
          question: "Which of the following is used to set the width of an element?",
          options: ["width", "size", "element-width", "set-width"],
          answer: "width",
        },
        {
          question: "Which CSS property adds shadow to elements?",
          options: ["box-shadow", "shadow", "text-shadow", "element-shadow"],
          answer: "box-shadow",
        },
        {
          question: "What is the default value of the 'position' property?",
          options: ["static", "relative", "absolute", "fixed"],
          answer: "static",
        },
      ],
    },
  
    javascript: {
      section1: [
        {
          question: "What is the output of `console.log(typeof null)` in JavaScript?",
          options: ["'object'", "'null'", "'undefined'", "'number'"],
          answer: "'object'",
        },
        {
          question: "What does UI stand for?",
          options: ["User Interaction", "User Interface", "Uniform Interface", "Unified Interaction"],
          answer: "User Interface",
        },
        {
          question: "Which company developed JavaScript?",
          options: ["Netscape", "Microsoft", "Google", "Apple"],
          answer: "Netscape",
        },
        {
          question: "What keyword is used to declare a constant in JavaScript?",
          options: ["const", "var", "let", "constant"],
          answer: "const",
        },
        {
          question: "Which of the following is NOT a primitive type in JavaScript?",
          options: ["string", "boolean", "undefined", "function"],
          answer: "function",
        },
      ],
      section2: [
        {
          question: "Which operator is used to assign a value to a variable?",
          options: ["=", "==", "===", "=>"],
          answer: "=",
        },
        {
          question: "Which method converts JSON data to a JavaScript object?",
          options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "objectify.JSON()"],
          answer: "JSON.parse()",
        },
        {
          question: "What does 'this' keyword refer to in JavaScript?",
          options: ["Current object", "Global object", "New object", "Window object"],
          answer: "Current object",
        },
        {
          question: "What does 'NaN' stand for in JavaScript?",
          options: ["Not a Number", "No Another Name", "Non-array Number", "Null as Number"],
          answer: "Not a Number",
        },
        {
          question: "How do you declare an asynchronous function in JavaScript?",
          options: ["async function", "await function", "asynchronous function", "function async"],
          answer: "async function",
        },
      ],
    },
  
    react: {
      section1: [
        {
          question: "What is the primary purpose of React?",
          options: ["To create UI components", "To handle databases", "To manage CSS", "To optimize JavaScript"],
          answer: "To create UI components",
        },
        {
          question: "What is JSX in React?",
          options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JavaScript X"],
          answer: "JavaScript XML",
        },
        {
          question: "Which method is used to update state in React?",
          options: ["setState", "getState", "updateState", "changeState"],
          answer: "setState",
        },
        {
          question: "Which hook allows you to use state in a functional component?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          answer: "useState",
        },
        {
          question: "What is the default state management tool in React?",
          options: ["Context API", "Redux", "Flux", "MobX"],
          answer: "Context API",
        },
      ],
      section2: [
        {
          question: "What hook is used to manage side effects in React?",
          options: ["useEffect", "useState", "useRef", "useContext"],
          answer: "useEffect",
        },
        {
          question: "Which lifecycle method is called after a component is rendered in React class components?",
          options: ["componentDidMount", "componentWillMount", "render", "componentWillUnmount"],
          answer: "componentDidMount",
        },
        {
          question: "How do you create a React app?",
          options: ["npx create-react-app", "npm init react-app", "npx new react-app", "npm create react-app"],
          answer: "npx create-react-app",
        },
        {
          question: "Which of the following is NOT a React hook?",
          options: ["useNode", "useReducer", "useMemo", "useCallback"],
          answer: "useNode",
        },
        {
          question: "What is React.Fragment used for?",
          options: ["To group elements without adding extra nodes", "To style elements", "To create a new DOM element", "To manage state"],
          answer: "To group elements without adding extra nodes",
        },
      ],
    },
  
    cplusplus: {
      section1: [
        {
          question: "Which operator is used to access members of a class in C++?",
          options: [".", "->", "::", "*"],
          answer: ".",
        },
        {
          question: "What is the use of 'cout' in C++?",
          options: ["To display output", "To take input", "To define classes", "To manage memory"],
          answer: "To display output",
        },
        {
          question: "Which header file is required for input/output in C++?",
          options: ["iostream", "stdio.h", "fstream", "stdlib.h"],
          answer: "iostream",
        },
        {
          question: "What is the purpose of 'new' operator in C++?",
          options: ["Allocate memory", "Delete memory", "Return memory", "Manage threads"],
          answer: "Allocate memory",
        },
        {
          question: "What is the default access specifier for class members in C++?",
          options: ["Private", "Public", "Protected", "None"],
          answer: "Private",
        },
      ],
      section2: [
        {
          question: "Which loop is guaranteed to execute at least once?",
          options: ["do-while", "for", "while", "foreach"],
          answer: "do-while",
        },
        {
          question: "Which keyword is used to inherit a class in C++?",
          options: ["public", "extends", "inherits", "super"],
          answer: "public",
        },
        {
          question: "What is a destructor in C++?",
          options: ["Method to clean up memory", "Constructor", "Loop initializer", "Library"],
          answer: "Method to clean up memory",
        },
        {
          question: "How do you declare a pointer in C++?",
          options: ["int *p", "int p*", "int p->", "pointer p"],
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
          options: ["list", "tuple", "set", "dictionary"],
          answer: "dictionary",
        },
        {
          question: "How do you start a comment in Python?",
          options: ["#", "//", "/*", "--"],
          answer: "#",
        },
        {
          question: "What is the output of 'print(type([]))'?",
          options: ["list", "<class 'list'>", "<list>", "<type 'list'>"],
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
          options: ["for", "while", "foreach", "do"],
          answer: "for",
        },
        {
          question: "How do you initialize an empty dictionary?",
          options: ["{}", "[]", "()", "<>"],
          answer: "{}",
        },
        {
          question: "What is 'None' in Python?",
          options: ["Null value", "Integer", "Zero", "Object"],
          answer: "Null value",
        },
        {
          question: "Which of the following is used for inheritance?",
          options: ["class Subclass(BaseClass)", "class Base(Sub)", "Sub = inherit(Base)", "class Base.Sub()"],
          answer: "class Subclass(BaseClass)",
        },
      ],
    },
  
    java: {
      section1: [
        {
          question: "What is the correct way to declare an integer in Java?",
          options: ["int x = 10;", "integer x = 10;", "int x : 10;", "x = 10;"],
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
          options: ["Learning with labeled data", "Learning with unlabeled data", "Learning without data", "Learning by reinforcement"],
          answer: "Learning with labeled data",
        },
        {
          question: "What does 'overfitting' mean in ML?",
          options: ["Model performs well on training data but poorly on test data", "Model performs well on test data but poorly on training data", "Model performs well on both training and test data", "Model does not learn at all"],
          answer: "Model performs well on training data but poorly on test data",
        },
        {
          question: "Which is NOT a type of machine learning?",
          options: ["Enhanced learning", "Supervised learning", "Unsupervised learning", "Reinforcement learning"],
          answer: "Enhanced learning",
        },
        {
          question: "What is a neural network?",
          options: ["Computational model inspired by the human brain", "Storage system for data", "Type of supervised learning", "Tool for data visualization"],
          answer: "Computational model inspired by the human brain",
        },
        {
          question: "What is the purpose of a cost function in ML?",
          options: ["Measure error", "Visualize data", "Create models", "Classify data"],
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
          options: ["Learning with unlabeled data", "Learning with labeled data", "Learning by reinforcement", "Learning through deep networks"],
          answer: "Learning with unlabeled data",
        },
        {
          question: "Which technique reduces dimensionality?",
          options: ["PCA", "SVM", "KNN", "ANN"],
          answer: "PCA",
        },
        {
          question: "What is a decision tree?",
          options: ["Flowchart-like model", "Neural network", "Mathematical function", "Storage structure"],
          answer: "Flowchart-like model",
        },
        {
          question: "Which of these is a classification algorithm?",
          options: ["KNN", "PCA", "Linear Regression", "Gradient Descent"],
          answer: "KNN",
        },
      ],
    },
  };
  