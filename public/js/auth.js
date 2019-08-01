var user;
//파이어베이스 초기화 작업
var firebaseConfig = {
    apiKey: "AIzaSyDsvduIenyJmwsz0aVetCuzZUG93-B2KIk",
    authDomain: "triple-test.firebaseapp.com",
    databaseURL: "https://triple-test.firebaseio.com",
    projectId: "triple-test",
    storageBucket: "triple-test.appspot.com",
    messagingSenderId: "598089155288",
    appId: "1:598089155288:web:1e7571f0a0db4860"
};
firebase.initializeApp(firebaseConfig);


function login() {
    firebase.auth().signInWithEmailAndPassword($('.txtemail').val(), $('.txtpassword').val()).then(function (result) {
    }).catch(function (error) {
        var errorCode = error.code;
        alert(errorCode)
    });
}

function logout() {
    firebase.auth().signOut().then(function () {

    }, function (error) {

    });
}

function googlelogin() {
    var user = firebase.auth().currentUser;
    if (user) {
        //
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/plus.login");
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log("connected");
        }).catch(function (error) {
            console.log('error', error);
        });
    }
}

function facebooklogin() {
    var user = firebase.auth().currentUser;
    if (user) {
        //
    } else {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log('facebook connected');
        }).catch(function (error) {
            console.log(error);
        });
    }
}

function signUp() {
    firebase.auth().createUserWithEmailAndPassword($('.txtemail').val(), $('.txtpassword').val()).then(function (user) {

    }).catch(function (error) {
        alert(error.message)
    });
}


$(function () {
    //비동기 콜백 함수
    firebase.auth().onAuthStateChanged(function (user) {
        var cu = window.location.href;
        var n1 = cu.indexOf('auth/login');
        if (user) {
            if (n1 > 1) {
                window.open('../../', '_self', false);   //메인으로 이동
            } else {
                $('#iblemail').text(user.email);
            }

        } else {
            if (n1 < 1) {
                window.open('./auth/login/', '_self', false);
            }
        }

    });

    $('.js-login').on('click', function () {
        login();
    });
    $('.js-LOGOUT').on('click', function () {
        logout();
    });

    $('.js-sigup').on('click', function () {
        signUp();
    });
    $('.js-fa').on('click', function () {
        facebooklogin();
    });

    $('.js-go').on('click', function () {
        googlelogin();
    });
});

