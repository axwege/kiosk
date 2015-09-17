while true
do
radar()&
data()&
sleep 120
done


function radar(){

#get page/url source and parse radar link:
name=$(http get "http://mesonet.agron.iastate.edu/GIS/apps/rview/warnings.phtml?autopilot=0&osite=DLH&tzoff=0&lat0=45.621666666666&lon0=-95.600625&layers%5B%5D=nexrad&layers%5B%5D=warnings&layers%5B%5D=cwas&layers%5B%5D=uscounties&layers%5B%5D=interstates&layers%5B%5D=watches&layers%5B%5D=blank&site=DLH&tz=CDT&year=2015&month=5&day=3&hour=16&minute=0&warngeo=both&zoom=500&imgsize=800x600&loop=1&frames=24&interval=5&filter=1&cu=0&sortcol=fcster&sortdir=0&lsrlook=%2B&lsrwindow=5" | grep -o "anim_gif\.php?fts=[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]")

#get radar image:

wget -O publicData/radar.gif http://mesonet.agron.iastate.edu/GIS/apps/rview/$name

#Change Framerate:
gifsicle -b publicData/radar.gif -d40 "#1-"

#Extra Notes:
#gif link:
#http://mesonet.agron.iastate.edu/GIS/apps/rview/anim_gif.php?fts=
#</div></form><a href="anim_gif.php?fts=1430686859">Download as Animated Gif</a><br /><form name="jsani" id="jsani" action="#" style="width: 800px; height: 600px;">
#grep -e "anim_gif\.php?fts=[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"

}


function data(){
wget -O conditions.json http://api.wunderground.com/api/2062cf09449e02a3/conditions/q/MN/Albany.json
wget -O forecast.json http://api.wunderground.com/api/2062cf09449e02a3/forecast/q/MN/Albany.json
wget -O alerts.json http://api.wunderground.com/api/2062cf09449e02a3/alerts/q/MN/Albany.json

wget -O publicData/icon.gif $(cat conditions.json | jq '.current_observation'.'icon_url' | tr -d '"')

array=("conditions" "forecast" "alerts")
for i in "${array[@]}";
do
echo "jsonCallback(" > publicData/"$i"1.json
cat "$i".json >> publicData/"$i"1.json
echo ");" >> publicData/"$i"1.json
done
}