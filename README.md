This site is a partial clone of a commercial movie streaming site easterneuropeanmovies.com. I've made it as a student portfolio project.
- Technologies used: React, Redux, SASS
- External APIs used: Google Firebase/Firestore
- Responsive design implemented on each page. Separate navigation/search menu for mobile mode
- A complex Sort and Filter widget stores all its state data in Redux
- Fully functional search bar (matches movies where title contains all words from the query)
- Movie data is hosted on Google Firebase. Each movie page view updates the viewcount in the database
- Decorative elements on all pages move in response to mouse cursor movement, which is tracked using a custom hook