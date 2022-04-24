
// Ref of jQuery
var divUsuarios = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

// Functions to render users
function renderUsers(persons) {
    console.log(persons);

    let html = '';
    html += '<li>';
    html += ' <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('room') + ' </span></a> ';
    html += '</li>';

    for (let i = 0; i < persons.length; i++) {
        html += '<li>';
        html += '<a data-id="' + persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}

function renderMessage(message, me) {

    let html = '';
    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    let adminClass = 'info';

    if (message.name === 'Administrator') {
        adminClass = 'danger';
    }

    if (me){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ message.name +'</h5>';
        html += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user"/></div>';
        html += '    <div class="chat-time">'+ hour +'</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';

        if (message.name !== 'Administrator') {
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+ message.name +'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+ hour +'</div>';
        html += '</li>';
    }


    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on( 'click','a', function(){
    let id = $(this).data('id');
    if(id) {
        console.log(id)
    }
})

sendForm.on('submit', function (e) {
    e.preventDefault();

    if (txtMessage.val().trim().length === 0){
        return;
    }

    socket.emit('createMessage', {
    name: user.name,
    message: txtMessage.val()
}, function(message) {
    txtMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom()
});
})
