# Assignment 2 - Shopping Store

Instructions

Develop a website as a Single Page Application (SPA) using React and React Router. The website will include the following 3 pages and will use React Router for routing between these pages:

1. Home Page.
1. Shopping List Page.
1. Store List Page.

Data for the App

- We have provided you a zip file which includes the following 3 files
  - App.js
  - items.js
  - stores.js
- The data your app will use is in the files items.js and stores.js.
- Create a React app using npx.
- Place App.js in the directory src.
- Place both items.js and stores.js in the directory src/data.
- The App.js file imports data from these data files into the variables items and stores.
  - Your app must get its data from these variables.
  - Do not change the part of App.js that imports these files.
- During testing, we may replace these data files with a different set of test files with the same names.
  - The properties of the object and the type of their values in the test files will match the properties of the objects in the files provided to you.
  - However, the values of these properties as well as the number of objects in the test files can be different from the files provided to you.

\1. Home Page

- This page is rendered when the app starts up.
- This page must include links to the following 2 pages:
  - Shopping List Page.
  - Store List Page ~~Item Search Page~~.
- In addition to the links, you can optionally add welcome text on this page describing the web application.

\2. Shopping List Page

- This page will have the an HTML table, which must be created via a React component, that shows the data provided in the file items.js
- HTML Table:
  - The table must have a header row.
  - Each row in the HTML table must have the following 3 columns
    - Item Name
    - Item Price
    - A React component that provides a control via 2 icons to increment and decrement the quantity of the item.
      - The initial value of the quantity must be zero.
      - The user must not be able to set the quantity to less than 0 or greater than 10.
- This page must include a link to the Home page.

\3. Store List Page

- This page should use a React component to display the data in the file stores.js.
  - It is up to you to decide how to display the data.
- Underneath the store data, the page must display an input control (e.g., a textbox) for the user to enter their 5 digit zip code and a button to submit the data.
  - You should display a message with this input control telling the user what they are supposed to enter.
  - When the user clicks the button, your app should not submit the form. Instead, the app should display an alert with a message stating what the user had entered.
- This page must include a link to the Home page.

CSS

- Update and add rules to the existing App.css file created by running npx.
- Add a body {} element in the first line of the App.css file that defines the font-family, background-color, color, margin, and padding for site/app.
- Add an h1 and h2 rule with a new color and font family.
- Define rules for table, caption, thead, tbody, tr, th, and td with borders and color. [no new fonts, please]
- Define rules for the form’s fieldset, legend, label, input, select (optional), and button that include the same font-family as body (because the form elements do not inherit it like the other rules do) and the same color choices as used in the table.
- Add padding to the input element to improve accessibility.
- Update existing App- rules with color, border, background, margin, and padding, as needed.

