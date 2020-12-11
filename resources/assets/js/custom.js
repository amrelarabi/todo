$(document).ready(function () {
    $('#todo_priority').on('input', function () {
        $(this).css('background', 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + this.value + '%, #fff ' + this.value + '%, white 100%)');
    });
    $('.todo-list li').each(function (){
        var priority = $(this).data('priority');
        $(this).css('background-color', 'rgba(37, 189, 170, '+(priority/100)+' )');
    })
});
