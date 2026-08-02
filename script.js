// ==========================
// Echo Chambers Player
// ==========================

const tracks = [
    {
        title: "Helloooo",
        file: "01.mp3"
    },
    {
        title: "The Sky Has More Than One Color",
        file: "02.mp3"
    },
    {
        title: "Borrow My Eyes",
        file: "03.mp3"
    },
    {
        title: "After The Rain",
        file: "04.mp3"
    },
    {
        title: "Hold My Earrings",
        file: "05.mp3"
    },
    {
        title: "Get Out Of Your Head",
        file: "06.mp3"
    },
    {
        title: "Distance Is Weird",
        file: "07.mp3"
    },
    {
        title: "Certified Delulu",
        file: "08.mp3"
    },
    {
        title: "The Onion",
        file: "09.mp3"
    },
    {
        title: "Award",
        file: "10.mp3"
    },
    {
        title: "HBD, Bear",
        file: "11.mp3"
    },
    {
        title: "See You At 70",
        file: "12.mp3"
    },
    {
        title: "Still On Our List",
        file: "13.mp3"
    },
    {
        title: "User Manual",
        file: "14.mp3"
    },
    {
        title: "Byeeee",
        file: "15.mp3"
    },
    {
        title: "Hidden Track",
        file: "16.mp3"
    }
];

const welcome = document.getElementById("welcome");
const player = document.getElementById("player");
const endingScreen = document.getElementById("endingScreen");

const enterBtn = document.getElementById("enterBtn");

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const trackTitle = document.getElementById("trackTitle");

const playlist = document.getElementById("playlist");

let currentTrack = 0;

let playing = false;

function formatTime(seconds){

    if(isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return String(mins).padStart(2,"0") + ":" + String(secs).padStart(2,"0");

}

function loadTrack(index){

    audio.src = "audio/" + tracks[index].file;

    trackTitle.innerHTML = `
    <div style="font-size:12px;letter-spacing:2px;color:#999;margin-bottom:8px;">
    NOW PLAYING
    </div>

    ${tracks[index].title}
    `;

    document.querySelectorAll(".track").forEach(track=>{

        track.classList.remove("active");

    });

    const active = document.getElementById("track"+index);

    if(active){

        active.classList.add("active");

    }

}

tracks.forEach((track,index)=>{

    if(index===15) return;

    const div = document.createElement("div");

    div.className="track";

    div.id="track"+index;

    div.innerHTML=`

    <div class="track-row">

        <span class="track-number">

            ${String(index+1).padStart(2,"0")}

        </span>

        <span class="track-name">

            ${track.title}

        </span>

    </div>

    `;

    div.onclick=()=>{

        currentTrack=index;

        loadTrack(currentTrack);

        audio.play();

        playBtn.textContent="⏸";

        playing=true;

    };

    playlist.appendChild(div);

});
enterBtn.onclick = () => {

    welcome.classList.add("hidden");

    player.classList.remove("hidden");

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent = "⏸";

    playing = true;

};

playBtn.onclick = () => {

    if(playing){

        audio.pause();

        playBtn.textContent = "▶";

    }else{

        audio.play();

        playBtn.textContent = "⏸";

    }

    playing = !playing;

};

nextBtn.onclick = () => {

    currentTrack++;

    if(currentTrack >= tracks.length){

        currentTrack = 0;

    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent = "⏸";

    playing = true;

};

prevBtn.onclick = () => {

    currentTrack--;

    if(currentTrack < 0){

        currentTrack = tracks.length - 1;

    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent = "⏸";

    playing = true;

};

audio.addEventListener("loadedmetadata",()=>{

    duration.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

    currentTime.textContent = formatTime(audio.currentTime);

    duration.textContent = formatTime(audio.duration);

    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

});

progress.addEventListener("input",()=>{

    audio.currentTime = (progress.value / 100) * audio.duration;

});
audio.addEventListener("ended", () => {

    // Special ending after Track 15
    if(currentTrack === 14){

        player.classList.add("hidden");

        endingScreen.classList.remove("hidden");

        setTimeout(() => {

            endingScreen.classList.add("hidden");

            player.classList.remove("hidden");

            currentTrack = 15;

            loadTrack(currentTrack);

            audio.play();

            playBtn.textContent = "⏸";

            playing = true;

        }, 4000);

        return;

    }

    currentTrack++;

    if(currentTrack < tracks.length){

        loadTrack(currentTrack);

        audio.play();

        playBtn.textContent = "⏸";

        playing = true;

    }else{

        playBtn.textContent = "▶";

        playing = false;

    }

});

// Highlight current track when a song starts
audio.addEventListener("play", () => {

    document.querySelectorAll(".track").forEach(track => {

        track.classList.remove("active");

    });

    const active = document.getElementById("track" + currentTrack);

    if(active){

        active.classList.add("active");

    }

});

// Reset play button when paused
audio.addEventListener("pause", () => {

    if(audio.ended) return;

    playBtn.textContent = "▶";

    playing = false;

});

// Update play button when resumed
audio.addEventListener("playing", () => {

    playBtn.textContent = "⏸";

    playing = true;

});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {

    if(e.code === "Space"){

        e.preventDefault();

        playBtn.click();

    }

    if(e.code === "ArrowRight"){

        nextBtn.click();

    }

    if(e.code === "ArrowLeft"){

        prevBtn.click();

    }

});

// Initialize first track
loadTrack(currentTrack);

currentTime.textContent = "00:00";

duration.textContent = "00:00";

progress.value = 0;
