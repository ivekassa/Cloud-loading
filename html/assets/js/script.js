const audio = document.getElementById('song');
let paused = true
let songs = Config.audios;
let currentIndex = 0;
let vol = Config.settings.volume
let Loaded = false

$(document).ready(function() {
    $("#discord span:nth-child(1)").text(Config.links.discord);
    $("#tebex span:nth-child(1)").text(Config.links.tebex);
    $("#teamspeak span:nth-child(1)").text(Config.links.teamspeak);
    let color = `linear-gradient(90deg, #1595eb ${vol * 100}%, #1595eb5d ${vol * 100}%)`;
    $('input[type=range]').css('background', color);	
});

$(Config.staff).each(function(key, val) {
    $(".overflow_team").append(`
        <div class="pannel">
            <div class="min_bx_pn">
                <img src="assets/images/Rectangle21.png" alt="">
            </div>
            <div class="row">
                <span>${val.role}</span>
                <span>${val.name}</span>
            </div>
        </div>
    `)
});

window.addEventListener('message', function(e) {
    (GetLoadingPercentage[e.data.eventName] || function() {})(e.data);
    if (!Loaded) {
        $(audio).attr('src', "assets/songs/" + songs[currentIndex].file);
        $("#name").text(songs[currentIndex].title)
        audio.volume = vol
        Loaded = true
        paused = false
        audio.play();
    }
});

const GetLoadingPercentage = {
    loadProgress(data) {
        let percent = parseInt(data.loadFraction * 100)
        $(".value_bar-text").text(`${percent}%`);
        $('.value_bar').css("width", percent + "%");
    }
};


$("#discord").click(function() {
    CopyLink(Config.links.discord)
})

$("#tebex").click(function() {
    CopyLink(Config.links.tebex)
})

$("#teamspeak").click(function() {
    CopyLink(Config.links.teamspeak)
})

$("#play").click(function() {
    audio.volume = vol
    if (paused) {
        audio.play();
        paused = false
    } else {
        audio.pause();
        paused = true
    }
})

$("#skip").click(function() {
    audio.volume = vol
    if (currentIndex < songs.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    audio.pause();
    $(audio).attr('src', "assets/songs/" + songs[currentIndex].file);
    $("#name").text(songs[currentIndex].title)
    if (! paused) {
        audio.play();
    }
})

$("#previous").click(function() {
    audio.volume = vol
    if (currentIndex > 0) {
    currentIndex--;
    } else {
    currentIndex = songs.length - 1;
    }

    audio.pause();
    $(audio).attr('src', "assets/songs/" + songs[currentIndex].file);
    $("#name").text(songs[currentIndex].title)
    if (! paused) {
        audio.play();
    }
})

$('input[type=range]').on('input keyup', function(e) {
    let max = this.max;
    let xy = this.value;
    let percent = xy / max;
    let color = `linear-gradient(90deg, #1595eb ${percent * 100}%, #1595eb5d ${percent * 100}%)`;
    this.style.background = color;	    
    if (audio && typeof audio.volume === 'number') {
        audio.volume = percent;
        vol = percent
    }
});

function CopyLink(text) {
    var TempText = document.createElement("input");
    TempText.value = text;
    document.body.appendChild(TempText);
    TempText.select();
    document.execCommand("copy");
    document.body.removeChild(TempText);
}
