window.onload = function() {

$( "#target" ).click(function() {
  var text = $('#textarea').val();
  //console.log(typeof text);
  $.post( "/users", {'message': text});

});

function refreshPosts () {
  $.getJSON("/posts", function (data) {
    var posts = data.posts;
    $("div").remove();
  posts.forEach(function(element, index, array){
    var type = "";

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    var name = '';
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  if(element.user == getCookie('user')){
    type = "me";
  } else {
    type = "you";
  }


    $div = $('<div>', {class: "bubble " + type,
                      id: element.user
                    }).text(element.user + '\: ');
    $span = $('<span>', { class: "tweet"}).text(element.message);

  //console.log(getCookie('user'));
  $span.appendTo($div);

  $div.appendTo('body');

  });

  });
}

window.setInterval(refreshPosts, 5000);
};
