The task is to create a web application that uses the public "Rick and Morty" API to display a list of characters in the form of tiles. The application will allow the user to filter characters by name, life status (alive/dead/unknown), as well as viewing the results using pagination. The aim of this task is to develop the ability to work with external APIs.

API link: https://rickandmortyapi.com

The task includes the following guidelines:
For each character, prepare an appropriate tile that will contain the graphic, name, status and species of the character.
A pagination mechanism should be added that will allow the user to browse through the list of characters. The user will be able to navigate to the next and previous results page using buttons. Pagination should be under the character tiles.
The app should include a search box that allows users to filter characters by name. The search should be dynamic, meaning that the display results will update as you type text. Each change in the search engine should result in sending a new query to the database and returning only the data that meets specific criteria.
Add three radio buttons that will allow you to filter characters by their status. By default, the status filter will be set to "alive". Switching between different statuses should only display characters that have a specific status.
All data should be retrieved from the backend and displayed directly. We do not process any data on the front end, we only download it from the API and present it to the user.
If the results do not meet the search criteria, the message "No characters found matching the search criteria" should be displayed.
