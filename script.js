const tracks = [
    "Helloooo",
    "The Sky Has More Than One Color",
    "Borrow My Eyes",
    "After The Rain",
    "Hold My Earrings",
    "Get Out Of Your Head",
    "Distance Is Weird",
    "Certified Delulu",
    "The Onion",
    "Award",
    "HBD, Bear",
    "See You At 70",
    "Still On Our List",
    "User Manual",
    "Byeeee",
    "Hidden Track"
];

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const trackTitle = document.getElementById("trackTitle");
const playlist = document.getElementById("playlist");
const welcome = document.getElementById("welcome");
const player = document.getElementById("player");
const enterBtn = document.getElementById("enterBtn");

let currentTrack = 0;
let playing = false;

function loadTrack(index){

    audio.src = `audio/${String(index + 1).padStart(2,'0')}.mp3`;

    trackTitle.innerHTML = `
<div style="font-size:13px;color:#888;letter-spacing:2px;margin-bottom:8px;">
NOW PLAYING
</div>

${tracks[index]}
`;

    document.querySelectorAll(".track").forEach(t=>t.classList.remove("active"));

    document.getElementById("track"+index).classList.add("active");
}

tracks.forEach((track,index)=>{

    const div=document.createElement("div");

    div.className="track";

    div.id="track"+index;

    div.innerHTML = `
<div class="track-row">

    <span class="track-number">
        ${String(index + 1).padStart(2,"0")}
    </span>

    <span class="track-name">
        ${track}
    </span>

</div>
`;

    div.onclick=()=>{

        currentTrack=index;

        loadTrack(currentTrack);

        audio.play();

        playBtn.innerHTML="⏸";

        playing=true;

    };

    playlist.appendChild(div);

});

enterBtn.onclick=()=>{

    welcome.classList.add("hidden");

    player.classList.remove("hidden");

    loadTrack(currentTrack);

    audio.play();

    playBtn.innerHTML="⏸";

    playing=true;

};

playBtn.onclick=()=>{

    if(playing){

        audio.pause();

        playBtn.innerHTML="▶";

    }else{

        audio.play();

        playBtn.innerHTML="⏸";

    }

    playing=!playing;

};

nextBtn.onclick=()=>{

    currentTrack++;

    if(currentTrack>=tracks.length){

        currentTrack=0;

    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.innerHTML="⏸";

    playing=true;

};

prevBtn.onclick=()=>{

    currentTrack--;

    if(currentTrack<0){

        currentTrack=tracks.length-1;

    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.innerHTML="⏸";

    playing=true;

};

audio.addEventListener("ended",()=>{

    currentTrack++;

    if(currentTrack<tracks.length){

        loadTrack(currentTrack);

        audio.play();

    }else{

        playBtn.innerHTML="▶";

        playing=false;

    }

});

audio.addEventListener("timeupdate",()=>{

    progress.value=(audio.currentTime/audio.duration)*100||0;

    currentTime.textContent=format(audio.currentTime);

    duration.textContent=format(audio.duration);

});

progress.addEventListener("input",()=>{

    audio.currentTime=(progress.value/100)*audio.duration;

});

function format(time){

    if(isNaN(time)) return "0:00";

    let min=Math.floor(time/60);

    let sec=Math.floor(time%60);

    if(sec<10) sec="0"+sec;

    return `${min}:${sec}`;

}
