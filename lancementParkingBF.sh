#!/bin/bash
cd /home/queval/Projects/VoituresApp/
subl parkingBF&
cd parkingBF
chromium-browser http://scrumblr.ca/ParkingBF&
cd Server
gnome-terminal -e "bash -c \"nodemon server.js; exec bash\""
cd ..
cd App
gnome-terminal -e "bash -c \"ionic serve; exec bash\""
pgadmin3&
