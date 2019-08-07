# Wave-app
A simple tide forecast app built with React Native. 

This app was created to enter into the [Masergy](https://www.masergy.com/stem-scholarship/) STEM scholarship oppurtunity for the Spring of 2019. I wanted to create a stylish and useful tide forecast app that implemented tasteful UI components and showcased the hard work I achieved.

# Development Stack
- I used [Visual Studio Code](https://code.visualstudio.com/) on OSX to create this app
- [Expo](https://expo.io/) was  was used to create, run, and test for development
- Currently only tested on an IOS device

# API's
- Tidal forecast data is retrieved without a key from the [National Oceanic and Atmospheric Administration | U.S. Department of Commerce](https://tidesandcurrents.noaa.gov/tide_predictions.html)
- Breakdown of their API data usage can be found [here](https://tidesandcurrents.noaa.gov/api/#units)
- No API key is needed to run this app

# HomePage TODO
- [ ] Scrollclock with selection changing waveView to that time (height value should change)
- [x] Current Height
- [x] Location name
- [x] Current Hi/Lo tide
- [ ] temp (relocate?)
- [ ] Countdown to next hi/lo time above details bar button
- [ ] Moon version on top right? look into api?
- [ ] Forecast of the hi/lo for the week? add a calender or date picker to top of modal? 

# Current Progress
- [x] App Skeleton
- [x] Implement react navigation 
- [x] Complete Login Screen Styling
- [x] Call Forecast API for data
- [x] Implement a working flatlist 
- [ ] Finish Wave Screen 
- [ ] Add React Redux, implement store
- [ ] Create usage demos for GitHub

# Clone & Install
- CLone this repo `git clone git@github.com:emksulliv/wave-app.git`
- cd `wave-app`
- run `npm install`

#Feedback
Feedback is always welcome. Feel free to contact me, I would love to know if you notice something that can be done better. Please be nice, this is my first React Native app.
