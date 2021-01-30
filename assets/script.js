//Write HTML- Do we write the html for the weather API now, or do we use Javascript to write the HTML?

//Basic CSS

/*Javascript -
GIVEN a weather dashboard with form inputs
WHEN I search for a city
1.  Search form - event listener on submit button
2. Save to local Storage
THEN I am presented with current and future conditions for that city and that city is added to the search history
1. Fetch to get weather data from that city using OpenWeatherAPI
2. put the data from that fetch into my HTML using $(html element).text("TEXT")
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
1. Pull different places of information from the API
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
1. Color code the button to be different colors based on the weather conditions
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
1. 5 bootstrap cards that are made and display API information
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
1. When we pull localStorage we are going to create buttons or links that then search that city.
    Our links will run the same function that our initial search runs just with a different city name.*/
