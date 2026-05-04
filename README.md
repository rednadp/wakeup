# Wake up (TransitTime project)

Have you ever fallen asleep on public transport and lost your stop due to that? Don't let this happen again. With this stop alarm app you will be able to select your destination and it will wake you up some meters before arriving there!

# New version

## Thing added

- A new method to add cities inside the app
  - It will connect to the TransitLand api to download a zip of the gtfs
  - It will unzip it
  - It will use the script to import the gtfs in a way the app can understand
  - It will be saved to use it more times
- The old method to import an app has been adapted to use it with the new system
- A function to select which city to use has been added
- A search bar to search cities with the api has been added (On some cities you need to search the city name, on others the company name that gives the service)
- Changed the icon and splash screen

## Limitations

Please, be aware that when using the new method some limitations out of my control apply. Android has a ram limit that can use apps. In cities such as New York, that limit can be reached. Please, for big cities use the old system. (New york is already added to the app :))
Other cities seem to throw a 404 error when downloading. I haven't got time to investigate this but it probably is a problem from the api.
Some other cities seem to import badly (the arrows don't work). This is still to be investigated but probably they are using gtfs in a way that was unexpected when I  originally made the app for my local city (vitoria, spain).

## Things learned

I've remenbeder how to use an api, I have learned to use the FileSystem of expo (which I like how it works :)) and what is a provider and an interface.

# Old readme

## Adapt to your city

Thanks to the GTFS system it should be easily adaptable to any city even if it was originally designed for my local city (Vitoria, Spain).

- Clone the repository
- Replace the gtfs folder with the one of your city
- Run

   ```bash
   npm run update-gtfs
   ```

- Build the app

Or just use the in-app feauture!

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
- Search new cities (new!)
- Download and import them inside the app (new!)
- Change from multiple saved cities (new!)

## Used stack

I've used expo to build the app. Unfortunately, it is only available for Android as I have used google maps sdk. I don't have an iPhone so it's impossible for me to do a version for it (at least at this moment).

## Things I've learned

A little bit of context. I have coded nothing at all for 2 years now and I had never used react native nor expo before. So I have learned a lot of things almost from scratch mainly following the expo documentation and using Google and Gemini when errors appeared. I have really encountered several difficulties with the gtfs system. It has taken me a lot of time to be able to transform trips into lines as when I was doing that the stops' order became duplicated (I needed this order to be able to do the arrows system). Also, managing the map inside the app has been quite challenging. The shower stop in the map and in the app ui wasn't matching. Finally, I have remembered how to use React! (More or less :))

## To do

- Doing a better ui
- Making the radius to trigger the alarm configurable
- Adding a function to trigger the alarm some stops before the desired stop instead of putting in meters.

# Note for the reviewer

The built app was prepared for my city, so I assure that it will work perfectly with it. With small cities it also should work perfectly fine and with big cities if it is imported with the computer also. If you wish to build the app for your city the steps are above (Expect bugs).

I have tried to use the AI as less as possible. It has been used to troubleshoot and as a reference (like Stack Overflow or Expo documentation), specially for making the provider (I had no idea at all of what was that). I hope this is not a problem.

# Photos

![Screenshot_20260317_002317_wakeup](https://github.com/user-attachments/assets/007ddd27-2b8b-4069-b142-5de34b28a3fe)
![Screenshot_20260317_002329_wakeup](https://github.com/user-attachments/assets/3db1e2fd-f285-4756-b49e-8a8ddbc1a86f)
![Screenshot_20260317_002336_wakeup](https://github.com/user-attachments/assets/e3afa05c-de80-41c6-842b-ed842b808d6e)
![Screenshot_20260317_002343_wakeup](https://github.com/user-attachments/assets/93879a37-2021-435a-b03b-61a660703149)
<img width="1080" height="2340" alt="Screenshot_20260502_002447_Wake up" src="https://github.com/user-attachments/assets/d2acc280-8556-44c8-b4cf-0fe06ea9adf7" />
<img width="1080" height="2340" alt="Screenshot_20260502_002433_Wake up" src="https://github.com/user-attachments/assets/19d6816d-ed36-4bfb-891f-7366f98b3c5a" />


