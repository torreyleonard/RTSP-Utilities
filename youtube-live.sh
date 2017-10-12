source config.txt
while true;
do ffmpeg -rtsp_transport tcp -i $RTSP-STREAM -vf drawtext="textfile=$CONDITIONSFILE:fontfile=OpenSans.ttf:box=1:x=w-tw-10:y=h-th-10:fontsize=24:boxborderw=5:boxcolor=black@0.7:fontcolor=white:reload=1" -tune zerolatency -vcodec libx264 -t 12:00:00 -pix_fmt + -strict experimental -f flv -acodec libmp3lame -ar 44100 rtmp://a.rtmp.youtube.com/live2/$YOUTUBE-KEY;
done
