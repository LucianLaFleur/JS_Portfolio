# JS_Portfolio
A webpage and several projects in Javascript, html, and CSS, with some use of Vue

Functionalities, followed by lessons learned are included for each project, like a report, below

Arcade games in the "gameon" file:
****  "gameon" Folder Notes ************
  *multiQuiz is still a WIP, but it's basic functions work as a static flashcard game
  * In the future, I'd like to make an ANKI program clone using this structure.
  The snake game versions are finished
  
********** IDW Snake Game ************
Made two versions: one like a traditional snake game with only 1 food spawning at a time,
And a second with 3 food items spawning at once (Multi-Spawn Snake).

Based on the youtube channel “Code Explained” and their “Code the snake game”. 
Major differences: 
1) Significant visual changes to snake, food, and layout
	-several different food items added (attached to score 	
	Values and a customized spawn-rate for each tier of food)
	- Simple running animation added to the “dummy train” 
	With multiple frames for various positions.
	- Thematic changes to visual elements
2) Dynamic audio files 
	- Eating, getting a combo, or a rare item triggers special 
	audio clips 
	- “common” audio like dying or eating a low-tier food piece 
	given multiple sounds randomly generated from an array
	-Chorus audio triggers after accumulating 10+ length)
	-Victory condition audio-clips are timed with the victory 
	Pictures.
3) Victory/defeat screens (with picture and DOM elements changing 		for victory screen to show the winning/losing image).
	- End message listens for score and items-eaten to report 
	on player’s performance
4) Character can “miss” picking up an item:
	-randomly generated rate of “missing” items
	-triggers a confused voice-clip to let the player know it 
	was intentional
	- a “missed” item will re-roll the item value (but not if 
	it’s the top-tier item, making an exception to be nice to
	the player).
5) Custom layout
	- Show/hide a chart of item values
	- Reset button and a nav button linking back to
	the portfolio homepage. 
*6) Loot bag 
	-score counter shows number of items consumed and a visual 		for which object was eaten
	- has a placeholder image if all spaces in loot bag are 		filled up
*UNKNOWN ERROR ENCOUNTERED IN MULTIPLE VERSION: The array containing the history of items (consumedFood) couldn’t produce the images dynamically, so a dummy image is the placeholder in the multiple-spawn version. 

Misc:
Vectors, sprites, and Audio clips sourced from “Girls Frontline” by MicaTeam, published by Digital Sky.
Misc sounds are pitch-shifted and clipped to avoid copyright strikes.
