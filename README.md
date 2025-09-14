# RoadQuest

## Inspiration
As kids, we always had fun playing video games, leveling up, and completing different challenges. However, as we get older, we tend to get more busy with our lives, so when we heard of the topic of road trips, we immediately thought of it as an escape of adulthood for a short period of time. We thought that this would be a great opportunity to find a way to be kids again completing interesting quests, so this prompted us to think about video games again. We connected both of the ideas with each other, and RoadQuest was born.

## What it does
Our Website allows users to create accounts, login, and randomly generate road quests based on the starting and ending locations they input. For example, if a group of friends are taking a road trip from Boston to Orlando, our website will generate fun quests to do using mapping data and AI. These quests might prompt travelers to explore hidden gems such as Alum Spring Park, VA, discovering its secret waterfall by following its nature trail. Once the task is completed, users can check off the quest, thus receiving XP points and climbing the global leaderboard.

## How we built it
To build this website, we used React JS for the frontend with the Tailwind CSS framework along with Flask and Mongo DB for the backend creating routes connecting both the Google Maps API and OpenAI API to the front end.

## Challenges we ran into
One of our issues deals with the implementation of the Google Maps API. While we tried to read the documentation for it online, it was difficult to incorporate as it was deprecated a year and a half ago, and most tutorials using it referred to its past version. On a similar note, the OpenAl API was recently updated and it was difficult to find resources for it. Another one of our issues involved the number of members on our team as one was sick and another had other commitments to tend to. Overall we learned a lot of new technologies so there was some learning curves that came with our project.

## Accomplishments that we're proud of
We are proud that we were able to filter all the information given by the the Google APl to grab specific landmarks based on the given route's start and end location for the OpenAl API to use and generate random and specific quests for each landmark. Our method for fetching landmarks was also something we were proud about. We drew a route between the 2 locations, picked points between them, and found landmarks within a radius. We then used prompt engineering to make quests out of these. Additionally, we were new to TailwindCSS so even though it was quicker, we spent more time overall debugging stylistic issues.

## What we learned
We learning how to utilize the OpenAI API, GoogleMaps API, Tailwind CSS, React, and Flask in a collaborative way, so we feel more prepared to develop full stack websites later on in our programming journey.

## What's next for RoadQuest
We would like to integrate a more interactive map where users can see the route and markers along the way of the landmarks so they can get a better geographical understanding of where their quests are located. We'd also like to add verification procedures in order to get XP such as AI picture recognition software that can verify where a user as been to a specific place.
