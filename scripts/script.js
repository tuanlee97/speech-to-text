 // Script cho chức năng Speech to Text
 function runSpeechRecognition() {
    var output = document.getElementById("output");
    var action = document.getElementById("action");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        action.innerHTML = "<small>đang lắng nghe, hãy nói...</small>";
    };

    recognition.onspeechend = function() {
        action.innerHTML = "<small>dừng lắng nghe, hy vọng bạn đã hoàn thành...</small>";
        recognition.stop();
    }

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        output.innerHTML = "<b>Văn Bản:</b> " + transcript + "<br/> <b>Độ Chính Xác:</b> " + confidence*100+"%";
    };

    recognition.start();
}

// Script cho chức năng kiểm tra ngữ pháp
function checkGrammar() {
        var inputText = document.getElementById('inputText').value;
        var apiUrl = 'https://languagetool.org/api/v2/check';

        // Gọi API kiểm tra ngữ pháp
        axios.post(apiUrl, {
            text: inputText,
            language: 'en-US' // Đặt ngôn ngữ kiểm tra (tiếng Anh Mỹ)
        })
        .then(function (response) {
            // Hiển thị kết quả
            var results = response.data.matches.map(function(match) {
                return match.message;
            });
            document.getElementById('output').innerHTML = "<h2>Grammar Check Result:</h2>" + results.join('<br>');
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
    }

// Script cho chức năng chuyển tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Mặc định mở tab Speech to Text khi tải trang
document.getElementById("defaultOpen")?.click();