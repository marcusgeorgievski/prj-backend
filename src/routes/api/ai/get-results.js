// routes/api/add-class.js
const logger = require("../../../logger")

const { OpenAI } = require("openai")

module.exports = async (req, res, next) => {
  try {
    const { content } = req.body
    logger.debug(content.slice(0, 20))

    if (!content) {
      const error = new Error("content is required")
      error.code = 400
      logger.error(error)
      throw error
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: content },
      ],
      model: "gpt-4o-mini",
    })

    const result = completion.choices[0].message.content
    logger.info(result)

    // parse the result to JSON
    const parsedResult = JSON.parse(result)

    res.status(200).json(parsedResult)
  } catch (error) {
    logger.error(error)
    next(error)
  }
}

const prompt = `
Your only task is to extract the class and assignment information from a class addendum. 
You must not return any other information, only the json that will be parsed (thus anything not json will cause an error). 
The addendum will contain the following information:

(1) Extract Class Information:

Find the course code OR name (use code if you find it, otherwise just the name) and the professor's name from the addendum.
Output this information in JSON format as follows:

{
  "name": "course_code", (text/string)
  "professor": "professor_name" (text/string)
}

If the information cannot be found, set null for the respective fields.

(2) Extract Individual Assessments:

Locate all assessments listed in the addendum. Some addendums group assignment by category such as "tests 25%".
For each individual assessment, extract the name and weight (percentage).
It is important to distinguish between grouped and individual assessments and only identify individual assignments (as as "test 1", "closures quiz", etc.).
The grouped assessments are usually around the top and must be ignored.
These individual assessments can possibly be found around messy text, as they are originally in table format before extraction.
Make sure if you see enumerated or named assessments, you extract them as individual assessments (e.g. "Assignment 1", "Assignment 2", "Midterm", "Final Exam", "methods assignment").

Output this information in JSON format as an array of objects as follows:

[
  {
    "name": "assessment_name", (text/string)
    "weight": assessment_weight (number/float)
  },
  {
    "name": "assessment_name", (text/string)
    "weight": assessment_weight (number/float)
  }
  // Add additional assessments as needed
]

If no individual assessments are found, return an empty array.

Here is an example addendum input and your expected output:

Input: 

"
School of English & Liberal Studies
Professor’s Addendum to Course Outline

Course Code:  CUL493NBD	Term: Summer 2024

Course Title: What In The World Is Going On?

Professor: Robert Price

Contact Info: robert.price@senecapolytechnic.ca

Student Hours: Tuesday and Thursday 3:00pm – 5:00pm

Approved By: 	Amanda Nowensky
			Chair, School of English & Liberal Studies

Delivery Mode:		(P) In-Person 
		(H) Hybrid 
	X	(OA) Online Asynchronous 
		(OB) Online Synchronous and Asynchronous 
		(F) Flexible 
		
Final Assessment:		Assignment
	X	Online Exam
		In-person Exam

Introduction
Welcome to CUL493! ...

Grading/Assignments
Introduction Activity			        5%
Discussion Boards   (4 X 12.5%)        50% 
Critical Analysis Assignment/ 
Self-Assessment                                  10%
Online Reflections                                10%
Concept Quiz			         5%
Final Examination                                20%

Academic Integrity, Copyright, and AI Tools
...

Tentative Weekly Schedule
Week	Live Instruction Time
(Hybrid & OB only)	Topic/Reading	Assessment	%
1	May 6 – 10		Welcome!
Syllabus/BlackBoard

Introduction to Canadian Gov. & Politics (See article in Course Documents)	Online Student Introductions:

Interact with others in groups or teams in ways that contribute to effective working relationships and the achievement of goals.	5%
May 10 Last day to ADD 14 week & 7S1/7S2 classes				
2 	May 13 – 17		Critically reflect on personal views and biases

Media Bias: "Left Vs. Right" reporting.
	Political Ideology & Reflection Quiz:  Assigned
(Quiz activity: quiz questions guide student understanding of some of the main political & social issues in Canada)	10%
Last day to DROP 14 week and 7S1 classes with  partial refund

3	May 20 – 24		Locate, select, organize, and document information using appropriate technology and information systems. 

Top news story of the week: See Course Documents	Political Ideology Reflection: Due	
May 20 – Victoria Day – Seneca Closed				
4	May 27 – 31		Analyze the various government parties and their stance on a variety of issues. 
Policy Debate Article in Course Documents	Discussion Board: 

Analyze, evaluate, and apply relevant information from a variety of sources.	12.5%
...

14	Aug 12 – 16		Wrap up of the course.	Final Exam	20%
Aug 16 – Summer Term 2024 ends
"


And the expected Output:

{
  "class_info": {
    "name": "CUL493NBD",
    "professor": "Robert Price"
  },
  "assessments": [
    {
      "name": "Introduction Activity",
      "weight": 5
    },
    {
      "name": "Discussion Boards 1",
      "weight": 12
    },
    {
      "name": "Discussion Boards 2",
      "weight": 12.5
    },
    {
      "name": "Discussion Boards 3",
      "weight": 12.5
    },
    {
      "name": "Discussion Boards 4",
      "weight": 12.5
    },
    {
      "name": "Political Ideology Reflection",
      "weight": 10
    },
    {
      "name": "Online Reflection",
      "weight": 10
    },
    {
      "name": "Documentary Analysis",
      "weight": 12.5
    },
    {
      "name": "Critical Self-reflection",
      "weight": 10
    },
    {
      "name": "Course Key Concept Quiz",
      "weight": 5
    },
    {
      "name": "Final Examination",
      "weight": 20
    }
  ]
}


Here is a second example addendum input and your expected output:

Input:

"
Course Outline (Full course outline available here)
Course
Learning
Outcome
s (CLOs):
Upon successful completion of this subject the student will be able to:
1. Effectively use the Swift and Objective-C programming languages to create applications for iOS
2. Effectively use the Apple software development tools, frameworks, and documentation
3. Identify and select the appropriate framework components in the creation of a software application
4. Apply best-practice software design principles to the creation of iOS applications
5. Analyze the requirements of a medium-difficulty programming task, and create software that meets the
requirements
6. Given a set of requirements, recommend a suitable design for an iOS application
7. Compare the Apple platform's application development approach with other platforms
Method of
Evaluatio
n:
quizzes/Homework 25% (6 short quiz (12%), 1 longer quiz (3%), Final assignment presentation, class participation. in class labs
Assignment 1 10%
Assignment 2 10%
Assignment 3 10%
Assignment 4 15%
Midterm Test 10%
Final Exam 20%
Prescribe
d Text(s): Develop in Swift Fundamentals
Develop in Swift Data Collection
Optional
Referenc
e
Material(s
https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/In
troduction.html
https://developer.apple.com/swift/
Objective-C and iOS Programming: A Simplified Approach
Please visit the Seneca College bookstore for more details.
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Weekly Schedule (Subject to Change)
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
1
May 14 - 16
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Introduction to mobile
application development and
IOS
Introduction to mobile
application development and
IOS
Overview of using XCode
Swift programming language
fundaments
FAQ about the course
Ensure access to the
course
Ensure access
to a MAC with
xCode
Access to the course
teams
CLO (1,2,6,7)
2
May 21 - 23
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Quiz 1: 5 minutes Quiz
Swift programming language
fundaments
CLO (1,4,6)
3
May 28 - 30
Tuesday
1:30:00 PM
3:15:00 PM
Quiz 2: 5 minutes Quiz
Fundamentals of IOS Development
Assignment 1 CLO (1,2,3,4,6)
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
Thursday
10:45:00 AM
12:30:00 PM
Zoom
View Controllers and Lifecycle
4
Jun 4 - 6
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Quiz 3: 5 minutes Quiz
Designing screens with
UIKit: Common UI controls
Labels, TextField, Button, Switch,
Image, etc
CLO (1,3,4,5)
5
Jun 11 - 13
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Handling user events with outlets and
actions Assignment 2
6
Jun 18 - 20
Tuesday
1:30:00 PM
3:15:00 PM
Navigation and navigation design
patterns
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
Thursday
10:45:00 AM
12:30:00 PM
Zoom
7
Jun 25 - 27
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Reading week CLO (1,2,3,4,5,6)
7
Jul 2 - 4
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Review
Test 1
Test 1 CLO (1,3,6)
8
Jul 9 - 11
Tuesday
1:30:00 PM
3:15:00 PM
Delegates: Pickers and Tableviews CLO (1,3,4)
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
Thursday
10:45:00 AM
12:30:00 PM
Zoom
9
Jul 16 – 18
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Layout Overview: Layouts and
Constraints
CollectionView
CLO (1,3,4,5,6)
10
Jul 23 – 25
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Local notifications
Core Data
Assignment 3 CLO (1,2,3,4,6)
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
11
July 30 Aug 1
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Concurrency
12
Aug 6 - 8 Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Zoom
Introduction to SwiftUI Assignment 4
13
Aug 13 - 15
Tuesday
1:30:00 PM
3:15:00 PM
Thursday
10:45:00 AM
12:30:00 PM
Review final assignment
Seneca College | 1750 Finch Ave. E. | Toronto, ON | M2J 2X5
Week & Date Synchronous Class
Time and Platform
Synchronous
Topics and Activities
Asynchronous
Activities, Readings
and Deadlines
Related Course
Learning Outcomes
(CLOs)
Zoom
Final Exam 35%
(Faculty to provide instructions here
on final exam/project delivery - times,
platform, structure, conflict exams,
"

And the expected Output:

{
  "class_info": {
    "name": "Swift Fundamentals",
    "professor": null
  },
  "assessments": [
    {
      "name": "Quiz 1",
      "weight": 2
    },
    {
      "name": "Quiz 2",
      "weight": 2
    },
    {
      "name": "Quiz 3",
      "weight": 2
    },
    {
      "name": "Assignment 1",
      "weight": 10
    },
    {
      "name": "Assignment 2",
      "weight": 10
    },
    {
      "name": "Assignment 3",
      "weight": 10
    },
    {
      "name": "Assignment 4",
      "weight": 15
    },
    {
      "name": "Midterm Test",
      "weight": 10
    },
    {
      "name": "Final Exam",
      "weight": 20
    }
  ]
}

Remember to only return the JSON that will be parsed in a single line, and nothing else. Do not format with special characters or newlines, as this will cause an error since I will parse with JSON.parse(result).
`
