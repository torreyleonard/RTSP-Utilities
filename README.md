# RTSP-Utilities
Create timelapses, stream to YouTube, and add a live-weather overlay to RTSP streams.

## Installation
  1. Download the contents of this repo to a Linux server. (Tested on Ubuntu 16.04)
  
  2. Run the following to download and install dependencies: `sudo apt-get install -y ffmpeg vlc npm screen`
    - This may vary depending on your OS, so if it fails, try Googling how to install these packages:
      - FFMPEG
      - VLC
      - Node.JS
      - Screen
  3. In your config.txt, paste the URL to your RTSP stream. If you plan on streaming to YouTube Live, paste in your stream key. The "conditions file" will be in whichever directory you run the conditions.js script.
  
  4. Make a new directory for your timelapses. Within that directory, make a "raw" folder and an "output" folder. Put the path to your raw folder in your config.txt. All images captures for timelapses will be put in there. Do the same with the output folder, as that is where all finished timelapses will go.
  
  5. Make sure you've configured your timezone settings: `sudo dpkg-reconfigure tzdata`
  
  6. Type `crontab -e` to open up the crontab menu. Use the following configuration:
  
    ```
    * * * * * sh /path/to/timelapse-capture.sh
    55 23 * * * sh /path/to/timelapse-compile.sh

    @reboot screen -S conditions node /path/to/conditions.js
    ```
    
    This will run the "capture" script every minute, which takes a snapshot of your stream every 15 seconds. Every day at 11:55 PM, it will compile all of those images into a timelapse. Every time your server reboots, it will restart the conditions script with it.
    
   7. Using a normal text editor, open conditions.js and paste in your Weather Underground station ID and API key. Get an API key [here.](https://www.wunderground.com/weather/api/) Don't worry, this script runs every 5 minutes (configurable) so it won't exceed their free API plan.
   
   8. Try running the conditions.js script. Type `node conditions.js` and, if it works, quit the script with ctrl+C. Now, run `screen -S conditions node /path/to/conditions.js` so that the script can run seperatley from your terminal window.
