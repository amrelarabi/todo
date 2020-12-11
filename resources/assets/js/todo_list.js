(function($) {
    'use strict';
    $(function(){
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).hide();
            $(this).closest("." + $(this).attr("data-hide")).removeClass('alert-success');
            $(this).closest("." + $(this).attr("data-hide")).removeClass('alert-warning');
            $(this).closest("." + $(this).attr("data-hide")).removeClass('alert-danger');
        });
    });
    $(function() {
        $('#alert_ajax').hide();
        var todoListItem = $('.todo-list');
        var todoInput = $('#todo_title');
        var todoPriority = $('#todo_priority ');
        $('#add_todo').on("click", function(event) {
            event.preventDefault();
            var item = todoInput.val();
            if (item) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                jQuery.ajax({
                    url: "/todo",
                    method: 'post',
                    data: {
                        title: todoInput.val(),
                        priority :todoPriority.val(),
                    },
                    success: function(result){
                        todoInput.val('');
                        $('#alert_ajax').addClass('alert-'+result.type);
                        $('#alert_ajax .msg').text(result.msg);
                        $('#alert_ajax').show();
                        todoListItem.append("<li  data-priority='"+result.priority+"' data-id='"+result.id+"'> <div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox' />" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i> </li>");
                        todoListItem.find('li').last().css('background-color', 'rgba(37, 189, 170, '+(result.priority/100)+' )');
                    },
                    error: function(xhr){
                        $('#alert_ajax').addClass('alert-danger');
                        if(xhr.responseJSON.error) {
                            $('#alert_ajax .msg').text(xhr.responseJSON.error);
                        }else{
                            // for developing purpose
                            $('#alert_ajax .msg').text( xhr.status + ': ' + xhr.statusText);
                        }
                        $('#alert_ajax').show();
                    }
                });
            }

        });

        todoListItem.on('change', '.checkbox', function() {
            var todo = $(this).closest('li');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            if ($(this).attr('checked')) {
                jQuery.ajax({
                    url: "/todo/undone",
                    method: 'post',
                    data: {
                        id: todo.data('id'),
                    },
                    success: function(){
                        $(this).removeAttr('checked');
                        todo.toggleClass('completed');
                    },
                    error: function(xhr){
                        $('#alert_ajax').addClass('alert-danger');
                        if(xhr.responseJSON.error) {
                            $('#alert_ajax .msg').text(xhr.responseJSON.error);
                        }else{
                            // for developing purpose
                            $('#alert_ajax .msg').text( xhr.status + ': ' + xhr.statusText);
                        }
                        $('#alert_ajax').show();
                    }
                });
            } else {
                jQuery.ajax({
                    url: "/todo/done",
                    method: 'post',
                    data: {
                        id: todo.data('id'),
                    },
                    success: function(){
                        $(this).attr('checked', 'checked');
                        todo.toggleClass('completed');
                    },
                    error: function(xhr){
                        $('#alert_ajax').addClass('alert-danger');
                        if(xhr.responseJSON.error) {
                            $('#alert_ajax .msg').text(xhr.responseJSON.error);
                        }else{
                            // for developing purpose
                            $('#alert_ajax .msg').text( xhr.status + ': ' + xhr.statusText);
                        }
                        $('#alert_ajax').show();
                    }
                });
            }


        });

        todoListItem.on('click', '.remove', function() {
            var todo = $(this).parent();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            jQuery.ajax({
                url: "/todo/destroy",
                method: 'delete',
                data: {
                    id: todo.data('id'),
                },
                success: function(result){
                    $('#alert_ajax').addClass('alert-'+result.type);
                    $('#alert_ajax .msg').text(result.msg);
                    $('#alert_ajax').show();
                    todo.remove();
                },
                error:function(result){
                    $('#alert_ajax').addClass('alert-danger');
                    $('#alert_ajax .msg').text(result.msg);
                    $('#alert_ajax').show();
                }
            });
        });

    });
})(jQuery);
