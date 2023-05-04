[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10767590&assignment_repo_type=AssignmentRepo)


# Project 1 Final Report Sp'23 <br/> Sydney Castillo and Meghan Munagala
 Sydney Castillo and Meghan Munagala
This codebase consists of files used for the website known as Dub Dumps, created by Sydney Castillo and her teammates Amelia, Nic and Zach, for their final project for INFO 340. The software used for this is a React App.

<br/>

# Code Structure Analysis

## Figure 1: Dub Dumps Class Diagram
![img](images/DubDumps-UML-Class.png)
The image above is the class diagram for the "Dub Dumps" web app. The interfaces included in the class diagram are listed below:
- **App**: Renders the entire React web app, including how components are routed to.
- **Sign in Page**: Renders the web page where users can log into the web app.
- **Home Page**: Renders the map of bathrooms, as well as navigation to the "Find a Bathroom" page.
- **Find a Bathroom Page**: Renders the list of bathroom cards. Users can filter these cards by building, floor, and location (North, East, South, West Campus).
- **Bathroom Page**: Renders the page for a specific bathroom, which also allows users to rate the bathroom on a scale of 1-5 stars.

This class diagram aids in the understanding of the architecture of the Dub Dumps web app by showing the interfaces, and how they relate to each other. This class diagram is centered around the **App** component, which renders the React web app given its child components. There are several interfaces that inherit from app, including **SignIn** which is where users are able to log into the app using their email or Google account. Additionally, Dub Dumps also has the **HomePage** component, which is where users can view a map of all the bathrooms, as well as navigate to the "Find a Bathroom" page. This page is the **BathroomList** component, which renders the **StructuredSearch** bar, as well as the full list of bathroom cards. By clicking on a single bathroom card, users can navigate to the **BathroomPage** component where they'll be able to give a **StarRating** to a specific bathroom. By including this diagram, viewers of this report will be able to quickly get a sense of how the "Dub Dumps" code is architected.

## Figure 2: Star Rating Activity Diagram
![img](images/DubDumps-Activity-Diagram.png)
The image above is a sample activity diagram for leaving a star rating on a bathroom in the "Dub Dumps" web app. The process flow is as follows:
1. The user attempts to log into the system via the "Sign in" page.
2. The user's login credential are sent to the system's backend containing user login information. The user checks if the provided information is a valid login.
    1. If no, the user is sent back to the "Sign in" page.
3. If yes, all of the bathroom cards should appear in the "Find a Bathroom" page.
4. The user is now able to enter criteria that the bathroom cards should be filtered by.
5. Once the filters have been applied, the backend logic will determine which cards should appear in the frontend.
6. If the filter returns zero matching bathrooms, the user can choose whether they would like to apply new filters.
7. If the filter does return matching bathrooms, the user is shown this list of cards.
8. The user can then click a specific bathroom card, which will route them to that bathroom's specific page.
9. Here, they can leave a star rating, which will be saved in the user's database of ratings.

The core features of the "Dub Dumps" web app includes searching for a bathroom on campus given a set of filters, as well as rating a single bathroom for one's own reference. The activity diagram depicted above shows the core interactions between a user, the frontend, and the backend for when a user leaves a rating on a bathroom. This diagram is necessary to include in our final report because it allows readers to quickly understand one of the app's core features, thereby inferring what the app as a whole does.

# Architecture Assessment
The architectural element we decided to focus our efforts on was the "Find a Bathroom" page, which is broken up into two components: **StructuredSearch** and **BathroomList**.

## Figure 3: Non-Refactored Structured Search Logic
```
export function StructuredSearch(props) {
    const [bldgSelected, setBldg] = useState('');
    const [floorSelected, setFloor] = useState('');
    const [locationSelected, setLocation] = useState('');

    ...

    // Array of buildings
    let uniqueBuildings = new Set();
    for (let i = 0; i < props.data.length; i++) {
        uniqueBuildings.add(props.data[i].building)
    }
    uniqueBuildings = Array.from(uniqueBuildings);
    const buildings = uniqueBuildings.map((building) => {
        return <option key={building} value={building}>{building}</option>;
    })

    // Array of floors
    let uniqueFloors = new Set();
    for (let i = 0; i < props.data.length; i++) {
        uniqueFloors.add(props.data[i].floor)
    }
    uniqueFloors = Array.from(uniqueFloors);

    const floors = uniqueFloors.map((floor) => {
        return <option key={floor} value={floor}>{floor}</option>;
    })

    // Array of Locations
    let uniqueLocations = new Set();
    for (let i = 0; i < props.data.length; i++) {
        uniqueLocations.add(props.data[i].location)
    }
    uniqueLocations = Array.from(uniqueLocations);

    const locations = uniqueLocations.map((location) => {
        return <option key={location} value={location}>{location}</option>;
    })

    ...
}

export default StructuredSearch;
```
The codeblock above is the non-refactored code from the **StructuredSearch** component. This code is the logic that filters the bathroom cards.

- **Code Smells**: At a quick glance, there are two distinct code smells apparent in the code: duplicated code, and unnecessary loops.
    - Duplicated Code: In the codeblock above, it is quickly apparent that the following lines of code are repeated for each filter (building, floor, location) built into the StructuredSearch component. To refactor this, we turned all of the duplicated code into a function that can be called to populate the array of content for each filter.
    ```
    let uniqueBuildings = new Set();
    for (let i = 0; i < props.data.length; i++) {
        uniqueBuildings.add(props.data[i].building)
    }
    uniqueBuildings = Array.from(uniqueBuildings);
    const buildings = uniqueBuildings.map((building) => {
        return <option key={building} value={building}>{building}</option>;
    })
    ```
    - Loops: The second, less apparent, code smell we found was an unnecessary loop. In the original code, the `for` loop was being used to loop through `props.data`, adding every unique attribute (building, floor, or location) to the previously defined Set. We later refactored this to completely remove the loop, and instead use native JavaScript methods such as `.map()` and `.filter()`. The refactored code can be found in the **Refactoring the Code** portion of this report.

- **Documentation and Readability**: The lack of documentation and commented code makes understanding the strcuture of the code and how the components interact difficult. The following code component includes an example of code that lacks clarity and detail. In fact, there are two const variables that don't have defined names which make understanding what this function does difficult:
   ```
   function App(props) {
     const nullUser = { userId: null, userName: null };

     const [currentUser, setCurrentUser] = useState(nullUser);
     const [displayedData, setData] = useState(props.data);

     useEffect(() => {

       const auth = getAuth();

       onAuthStateChanged(auth, (firebaseUser) => {
         if (firebaseUser) { //is defined, so "logged in"
           firebaseUser.userId = firebaseUser.uid;
           setCurrentUser(firebaseUser);
         }
         else { //not defined, so logged out
           setCurrentUser(nullUser);
         }
       });
     })
  ```
    Overall, this code does not include enough with information regarding documentation or descriptions on how the code is structured or what the purpose of different sections are. There are a few inline comments that represent the difference between certain sections of code, such as when a user is logged in or logged out. However this is the only instance of documented code. Finding the connection between different components is difficult and requires manually searching through component files to determine the functionality and scope of each one. 

# Automated Tests

## Figure 4: Automated Test Coverage Report
![img](images/coverage.png)
The image above is the code coverage report we were able to achieve using the automated tests we wrote.

To run the tests for this repository, here are the steps after saving the repository locally:
1. On the command line, navigate to the repository folder.
2. Navigate to the "Dub-Dumps-main" folder.
3. Run "npm install". There may be warning messages that appear but they should not impact the ability to the run the tests.
4. Run "npm test".

In determining what aspects of Dub Dumps we wanted to test, we decided to test the **StructuredSearch** and **BathroomList** components. A majority of the logic found in the Dub Dumps web app is between these two components, so we used this as justification for what required the most testing. For clarification before we discuss the tests we wrote, it is important to understand each component's function.
- The **StructuredSearch** component is the search bar that allows users to filter the list of bathrooms by building, floor, and/or location.
- The **BathroomList** component contains the function that renders a single card, as well as the exported function that determines the list of cards that should be rendered given the data it intakes as props.

Below is a list of the automated tests we wrote to test these components.

### **StructuredSearch**
**describe('Filters have correct default value')**

We wrote this set of tests to make sure that whenever the componenet is rendered for the first time, there were no filters automatically being applied. If there were, this would impact what was rendered by the BathroomList component.

- Building filter has correct default value: tests to make sure that the first time the component is rendered, there is no building value automatically being filtered for.
- Floor filter has correct default value: tests to make sure that the first time the component is rendered, there is no floor value automatically being filtered for.
- Location filter has correct default value: tests to make sure that the first time the component is rendered, there is no location value automatically being filtered for.

**describe('Filter values can be changed')**
We wrote these tests to ensure that when a user changes the value of the filter in the frontend, this value change is communicated to the backend logic and therefore, behaves as intended.
- Building filter can be changed: tests to make sure that when a user selects something from the Building dropdown, the dropdown's value is changed to what was selected.
- Floor filter can be changed: tests to make sure that when a user selects something from the Floor dropdown, the dropdown's value is changed to what was selected.
- Location filter can be changed: tests to make sure that when a user selects something from the Location dropdown, the dropdown's value is changed to what was selected.

**describe('Filters work correctly')**

Similar to our justification for the previous set of tests, these tests serve to ensure that the filters behave as intended, and so users are shown accurate information.

- Button functions correctly: tests to make sure that when the "Search! button is clicked, the state for each filter is updated.
- Building filter works correctly: tests to make sure that when the Building dropdown is changed and "Search!" has been clicked, the cards in the BathroomList component are filtered accordingly.
- Floor filter works correctly: tests to make sure that when the Floor dropdown is changed and "Search!" has been clicked, the cards in the BathroomList component are filtered accordingly.
- Location filter works correctly: tests to make sure that when the Location dropdown is changed and "Search!" has been clicked, the cards in the BathroomList component are filtered accordingly.

### **BathroomList**
**describe('Unit: BathroomList')**

These various tests make sure that the bathroom cards are rendered as intended, including when no filters are applied, or when no bathrooms are found.

- No results message shows when there are no matching bathrooms: tests to make sure that when no bathrooms meet the user's search criteria, the user is shown the following message: No Bathrooms Found!
- When no filters are applied, show all bathrooms: tests to make sure that the entire Bathroom List is shown by default, meaning when no filters have been applied.
- Bathroom cards render correct image: tests to make sure that each bathroom card is rendered with its matching image.

# Refactoring the Code
As discussed previously, one of the major pieces of code that needed to be refactored was found in the **StructuredSearch** component. We previously discussed how the original code was inefficient due to the duplicated code and unnecessary loops. The solution we found was to create a function that used the native JavaScript `.map()` and `.filter()` methods, therefore achieving the same outcome in a more modifiable and readable format. 

## Figure 5: Refactored StructuredSearch Logic
```
export function StructuredSearch(props) {
    const [bldgSelected, setBldg] = useState('');
    const [floorSelected, setFloor] = useState('');
    const [locationSelected, setLocation] = useState('');

    ...
    
    // Returns an array of content for a specific filter
    function createFilterSet(contentType) {
        const uniqueContent = props.data;
            .map(item => item[contentType]);  // map to get an array of the specific content type
            .filter((value, index, self) => self.indexOf(value) === index);  // filter to remove duplicates

        return uniqueContent.map((contentType) => {
            return <option key={contentType} value={contentType}>{contentType}</option>;
        })
    }

    // Array of buildings
    const buildings = createFilterSet("building");

    // Array of floors
    const floors = createFilterSet("floor");

    // Array of locations
    const locations = createFilterSet("location");
    
    ...
}
export default StructuredSearch;
```
The codeblock above is the new, refactored **StructuredSearch** code that implements the solutions previously discussed.