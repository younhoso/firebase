function newpost(){
    var user = firebase.auth().currentUser; //유저 정보 (섹션)을 채크한다.
    if(user) {

        var d = new Date();
        var newPostKey = firebase.database().ref().child("/").push().key;

        firebase.database().ref("/" + newPostKey)
            .set({
                uid: user.uid,
                createdAt: d.getTime(),
                reverseCreatedAt: -d.getTime(),
                contents: $('#inputEmail').val()
            })
            .then(function(result){
                alert("Success");
            })
    }
}

function loadpost(){
    var user = firebase.auth().currentUser; //유저 정보 (섹션)을 채크한다.
    if(user) {
        var ref = firebase.database().ref("/")  //database 에 index.html를 가져오고
        ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once('value',function(data){   // equalTo(user.uid) 유저 아이디를 가져온다. 마지막인것 하나를 한번만 데이터를 가져와 
            data.forEach(function(sdata){
                $('#inputEmail').val(sdata.val().contents);
                $("#inputEmail").attr('key', sdata.key);
            });
        });
    }
}
// firebase의 update는 key가 앖다래도  udata 필드들을 만들고 넣기로 되어 있다. 
var update = function(){
    var user = firebase.auth().currentUser; //유저 정보 (섹션)을 채크한다.
    if(user){
        var _key = $('#inputEmail').attr('key');
        var ref = firebase.database().ref('/'+_key+'/');
        console.log(ref);
        var udata = {
            contents: $('#inputEmail').val(),
            newvalue: ''
        }

        ref.update(udata);
    }
};

var Delete = function(){
    var user = firebase.auth().currentUser;
    if(user) {
        var _key = $('#inputEmail').attr('key');
        var ref = firebase.database().ref("/"+_key+"/");  //database 에 index.html를 가져오고

    ref.remove()
        .then(function() {
            alert('Success')
        })
        .catch(function(error){
            console.log(error.message);
        });
    }
};


$(function(){
    $('.js-loadpost').on('click', function(){
        loadpost();
    });

    $('.js-update').on('click', update);
    $('.js-delete').on('click', Delete);
});