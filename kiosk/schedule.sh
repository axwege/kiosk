#this document needs to be set up to run on boot!

google-chrome --kiosk localhost/Client/main.html
sleep 10
watch -n 600 server/radar.sh
