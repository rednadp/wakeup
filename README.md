# Wake up (TransitTime project)

Have you ever fallen asleep on public transport and lost your stop due to that? Don't let this happen again. With this stop alarm app you will be able to select your destination and it will wake you up some meters before arriving there!

## Adapt to your city

Thanks to the GTFS system it should be easily adaptable to any city even if it was originally designed for my local city (Vitoria, Spain).

- Clone the repository
- Replace the gtfs folder with the one of your city
- Run

   ```bash
   npm run update-gtfs
   ```

- Build the app

## How to build

- Install explo cli

   ```bash
   npm install -g eas-cli
   ```

- Login in expo

   ```
   eas login
   ```

- Build the proyect

   ```bash
   eas build --platform android --profile preview
   ```

## Characteristics

- Filter lines
- Use arrows to move between stops
- Select the stop you want to leave
- See the distance to the stop
- Receive a notification and play an alarm sound when you arrive to your stop!

## Used stack

I've used expo to build the app. Unfortunately, it is only available for Android as I have used google maps sdk. I don't have an iPhone so it's impossible for me to do a version for it (at least at this moment).

## Things I've learned

A little bit of context. I have coded nothing at all for 2 years now and I had never used react native nor expo before. So I have learned a lot of things almost from scratch mainly following the expo documentation and using Google and Gemini when errors appeared. I have really encountered several difficulties with the gtfs system. It has taken me a lot of time to be able to transform trips into lines as when I was doing that the stops' order became duplicated (I needed this order to be able to do the arrows system). Also, managing the map inside the app has been quite challenging. The shower stop in the map and in the app ui wasn't matching. Finally, I have remembered how to use React! (More or less :))

## To do

- Doing a better ui
- Making the radius to trigger the alarm configurable
- Adding a function to trigger the alarm some stops before the desired stop instead of putting in meters.

# Note for the reviewer

The built app is prepared for my city, so if you tried it, maybe you would have to fake the location. (Or maybe not if you only want to test the ui). If you wish to build the app for your city the steps are above (I haven't tried it, expect bugs).

I have tried to use the AI as less as possible. It has been used to troubleshoot and as a reference (like Stack Overflow or Expo documentation). I have read messages in slack about how you take IA usage seriously. I hope this is not a problem.

Finally, I can stop feeling a sense of impostor syndrome. I feel like anyone else could have made this silly project much faster and better than I did. I have like the sense that the quality requirements are high and that I have spent a lot of time doing this for what, in fact, it is. I would really feel sad if you reduced hours but if that is what you have to do due to the quality standards, do it. Anyways, thanks for making this possible!
