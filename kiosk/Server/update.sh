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

bash radar.sh
